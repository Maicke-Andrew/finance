import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 7582
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        dir: 'dist',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});