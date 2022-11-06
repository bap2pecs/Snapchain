import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { dirName } from '../utils/dirName.js';

export async function createComposeFile(dataDir, nodekey, port, networkId) {
  // - become a bootnode itself
  // TODO: this should be another env var instead of hardcode to always be addrs 1
  const unlock = '0x' + process.env.SEALER_ADDRESS_1;
  // TODO:
  // - password from env file
  try {
    const content = fs.readFileSync(
      path.resolve(dirName(import.meta.url), process.env.COMPOSE_TEMPLATE)
    );
    const doc = yaml.load(content);
    console.log(doc.services.geth.command);
    console.log(doc.services.geth.ports);
    console.log(doc.services.geth.volumes);
  } catch (e) {
    console.log(e);
  }
}
