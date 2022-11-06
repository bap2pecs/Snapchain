import { createP2pNode } from '../p2p/createP2pNode.js';
import { createRpcServer } from '../rpc/createRpcServer.js';

// This starts a p2p node and then the rpc server
(async () => {
  const argv = process.argv.slice(2);
  // params:
  // 1. listenAddrs
  // 2. rpc server addrs
  const listenAddrs = argv[0];
  const rpcServerAddrs = argv[1];

  const p2pNode = await createP2pNode('node1', listenAddrs);
  createRpcServer(rpcServerAddrs, p2pNode, 'node1');
})();
