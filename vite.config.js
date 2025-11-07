// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Frontend calls /api/... -> proxies to backend http://localhost:8080
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, '')
      }
    }
  }
})
