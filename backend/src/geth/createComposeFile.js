import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { dirName } from '../utils/dirName.js';
import { replaceStringArray } from './replaceStringArray.js';

export async function createComposeFile(
  dataDir,
  nodeKey,
  port,
  httpPort,
  networkId
) {
  // TODO: this should be another env var instead of hardcode to always be addrs 1
  const unlockAddress = '0x' + process.env.SEALER_ADDRESS_1;
  try {
    const content = fs.readFileSync(
      path.resolve(dirName(import.meta.url), process.env.COMPOSE_TEMPLATE)
    );
    const doc = yaml.load(content);

    const pairs = {
      '<datadir>': dataDir,
      '<nodekey>': nodeKey,
      '<port>': port,
      '<httpport>': httpPort,
      '<networkid>': networkId,
      '<unlock>': unlockAddress,
      '<password>': process.env.PASSWORD_FILE,
    };

    // TODO: here we have assumptions on the structure of the yml file. not
    // sure how to fix it though
    doc.services.geth.command = replaceStringArray(
      doc.services.geth.command,
      pairs
    );
    doc.services.geth.ports = replaceStringArray(
      doc.services.geth.ports,
      pairs
    );
    doc.services.geth.volumes = replaceStringArray(
      doc.services.geth.volumes,
      pairs
    );

    // support Apple chips
    if (process.env.IS_APPLE_CHIP === 'true') {
      doc.services.geth.platform = 'linux/amd64';
    }

    const composeFile = dataDir + '/docker-compose.yml';
    fs.writeFile(composeFile, yaml.dump(doc), (err) => {
      if (err) {
        console.log(err);
      }
    });
    return composeFile;
  } catch (e) {
    console.log(e);
  }
}
