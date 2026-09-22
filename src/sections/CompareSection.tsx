import { useLayoutEffect, useRef } from 'react';
import { Hourglass, Sparkles, Waypoints, LayoutTemplate, Globe } from 'lucide-react';
import { compare } from '../content/copy';
import { CheckItem, CrossItem, CtaLink, SectionHead } from '../components/ui';
import { Logo } from '../components/Logo';
import { gsap, useReveal, useSectionProgress } from '../lib/scroll';
import { useUI } from '../lib/store';

/** S10 — O jeito antigo x O jeito Clickzz (revisão 21/09: logo no cabeçalho do card e mídia de apoio abaixo das listas). */
export function CompareSection() {
  const root = useRef<HTMLElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  useSectionProgress('compare', root);
  useReveal(root);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.compare__col--old li', { scrollTrigger: { trigger: '.compare__col--old', start: 'top 80%' }, x: -8, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' });
      gsap.from('.compare__col--new li', { scrollTrigger: { trigger: '.compare__col--new', start: 'top 80%' }, x: 12, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'expo.out' });
      gsap.from('.compare__col--new .mark', { scrollTrigger: { trigger: '.compare__col--new', start: 'top 80%' }, scale: 0.2, duration: 0.6, stagger: 0.07, ease: 'back.out(3)' });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="section" id="beneficios" aria-labelledby="compare-title">
      <div className="container">
        <SectionHead eyebrow={compare.eyebrow} title={<span id="compare-title">{compare.title}</span>} align="center" />
        <div className="compare__grid">
          <div className="compare__col compare__col--old" data-reveal>
            <h3 className="h4 compare__title"><span className="compare__logo compare__logo--old" aria-hidden="true"><Hourglass size={18} /></span>{compare.oldTitle}</h3>
            <ul className="cross-list">
              {compare.oldItems.map((i) => <CrossItem key={i}>{i}</CrossItem>)}
            </ul>
            <OldArt />
          </div>
          <div className="compare__col compare__col--new" data-reveal>
            <h3 className="h4 compare__title"><span className="compare__logo" aria-hidden="true"><Logo height={22} /></span>{compare.newTitle} <span className="star">{compare.newTitleStar}</span></h3>
            <ul className="check-list">
              {compare.newItems.map((i) => <CheckItem key={i}>{i}</CheckItem>)}
            </ul>
            <NewArt />
          </div>
        </div>
        <div className="compare__cta" data-reveal><CtaLink size="lg">{compare.cta}</CtaLink></div>
      </div>
    </section>
  );
}

/** Ilustração neutra: várias janelas de ferramentas diferentes e uma tela em branco esperando. */
function OldArt() {
  return (
    <div className="cmp-art cmp-art--old" aria-hidden="true">
      <div className="cmp-win cmp-win--back" style={{ left: '4%', top: '18%', width: '52%' }}><i /><i /><i /></div>
      <div className="cmp-win cmp-win--back" style={{ right: '4%', top: '8%', width: '48%' }}><i /><i /><i /></div>
      <div className="cmp-win cmp-win--front" style={{ left: '18%', top: '34%', width: '64%' }}>
        <div className="cmp-win__bar"><i /><i /><i /></div>
        <div className="cmp-win__blank"><span className="cmp-spin" /><small>Carregando…</small></div>
      </div>
    </div>
  );
}

/** Galeria de projetos: quiz e página gerados com IA, publicados, com identidade própria. */
function NewArt() {
  const cards = [
    { kind: 'quiz', title: 'Diagnóstico de pele', a: '#7524cd', b: '#d4b3ff', icon: Waypoints },
    { kind: 'page', title: 'Confeitaria Lucrativa', a: '#f472b6', b: '#fde68a', icon: LayoutTemplate },
    { kind: 'page', title: 'Mentoria de vendas', a: '#0ea5e9', b: '#a5f3fc', icon: LayoutTemplate },
    { kind: 'quiz', title: 'Qualificação de leads', a: '#16a34a', b: '#bbf7d0', icon: Waypoints },
  ];
  return (
    <div className="cmp-art cmp-art--new" aria-hidden="true">
      <div className="cmp-gal">
        {cards.map((c) => (
          <div key={c.title} className="cmp-proj">
            <div className="cmp-proj__thumb" style={{ background: `linear-gradient(135deg, ${c.a}, ${c.b})` }}>
              {c.kind === 'quiz' ? (
                <div className="cmp-proj__quiz"><i /><i className="on" /><i /><b /></div>
              ) : (
                <div className="cmp-proj__page"><i /><span /><span /><b /></div>
              )}
            </div>
            <div className="cmp-proj__meta"><c.icon size={12} /><span>{c.title}</span><em><Globe size={10} /> Publicado</em></div>
          </div>
        ))}
      </div>
      <span className="cmp-ai"><Sparkles size={12} /> Gerado com IA</span>
    </div>
  );
}
