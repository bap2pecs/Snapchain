import { execAsync } from '../utils/execAsync.js';

export async function startGeth(composeFile) {
  let cmd;
  // TODO: fix the assumptions
  if (process.env.IS_APPLE_CHIP === 'true') {
    cmd = 'docker-compose up -d';
  } else {
    cmd = 'docker compose up -d';
  }
  const { stdout, stderr } = await execAsync(cmd);
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
