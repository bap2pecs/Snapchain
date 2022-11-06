import { createLibp2p } from 'libp2p';
import { webSockets } from '@libp2p/websockets';
import { noise } from '@chainsafe/libp2p-noise';
import { mplex } from '@libp2p/mplex';
import { bootstrap } from '@libp2p/bootstrap';

import { pipe } from 'it-pipe';
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';

// TODO: not sure if all needed
import { createGenesisFile } from '../genesis/createGenesisFile.js';
import { initGenesisBlock } from '../genesis/initGenesisBlock.js';
import { randomIntFromInterval } from '../random/randomNum.js';
import { createNodeKeyFile } from '../geth/createNodeKeyFile.js';
import { createComposeFile } from '../geth/createComposeFile.js';
import { copyKeystore } from '../geth/copyKeystore.js';
import { startGeth } from '../geth/startGeth.js';
import { getEnodeUrl } from '../geth/getEnodeUrl.js';

class SnapP2pNode {
  constructor(nodeName, listenAddrs, bootstrapMultiaddrs = []) {
    this.nodeName = nodeName;
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
        (async () => {
          for await (const msg of source) {
            const msgStr = uint8ArrayToString(msg.subarray());
            console.log(msgStr);
            const msgObj = JSON.parse(msgStr);
            const dataDir = `${process.env.HOME}/.ethereum/snapchain/${this.nodeName}/${msgObj.chainId}`;
            const genesisFile = `${dataDir}/genesis.json`;
            /* example: msgObj
            {
              depositor: '1fd0a83447c0586690f56643ad0077e5ad8eb024',
              nonce: 0,
              name: 'Snap Testnet',
              currency: 'SNAP',
              enodeUrl: 'enode://...@127.0.0.1:20208',
              chainId: 36029,
              port: 20208,
              httpport: 1363
            }
            */

            // 1. create a genesis file
            await createGenesisFile(
              genesisFile,
              msgObj.chainId,
              process.env.SEALER_ADDRESS_1,
              process.env.SEALER_ADDRESS_2,
              msgObj.depositor
            );

            // 2. init the genesis block
            await initGenesisBlock(genesisFile, dataDir);

            // 3. generate the node key file
            const nodeKeyFile = await createNodeKeyFile(dataDir);

            // 4. copy the keystore dir from ~/.ethereum/snapchain/keystore
            // to <datadir>/keystore
            // TODO: not sure if it makes sense to copy it instead of creating a new
            // account for each chain. need some discussion
            await copyKeystore(dataDir + '/keystore');
          }
        })()
      );
    });
  }
}

export async function createP2pNode(
  nodeName,
  listenAddrs,
  bootstrapMultiaddrs = []
) {
  const node = new SnapP2pNode(nodeName, listenAddrs, bootstrapMultiaddrs);
  await node.start();
  return node;
}
