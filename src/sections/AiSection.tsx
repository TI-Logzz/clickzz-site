import { useLayoutEffect, useRef } from 'react';
import { Layers, Type, Blocks, GitBranch } from 'lucide-react';
import { ai } from '../content/copy';
import { CtaLink, Eyebrow, StarGem } from '../components/ui';
import { AiArt, AI_BRIEF } from '../components/AiArt';
import { gsap, useSectionProgress, usePinned } from '../lib/scroll';
import { useUI } from '../lib/store';

/** Um ícone por item da copy: estrutura, conteúdo, elementos e lógica. */
const ITEM_ICONS = [Layers, Type, Blocks, GitBranch];

/**
 * S04 — Clickzz AI. A demonstração é uma **ilustração** do que a IA faz (não uma captura do app):
 * a descrição é digitada, vira um feixe e o projeto se monta em quatro camadas, na ordem da copy —
 * estrutura (etapas), conteúdo (linhas), elementos (chips) e lógica (caminhos). Os quatro itens
 * do texto acendem junto com a camada correspondente.
 */
export function AiSection() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  const pinned = usePinned();
  useSectionProgress('ai', root, { start: 'top top', end: 'bottom bottom' });

  useLayoutEffect(() => {
    const el = root.current;
    const st = stage.current;
    if (!el || !st) return;
    const items = el.querySelectorAll<HTMLElement>('.ai__item');
    const copy = el.querySelector<HTMLElement>('.ai__copy');
    const q = <T extends Element>(sel: string) => st.querySelectorAll<T>(sel);
    const one = (sel: string) => st.querySelector<HTMLElement>(sel);
    const typed = one('[data-ai-type]');
    const caret = one('[data-ai-caret]');

    const ctx = gsap.context(() => {
      const steps = q<HTMLElement>('[data-ai-step]');
      const lines = q<HTMLElement>('[data-ai-line]');
      const els = q<HTMLElement>('[data-ai-el]');
      const wires = q<SVGPathElement>('[data-ai-wire]');
      const branches = q<HTMLElement>('[data-ai-branch]');
      const beam = one('[data-ai-beam]') as unknown as SVGPathElement | null;
      const rail = one('[data-ai-rail]');
      const cond = one('[data-ai-cond]');
      const done = one('[data-ai-done]');
      const btn = one('[data-ai-btn]');

      if (reduced) {
        if (typed) typed.textContent = AI_BRIEF;
        if (caret) caret.style.opacity = '0';
        items.forEach((it) => it.classList.add('ai__item--on'));
        return;
      }

      // estado inicial: o projeto ainda não existe
      gsap.set([steps, els, branches, cond, done], { opacity: 0 });
      gsap.set(steps, { y: 10 });
      gsap.set(els, { y: 6 });
      gsap.set(branches, { x: -8 });
      gsap.set(lines, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(rail, { scaleX: 0 });
      gsap.set([beam, ...Array.from(wires)], { strokeDasharray: 1, strokeDashoffset: 1 });

      const tl = gsap.timeline({
        scrollTrigger: pinned
          ? { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.25 }
          // mobile: a copy dirige a demo, que fica presa ao topo enquanto os itens passam
          : { trigger: copy ?? st, start: 'top 96%', end: 'bottom 96%', scrub: 0.2 },
        defaults: { ease: 'none' },
      });
      const light = (i: number, at: number) => tl.add(() => items.forEach((it, k) => it.classList.toggle('ai__item--on', k <= i)), at);
      tl.add(() => items.forEach((it) => it.classList.remove('ai__item--on')), 0);

      // 1. a descrição sendo digitada
      const typing = { n: 0 };
      tl.to(typing, {
        n: AI_BRIEF.length, duration: 1.5,
        onUpdate: () => { if (typed) typed.textContent = AI_BRIEF.slice(0, Math.round(typing.n)); },
      }, 0.2);
      tl.to(btn, { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1, transformOrigin: 'center' }, 1.9);
      tl.to(caret, { opacity: 0, duration: 0.2 }, 2.0);

      // 2. o feixe: a descrição vira projeto
      tl.to(beam, { strokeDashoffset: 0, duration: 0.45 }, 2.0);

      // 3. estrutura — as etapas
      light(0, 2.4);
      tl.to(rail, { scaleX: 1, duration: 0.7 }, 2.45);
      steps.forEach((s, i) => tl.to(s, { opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.8)' }, 2.5 + i * 0.16));

      // 4. conteúdo — as linhas de texto
      light(1, 3.5);
      lines.forEach((l, i) => tl.to(l, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, 3.55 + i * 0.22));

      // 5. elementos — os componentes distribuídos
      light(2, 4.4);
      els.forEach((e, i) => tl.to(e, { opacity: 1, y: 0, duration: 0.25, ease: 'back.out(2)' }, 4.45 + i * 0.16));

      // 6. lógica — os caminhos
      light(3, 5.2);
      wires.forEach((w, i) => tl.to(w, { strokeDashoffset: 0, duration: 0.45 }, 5.25 + i * 0.12));
      tl.to(cond, { opacity: 1, duration: 0.25 }, 5.6);
      branches.forEach((bch, i) => tl.to(bch, { opacity: 1, x: 0, duration: 0.3, ease: 'back.out(2)' }, 5.7 + i * 0.14));

      // 7. pronto
      tl.fromTo(done, { opacity: 0, scale: 0.85, transformOrigin: 'right center' }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, 6.2);
      if (pinned) tl.to({}, { duration: 0.7 });
    }, el);
    return () => ctx.revert();
  }, [reduced, pinned]);

  return (
    <section ref={root} className="section section--dark ai" id="ia" aria-labelledby="ai-title" style={{ height: pinned ? '300vh' : 'auto', paddingBlock: 0 }}>
      <div className="ai__sticky" style={pinned ? undefined : { position: 'relative', height: 'auto', paddingTop: '4rem', paddingBottom: '2rem' }}>
        <div className="container ai__head">
          <Eyebrow>{ai.eyebrow}</Eyebrow>
          <h2 id="ai-title" className="display h2 ai__title">
            <span className="line">{ai.title1}</span>
            <span className="line">{ai.title2} <StarGem /></span>
          </h2>
        </div>
        <div className="container--wide ai__body">
          <div className="ai__copy">
            <p className="body">{ai.body1}</p>
            <p className="body" style={{ marginTop: '0.75rem' }}>{ai.body2}</p>
            <p className="body ai__lead" style={{ marginTop: '2rem', fontWeight: 600, color: 'var(--ink)' }}>{ai.lead}</p>
            <ul className="ai__items" style={{ marginTop: '1.25rem' }}>
              {ai.items.map((it, i) => {
                const Icon = ITEM_ICONS[i];
                return (
                  <li key={it.title} className="ai__item">
                    <span className="ai__item-icon" aria-hidden="true"><Icon size={19} strokeWidth={1.8} /></span>
                    <div><b>{it.title}</b><span>{it.body}</span></div>
                  </li>
                );
              })}
            </ul>
            <div className="ai__close">
              <p className="body">{ai.close}</p>
              <CtaLink>{ai.cta} <span className="star" style={{ color: '#d4b3ff' }}>{ai.ctaStar}</span></CtaLink>
            </div>
          </div>
          <div ref={stage} className="ai__monitor" aria-label="Ilustração: a descrição vira um projeto com etapas, conteúdo, elementos e lógica">
            <AiArt />
            <p className="demo-note">Representação ilustrativa do projeto gerado.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
