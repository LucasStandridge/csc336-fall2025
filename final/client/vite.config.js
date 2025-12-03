import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
  proxy: {
    "/Users": {
      target: "http://localhost:3000",
      changeOrigin: true
    },
    "/Pokemon_Data": {
      target: "http://localhost:3000",
      changeOrigin: true
    }
    }
  }
})
