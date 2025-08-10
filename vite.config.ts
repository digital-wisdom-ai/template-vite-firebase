import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { aliases } from './config/aliases'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliases,
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
