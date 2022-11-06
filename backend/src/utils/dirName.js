import { dirname } from 'path';
import { fileURLToPath } from 'url';

export function dirName(url) {
  return dirname(fileURLToPath(url));
}
