import { useLayoutEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { hero } from '../content/copy';
import { CtaLink, Eyebrow, StarGem } from '../components/ui';
import { Device } from '../screens/Device';
import { PagePreviewScreen } from '../screens/PagePreviewScreen';
import { QuizPlayerScreen, QUIZ_FORM_VALUES } from '../screens/QuizPlayerScreen';
import { PageBuilderScreen } from '../screens/PageBuilderScreen';
import { gsap, ScrollTrigger, useSectionProgress, usePinned, useIsMobile } from '../lib/scroll';
import { useUI } from '../lib/store';
import '../screens/screens.css';

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  const pinned = usePinned();
  const mobile = useIsMobile();
  useSectionProgress('hero', root, { start: 'top top', end: 'bottom bottom' });

  useLayoutEffect(() => {
    const el = root.current;
    const st = stage.current;
    if (!el || !st) return;
    const words = el.querySelectorAll<HTMLElement>('.hero__title .word');
    const ctx = gsap.context(() => {
      // Entrada: título por palavras, depois lead, CTA e checks
      if (!reduced) {
        const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
        intro
          .fromTo('.hero__eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
          .fromTo(words, pinned ? { opacity: 0, y: 40, rotateX: -40, filter: 'blur(8px)' } : { opacity: 0, y: 24 }, pinned ? { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.06 } : { opacity: 1, y: 0, duration: 0.9, stagger: 0.05 }, 0.2)
          .fromTo('.hero__lead', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, 0.7)
          .fromTo('.hero__cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.85)
          .fromTo('.hero__checks li', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 1)
          .fromTo('.hero__plane--builder', { opacity: 0, y: 60, rotateY: -30 }, { opacity: 0.85, y: 0, rotateY: -14, duration: 1.6 }, 0.5)
          .fromTo('.hero__plane--desktop', { opacity: 0, y: 80, rotateY: -24 }, { opacity: 1, y: 0, rotateY: -10, duration: 1.6 }, 0.7)
          .fromTo('.hero__plane--mobile', { opacity: 0, y: 100, rotateY: -30 }, { opacity: 1, y: 0, rotateY: -16, duration: 1.6 }, 0.9);
      }

      // Scroll: as telas se montam enquanto o hero fica pinado
      const secs = st.querySelectorAll<HTMLElement>('.hero__plane--desktop [data-sec]');
      const track = st.querySelector<HTMLElement>('[data-qtrack]');
      const qbtns = st.querySelectorAll<HTMLElement>('[data-qbtn]');
      const builderSecs = st.querySelectorAll<HTMLElement>('.hero__plane--builder [data-bsec]');
      const tl = gsap.timeline({
        scrollTrigger: pinned
          ? { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.35 }
          : { trigger: st, start: 'top 80%', end: 'bottom 10%', scrub: reduced ? false : 0.35 },
        defaults: { ease: 'none' },
      });
      // Toda a ação acontece nos primeiros 3/4 do trecho fixo; o último quarto é uma pausa
      // com o estado final à vista, para o visitante ver a apresentação completa antes de a seção soltar.
      // página desktop: a primeira seção já está visível; as demais entram em sequência e a página rola dentro da moldura
      gsap.set(Array.from(secs).slice(1), { opacity: 0, y: 30 });
      secs.forEach((s, i) => { if (i > 0) tl.to(s, { opacity: 1, y: 0, duration: 0.35 }, (i - 1) * 0.28); });
      const doc = st.querySelector<HTMLElement>('.hero__plane--desktop .device__scale > *');
      if (doc) tl.to(doc, { y: -900, duration: 2.3 }, 0.3);
      // builder ao fundo: acorda seção por seção
      gsap.set(builderSecs, { opacity: 0.25 });
      builderSecs.forEach((s, i) => tl.to(s, { opacity: 1, duration: 0.3 }, 0.15 + i * 0.22));
      // quiz mobile: responde duas perguntas, preenche o cadastro (nome, e-mail, WhatsApp) e chega ao resultado,
      // tudo concluído antes da pausa final
      if (track) {
        const N = st.querySelectorAll('[data-qstep]').length;
        const step = (k: number) => (-100 / N) * k;
        const fields = st.querySelectorAll<HTMLElement>('[data-qfield]');
        tl.to(qbtns[0], { scale: 0.96, duration: 0.08, yoyo: true, repeat: 1 }, 0.5)
          .to(track, { xPercent: step(1), duration: 0.4, ease: 'power2.inOut' }, 0.6)
          .to(qbtns[1], { scale: 0.96, duration: 0.08, yoyo: true, repeat: 1 }, 1.3)
          .to(track, { xPercent: step(2), duration: 0.4, ease: 'power2.inOut' }, 1.4);
        // digitação dos campos (reversível com o scroll)
        fields.forEach((f, k) => {
          const value = QUIZ_FORM_VALUES[k];
          const ph = f.dataset.placeholder ?? '';
          const typing = { n: 0 };
          tl.to(typing, {
            n: value.length, duration: 0.28,
            onUpdate: () => { const c = Math.round(typing.n); f.textContent = c > 0 ? value.slice(0, c) : ph; f.style.color = c > 0 ? '#282c34' : ''; f.style.borderColor = c > 0 && c < value.length ? '#6b26d9' : ''; },
          }, 1.9 + k * 0.3);
        });
        tl.to(qbtns[2], { scale: 0.96, duration: 0.08, yoyo: true, repeat: 1 }, 2.8)
          .to(track, { xPercent: step(3), duration: 0.4, ease: 'power2.inOut' }, 2.9);
      }
      // parallax leve de profundidade nos planos, ao longo de toda a ação
      if (!mobile) tl.to('.hero__plane--builder', { y: -50, duration: 3 }, 0).to('.hero__plane--mobile', { y: 30, duration: 3 }, 0);
      // pausa final (25% do trecho): nada muda, o visitante absorve o resultado
      tl.to({}, { duration: 1 }, 3.4);
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced, pinned, mobile]);

  // parallax de mouse nos planos (desliga no toque)
  useLayoutEffect(() => {
    const st = stage.current;
    if (!st || useUI.getState().isTouch || reduced) return;
    const planes = st.querySelectorAll<HTMLElement>('.hero__plane');
    const base = [-14, -10, -16];
    const onMove = (e: PointerEvent) => {
      const r = st.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      planes.forEach((p, i) => {
        gsap.to(p, { rotateY: base[i] + x * 3 * (i + 1), rotateX: 4 - y * 2.5 * (i + 1), duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced]);

  const words = hero.title.split(' ');

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title" style={{ height: pinned ? '210vh' : 'auto' }}>
      <div className="hero__sticky" style={{ position: pinned ? 'sticky' : 'relative', top: 0 }}>
        <div className="container--wide hero__grid">
          <div className="hero__copy">
            <div className="hero__eyebrow"><Eyebrow>{hero.eyebrow}</Eyebrow></div>
            <h1 id="hero-title" className="display h1 hero__title">
              {words.map((w, i) => (
                <span key={i} className="word">{w}{i < words.length - 1 ? ' ' : ''}</span>
              ))}
              <span className="word"><StarGem /></span>
            </h1>
            <p className="lead hero__lead">{hero.body}</p>
            <div className="hero__cta">
              <CtaLink size="lg">{hero.cta}</CtaLink>
            </div>
            <ul className="hero__checks">
              {hero.checks.map((c) => (
                <li key={c}><span className="mark" aria-hidden="true"><Check size={12} strokeWidth={3} /></span>{c}</li>
              ))}
            </ul>
          </div>
          <div ref={stage} className="hero__stage" aria-label="Demonstração: uma página de venda no desktop e um quiz no celular, com o builder ao fundo">
            {!mobile && (
              <div className="hero__plane hero__plane--builder">
                <Device url="app.quizmaker.com.br/dashboard/projects/…/builder" bare>
                  <PageBuilderScreen activeSection={0} />
                </Device>
              </div>
            )}
            <div className="hero__plane hero__plane--desktop">
              <Device url="confeitarialucrativa.com.br">
                <PagePreviewScreen compact />
              </Device>
            </div>
            <div className="hero__plane hero__plane--mobile">
              <Device kind="mobile">
                <QuizPlayerScreen />
              </Device>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
