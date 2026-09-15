import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/sora/700.css';
import '@fontsource/sora/800.css';
import './index.css';
import App from './App.tsx';
import { detectWebGL, useUI } from './lib/store';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const webgl = detectWebGL();
useUI.getState().setEnv({ reducedMotion, isTouch, webgl });
if (!webgl) document.documentElement.classList.add('no-webgl');
if (reducedMotion) document.documentElement.classList.add('reduced-motion');

// Chunks carregados depois (seções abaixo do hero, cena 3D) podem sumir após um deploy: recarrega uma vez.
window.addEventListener('vite:preloadError', (e) => {
  e.preventDefault();
  if (!sessionStorage.getItem('czz-reloaded')) {
    sessionStorage.setItem('czz-reloaded', '1');
    location.reload();
  }
});
// Carregou com sucesso: libera uma futura recuperação.
window.addEventListener('load', () => sessionStorage.removeItem('czz-reloaded'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
