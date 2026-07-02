import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [  tailwindcss(),
    react()
  ],
  server: {
    port: 5175,
    strictPort: true,
  proxy: {
    '/api/documents': {
      target: 'http://localhost:5004',
      changeOrigin: true,
    },
    '/api': {
      target: 'http://localhost:5001',
      changeOrigin: true,
    },
  },
},

})
