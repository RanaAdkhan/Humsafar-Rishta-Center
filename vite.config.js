import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom plugin to strictly enforce ZERO "localhost" strings in production output
function enforceZeroLocalhostInDist() {
  return {
    name: 'enforce-zero-localhost-in-dist',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(distDir)) return;

      const scanDirectory = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            scanDirectory(fullPath);
          } else if (/\.(js|css|html|json)$/i.test(file)) {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (/http:\/\/localhost|https:\/\/localhost|\"localhost\"|\'localhost\'/i.test(content)) {
              throw new Error(
                `[SECURITY AUDIT FAILURE] Production build contains forbidden 'localhost' reference in: ${path.relative(distDir, fullPath)}\nAll endpoints must use production HTTPS URLs or relative paths configured via VITE_API_BASE_URL.`
              );
            }
          }
        }
      };

      scanDirectory(distDir);
      console.log('✓ [AUDIT PASSED] Zero "localhost" strings verified in dist/ output.');
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), enforceZeroLocalhostInDist()],
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  },
  server: {
    port: 5173,
    host: true
  }
})
