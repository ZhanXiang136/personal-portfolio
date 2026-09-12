import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  // Compatibility for the existing root-hosted resume URLs; expose no other env vars.
  define: { 'process.env.PUBLIC_URL': JSON.stringify('') },
  build: { outDir: 'build', sourcemap: false },
  server: { host: '127.0.0.1', fs: { strict: true } },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.js'],
    exclude: ['**/node_modules/**', '**/node_modules.pre-security/**', '**/build/**'],
  },
});
