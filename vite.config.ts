import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serve o site em /clickzz-site/; troque para '/' ao publicar em domínio próprio
  base: process.env.VITE_BASE ?? '/clickzz-site/',
  plugins: [react()],
})
