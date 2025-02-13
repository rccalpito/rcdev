import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  publicDir: './public',
  base: process.env.NODE_ENV === 'development' ? '/' : '/static/frontend/',
  build: {
    manifest: true,
    outDir: '../dist',
    rollupOptions: {
      input: './src/main.tsx',
    },
  },
  server: {
    port: 5173,
    hmr: {
      host: 'localhost',
    },
  } : undefined,
});