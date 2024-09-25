import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'development' ? '/' : '/static/frontend/',
  build: {
    manifest: true,
    outDir: resolve(__dirname, 'frontend/.vite'), // Make sure manifest is in .vite
    rollupOptions: {
      input: './src/main.tsx',  // Entry point of your app
    },
  },
  server: {
    port: 5173,
    hmr: {
      host: 'localhost',
    },
  },
});