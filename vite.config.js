import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base:'/targetx-interactive-2/',
  plugins: [react(), svgr()],
  build: {
    sourcemap: false,
  },
});
