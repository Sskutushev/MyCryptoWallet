import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
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