import { useLayoutEffect, useRef } from 'react';
import { Variable, Split, Shuffle } from 'lucide-react';
import { quizzes } from '../content/copy';
import { SectionHead } from '../components/ui';
import { FlowArt } from '../components/FlowArt';
import { gsap, useReveal, useSectionProgress, useIsMobile } from '../lib/scroll';
import { useUI } from '../lib/store';
import { Traces } from '../components/Traces';

const icons = [Variable, Split, Shuffle];

/** S06 — "Mesa de lógica" ilustrada: as etapas surgem, os fios se desenham e o Randomizador divide o tráfego. */
export function QuizSection() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  const mobile = useIsMobile();
  useSectionProgress('quiz', root);
  useReveal(root);

  useLayoutEffect(() => {
    const st = stage.current;
    if (!st || reduced) return;
    const ctx = gsap.context(() => {
      const nodes = st.querySelectorAll<HTMLElement>('[data-node]');
      const edges = st.querySelectorAll<SVGPathElement>('[data-edge]');
      const pulses = st.querySelectorAll<SVGPathElement>('[data-pulse]');
      const pct = st.querySelectorAll<HTMLElement>('[data-rand-pct]');
      gsap.set(nodes, { opacity: 0, y: 30, scale: 0.9, transformOrigin: '50% 50%' });
      gsap.set(edges, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(pulses, { opacity: 0 });
      // termina quando o topo da moldura chega a 18% da tela: toda a mesa de lógica ainda está visível
      const tl = gsap.timeline({ scrollTrigger: { trigger: st, start: 'top 85%', end: 'top 18%', scrub: 0.6 }, defaults: { ease: 'none' } });
      nodes.forEach((n, i) => tl.to(n, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.8)' }, i * 0.3));
      edges.forEach((e, i) => tl.to(e, { strokeDashoffset: 0, duration: 0.45 }, 0.5 + i * 0.13));
      tl.to(pulses, { opacity: 1, duration: 0.3 }, 2.6);
      const split = { a: 50 };
      tl.to(split, { a: 62, duration: 0.6, onUpdate: () => { if (pct[0]) pct[0].textContent = `${Math.round(split.a)}%`; if (pct[1]) pct[1].textContent = `${100 - Math.round(split.a)}%`; } }, 2.4);
      // pulsos correndo (loop independente do scroll)
      pulses.forEach((p, i) => gsap.fromTo(p, { strokeDashoffset: 1.05 }, { strokeDashoffset: -0.06, duration: 2.4 + (i % 5) * 0.3, repeat: -1, ease: 'none', delay: (i % 7) * 0.3 }));
    }, st);
    return () => ctx.revert();
  }, [reduced, mobile]);

  return (
    <section ref={root} className="section" id="quiz" aria-labelledby="quiz-title">
      <Traces corners={['tl']} />
      <div className="container">
        <SectionHead eyebrow={quizzes.eyebrow} title={<span id="quiz-title">{quizzes.title}</span>} lead={quizzes.body} align="center" />
      </div>
      <div ref={stage} className="container quiz__stage" aria-label="Fluxo de um quiz: etapas conectadas por caminhos, com condição e randomizador">
        <FlowArt variant={mobile ? 'logic' : 'full'} />
      </div>
      <div className="container">
        <div className="feature-grid quiz__cards">
          {quizzes.cards.map((c, i) => {
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
      </div>
    </section>
  );
}
