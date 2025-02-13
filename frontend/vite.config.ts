import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  publicDir: 'public',
  base: '/',
  build: {
    manifest: true,
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.tsx',
    },
  },
  server: command === 'serve' ? {
    port: 5173,
    hmr: {
      host: 'localhost',
    },
  } : undefined,
}));