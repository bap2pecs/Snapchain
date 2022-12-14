import { execAsync } from '../utils/execAsync.js';

// TODO: composeFile is not needed
export async function startGeth(dataDir, composeFile) {
  let cmd = `cd ${dataDir} && `;
  // TODO: fix the assumptions
  if (process.env.IS_APPLE_CHIP === 'true') {
    cmd += 'docker-compose up -d';
  } else {
    cmd += 'docker compose up -d';
  }
  const { stdout, stderr } = await execAsync(cmd);
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
