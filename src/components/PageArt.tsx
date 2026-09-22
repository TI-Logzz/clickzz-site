import { Star, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { Scaled } from './Scaled';
import './pageart.css';

/**
 * Representação ilustrada de uma página de conversão se montando por seções —
 * não é uma captura do builder. Cada seção carrega [data-pg-sec] para a timeline.
 * `compact` = versão curta (card "Página" em Seus projetos); completa = seção Páginas de conversão.
 */
const FULL = ['Hero', 'Oferta', 'Benefícios', 'Prova', 'FAQ', 'CTA final'];
const COMPACT = ['Hero', 'Oferta', 'Benefícios'];

export function PageArt({ compact = false }: { compact?: boolean }) {
  const labels = compact ? COMPACT : FULL;
  // o card compacto usa a mesma proporção do FlowArt (720×380) para os dois cards de
  // "Seus projetos" terminarem na mesma altura
  const w = 720;
  const h = compact ? 380 : 660;
  return (
    <Scaled width={w} height={h} className="pgart">
      <div className={`pgart__canvas ${compact ? 'pgart__canvas--compact' : ''}`} style={{ width: w, height: h }}>
        <div className="pgart__page">
          {labels.map((label, i) => (
            <div key={label} className="pgart__sec" data-pg-sec={i}>
              {label === 'Hero' && (
                <div className="pgart__hero">
                  <div>
                    <span className="pgart__eyebrow">Turma 12 · vagas abertas</span>
                    <div className="pgart__h1" />
                    <div className="pgart__h1 pgart__h1--2" />
                    <div className="pgart__text" />
                    <div className="pgart__text pgart__text--short" />
                    <span className="pgart__cta">Quero começar agora</span>
                  </div>
                  <div className="pgart__art">
                    <i className="pgart__art-blob" />
                    <i className="pgart__art-ring" />
                    <Sparkles className="pgart__art-star" size={compact ? 14 : 18} />
                  </div>
                </div>
              )}
              {label === 'Oferta' && (
                <div className="pgart__offer">
                  <div>
                    <div className="pgart__text pgart__text--mid" />
                    <div className="pgart__price"><b>R$ 297</b><span>ou 12× de R$ 29,70</span></div>
                  </div>
                  <span className="pgart__badge"><ShieldCheck size={12} /> Garantia de 7 dias</span>
                </div>
              )}
              {label === 'Benefícios' && (
                <div className="pgart__grid">
                  {[0, 1, 2].map((k) => (
                    <div key={k} className="pgart__mini">
                      <i className="pgart__mini-icon" />
                      <div className="pgart__text pgart__text--tiny" />
                      <div className="pgart__text pgart__text--tiny pgart__text--short" />
                    </div>
                  ))}
                </div>
              )}
              {label === 'Prova' && (
                <div className="pgart__proof">
                  {[0, 1, 2].map((k) => (
                    <div key={k} className="pgart__quote">
                      <div className="pgart__stars">{[0, 1, 2, 3, 4].map((s) => <Star key={s} size={8} fill="#f59e0b" stroke="none" />)}</div>
                      <div className="pgart__text pgart__text--tiny" />
                      <div className="pgart__text pgart__text--tiny pgart__text--short" />
                      <span className="pgart__avatar" />
                    </div>
                  ))}
                </div>
              )}
              {label === 'FAQ' && (
                <div className="pgart__faq">
                  {[0, 1, 2].map((k) => (
                    <div key={k} className="pgart__faq-row"><div className="pgart__text pgart__text--tiny" /><ChevronDown size={12} /></div>
                  ))}
                </div>
              )}
              {label === 'CTA final' && (
                <div className="pgart__final">
                  <div className="pgart__h1 pgart__h1--center" />
                  <span className="pgart__cta pgart__cta--wide">Garantir minha vaga</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Scaled>
  );
}
