import { useRef } from 'react';
import { plans } from '../content/copy';
import { CheckItem, CtaLink, SectionHead } from '../components/ui';
import { useReveal, useSectionProgress } from '../lib/scroll';
import { useUI } from '../lib/store';

function money(n: number) {
  return n.toLocaleString('pt-BR');
}

/** S12 — Planos, mesma estrutura de cards da QuizMaker, unidade em projetos. */
export function PlansSection() {
  const root = useRef<HTMLElement>(null);
  const billing = useUI((s) => s.billing);
  const setBilling = useUI((s) => s.setBilling);
  useSectionProgress('plans', root);
  useReveal(root);

  return (
    <section ref={root} className="section" id="prices" aria-labelledby="plans-title">
      <div className="container">
        <SectionHead eyebrow={plans.eyebrow} title={<span id="plans-title">{plans.title}</span>} lead={plans.body} align="center">
          <div className="plans__toggle" role="group" aria-label="Periodicidade" data-reveal>
            <button type="button" aria-pressed={billing === 'monthly'} onClick={() => setBilling('monthly')}>{plans.toggle.monthly}</button>
            <button type="button" aria-pressed={billing === 'yearly'} onClick={() => setBilling('yearly')}>{plans.toggle.yearly}</button>
            <span className="plans__save">{plans.toggle.save}</span>
          </div>
        </SectionHead>
        <div className="plans__grid">
          {plans.items.map((p) => {
            const price = billing === 'monthly' ? p.monthly : p.yearly;
            const featured = 'featured' in p && p.featured;
            return (
              <article key={p.name} className={`plan ${featured ? 'plan--featured' : ''}`} data-reveal aria-label={`Plano ${p.name}`}>
                <span className="plan__sheen" aria-hidden="true" />
                {featured && <span className="plan__badge">Mais escolhido</span>}
                <h3 className="plan__name">{p.name}</h3>
                <p className="body plan__desc">{p.desc}</p>
                <div className="plan__price">
                  <b className="tnum"><span className="cur">R$</span>{money(price)}</b>
                  <span>{plans.perMonth}</span>
                </div>
                <div className="plan__included">{plans.included}</div>
                <ul className="check-list">
                  {p.limits.map((l) => <CheckItem key={l}>{l}</CheckItem>)}
                </ul>
                <div className="plan__cta">
                  <CtaLink variant={featured ? 'primary' : 'ghost'}>{plans.cta}</CtaLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
