import { useLayoutEffect, useRef } from 'react';
import { finalCta } from '../content/copy';
import { CtaLink, Eyebrow } from '../components/ui';
import { gsap, useReveal, useSectionProgress } from '../lib/scroll';
import { useUI } from '../lib/store';
import { Traces } from '../components/Traces';

const SAMPLES = [
  'Quiz de diagnóstico de pele que recomenda o kit de skincare ideal…',
  'Página de vendas para fone bluetooth com frete grátis e pagamento na entrega…',
  'Quiz que descobre o tamanho certo da cinta modeladora e captura o WhatsApp…',
];

/** S14 — CTA final com o cristal grande e o campo "descreva o projeto" digitando sozinho. */
export function FinalCta() {
  const root = useRef<HTMLElement>(null);
  const field = useRef<HTMLSpanElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  useSectionProgress('cta', root, { start: 'top 70%', end: 'bottom bottom' });
  useReveal(root);

  useLayoutEffect(() => {
    const span = field.current;
    if (!span || reduced) { if (span) span.textContent = SAMPLES[0]; return; }
    let alive = true;
    let i = 0;
    const type = async () => {
      while (alive) {
        const s = SAMPLES[i % SAMPLES.length];
        for (let k = 0; k <= s.length && alive; k++) { span.textContent = s.slice(0, k); await new Promise((r) => setTimeout(r, 22 + Math.random() * 30)); }
        await new Promise((r) => setTimeout(r, 1800));
        for (let k = s.length; k >= 0 && alive; k -= 3) { span.textContent = s.slice(0, k); await new Promise((r) => setTimeout(r, 8)); }
        i++;
      }
    };
    const st = gsap.matchMedia();
    type();
    return () => { alive = false; st.revert(); };
  }, [reduced]);

  return (
    <section ref={root} className="section section--dark cta" aria-labelledby="cta-title">
      <Traces corners={['tl', 'br']} />
      <div className="cta__bg" aria-hidden="true" />
      <div className="container cta__inner">
        <div data-reveal><Eyebrow>{finalCta.eyebrow} <span className="star">{finalCta.eyebrowStar}</span></Eyebrow></div>
        <h2 id="cta-title" className="display h2 cta__title" data-reveal>{finalCta.title}</h2>
        <p className="lead" data-reveal style={{ marginTop: '1.25rem', marginInline: 'auto' }}>{finalCta.body}</p>
        <div className="cta__field" data-reveal>
          <span aria-hidden="true"><span ref={field} /><i className="caret" /></span>
          <CtaLink size="md">{finalCta.cta}</CtaLink>
        </div>
        <p className="small cta__note" data-reveal>{finalCta.note}</p>
      </div>
    </section>
  );
}
