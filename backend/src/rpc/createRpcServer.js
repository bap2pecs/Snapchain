import { pipe } from 'it-pipe';
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { dirName } from '../utils/dirName.js';
import { genChainId } from '../chainId/genChainId.js';
import { createGenesisFile } from '../genesis/createGenesisFile.js';
import { initGenesisBlock } from '../genesis/initGenesisBlock.js';
import { randomIntFromInterval } from '../random/randomNum.js';
import { createNodeKeyFile } from '../geth/createNodeKeyFile.js';
import { createComposeFile } from '../geth/createComposeFile.js';
import { copyKeystore } from '../geth/copyKeystore.js';

const PROTO_PATH = dirName(import.meta.url) + '/snap.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const snap_proto = grpc.loadPackageDefinition(packageDefinition).snap;

/**
 * Implements the RPC method.
 */
function createChainFactory(node) {
  return async (call, callback) => {
    console.log(call.request);

    // TODOs:
    // 1. input validation
    // - check nonce and alive in the contract
    // - check the local DB does not have the (depositor, nonce) combination
    // 2. select a random chain id and port number
    // - avoid choosing a port number in use
    const chainId = await genChainId();
    // 0 to 1024 are reserved for privileged services
    const port = randomIntFromInterval(1025, 65536);
    // 3. create a genesis file
    const datadir = `${process.env.HOME}/.ethereum/snapchain/${chainId}`;
    const genesisFile = `${datadir}/genesis.json`;
    // TODO: fix the addresses. these are just random fake ones
    await createGenesisFile(
      genesisFile,
      chainId,
      process.env.SEALER_ADDRESS_1,
      process.env.SEALER_ADDRESS_2,
      call.request.depositor
    );
    // 4. init the genesis block
    await initGenesisBlock(genesisFile, datadir);

    // 5. generate the node key file
    const nodeKeyFile = await createNodeKeyFile(datadir);

    // 6. copy the keystore dir from ~/.ethereum/snapchain/keystore
    // to <datadir>/keystore
    // TODO: not sure if it makes sense to copy it instead of creating a new
    // account for each chain. need some discussion
    await copyKeystore(datadir + '/keystore');

    // 7. create the compose file
    const composeFile = await createComposeFile(
      datadir,
      nodeKeyFile,
      port,
      chainId
    );

    // 8. start the geth instance
    // 9. schedule a task to enter grace period
    // - read ttl from the contract

    // Broadcast message to network
    const peers = node.node.getPeers();
    // TODO: this is not really broadcast. also need to wait for connection
    const stream = await node.node.dialProtocol(peers[0], [
      '/snap/create_chain/0.0.1',
    ]);
    // TODO: this is not the real msg
    await pipe(
      [
        uint8ArrayFromString(
          'from the Snap proto: ' + JSON.stringify(call.request)
        ),
      ],
      stream
    );

    // TODO: replace hardcoded chain_id
    callback(null, { chain_id: chainId });
  };
}

export function createRpcServer(addr, node) {
  const server = new grpc.Server();
  const createChainFunc = createChainFactory(node);
  server.addService(snap_proto.Snap.service, {
    createChain: createChainFunc,
  });
  server.bindAsync(addr, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}
