import { createP2pNode } from '../p2p/createP2pNode.js';

// This starts a p2p node which uses another node as the bootstrap node
(async () => {
  const argv = process.argv.slice(2);
  // params:
  // 1. listenAddrs
  // 2. bootstrapMultiAddrs
  const listenAddrs = argv[0];
  const bootstrapMultiaddrs = [argv[1]];

  await createP2pNode('node2', listenAddrs, bootstrapMultiaddrs);
})();
