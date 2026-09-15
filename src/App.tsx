import { lazy, Suspense } from 'react';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { useSmoothScroll, usePointer } from './lib/scroll';
import { useUI } from './lib/store';
import { Hero } from './sections/Hero';
import { Positioning } from './sections/Positioning';
import { Formats } from './sections/Formats';
import { AiSection } from './sections/AiSection';
import { BuilderSection } from './sections/BuilderSection';
import { QuizSection } from './sections/QuizSection';
import { PagesSection } from './sections/PagesSection';
import { PublishSection } from './sections/PublishSection';
import { AnalyticsSection } from './sections/AnalyticsSection';
import { CompareSection } from './sections/CompareSection';
import { IntegrationsSection } from './sections/IntegrationsSection';
import { PlansSection } from './sections/PlansSection';
import { AllInOneSection } from './sections/AllInOneSection';
import { FinalCta } from './sections/FinalCta';
import './sections/sections.css';

const Scene = lazy(() => import('./three/Scene'));

export default function App() {
  useSmoothScroll();
  usePointer();
  const webgl = useUI((s) => s.webgl);
  const reduced = useUI((s) => s.reducedMotion);

  return (
    <>
      {webgl && !reduced && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}
      <div className="page-root" id="top">
        <Nav />
        <main>
          <Hero />
          <Positioning />
          <Formats />
          <AiSection />
          <BuilderSection />
          <QuizSection />
          <PagesSection />
          <PublishSection />
          <AnalyticsSection />
          <CompareSection />
          <IntegrationsSection />
          <PlansSection />
          <AllInOneSection />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </>
  );
}
