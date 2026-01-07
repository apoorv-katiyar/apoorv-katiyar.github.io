import liveServer from 'live-server';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔨 Building project...\n');

// Run build first
exec('node scripts/build.js', (error, stdout, stderr) => {
  if (error) {
    console.error('Build failed:', error);
    return;
  }
  
  console.log(stdout);
  
  // Start live server
  const params = {
    port: 8000,
    host: '0.0.0.0',
    root: path.join(__dirname, '../dist'),
    open: true,
    file: 'index.html',
    wait: 1000,
    logLevel: 2,
    middleware: [
      function(req, res, next) { 
        // Add custom middleware if needed
        next(); 
      }
    ]
  };
  
  console.log('\n🚀 Starting development server...');
  console.log('📍 Server running at: http://localhost:8000\n');
  console.log('Press Ctrl+C to stop\n');
  
  liveServer.start(params);
});
