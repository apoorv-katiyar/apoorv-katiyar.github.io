import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');

async function clean() {
  try {
    await fs.emptyDir(DIST_DIR);
    console.log('✓ Cleaned dist directory');
  } catch (error) {
    console.error('❌ Clean failed:', error);
    process.exit(1);
  }
}

clean();
