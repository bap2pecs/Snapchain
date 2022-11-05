import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipe } from 'it-pipe';
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { genChainId } from '../chainId/genChainId.js';
import { createGenesisFile } from '../genesis/createGenesisFile.js';
import { initGenesisBlock } from '../genesis/initGenesisBlock.js';
import { randomIntFromInterval } from '../random/randomNum.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROTO_PATH = __dirname + '/snap.proto';

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
    const file = `${datadir}/genesis.json`;
    // TODO: fix the addresses. these are just random fake ones
    await createGenesisFile(
      file,
      chainId,
      '25bd2c1f21c4603355b9456dd97d9d2c098a1d46',
      '40640236ca267cea54e0e545ca2363032a05fc08',
      call.request.depositor
    );
    // 4. init the genesis block
    await initGenesisBlock(file, datadir);

    // 5. start the geth instance
    // - `--datadir` will be ~/.ethereum/snapchain/<chainId>
    // - become a bootnode itself
    // 5. schedule a task to enter grace period
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
