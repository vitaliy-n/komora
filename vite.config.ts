import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['komora-icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Комора — Домашні закрутки',
        short_name: 'Комора',
        description: 'Додаток для управління домашніми закрутками та зберігання продуктів',
        theme_color: '#16a34a',
        background_color: '#fafaf9',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/app',
        shortcuts: [
          { name: 'Нова закрутка', url: '/app/cannings/new', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
          { name: 'Список покупок', url: '/app/shopping', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
          { name: 'Сканер QR', url: '/app/scan', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
        ],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
})
