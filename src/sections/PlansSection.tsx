import { useLayoutEffect, useRef } from 'react';
import { plans } from '../content/copy';
import { CheckItem, CtaLink, SectionHead } from '../components/ui';
import { gsap, useReveal, useSectionProgress } from '../lib/scroll';
import { useUI } from '../lib/store';
import { Traces } from '../components/Traces';

function money(n: number) {
  return n.toLocaleString('pt-BR');
}

/** Economia anual derivada dos próprios preços exibidos (não altera valores). */
function savings(monthly: number, yearly: number) {
  const perYear = (monthly - yearly) * 12;
  const pct = monthly > 0 ? Math.round((1 - yearly / monthly) * 100) : 0;
  return { perYear, pct };
}

/**
 * S12 — Planos. Mensal/Anual troca os preços com uma transição discreta (número desliza e conta)
 * e, no Anual, os cards pagos ganham uma faixa de economia no topo (revisão 21/09, C18/C19).
 */
export function PlansSection() {
  const root = useRef<HTMLElement>(null);
  const billing = useUI((s) => s.billing);
  const setBilling = useUI((s) => s.setBilling);
  const reduced = useUI((s) => s.reducedMotion);
  const first = useRef(true);
  useSectionProgress('plans', root);
  useReveal(root);

  // transição de preço: o número antigo sobe e some, o novo entra de baixo contando até o valor
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (first.current) { first.current = false; return; }
    if (reduced) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>('[data-price]').forEach((p) => {
        const to = Number(p.dataset.price);
        const obj = { v: Number(p.dataset.from ?? to) };
        gsap.timeline()
          .fromTo(p, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'expo.out' }, 0)
          .to(obj, { v: to, duration: 0.45, ease: 'power2.out', onUpdate: () => { p.textContent = money(Math.round(obj.v)); } }, 0);
      });
    }, el);
    return () => ctx.revert();
  }, [billing, reduced]);

  return (
    <section ref={root} className="section" id="prices" aria-labelledby="plans-title">
      <Traces corners={['tl', 'br']} />
      <div className="container">
        <SectionHead eyebrow={plans.eyebrow} title={<span id="plans-title">{plans.title}</span>} lead={plans.body} align="center">
          <div className="plans__toggle" role="group" aria-label="Periodicidade" data-reveal data-billing={billing}>
            <span className="plans__thumb" aria-hidden="true" />
            <button type="button" aria-pressed={billing === 'monthly'} onClick={() => setBilling('monthly')}>{plans.toggle.monthly}</button>
            <button type="button" aria-pressed={billing === 'yearly'} onClick={() => setBilling('yearly')}>{plans.toggle.yearly}</button>
            <span className="plans__save">{plans.toggle.save}</span>
          </div>
        </SectionHead>
        <div className="plans__grid" data-billing={billing}>
          {plans.items.map((p) => {
            const price = billing === 'monthly' ? p.monthly : p.yearly;
            const featured = 'featured' in p && p.featured;
            const paid = p.monthly > 0;
            const sv = savings(p.monthly, p.yearly);
            const showBand = paid && billing === 'yearly';
            return (
              <article key={p.name} className={`plan ${featured ? 'plan--featured' : ''} ${showBand ? 'plan--saving' : ''}`} data-reveal aria-label={`Plano ${p.name}`}>
                {paid && (
                  <div className={`plan__band ${showBand ? 'plan__band--on' : ''}`} aria-hidden={!showBand}>
                    <div><span>Economia de R$ {money(sv.perYear)} ({sv.pct}%) ao ano</span></div>
                  </div>
                )}
                <div className="plan__inner">
                  <span className="plan__sheen" aria-hidden="true" />
                  {featured && <span className="plan__badge">Mais escolhido</span>}
                  <h3 className="plan__name">{p.name}</h3>
                  <p className="body plan__desc">{p.desc}</p>
                  <div className="plan__price">
                    <b className="tnum"><span className="cur">R$</span><span data-price={price} data-from={billing === 'monthly' ? p.yearly : p.monthly}>{money(price)}</span></b>
                    <span>{plans.perMonth}</span>
                  </div>
                  <div className="plan__included">{plans.included}</div>
                  <ul className="check-list">
                    {p.limits.map((l) => <CheckItem key={l}>{l}</CheckItem>)}
                  </ul>
                  <div className="plan__cta">
                    <CtaLink variant={featured ? 'primary' : 'ghost'}>{plans.cta}</CtaLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
