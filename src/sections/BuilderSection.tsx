import { useLayoutEffect, useRef } from 'react';
import { Blocks, LayoutPanelTop, Palette } from 'lucide-react';
import { builder } from '../content/copy';
import { CtaLink, Eyebrow } from '../components/ui';
import { Device } from '../screens/Device';
import { PageBuilderScreen } from '../screens/PageBuilderScreen';
import { cursorTo } from '../screens/GhostCursor';
import { gsap, useReveal, useSectionProgress, usePinned, stageWindow } from '../lib/scroll';
import { useUI } from '../lib/store';

const icons = [Blocks, LayoutPanelTop, Palette];

/**
 * S05 — Builder visual. Pinado (~320 vh). "Crie. Personalize. Publique." acende palavra a palavra;
 * cada palavra aciona um estado do builder de página ao lado:
 * Crie → elemento arrastado para uma seção; Personalize → painel Estilo troca fonte e cores;
 * Publique → diálogo Publicar e toast "Página publicada! 🎉".
 */
export function BuilderSection() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  const pinned = usePinned();
  useSectionProgress('builder', root, { start: 'top top', end: 'bottom bottom' });
  useReveal(root);

  useLayoutEffect(() => {
    const el = root.current;
    const st = stage.current;
    if (!el || !st) return;
    const words = el.querySelectorAll<HTMLElement>('.builder__title .word');
    const s = (n: string) => st.querySelector<HTMLElement>(`[data-screen="${n}"]`)!;
    const ctx = gsap.context(() => {
      if (reduced) { words.forEach((w) => w.classList.add('word--on')); s('build').style.opacity = '1'; return; }
      const screens = st.querySelectorAll<HTMLElement>('[data-screen]');
      gsap.set(screens, { opacity: 0 });
      gsap.set(s('build'), { opacity: 1 });
      const tl = gsap.timeline({
        scrollTrigger: pinned
          ? { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.25 }
          : stageWindow(st, 0.25),
        defaults: { ease: 'none' },
      });
      const lit = (i: number, at: number) => tl.add(() => words.forEach((w, k) => w.classList.toggle('word--on', k <= i)), at);
      tl.add(() => words.forEach((w) => w.classList.remove('word--on')), 0);

      // Crie: arrasta "Depoimentos" da paleta para a seção Prova social
      const b = s('build');
      lit(0, 0.1);
      const dragEl = b.querySelector<HTMLElement>('[data-el="Depoimentos"]');
      const target = b.querySelector<HTMLElement>('[data-bsec="3"]');
      cursorTo(tl, b, dragEl, 0.2, { duration: 0.6 });
      tl.to(b.querySelector('[data-ghost-click]'), { opacity: 0.9, scale: 1, duration: 0.15 }, 0.8);
      // clone visual do elemento acompanhando o cursor
      const ghost = b.querySelector<HTMLElement>('[data-ghost]');
      if (dragEl && target && ghost) {
        const clone = dragEl.cloneNode(true) as HTMLElement;
        clone.style.cssText = 'position:absolute;left:0;top:0;width:200px;z-index:30;opacity:0;pointer-events:none;box-shadow:0 12px 24px -8px rgba(0,0,0,.25);background:#fff;';
        b.appendChild(clone);
        const from = { x: dragEl.offsetLeft + 12, y: dragEl.offsetTop };
        const r = b.getBoundingClientRect();
        const tr = target.getBoundingClientRect();
        const scale = r.width / b.offsetWidth || 1;
        const to = { x: (tr.left - r.left) / scale + 40, y: (tr.top - r.top) / scale + 20 };
        tl.set(clone, { x: from.x, y: from.y, opacity: 1 }, 0.85);
        tl.to(clone, { x: to.x, y: to.y, duration: 0.9, ease: 'power2.inOut' }, 0.9);
        tl.to(ghost, { x: to.x + 60, y: to.y + 20, duration: 0.9, ease: 'power2.inOut' }, 0.9);
        tl.to(target, { backgroundColor: '#f3eefc', duration: 0.2 }, 1.6);
        tl.to(clone, { opacity: 0, scale: 0.9, duration: 0.2 }, 1.85);
        tl.to(target, { backgroundColor: '#fafafa', duration: 0.3 }, 1.9);
        tl.fromTo(target.querySelectorAll(':scope > div'), { y: 10, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.06 }, 1.95);
      }

      // Personalize: aba Estilo, painel troca fonte/cores, canvas muda
      lit(1, 2.6);
      cursorTo(tl, b, '[data-tab="estilo"]', 2.6, { click: true, duration: 0.6 });
      tl.to(b, { opacity: 0, duration: 0.25 }, 3.3).to(s('style'), { opacity: 1, duration: 0.25 }, 3.3);
      const sty = s('style');
      cursorTo(tl, sty, '[data-style-font]', 3.7, { click: true, duration: 0.6 });
      tl.to(sty, { opacity: 0, duration: 0.25 }, 4.4).to(s('styled'), { opacity: 1, duration: 0.25 }, 4.4);
      const styled = s('styled');
      cursorTo(tl, styled, '[data-swatch="primary"]', 4.6, { click: true, duration: 0.6 });
      tl.fromTo(styled.querySelector('[data-pgdoc]'), { filter: 'brightness(1.15)' }, { filter: 'brightness(1)', duration: 0.6 }, 5.2);

      // Publique
      lit(2, 6.0);
      cursorTo(tl, styled, '[data-publish]', 6.0, { click: true, duration: 0.7 });
      tl.to(styled, { opacity: 0, duration: 0.2 }, 6.8).to(s('publish'), { opacity: 1, duration: 0.2 }, 6.8);
      const pub = s('publish');
      cursorTo(tl, pub, '[data-pub-confirm]', 7.2, { click: true, duration: 0.7 });
      tl.to(pub, { opacity: 0, duration: 0.2 }, 8.0).to(s('done'), { opacity: 1, duration: 0.2 }, 8.0);
      const done = s('done');
      tl.fromTo(done.querySelector('[data-toast]'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3 }, 8.1);
      if (pinned) tl.to({}, { duration: 1 });
    }, el);
    return () => ctx.revert();
  }, [reduced, pinned]);

  return (
    <section ref={root} className="section" id="builder" aria-labelledby="builder-title" style={{ height: pinned ? '290vh' : 'auto', paddingBlock: 0 }}>
      <div className="stage__sticky" style={pinned ? { paddingTop: 72 } : { position: 'relative', height: 'auto', padding: '4rem 0 1rem' }}>
        <div className="container--wide split">
          <div>
            <Eyebrow>{builder.eyebrow}</Eyebrow>
            <h2 id="builder-title" className="display h2 builder__title" style={{ marginTop: '1.25rem' }} aria-label={builder.title}>
              {builder.titleWords.map((w) => <span key={w} className="word word--dim" aria-hidden="true">{w}</span>)}
            </h2>
            <h3 className="h4" style={{ marginTop: '1.5rem' }}>{builder.subtitle}</h3>
            <p className="body-lg" style={{ marginTop: '1rem' }}>{builder.body}</p>
          </div>
          <div ref={stage} aria-label="Demonstração do builder visual: criar, personalizar e publicar uma página">
            <Device url="app.quizmaker.com.br/dashboard/projects/…/builder">
              <div style={{ position: 'relative', width: 1440, height: 900 }}>
                <div data-screen="build" style={{ position: 'absolute', inset: 0 }}><PageBuilderScreen activeSection={3} /></div>
                <div data-screen="style" style={{ position: 'absolute', inset: 0 }}><PageBuilderScreen panel="style" activeSection={-1} /></div>
                <div data-screen="styled" style={{ position: 'absolute', inset: 0 }}><PageBuilderScreen panel="colors" theme="brand" activeSection={-1} /></div>
                <div data-screen="publish" style={{ position: 'absolute', inset: 0 }}><PageBuilderScreen theme="brand" activeSection={-1} publishing /></div>
                <div data-screen="done" style={{ position: 'absolute', inset: 0 }}><PageBuilderScreen theme="brand" activeSection={-1} toast="Página publicada! 🎉" /></div>
              </div>
            </Device>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Cards de recurso + CTA. Ficam em um bloco próprio, depois da seção pinada, para nunca
 * passarem por cima do título e do builder enquanto o palco está preso (revisão 21/09, C13).
 */
export function BuilderCards() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  return (
    <div ref={ref} className="container builder__cards">
      <div className="feature-grid">
        {builder.cards.map((c, i) => {
          const Icon = icons[i];
          return (
            <article key={c.title} className="card card--pad card--hover feature" data-reveal>
              <span className="icon-tile"><Icon size={20} /></span>
              <h3 className="h5">{c.title}</h3>
              <p className="body">{c.body}</p>
            </article>
          );
        })}
      </div>
      <div className="center" style={{ marginTop: '2.5rem' }} data-reveal><CtaLink size="lg">{builder.cta}</CtaLink></div>
    </div>
  );
}
