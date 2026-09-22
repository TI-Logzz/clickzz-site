import { useLayoutEffect, useRef } from 'react';
import { ai } from '../content/copy';
import { CtaLink, Eyebrow, StarGem } from '../components/ui';
import { Device } from '../screens/Device';
import { NewProjectScreen } from '../screens/NewProjectScreen';
import { QuizStartScreen, QUIZ_BRIEF } from '../screens/QuizStartScreen';
import { QuizBuilderScreen } from '../screens/QuizBuilderScreen';
import { FlowCanvasScreen } from '../screens/FlowCanvasScreen';
import { cursorTo } from '../screens/GhostCursor';
import { gsap, useSectionProgress, usePinned, stageWindow } from '../lib/scroll';
import { useUI } from '../lib/store';

/**
 * S04 — Clickzz AI. Seção pinada (400 vh). Dentro de um monitor, o Fluxo A completo:
 * Novo Projeto → Funil de Quiz → briefing digitado → Continuar → estados de carregamento →
 * builder com etapas surgindo → Conexões com os fios se desenhando.
 * Os quatro itens da copy acendem sincronizados com o que aparece na tela.
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
    const screens = st.querySelectorAll<HTMLElement>('[data-screen]');
    const items = el.querySelectorAll<HTMLElement>('.ai__item');
    const s = (name: string) => st.querySelector<HTMLElement>(`[data-screen="${name}"]`)!;
    const ctx = gsap.context(() => {
      if (reduced) {
        screens.forEach((sc, i) => { sc.style.opacity = i === 2 ? '1' : '0'; });
        items.forEach((it) => it.classList.add('ai__item--on'));
        return;
      }
      gsap.set(screens, { opacity: 0 });
      gsap.set(s('new'), { opacity: 1 });
      const tl = gsap.timeline({
        scrollTrigger: pinned
          ? { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.25 }
          : stageWindow(st, 0.25),
        defaults: { ease: 'none' },
      });
      const light = (i: number, at: number) => tl.add(() => items.forEach((it, k) => it.classList.toggle('ai__item--on', k <= i)), at);
      const dark = (at: number) => tl.add(() => items.forEach((it) => it.classList.remove('ai__item--on')), at);
      dark(0);

      // 1. Novo Projeto: cursor vai até "Funil de Quiz"
      const newScr = s('new');
      cursorTo(tl, newScr, '[data-choice="quiz"]', 0.2, { click: true, duration: 0.8 });
      tl.to(newScr.querySelector('[data-choice="quiz"]'), { borderColor: '#6b26d9', backgroundColor: '#faf7ff', duration: 0.2 }, 0.9);
      // troca para o briefing
      tl.to(newScr, { opacity: 0, duration: 0.3 }, 1.3).to(s('start'), { opacity: 1, duration: 0.3 }, 1.3);

      // 2. Briefing: título e descrição digitados, custo em moedas visível, Continuar
      const startScr = s('start');
      const titlePh = startScr.querySelector<HTMLElement>('[data-title-placeholder]');
      const titleVal = startScr.querySelector<HTMLElement>('[data-title-value]');
      const typed = startScr.querySelector<HTMLElement>('[data-desc-typed]');
      const ph = startScr.querySelector<HTMLElement>('[data-desc-placeholder]');
      const count = startScr.querySelector<HTMLElement>('[data-desc-count]');
      cursorTo(tl, startScr, '[data-quiz-title]', 1.7, { click: true, duration: 0.6 });
      tl.set(titlePh, { display: 'none' }, 2.3).set(titleVal, { display: 'inline' }, 2.3);
      cursorTo(tl, startScr, '[data-quiz-desc]', 2.6, { click: true, dy: -30, duration: 0.6 });
      tl.set(ph, { display: 'none' }, 3.2);
      const typing = { n: 0 };
      tl.to(typing, {
        n: QUIZ_BRIEF.length, duration: 1.6,
        onUpdate: () => { if (typed) typed.textContent = QUIZ_BRIEF.slice(0, Math.round(typing.n)); if (count) count.textContent = `${Math.round(typing.n)}/10.000`; },
      }, 3.2);
      cursorTo(tl, startScr, '[data-quiz-continue]', 5.0, { click: true, duration: 0.6 });

      // 3. Estados de carregamento (overlay)
      const loader = st.querySelector<HTMLElement>('[data-loader]')!;
      const loaderTexts = loader.querySelectorAll<HTMLElement>('[data-loader-text]');
      const bar = loader.querySelector<HTMLElement>('[data-loader-bar]');
      tl.to(loader, { opacity: 1, duration: 0.3 }, 5.7);
      gsap.set(loaderTexts, { opacity: 0, y: 8 });
      loaderTexts.forEach((t, i) => {
        tl.to(t, { opacity: 1, y: 0, duration: 0.2 }, 5.9 + i * 0.7);
        if (i < loaderTexts.length - 1) tl.to(t, { opacity: 0, y: -8, duration: 0.2 }, 6.5 + i * 0.7);
      });
      tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 2.1, ease: 'power1.inOut' }, 5.9);
      tl.to(startScr, { opacity: 0, duration: 0.2 }, 7.6).to(s('builder'), { opacity: 1, duration: 0.3 }, 7.6).to(loader, { opacity: 0, duration: 0.3 }, 8.0);

      // 4. Builder: etapas surgem uma a uma, preview aparece, toast, moedas 150 → 145
      const b = s('builder');
      const steps = b.querySelectorAll<HTMLElement>('[data-step]');
      const elements = b.querySelectorAll<HTMLElement>('[data-el]');
      const preview = b.querySelector<HTMLElement>('[data-preview]');
      const toast = b.querySelector<HTMLElement>('[data-toast]');
      const coins = b.querySelector<HTMLElement>('[data-coins]');
      gsap.set(steps, { opacity: 0, x: -14 });
      gsap.set(elements, { opacity: 0, y: 8 });
      gsap.set(preview, { opacity: 0, y: 30, scale: 0.96 });
      gsap.set(toast, { opacity: 0, y: 16 });
      light(0, 8.1); // Estrutura do projeto
      steps.forEach((sp, i) => tl.to(sp, { opacity: 1, x: 0, duration: 0.25 }, 8.2 + i * 0.28));
      tl.to(preview, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, 9.0);
      light(1, 9.3); // Conteúdo e copy
      tl.fromTo(b.querySelector('[data-el-title]'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 9.3)
        .fromTo(b.querySelector('[data-el-button]'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 }, 9.6);
      light(2, 9.9); // Elementos
      elements.forEach((e, i) => tl.to(e, { opacity: 1, y: 0, duration: 0.15 }, 9.9 + i * 0.06));
      tl.to(toast, { opacity: 1, y: 0, duration: 0.3 }, 10.4);
      tl.add(() => { if (coins) coins.textContent = '145'; }, 10.4);
      tl.add(() => { if (coins) coins.textContent = '150'; }, 10.39); // reverse safety (executado ao voltar)
      tl.to(toast, { opacity: 0, y: 8, duration: 0.3 }, 11.6);

      // 5. Conexões: nós e fios se desenham
      cursorTo(tl, b, '[data-tab="conexoes"]', 11.4, { click: true, duration: 0.7 });
      tl.to(b, { opacity: 0, duration: 0.3 }, 12.1).to(s('flow'), { opacity: 1, duration: 0.3 }, 12.1);
      const f = s('flow');
      const nodes = f.querySelectorAll<HTMLElement>('[data-node]');
      const edges = f.querySelectorAll<SVGPathElement>('[data-edge]');
      gsap.set(nodes, { opacity: 0, scale: 0.85, transformOrigin: '50% 50%' });
      gsap.set(edges, { strokeDasharray: 1, strokeDashoffset: 1 });
      light(3, 12.3); // Lógica
      nodes.forEach((n, i) => tl.to(n, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, 12.4 + i * 0.25));
      edges.forEach((e, i) => tl.to(e, { strokeDashoffset: 0, duration: 0.5 }, 12.8 + i * 0.12));
      if (pinned) tl.to({}, { duration: 0.8 }); // respiro final (só no palco pinado)
    }, el);
    return () => ctx.revert();
  }, [reduced, pinned]);

  return (
    <section ref={root} className="section section--dark ai" id="ia" aria-labelledby="ai-title" style={{ height: pinned ? '330vh' : 'auto', paddingBlock: 0 }}>
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
            <p className="body" style={{ marginTop: '0.5rem' }}>{ai.body2}</p>
            <p className="body" style={{ marginTop: '1rem', fontWeight: 600, color: 'var(--ink)' }}>{ai.lead}</p>
            <ul className="ai__items" style={{ marginTop: '0.6rem' }}>
              {ai.items.map((it) => (
                <li key={it.title} className="ai__item"><b><span className="dot" aria-hidden="true" />{it.title}</b><span>{it.body}</span></li>
              ))}
            </ul>
            <div className="ai__close">
              <p className="body">{ai.close}</p>
              <CtaLink>{ai.cta} <span className="star" style={{ color: '#d4b3ff' }}>{ai.ctaStar}</span></CtaLink>
            </div>
          </div>
          <div ref={stage} className="ai__monitor" aria-label="Demonstração: a IA transforma uma descrição em um quiz completo dentro do builder">
            <Device url="app.quizmaker.com.br/dashboard/projects/new">
              <div style={{ position: 'relative', width: 1440, height: 900 }}>
                <div data-screen="new" style={{ position: 'absolute', inset: 0 }}><NewProjectScreen /></div>
                <div data-screen="start" style={{ position: 'absolute', inset: 0 }}><QuizStartScreen /></div>
                <div data-screen="builder" style={{ position: 'absolute', inset: 0 }}><QuizBuilderScreen activeStep={1} showToast /></div>
                <div data-screen="flow" style={{ position: 'absolute', inset: 0 }}><FlowCanvasScreen /></div>
                <div data-loader style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.86)', backdropFilter: 'blur(6px)', display: 'grid', placeItems: 'center', opacity: 0, fontFamily: 'var(--font-app)' }}>
                  <div style={{ width: 460, textAlign: 'center' }}>
                    <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(145deg,#f3eefc,#e4d5f5)', display: 'grid', placeItems: 'center', margin: '0 auto', fontSize: 28, color: '#6b26d9' }}>✦</div>
                    <div style={{ position: 'relative', height: 32, marginTop: 20, fontSize: 16, fontWeight: 600, color: '#282c34' }}>
                      <span data-loader-text style={{ position: 'absolute', inset: 0 }}>Planejando a estrutura do quiz...</span>
                      <span data-loader-text style={{ position: 'absolute', inset: 0 }}>Gerando etapas e elementos...</span>
                      <span data-loader-text style={{ position: 'absolute', inset: 0 }}>Finalizando elementos...</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: '#ede4fb', marginTop: 14, overflow: 'hidden' }}><div data-loader-bar style={{ height: '100%', background: '#6b26d9', transformOrigin: 'left' }} /></div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 10 }}>5 etapa(s) · custo estimado 5 moeda(s)</div>
                  </div>
                </div>
              </div>
            </Device>
            <p className="demo-note">Demonstração com um projeto ilustrativo.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
