import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    'process.env.PUBLIC_URL': JSON.stringify(''),
    ...Object.fromEntries(Object.entries(loadEnv(mode, process.cwd(), 'REACT_APP_')).map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])),
  },
  build: { outDir: 'build' },
  test: { globals: true, environment: 'jsdom', setupFiles: ['src/setupTests.js'] },
}));
