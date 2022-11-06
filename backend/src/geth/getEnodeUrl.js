import { execAsync } from '../utils/execAsync.js';
import { sleep } from '../utils/sleep.js';

export async function getEnodeUrl(dataDir) {
  // TODO: this is a hack
  // wait for a few seconds so we make sure the encode url is there
  // TODO: is 8s too much? is 5 enough?
  await sleep(8 * 1000);

  let cmd = `cd ${dataDir} && `;
  // TODO: fix the assumptions
  if (process.env.IS_APPLE_CHIP === 'true') {
    cmd += 'docker-compose logs';
  } else {
    cmd += 'docker compose logs';
  }
  const { stdout, stderr } = await execAsync(cmd);
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);

  const regex = /enode:\/\/.*\n/g;
  // TODO: assume it's always found
  const found = stdout.match(regex);
  // remove the '\n' at the end
  return found[0].slice(0, -1);
}
