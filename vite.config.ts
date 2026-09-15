import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Caminhos relativos: o mesmo build funciona na raiz (Vercel, domínio próprio) e em /clickzz-site/ (GitHub Pages)
  base: './',
  plugins: [react()],
})
