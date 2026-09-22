import { lazy, Suspense } from 'react';
import { Nav } from './components/Nav';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSmoothScroll } from './lib/scroll';
import { Hero } from './sections/Hero';
// Tudo abaixo do hero vem em um único chunk, depois da primeira pintura
const Below = lazy(() => import('./sections/Below'));

import './sections/sections.css';

/**
 * A página é 100% DOM: a camada decorativa 3D (cristal, blocos, fios, partículas)
 * foi removida na revisão de 21/09 — as únicas animações são as demonstrações do produto
 * e as microinterações de cada seção.
 */
export default function App() {
  useSmoothScroll();

  return (
    <div className="page-root" id="top">
      <Nav />
      <main>
        <ErrorBoundary name="hero"><Hero /></ErrorBoundary>
        <ErrorBoundary name="seções">
          <Suspense fallback={<div style={{ minHeight: 1200 }} aria-hidden="true" />}>
            <Below />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
