import { execAsync } from '../utils/execAsync.js';

export async function initGenesisBlock(file, datadir) {
  // TODO:
  // add "--platform linux/amd64" for Apple chips
  const cmd =
    `docker run -d --rm -v ${datadir}:${datadir} ` +
    'ethereum/client-go:alltools-latest ' +
    `geth init --datadir ${datadir} ${file}`;

  const { stdout, stderr } = await execAsync(cmd);
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
