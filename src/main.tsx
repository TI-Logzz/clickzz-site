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
import { useUI } from './lib/store';

// Relatório visível de erros: nunca deixar a página em branco sem dizer o motivo.
const report = (msg: string) => {
  let box = document.getElementById('czz-error');
  if (!box) {
    box = document.createElement('div');
    box.id = 'czz-error';
    box.setAttribute('role', 'alert');
    box.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;background:#fff;color:#7f1d1d;border:1px solid #fecaca;border-radius:12px;padding:12px 14px;font:13px/1.4 system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.12);white-space:pre-wrap';
    document.body.appendChild(box);
  }
  box.textContent = `Ocorreu um erro ao carregar a página. Detalhe técnico: ${msg}`;
};
(window as Window & { __czzReport?: (m: string) => void }).__czzReport = report;
window.addEventListener('error', (e) => { if (e.error) report(`${e.message} (${(e.filename || '').split('/').pop()}:${e.lineno})`); });
window.addEventListener('unhandledrejection', (e) => report(`promise: ${String((e.reason && e.reason.message) || e.reason).slice(0, 300)}`));

const safe = <T,>(fn: () => T, fallback: T): T => { try { return fn(); } catch { return fallback; } };
const reducedMotion = safe(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, false);
const isTouch = safe(() => window.matchMedia('(hover: none), (pointer: coarse)').matches, false);
useUI.getState().setEnv({ reducedMotion, isTouch });
if (reducedMotion) document.documentElement.classList.add('reduced-motion');

// Chunks carregados depois (seções abaixo do hero, cena 3D) podem sumir após um deploy: recarrega uma vez.
const ss = { get: (k: string) => safe(() => sessionStorage.getItem(k), null), set: (k: string, v: string) => safe(() => sessionStorage.setItem(k, v), undefined), del: (k: string) => safe(() => sessionStorage.removeItem(k), undefined) };
window.addEventListener('vite:preloadError', (e) => {
  e.preventDefault();
  if (!ss.get('czz-reloaded')) { ss.set('czz-reloaded', '1'); location.reload(); }
  else report('um arquivo da página não pôde ser carregado (chunk).');
});
// Carregou com sucesso: libera uma futura recuperação.
window.addEventListener('load', () => ss.del('czz-reloaded'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
