import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipe } from 'it-pipe';
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

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
    callback(null, { chain_id: 12321 });
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
