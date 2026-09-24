import { useLayoutEffect, useRef } from 'react';
import { Globe, Target, FlaskConical, Link } from 'lucide-react';
import { publish } from '../content/copy';
import { CtaLink, SectionHead } from '../components/ui';
import { Device } from '../screens/Device';
import { PagePreviewScreen } from '../screens/PagePreviewScreen';
import { gsap, useReveal, useSectionProgress } from '../lib/scroll';
import { useUI } from '../lib/store';
import { Traces } from '../components/Traces';

const icons = [Globe, Target, FlaskConical, Link];
const DOMAIN = 'lumenskin.com.br';

/** S08 — Publicação: a página "pousa" num navegador enquanto o domínio próprio é digitado; A/B divide o tráfego. */
export function PublishSection() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  useSectionProgress('publish', root);
  useReveal(root);

  useLayoutEffect(() => {
    const st = stage.current;
    if (!st || reduced) return;
    const ctx = gsap.context(() => {
      const url = st.querySelector<HTMLElement>('[data-url]');
      const a = st.querySelector<HTMLElement>('[data-variant="a"]');
      const b = st.querySelector<HTMLElement>('[data-variant="b"]');
      const dots = st.querySelectorAll<HTMLElement>('[data-dot]');
      const typing = { n: 0 };
      const tl = gsap.timeline({ scrollTrigger: { trigger: st, start: 'top 75%', end: 'bottom 50%', scrub: 0.6 }, defaults: { ease: 'none' } });
      tl.fromTo(st.querySelector('.device'), { y: 80, rotateX: 12, scale: 0.94 }, { y: 0, rotateX: 0, scale: 1, duration: 1, ease: 'power2.out' }, 0);
      tl.to(typing, { n: DOMAIN.length, duration: 0.8, onUpdate: () => { if (url) url.textContent = DOMAIN.slice(0, Math.round(typing.n)); } }, 0.6);
      tl.fromTo([a, b], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, 1.4);
      dots.forEach((d, i) => tl.fromTo(d, { x: 0, y: 0, opacity: 0 }, { x: i % 2 ? 120 : -120, y: 40, opacity: 1, duration: 0.5, ease: 'power1.out' }, 1.6 + (i % 5) * 0.08));
    }, st);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="section section--dark" id="publicar" aria-labelledby="publish-title">
      <Traces corners={['tr', 'bl']} />
      <div className="container">
        <SectionHead eyebrow={publish.eyebrow} title={<span id="publish-title">{publish.title}</span>} lead={publish.body} align="center" />
        <div ref={stage} className="publish__stage" style={{ marginTop: '3rem', perspective: 1600 }} aria-label="Página publicada no domínio próprio, com teste A/B dividindo o tráfego">
          <div className="publish__browser" style={{ maxWidth: 980, marginInline: 'auto' }}>
            <Device url=" "><PagePreviewScreen compact /></Device>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.25rem', position: 'relative' }} aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} data-dot style={{ position: 'absolute', top: -12, left: '50%', width: 8, height: 8, borderRadius: 999, background: 'var(--violet-500)', boxShadow: '0 0 10px var(--violet-400)' }} />
            ))}
            <div data-variant="a" className="card card--pad" style={{ width: 200, textAlign: 'center' }}><b style={{ fontFamily: 'var(--font-app)' }}>Variante A</b><div className="small">50% dos acessos</div></div>
            <div data-variant="b" className="card card--pad" style={{ width: 200, textAlign: 'center', borderColor: 'var(--violet-200)' }}><b style={{ fontFamily: 'var(--font-app)' }}>Variante B</b><div className="small">50% dos acessos</div></div>
          </div>
        </div>
        <ul className="rule-list publish__cards">
          {publish.cards.map((c, i) => {
            const Icon = icons[i];
            return (
              <li key={c.title} data-reveal>
                <span className="icon-tile"><Icon size={20} /></span>
                <div><h3 className="h5">{c.title}</h3><p className="body">{c.body}</p></div>
              </li>
            );
          })}
        </ul>
        <div className="center" style={{ marginTop: '2.5rem' }} data-reveal><CtaLink size="lg">{publish.cta}</CtaLink></div>
      </div>
    </section>
  );
}
