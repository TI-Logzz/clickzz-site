import { lazy, Suspense } from 'react';
import { Nav } from './components/Nav';
import { useSmoothScroll, usePointer, useIsMobile } from './lib/scroll';
import { useUI } from './lib/store';
import { Hero } from './sections/Hero';
// Tudo abaixo do hero vem em um único chunk, depois da primeira pintura
const Below = lazy(() => import('./sections/Below'));

import './sections/sections.css';

const Scene = lazy(() => import('./three/Scene'));

export default function App() {
  useSmoothScroll();
  usePointer();
  const webgl = useUI((s) => s.webgl);
  const reduced = useUI((s) => s.reducedMotion);
  const mobile = useIsMobile();

  return (
    <>
      {mobile && <div className="mobile-glow" aria-hidden="true" />}
      {webgl && !reduced && !mobile && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}
      <div className="page-root" id="top">
        <Nav />
        <main>
          <Hero />
          <Suspense fallback={<div style={{ minHeight: 1200 }} aria-hidden="true" />}>
            <Below />
          </Suspense>
        </main>
      </div>
    </>
  );
}
