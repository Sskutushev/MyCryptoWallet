import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.png'],
      manifest: {
        name: 'DexSafe Wallet Pro',
        short_name: 'DexSafe',
        description: 'Экологичный DeFi кошелек на X1 EcoChain',
        theme_color: '#00E0BE',
        background_color: '#12141A',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Удаляем console.log в production
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Разделяем большие библиотеки на отдельные chunks
          vendor: ['react', 'react-dom', 'react-router-dom'],
          web3: ['ethers', '@wagmi/core', 'viem'],
          charts: ['lightweight-charts', 'recharts'],
          ui: ['framer-motion', 'lucide-react'],
          telegram: ['@twa-dev/sdk'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    host: true, // Для доступа из сети
  },
})