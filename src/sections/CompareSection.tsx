import { useLayoutEffect, useRef } from 'react';
import { compare } from '../content/copy';
import { CheckItem, CrossItem, CtaLink, SectionHead } from '../components/ui';
import { gsap, useReveal, useSectionProgress } from '../lib/scroll';
import { useUI } from '../lib/store';

/** S10 — O jeito antigo x O jeito Clickzz. */
export function CompareSection() {
  const root = useRef<HTMLElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  useSectionProgress('compare', root);
  useReveal(root);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      const oldCol = el.querySelector('.compare__col--old');
      const newCol = el.querySelector('.compare__col--new');
      gsap.timeline({ scrollTrigger: { trigger: '.compare__grid', start: 'top 80%', end: 'bottom 40%', scrub: 0.8 } })
        .fromTo(oldCol, { z: 0, filter: 'blur(0px)', opacity: 1 }, { z: -120, filter: 'blur(2px)', opacity: 0.75, ease: 'none' }, 0)
        .fromTo(newCol, { z: -60, y: 30 }, { z: 40, y: -10, ease: 'none' }, 0);
      // itens ✕ tremem levemente ao entrar; itens ✓ desenham o check
      gsap.from('.compare__col--old li', {
        scrollTrigger: { trigger: '.compare__col--old', start: 'top 80%' },
        x: -8, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
      });
      gsap.from('.compare__col--new li', {
        scrollTrigger: { trigger: '.compare__col--new', start: 'top 80%' },
        x: 12, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'expo.out',
      });
      gsap.from('.compare__col--new .mark', {
        scrollTrigger: { trigger: '.compare__col--new', start: 'top 80%' },
        scale: 0.2, duration: 0.6, stagger: 0.07, ease: 'back.out(3)',
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="section" id="beneficios" aria-labelledby="compare-title">
      <div className="container">
        <SectionHead eyebrow={compare.eyebrow} title={<span id="compare-title">{compare.title}</span>} align="center" />
        <div className="compare__grid">
          <div className="compare__col compare__col--old" data-reveal>
            <h3 className="h4">{compare.oldTitle}</h3>
            <ul className="cross-list">
              {compare.oldItems.map((i) => <CrossItem key={i}>{i}</CrossItem>)}
            </ul>
          </div>
          <div className="compare__col compare__col--new" data-reveal>
            <h3 className="h4">{compare.newTitle} <span className="star">{compare.newTitleStar}</span></h3>
            <ul className="check-list">
              {compare.newItems.map((i) => <CheckItem key={i}>{i}</CheckItem>)}
            </ul>
          </div>
        </div>
        <div className="compare__cta" data-reveal><CtaLink size="lg">{compare.cta}</CtaLink></div>
      </div>
    </section>
  );
}
