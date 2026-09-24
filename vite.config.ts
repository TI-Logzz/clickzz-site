import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { heroShell } from './hero-shell.ts'

// https://vite.dev/config/
export default defineConfig({
  // Caminhos relativos: o mesmo build funciona na raiz (Vercel, domínio próprio) e em /clickzz-site/ (GitHub Pages)
  base: './',
  // heroShell: menu e texto do hero já no HTML (primeira pintura no celular sem esperar o JS)
  plugins: [react(), heroShell()],
})
