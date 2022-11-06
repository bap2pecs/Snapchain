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
  client.destroyChain(
    {
      depositor: '1fd0a83447c0586690f56643ad0077e5ad8eb024',
      nonce: 0
    },
    function (err, response) {
      if (err) {
        console.log('error: ', err);
      }
      console.log('Destroyed Chain ID: ', response.chain_id);
    }
  );
}

main();