import { useEffect, useLayoutEffect, useState, type RefObject } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clock, progress, sectionRects, useUI, type SectionId } from './store';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

let lenis: Lenis | null = null;

/** Monta Lenis no ticker do GSAP (como a alche.studio). */
export function useSmoothScroll() {
  const reduced = useUI((s) => s.reducedMotion);
  useEffect(() => {
    if (reduced) return;
    lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    });
    lenis.on('scroll', (e: Lenis) => {
      clock.scroll = e.scroll;
      clock.velocity = e.velocity;
      ScrollTrigger.update();
    });
    const tick = (t: number) => {
      lenis?.raf(t * 1000);
      clock.time = t;
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, [reduced]);
}

export function scrollTo(target: string | number, offset = -96) {
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.4 });
  else if (typeof target === 'string') document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Registra um ScrollTrigger de progresso para uma seção e escreve no relógio.
 * start/end em sintaxe do ScrollTrigger. Retorna nada; o canvas lê `progress`.
 */
export function useSectionProgress(
  id: SectionId,
  ref: RefObject<HTMLElement | null>,
  opts: { start?: string; end?: string } = {},
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: opts.start ?? 'top bottom',
      end: opts.end ?? 'bottom top',
      onUpdate: (self) => {
        progress.set(id, self.progress);
      },
      onToggle: (self) => {
        if (self.isActive) clock.active = id;
      },
      onRefresh: (self) => {
        sectionRects.set(id, { top: self.start, height: self.end - self.start });
      },
    });
    return () => st.kill();
  }, [id, ref, opts.start, opts.end]);
}

/** Reveal simples: filhos com [data-reveal] entram escalonados quando a seção aparece. */
export function useReveal(ref: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  const reduced = useUI((s) => s.reducedMotion);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!items.length) return;
    if (reduced) {
      items.forEach((i) => { i.style.opacity = '1'; i.style.transform = 'none'; });
      return;
    }
    const ctx = gsap.context(() => {
      const light = window.matchMedia('(max-width: 960px)').matches;
      gsap.set(items, light ? { opacity: 0, y: 20 } : { opacity: 0, y: 28, filter: 'blur(6px)' });
      const shown = new Set<HTMLElement>();
      const show = (batch: Element[]) => {
        const fresh = (batch as HTMLElement[]).filter((b) => !shown.has(b));
        fresh.forEach((b) => shown.add(b));
        if (fresh.length) gsap.to(fresh, light ? { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.06, overwrite: true } : { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out', stagger: 0.09, overwrite: true });
      };
      ScrollTrigger.batch(items, { start: 'top 88%', end: 'bottom top', onEnter: show, onEnterBack: show });
      // rede de segurança: após um refresh (molduras mudam de altura), revela o que já está na tela
      const sweep = () => {
        const vh = window.innerHeight;
        show(items.filter((i) => !shown.has(i) && i.getBoundingClientRect().top < vh * 0.95 && i.getBoundingClientRect().bottom > 0));
      };
      ScrollTrigger.addEventListener('refresh', sweep);
      ScrollTrigger.addEventListener('scrollEnd', sweep);
      const t = window.setTimeout(sweep, 400);
      return () => { ScrollTrigger.removeEventListener('refresh', sweep); ScrollTrigger.removeEventListener('scrollEnd', sweep); window.clearTimeout(t); };
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, reduced, ...deps]);
}

/** true quando a viewport é estreita (≤ 960px); seções pinadas viram fluxo normal. */
export function useIsMobile() {
  const [mobile, setMobile] = useState(() => (typeof window !== 'undefined' ? window.matchMedia('(max-width: 960px)').matches : false));
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 960px)');
    const on = () => setMobile(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return mobile;
}

/**
 * Janela de scrub das demonstrações no mobile (onde não há pin): a animação começa assim que o
 * palco entra na tela e **termina com ele ainda inteiro à vista** — antes usava `bottom 15%`,
 * que só concluía quando o palco já estava saindo por cima e o visitante não via o final.
 */
export function stageWindow(trigger: Element | null, scrub: number = 0.4) {
  return { trigger, start: 'top 88%', end: 'bottom 62%', scrub };
}

/** Uma seção "pina" (fica presa enquanto a timeline roda) só no desktop e sem reduced-motion. */
export function usePinned() {
  const reduced = useUI((s) => s.reducedMotion);
  const mobile = useIsMobile();
  return !reduced && !mobile;
}

export { gsap, ScrollTrigger };
