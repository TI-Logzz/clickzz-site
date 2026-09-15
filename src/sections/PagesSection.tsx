import { useLayoutEffect, useRef } from 'react';
import { pages } from '../content/copy';
import { CtaLink, SectionHead } from '../components/ui';
import { Device } from '../screens/Device';
import { PageBuilderScreen } from '../screens/PageBuilderScreen';
import { gsap, useReveal, useSectionProgress } from '../lib/scroll';
import { useUI } from '../lib/store';

/**
 * S07 — Páginas de conversão. A lista "Hero Oferta Benefícios…" cai bloco a bloco formando
 * uma pilha; ao lado o builder monta a página seção por seção (Fluxo B).
 */
export function PagesSection() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  useSectionProgress('pages', root);
  useReveal(root);

  useLayoutEffect(() => {
    const el = root.current;
    const st = stage.current;
    if (!el || !st || reduced) return;
    const ctx = gsap.context(() => {
      const blocks = el.querySelectorAll<HTMLElement>('.pages__block');
      const secs = st.querySelectorAll<HTMLElement>('[data-bsec]');
      const items = st.querySelectorAll<HTMLElement>('[data-sec-item]');
      const doc = st.querySelector<HTMLElement>('[data-pgdoc]');
      gsap.set(blocks, { y: -40, opacity: 0, rotate: (i) => (i % 2 ? 6 : -6) });
      gsap.set(secs, { opacity: 0, y: 24 });
      gsap.set(items, { opacity: 0, x: -10 });
      const blocksEl = el.querySelector<HTMLElement>('.pages__blocks')!;
      const split = el.querySelector<HTMLElement>('.split')!;
      // 1) o builder monta a página enquanto o visitante lê a coluna de texto:
      //    começa quando o palco entra e termina quando a lista de blocos aparece
      const tlA = gsap.timeline({ scrollTrigger: { trigger: split, start: 'top 70%', endTrigger: blocksEl, end: 'top 70%', scrub: 0.6 }, defaults: { ease: 'none' } });
      secs.forEach((sec, i) => {
        tlA.to(sec, { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' }, i * 0.3);
        if (items[i]) tlA.to(items[i], { opacity: 1, x: 0, duration: 0.3 }, i * 0.3);
      });
      if (doc) tlA.to(doc, { y: -520, duration: secs.length * 0.3, ease: 'none' }, 0.5);
      // 2) os blocos "Hero … CTAs" caem quando a lista entra na tela; o fecho aparece no fim
      const tlB = gsap.timeline({ scrollTrigger: { trigger: blocksEl, start: 'top 92%', end: 'top 45%', scrub: 0.6 }, defaults: { ease: 'none' } });
      blocks.forEach((b, i) => tlB.to(b, { y: 0, opacity: 1, rotate: 0, duration: 0.4, ease: 'back.out(1.8)' }, i * 0.25));
      tlB.fromTo('.pages__close', { opacity: 0 }, { opacity: 1, duration: 0.3 }, blocks.length * 0.25);
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="section" id="paginas" aria-labelledby="pages-title">
      <div className="container split split--rev">
        <div ref={stage} className="pages__stage" aria-label="Builder de página montando seções: Hero, Oferta, Benefícios, Prova, Comparações, Bônus, Garantia, FAQ, CTAs">
          <Device url="app.quizmaker.com.br/dashboard/projects/…/builder">
            <PageBuilderScreen activeSection={-1} />
          </Device>
        </div>
        <div>
          <SectionHead eyebrow={pages.eyebrow} title={<span id="pages-title">{pages.title1}<br />{pages.title2}</span>} lead={pages.body1} />
          <p className="body-lg" data-reveal style={{ marginTop: '1rem' }}>{pages.body2}</p>
          <div className="pages__blocks" aria-label={pages.blocks.join(' ')}>
            {pages.blocks.map((b) => <span key={b} className="pages__block"><i aria-hidden="true" />{b}</span>)}
          </div>
          <p className="pages__close" style={reduced ? undefined : { opacity: 0 }}>{pages.close}</p>
          <div style={{ marginTop: '1.5rem' }} data-reveal><CtaLink>{pages.cta}</CtaLink></div>
        </div>
      </div>
    </section>
  );
}
