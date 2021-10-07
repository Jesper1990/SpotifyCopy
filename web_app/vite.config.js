import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/login': 'http://localhost:4000',
      '/logout': 'http://localhost:4000'
    }
  }
})
