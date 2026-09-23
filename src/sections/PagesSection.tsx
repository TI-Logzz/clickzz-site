import { useLayoutEffect, useRef } from 'react';
import { pages } from '../content/copy';
import { CtaLink, SectionHead } from '../components/ui';
import { PageArt } from '../components/PageArt';
import { gsap, useReveal, useSectionProgress, useIsMobile, stageWindow } from '../lib/scroll';
import { useUI } from '../lib/store';

/**
 * S07 — Páginas de conversão. A lista "Hero Oferta Benefícios…" cai bloco a bloco formando
 * uma pilha; ao lado o builder monta a página seção por seção (Fluxo B).
 */
export function PagesSection() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  const mobile = useIsMobile();
  useSectionProgress('pages', root);
  useReveal(root);

  useLayoutEffect(() => {
    const el = root.current;
    const st = stage.current;
    if (!el || !st || reduced) return;
    const ctx = gsap.context(() => {
      const blocks = el.querySelectorAll<HTMLElement>('.pages__block');
      const secs = st.querySelectorAll<HTMLElement>('[data-pg-sec]');
      const rows = st.querySelectorAll<HTMLElement>('[data-pg-row]');
      gsap.set(blocks, { y: -40, opacity: 0, rotate: (i) => (i % 2 ? 6 : -6) });
      gsap.set(secs, { opacity: 0, y: 18 });
      gsap.set(rows, { opacity: 0, x: -10 });
      const blocksEl = el.querySelector<HTMLElement>('.pages__blocks')!;
      const split = el.querySelector<HTMLElement>('.split')!;
      // 1) o builder monta a página enquanto o visitante lê a coluna de texto:
      //    começa quando o palco entra e termina quando a lista de blocos aparece
      // no mobile o palco fica acima do texto: a montagem precisa terminar enquanto ele ainda está na tela
      const tlA = gsap.timeline({ scrollTrigger: mobile ? stageWindow(st, 0.5) : { trigger: split, start: 'top 70%', endTrigger: blocksEl, end: 'top 70%', scrub: 0.6 }, defaults: { ease: 'none' } });
      // a seção aparece na coluna de estrutura e no mesmo instante no corpo da página
      secs.forEach((sec, i) => {
        tlA.to(sec, { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' }, i * 0.26);
        if (rows[i]) tlA.to(rows[i], { opacity: 1, x: 0, duration: 0.3, ease: 'expo.out' }, i * 0.26);
      });
      // 2) os blocos "Hero … CTAs" caem quando a lista entra na tela; o fecho aparece no fim
      const tlB = gsap.timeline({ scrollTrigger: { trigger: blocksEl, start: 'top 92%', end: mobile ? 'top 55%' : 'top 45%', scrub: 0.6 }, defaults: { ease: 'none' } });
      blocks.forEach((b, i) => tlB.to(b, { y: 0, opacity: 1, rotate: 0, duration: 0.4, ease: 'back.out(1.8)' }, i * 0.25));
      tlB.fromTo('.pages__close', { opacity: 0 }, { opacity: 1, duration: 0.3 }, blocks.length * 0.25);
    }, el);
    return () => ctx.revert();
  }, [reduced, mobile]);

  return (
    <section ref={root} className="section" id="paginas" aria-labelledby="pages-title">
      <div className="container split">
        <div>
          <SectionHead eyebrow={pages.eyebrow} title={<span id="pages-title">{pages.title1}<br />{pages.title2}</span>} lead={pages.body1} />
          <p className="body-lg" data-reveal style={{ marginTop: '1rem' }}>{pages.body2}</p>
          <div className="pages__blocks" aria-label={pages.blocks.join(' ')}>
            {pages.blocks.map((b) => <span key={b} className="pages__block"><i aria-hidden="true" />{b}</span>)}
          </div>
          <p className="pages__close" style={reduced ? undefined : { opacity: 0 }}>{pages.close}</p>
          <div style={{ marginTop: '1.5rem' }} data-reveal><CtaLink>{pages.cta}</CtaLink></div>
        </div>
        <div ref={stage} className="pages__stage" aria-label="Uma página de conversão se montando por seções: Hero, Oferta, Benefícios, Prova, FAQ e CTA final">
          <PageArt />
        </div>
      </div>
    </section>
  );
}
