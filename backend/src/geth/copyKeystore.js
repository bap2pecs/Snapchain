import fs from 'fs-extra';

export async function copyKeystore(destDir) {
  try {
    await fs.copy(process.env.KEYSTORE_DIR, destDir);
  } catch (err) {
    console.error(err);
  }
}
