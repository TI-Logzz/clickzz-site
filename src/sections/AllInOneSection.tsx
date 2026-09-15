import { useLayoutEffect, useRef } from 'react';
import { allInOne } from '../content/copy';
import { CtaLink, SectionHead } from '../components/ui';
import { LogoMark } from '../components/Logo';
import { gsap, useReveal, useSectionProgress } from '../lib/scroll';
import { useUI } from '../lib/store';

/** S13 — Seis linhas sobem como degraus; a cada linha um bloco se encaixa na composição. */
export function AllInOneSection() {
  const root = useRef<HTMLElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  useSectionProgress('allinone', root);
  useReveal(root);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    const lines = el.querySelectorAll<HTMLElement>('.allinone__line');
    const bricks = el.querySelectorAll<HTMLElement>('.allinone__brick:not(.allinone__brick--core)');
    const core = el.querySelector<HTMLElement>('.allinone__brick--core');
    const close = el.querySelector<HTMLElement>('.allinone__close');
    const ctx = gsap.context(() => {
      // cada tijolo cai de cima e pousa logo abaixo do anterior: a pilha cresce para baixo,
      // então o último tijolo e o núcleo Clickzz ficam sempre dentro da área visível
      gsap.set(bricks, { y: -140, opacity: 0, rotateX: -40, rotateZ: (i) => (i % 2 ? 8 : -8) });
      gsap.set(core, { y: -60, scale: 0.6, opacity: 0 });
      gsap.set(close, { opacity: 0, y: 16 });
      // gatilho na própria pilha: os tijolos caem enquanto ela sobe de 92% até 25% da altura da tela
      const stack = el.querySelector<HTMLElement>('.allinone__stack')!;
      const tl = gsap.timeline({ scrollTrigger: { trigger: stack, start: 'top 92%', end: 'top 25%', scrub: 0.6 } });
      lines.forEach((ln, i) => {
        tl.add(() => ln.classList.toggle('allinone__line--on', true), i * 0.5);
        tl.to(bricks[i], { y: i * 54, opacity: 1, rotateX: 0, rotateZ: 0, duration: 0.5, ease: 'back.out(1.6)' }, i * 0.5);
      });
      tl.to(core, { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, lines.length * 0.5)
        .to(close, { opacity: 1, y: 0, duration: 0.4 }, '<0.1');
      // reverse handling for line classes
      tl.eventCallback('onUpdate', () => {
        const p = tl.progress();
        lines.forEach((ln, i) => ln.classList.toggle('allinone__line--on', p >= (i * 0.5) / tl.duration()));
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="section" aria-labelledby="allinone-title">
      <div className="container split split--even">
        <div>
          <SectionHead eyebrow={allInOne.eyebrow} title={<span id="allinone-title">{allInOne.title}</span>} size="h3" />
          <ul className="allinone__lines">
            {allInOne.lines.map((l) => (
              <li key={l} className={`allinone__line ${reduced ? 'allinone__line--on' : ''}`}><i aria-hidden="true" />{l}</li>
            ))}
          </ul>
          <div className="allinone__close" style={reduced ? { opacity: 1 } : undefined}>
            <h3 className="display h3">{allInOne.close}</h3>
            <div style={{ marginTop: '1.5rem' }}><CtaLink size="lg">{allInOne.cta}</CtaLink></div>
          </div>
        </div>
        <div className="allinone__stack" aria-hidden="true">
          {allInOne.lines.map((l, i) => (
            <div key={l} className="allinone__brick" style={{ top: 0, zIndex: 10 + i }}><i />{l.replace(/\.$/, '')}</div>
          ))}
          <div className="allinone__brick allinone__brick--core" style={{ top: allInOne.lines.length * 54 + 12, zIndex: 20 }}><LogoMark size={22} /> Clickzz</div>
        </div>
      </div>
    </section>
  );
}
