import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Archived reference HTML files are not application entry points.
  optimizeDeps: { entries: ['index.html'] },
  server: { port: 5175, strictPort: true },
  preview: { port: 4175, strictPort: true },
})
