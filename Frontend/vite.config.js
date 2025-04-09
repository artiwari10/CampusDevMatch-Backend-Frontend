import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4173
  },
  plugins: [react()],
  build: {
    sourcemap: true, // Ensures source maps are generated in production build too
  },
})
