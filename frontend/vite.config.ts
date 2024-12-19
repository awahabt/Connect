import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '127.0.0.1'
},
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
},
})