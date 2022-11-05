import { dirname } from 'path';
import { fileURLToPath } from 'url';
import parseArgs from 'minimist';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROTO_PATH = __dirname + '/../rpc/snap.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const snap_proto = grpc.loadPackageDefinition(packageDefinition).snap;

function main() {
  const argv = parseArgs(process.argv.slice(2), {
    string: 'target',
  });
  let target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:50051';
  }
  const client = new snap_proto.Snap(target, grpc.credentials.createInsecure());
  client.createChain(
    {
      depositor: '0x123212121',
      nonce: 647291,
      name: 'Snap Testnet',
      currency: 'SNAP',
    },
    function (err, response) {
      console.log('Chain ID:', response.chain_id);
    }
  );
}

main();
