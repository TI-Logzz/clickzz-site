import { useLayoutEffect, useRef, type PointerEvent as RPointerEvent } from 'react';
import { Waypoints, LayoutTemplate } from 'lucide-react';
import { formats } from '../content/copy';
import { CtaLink, SectionHead } from '../components/ui';
import { PageArt } from '../components/PageArt';
import { FlowArt } from '../components/FlowArt';
import { gsap, playWhileVisible, useReveal, useSectionProgress } from '../lib/scroll';
import { useUI } from '../lib/store';
import { Traces } from '../components/Traces';

/** S03 — Quiz e Página lado a lado, cada um com uma composição ilustrada em loop (não são capturas do editor). */
export function Formats() {
  const root = useRef<HTMLElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  useSectionProgress('formats', root);
  useReveal(root);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      // Quiz: pulsos correndo pelos fios em loop
      const pulses = Array.from(el.querySelectorAll<SVGPathElement>('[data-pulse]')).map((p, i) =>
        gsap.fromTo(p, { strokeDashoffset: 1.05 }, { strokeDashoffset: -0.06, duration: 2.2 + (i % 5) * 0.3, repeat: -1, ease: 'none', delay: (i % 7) * 0.3 }));
      // Página: seções se empilham em loop
      const secs = el.querySelectorAll<HTMLElement>('.format-card--page [data-pg-sec]');
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
      tl.set(secs, { opacity: 0, y: 24 });
      secs.forEach((s, i) => tl.to(s, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }, i * 0.35));
      tl.to({}, { duration: 1.2 });
      tl.to(secs, { opacity: 0, y: -16, duration: 0.4, stagger: 0.05 });
      playWhileVisible(el, [...pulses, tl]);
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  const tilt = (e: RPointerEvent<HTMLDivElement>) => {
    if (useUI.getState().isTouch || reduced) return;
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty('--mx', `${x * 100}%`);
    card.style.setProperty('--my', `${y * 100}%`);
    gsap.to(card, { rotateY: (x - 0.5) * 8, rotateX: (0.5 - y) * 6, duration: 0.6, ease: 'power2.out' });
  };
  const untilt = (e: RPointerEvent<HTMLDivElement>) => gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' });

  return (
    <section ref={root} className="section" id="formatos" aria-labelledby="formats-title">
      <Traces corners={['tr']} />
      <div className="container">
        <SectionHead
          eyebrow={formats.eyebrow}
          title={<span id="formats-title">{formats.title1}<br />{formats.title2}</span>}
          lead={formats.body}
          align="center"
        />
        <div className="formats__grid" style={{ perspective: 1600 }}>
          <article className="format-card format-card--quiz" id="quiz-card" onPointerMove={tilt} onPointerLeave={untilt} data-reveal aria-labelledby="fmt-quiz">
            <span className="format-card__glow" aria-hidden="true" />
            <div className="format-card__screen format-card__screen--art">
              <FlowArt variant="teaser" />
            </div>
            <div className="format-card__body">
              <div className="format-card__title"><span className="icon-tile"><Waypoints size={20} /></span><h3 id="fmt-quiz" className="h4">{formats.quiz.title}</h3></div>
              <p className="body" style={{ marginTop: '0.9rem' }}>{formats.quiz.body}</p>
              <p className="format-card__ideal"><b>Ideal para:</b> {formats.quiz.ideal.replace('Ideal para: ', '')}</p>
            </div>
          </article>
          <article className="format-card format-card--page" id="paginas-card" onPointerMove={tilt} onPointerLeave={untilt} data-reveal aria-labelledby="fmt-page">
            <span className="format-card__glow" aria-hidden="true" />
            <div className="format-card__screen format-card__screen--art">
              <PageArt compact />
            </div>
            <div className="format-card__body">
              <div className="format-card__title"><span className="icon-tile"><LayoutTemplate size={20} /></span><h3 id="fmt-page" className="h4">{formats.page.title}</h3></div>
              <p className="body" style={{ marginTop: '0.9rem' }}>{formats.page.body}</p>
              <p className="format-card__ideal"><b>Ideal para:</b> {formats.page.ideal.replace('Ideal para: ', '')}</p>
            </div>
          </article>
        </div>
        <div className="center" style={{ marginTop: '2.5rem' }} data-reveal><CtaLink size="lg">{formats.cta}</CtaLink></div>
      </div>
    </section>
  );
}
