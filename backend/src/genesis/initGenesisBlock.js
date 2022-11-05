import { execAsync } from '../utils/execAsync.js';

export async function initGenesisBlock(file, datadir) {
  // TODO: extract this code snippet to a module
  let cmd = 'docker run -d --rm ';
  if (process.env.IS_APPLE_CHIP === 'true') {
    cmd += '--platform linux/amd64 ';
  }
  cmd +=
    `-v ${datadir}:${datadir} ` +
    'ethereum/client-go:alltools-latest ' +
    `geth init --datadir ${datadir} ${file}`;

  const { stdout, stderr } = await execAsync(cmd);
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
