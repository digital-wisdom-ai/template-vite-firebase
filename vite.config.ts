import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { aliases } from './config/aliases'

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        'favicon.ico',
        'favicon.svg',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'apple-touch-icon.png',
        'mask-icon.svg',
      ],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'Vite React Firebase Template',
        short_name: 'ViteReactApp',
        description:
          'A modern React app with Firebase authentication and design tokens',
        theme_color: '#1976d2',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'pwa-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'pwa-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'pwa-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'pwa-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'pwa-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
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
