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
import { startGeth } from '../geth/startGeth.js';
import { getEnodeUrl } from '../geth/getEnodeUrl.js';

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
    // 2. select a random chain id
    const chainId = await genChainId();
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
    // TODO: avoid choosing a port number in use
    // 0 to 1024 are reserved for privileged services
    const port = randomIntFromInterval(1025, 65536);
    const httpport = randomIntFromInterval(1025, 65536);
    const composeFile = await createComposeFile(
      datadir,
      nodeKeyFile,
      port,
      httpport,
      chainId
    );

    // 8. start the geth instance
    // TODO: datadir should be parsed from the file directly. no need this param
    await startGeth(datadir, composeFile);
    console.log('geth started');

    // 9. read the docker logs and extract enode url
    const enodeUrl = await getEnodeUrl(datadir);
    console.log('enodeUrl: ' + enodeUrl);

    // x. schedule a task to enter grace period
    // - read ttl from the contract

    // Broadcast message to network
    const msg = call.request;
    msg.enodeUrl = enodeUrl;
    msg.chainId = chainId;
    msg.dataDir = datadir;
    msg.genesisFile = genesisFile;
    msg.port = port;
    msg.httpport = httpport;

    const peers = node.node.getPeers();
    // TODO: this is not really broadcast. also need to wait for connection
    const stream = await node.node.dialProtocol(peers[0], [
      '/snap/create_chain/0.0.1',
    ]);
    // TODO: this is not the real msg
    await pipe([uint8ArrayFromString(JSON.stringify(call.request))], stream);

    // TODO: replace hardcoded chain_id
    callback(null, { chain_id: chainId });
  };
}

function destroyChainFactory(node, chainId) {
  return async (call, callback) => {
    console.log(call.request);
    const datadir = `${process.env.HOME}/.ethereum/snapchain/${chainId}`;
    // stop geth instance
    callback(null, { chain_id: call.request.chainId });
  };
}

export function createRpcServer(addr, node, chainId) {
  const server = new grpc.Server();
  const createChainFunc = createChainFactory(node);
  const destroyChainFunc = destroyChainFactory(node, chainId);
  server.addService(snap_proto.Snap.service, {
    createChain: createChainFunc,
    destoryChain: destroyChainFunc,
  });
  server.bindAsync(addr, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}
