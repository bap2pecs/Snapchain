import { createLibp2p } from 'libp2p';
import { webSockets } from '@libp2p/websockets';
import { noise } from '@chainsafe/libp2p-noise';
import { mplex } from '@libp2p/mplex';
import { bootstrap } from '@libp2p/bootstrap';

import { pipe } from 'it-pipe';
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';

class SnapP2pNode {
  constructor(listenAddrs, bootstrapMultiaddrs = []) {
    this.listenAddrs = listenAddrs;
    this.bootstrapMultiaddrs = bootstrapMultiaddrs;
  }

  async start() {
    const configs = {
      addresses: {
        listen: [this.listenAddrs],
      },
      transports: [webSockets()],
      connectionEncryption: [noise()],
      streamMuxers: [mplex()],
      connectionManager: {
        autoDial: true, // Auto connect to discovered peers (limited by ConnectionManager minConnections)
        // The `tag` property will be searched when creating the instance of your Peer Discovery service.
        // The associated object, will be passed to the service when it is instantiated.
      },
    };
    if (this.bootstrapMultiaddrs.length > 0) {
      configs.peerDiscovery = [
        bootstrap({
          // Note: empty array will throw
          list: this.bootstrapMultiaddrs, // provide array of multiaddrs
        }),
      ];
    }
    this.node = await createLibp2p(configs);
    this.addListener();
    this.addHandler();
    await this.node.start();
    const multiAddrs = this.node.getMultiaddrs();
    console.log('node multi addresses: ', multiAddrs);
  }

  addListener() {
    this.node.addEventListener('peer:discovery', (evt) => {
      console.log('Discovered %s', evt.detail.id.toString()); // Log discovered peer
    });
    this.node.connectionManager.addEventListener('peer:connect', (evt) => {
      console.log('Connected to %s', evt.detail.remotePeer.toString()); // Log connected peer
    });
  }

  addHandler() {
    this.node.handle('/snap/create_chain/0.0.1', ({ stream }) => {
      pipe(stream, (source) =>
        (async function () {
          for await (const msg of source) {
            console.log(uint8ArrayToString(msg.subarray()));
          }
        })()
      );
    });
  }
}

export async function createP2pNode(listenAddrs, bootstrapMultiaddrs = []) {
  const node = new SnapP2pNode(listenAddrs, bootstrapMultiaddrs);
  await node.start();
  return node;
}
