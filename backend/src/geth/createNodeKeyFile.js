import { execAsync } from '../utils/execAsync.js';

export async function createNodeKeyFile(dataDir) {
  const file = 'boot.key';
  let cmd = 'docker run -d --rm ';
  if (process.env.IS_APPLE_CHIP === 'true') {
    cmd += '--platform linux/amd64 ';
  }
  cmd +=
    `-v ${dataDir}:${dataDir} ` +
    'ethereum/client-go:alltools-latest ' +
    `bootnode --genkey=${dataDir}/${file}`;

  const { stdout, stderr } = await execAsync(cmd);
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
  return `${dataDir}/${file}`;
}
