import { useLayoutEffect, useRef } from 'react';
import { Variable, Split, Shuffle } from 'lucide-react';
import { quizzes } from '../content/copy';
import { SectionHead } from '../components/ui';
import { Device } from '../screens/Device';
import { FlowCanvasScreen } from '../screens/FlowCanvasScreen';
import { gsap, useReveal, useSectionProgress } from '../lib/scroll';
import { useUI } from '../lib/store';

const icons = [Variable, Split, Shuffle];

/** S06 — "Mesa de lógica": a aba Conexões em perspectiva; nós surgem, fios se desenham, o Randomizador divide o tráfego. */
export function QuizSection() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
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
      // a mesa inclina levemente conforme o scroll
      gsap.fromTo(st.querySelector('.device'), { rotateX: 14 }, { rotateX: 4, ease: 'none', scrollTrigger: { trigger: st, start: 'top 90%', end: 'top 18%', scrub: true } });
    }, st);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="section" id="quiz" aria-labelledby="quiz-title">
      <div className="container">
        <SectionHead eyebrow={quizzes.eyebrow} title={<span id="quiz-title">{quizzes.title}</span>} lead={quizzes.body} align="center" />
      </div>
      <div ref={stage} className="container quiz__stage" aria-label="Aba Conexões do builder de quiz: etapas conectadas por caminhos, com condição e randomizador">
        <Device url="app.quizmaker.com.br/dashboard/funnels/…/builder">
          <FlowCanvasScreen />
        </Device>
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
