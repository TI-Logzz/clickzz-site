import { Deferred } from '../components/Deferred';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Footer } from '../components/Footer';
import { Positioning } from './Positioning';
import { Formats } from './Formats';
import { AiSection } from './AiSection';
import { BuilderSection, BuilderCards } from './BuilderSection';
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
      <Deferred stage={0}><ErrorBoundary name="plataforma"><Positioning /></ErrorBoundary><ErrorBoundary name="formatos"><Formats /></ErrorBoundary></Deferred>
      <Deferred stage={1}><ErrorBoundary name="ia"><AiSection /></ErrorBoundary><ErrorBoundary name="builder"><BuilderSection /><BuilderCards /></ErrorBoundary></Deferred>
      <Deferred stage={2}><ErrorBoundary name="quiz"><QuizSection /></ErrorBoundary><ErrorBoundary name="páginas"><PagesSection /></ErrorBoundary><ErrorBoundary name="publicação"><PublishSection /></ErrorBoundary></Deferred>
      <Deferred stage={3}><ErrorBoundary name="dados"><AnalyticsSection /></ErrorBoundary><ErrorBoundary name="benefícios"><CompareSection /></ErrorBoundary><ErrorBoundary name="integrações"><IntegrationsSection /></ErrorBoundary></Deferred>
      <Deferred stage={4}><ErrorBoundary name="planos"><PlansSection /></ErrorBoundary><ErrorBoundary name="tudo em um só lugar"><AllInOneSection /></ErrorBoundary><ErrorBoundary name="cta"><FinalCta /></ErrorBoundary></Deferred>
      <Deferred stage={4} minHeight={200}><ErrorBoundary name="rodapé"><Footer /></ErrorBoundary></Deferred>
    </>
  );
}
