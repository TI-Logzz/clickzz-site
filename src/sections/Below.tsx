import { Deferred } from '../components/Deferred';
import { Footer } from '../components/Footer';
import { Positioning } from './Positioning';
import { Formats } from './Formats';
import { AiSection } from './AiSection';
import { BuilderSection } from './BuilderSection';
import { QuizSection } from './QuizSection';
import { PagesSection } from './PagesSection';
import { PublishSection } from './PublishSection';
import { AnalyticsSection } from './AnalyticsSection';
import { CompareSection } from './CompareSection';
import { IntegrationsSection } from './IntegrationsSection';
import { PlansSection } from './PlansSection';
import { AllInOneSection } from './AllInOneSection';
import { FinalCta } from './FinalCta';

/** Tudo abaixo do hero, em um único chunk carregado depois da primeira pintura e montado em levas. */
export default function Below() {
  return (
    <>
      <Deferred stage={0}><Positioning /><Formats /></Deferred>
      <Deferred stage={1}><AiSection /><BuilderSection /></Deferred>
      <Deferred stage={2}><QuizSection /><PagesSection /><PublishSection /></Deferred>
      <Deferred stage={3}><AnalyticsSection /><CompareSection /><IntegrationsSection /></Deferred>
      <Deferred stage={4}><PlansSection /><AllInOneSection /><FinalCta /></Deferred>
      <Deferred stage={4} minHeight={200}><Footer /></Deferred>
    </>
  );
}
