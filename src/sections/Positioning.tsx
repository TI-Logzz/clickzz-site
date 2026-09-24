import { useLayoutEffect, useRef } from 'react';
import { Sparkles, LayoutTemplate, Waypoints, Palette, Globe, BarChart3, Webhook, Users, FlaskConical } from 'lucide-react';
import { positioning } from '../content/copy';
import { CtaLink, SectionHead } from '../components/ui';
import { Logo } from '../components/Logo';
import { gsap, useReveal, useSectionProgress } from '../lib/scroll';
import { useUI } from '../lib/store';
import { Traces } from '../components/Traces';

const chips = [
  { label: 'IA', icon: Sparkles },
  { label: 'Página', icon: LayoutTemplate },
  { label: 'Quiz', icon: Waypoints },
  { label: 'Identidade visual', icon: Palette },
  { label: 'Domínio', icon: Globe },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Webhooks', icon: Webhook },
  { label: 'Leads', icon: Users },
  { label: 'Teste A/B', icon: FlaskConical },
];

/** S02 — Posicionamento: chips orbitando um núcleo, que se organizam em grade no scroll. */
export function Positioning() {
  const root = useRef<HTMLElement>(null);
  const cluster = useRef<HTMLDivElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  useSectionProgress('positioning', root);
  useReveal(root);

  useLayoutEffect(() => {
    const el = cluster.current;
    if (!el || reduced) return;
    const items = el.querySelectorAll<HTMLElement>('.orbit__chip');
    const ctx = gsap.context(() => {
      // órbita contínua
      const R = 150;
      items.forEach((it, i) => {
        const a0 = (i / items.length) * Math.PI * 2;
        const ry = 0.55;
        gsap.set(it, { x: Math.cos(a0) * R, y: Math.sin(a0) * R * ry, zIndex: Math.sin(a0) > 0 ? 3 : 1 });
        const obj = { a: a0 };
        gsap.to(obj, {
          a: a0 + Math.PI * 2, duration: 34, repeat: -1, ease: 'none',
          onUpdate: () => {
            const s = 0.85 + (Math.sin(obj.a) + 1) * 0.1;
            gsap.set(it, { x: Math.cos(obj.a) * R, y: Math.sin(obj.a) * R * ry, scale: s, zIndex: Math.sin(obj.a) > 0 ? 3 : 1 });
          },
        });
      });
      // no scroll, o cluster inteiro inclina e o núcleo respira
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        rotate: 6, ease: 'none',
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="section" id="plataforma" aria-labelledby="positioning-title">
      <Traces corners={['bl']} />
      <div className="container split split--media-left">
        <div>
          <SectionHead eyebrow={positioning.eyebrow} title={<span id="positioning-title">{positioning.title}</span>} lead={positioning.body1} />
          <p className="body-lg positioning__body" data-reveal>{positioning.body2}</p>
          <div style={{ marginTop: '2rem' }} data-reveal><CtaLink>{positioning.cta}</CtaLink></div>
        </div>
        <div ref={cluster} className="positioning__cluster" aria-hidden="true">
          <div className="orbit">
            <div className="orbit__core"><Logo height={26} /></div>
            {chips.map((c) => (
              <span key={c.label} className="orbit__chip"><c.icon /> {c.label}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
