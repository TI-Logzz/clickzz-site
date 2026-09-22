import { useLayoutEffect, useRef } from 'react';
import { Eye, MousePointer2, Users, TrendingUp } from 'lucide-react';
import { analytics } from '../content/copy';
import { SectionHead } from '../components/ui';
import { Device } from '../screens/Device';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { gsap, useReveal, useSectionProgress } from '../lib/scroll';
import { useUI } from '../lib/store';

const icons = [Eye, MousePointer2, Users, TrendingUp];

/** S09 — Dados: gráficos se desenham ao entrar no viewport. */
export function AnalyticsSection() {
  const root = useRef<HTMLElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  useSectionProgress('analytics', root);
  useReveal(root);

  useLayoutEffect(() => {
    const el = screen.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      // gráficos se desenham enquanto a moldura sobe de 88% até 15% da tela: termina com o painel inteiro visível
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 15%', scrub: 0.6 } });
      tl.fromTo('[data-an-line]', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: 'none' }, 0)
        .fromTo('[data-an-area]', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.6)
        .fromTo('[data-an-dot]', { scale: 0, transformOrigin: 'center' }, { scale: 1, duration: 0.3, stagger: 0.05 }, 0.2)
        .fromTo('[data-an-bar]', { scaleX: 0 }, { scaleX: 1, duration: 0.8, stagger: 0.08 }, 0.2)
        .fromTo('[data-kpi]', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 }, 0)
        .fromTo('[data-an-row]', { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1 }, 0.8);
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="section" id="dados" aria-labelledby="analytics-title">
      <div className="container--wide split split--media-left analytics__split">
        <div>
          <SectionHead eyebrow={analytics.eyebrow} title={<span id="analytics-title">{analytics.title}</span>} lead={analytics.body1}>
            <p className="body-lg" data-reveal style={{ marginTop: '1rem' }}>{analytics.body2}</p>
          </SectionHead>
        </div>
        <div className="analytics__stage">
          <div ref={screen} data-reveal>
            <Device url="app.quizmaker.com.br/dashboard/funnels/…/analytics">
              <AnalyticsScreen />
            </Device>
          </div>
          <p className="demo-note" aria-hidden="true">Tela de demonstração com dados ilustrativos.</p>
        </div>
      </div>
      <div className="container">
        <ul className="rule-list analytics__cards">
          {analytics.cards.map((c, i) => {
            const Icon = icons[i];
            return (
              <li key={c.title} data-reveal>
                <span className="icon-tile"><Icon size={20} /></span>
                <div><h3 className="h5">{c.title}</h3><p className="body">{c.body}</p></div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
