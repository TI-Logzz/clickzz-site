import { useLayoutEffect, useRef } from 'react';
import { Webhook, ArrowDownToLine, ArrowUpFromLine, Table2, MessageCircle, Mail, Megaphone, Music2, Tags, Users } from 'lucide-react';
import { integrations } from '../content/copy';
import { SectionHead } from '../components/ui';
import { LogoMark } from '../components/Logo';
import { gsap, useReveal, useSectionProgress } from '../lib/scroll';
import { useUI } from '../lib/store';

const nodes = [
  { label: 'Pixel Meta', icon: Megaphone, ring: 1, group: 'mk' },
  { label: 'GTM', icon: Tags, ring: 1, group: 'mk' },
  { label: 'TikTok Pixel', icon: Music2, ring: 1, group: 'mk' },
  { label: 'Webhook de entrada', icon: ArrowDownToLine, ring: 1, group: 'sl' },
  { label: 'Webhook de saída', icon: ArrowUpFromLine, ring: 1, group: 'sl' },
  { label: 'Planilhas', icon: Table2, ring: 2, group: 'sl' },
  { label: 'WhatsApp', icon: MessageCircle, ring: 2, group: 'sl' },
  { label: 'E-mail', icon: Mail, ring: 2, group: 'mk' },
  { label: 'CRM', icon: Users, ring: 2, group: 'sl' },
  { label: 'Automações', icon: Webhook, ring: 2, group: 'mk' },
];

/** S11 — Hub: Clickzz no centro e o ecossistema orbitando em dois anéis com fios pulsando. */
export function IntegrationsSection() {
  const root = useRef<HTMLElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const reduced = useUI((s) => s.reducedMotion);
  useSectionProgress('integrations', root);
  useReveal(root);

  useLayoutEffect(() => {
    const el = hub.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>('.hub__node');
    const svg = el.querySelector<SVGSVGElement>('.hub__svg');
    const lines = el.querySelectorAll<SVGLineElement>('.hub__svg line');
    const state = nodes.map((n, i) => {
      const same = nodes.filter((m) => m.ring === n.ring);
      const idx = same.indexOf(n);
      return { a: (idx / same.length) * Math.PI * 2 + (n.ring === 2 ? 0.4 : 0), ring: n.ring, i };
    });
    // ponteiro relativo ao centro do hub (px); NaN = fora
    const ptr = { x: NaN, y: NaN, inside: false };
    const disp = nodes.map(() => ({ x: 0, y: 0, s: 1 }));
    const lineSet = Array.from(lines);
    const pulseSet = Array.from(el.querySelectorAll<SVGLineElement>('.hub__svg .pulse'));
    let spin = 1; // multiplicador de velocidade da órbita, segue o lado do mouse
    const place = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      const r1 = Math.min(w, h) * 0.23, r2 = Math.min(w, h) * 0.39;
      let nearest = -1, nearestD = Infinity;
      state.forEach((s, i) => {
        const r = s.ring === 1 ? r1 : r2;
        const bx = Math.cos(s.a) * r * (w / Math.min(w, h)) * 0.75;
        const by = Math.sin(s.a) * r * 0.85;
        // campo magnético: itens perto do cursor se afastam suavemente; o mais próximo cresce
        let tx = 0, ty = 0;
        if (ptr.inside) {
          const dx = bx - ptr.x, dy = by - ptr.y;
          const d = Math.hypot(dx, dy);
          if (d < nearestD) { nearestD = d; nearest = i; }
          const R = 190;
          if (d < R && d > 0.001) { const f = (1 - d / R) ** 2 * 34; tx = (dx / d) * f; ty = (dy / d) * f; }
        }
        const dd = disp[i];
        dd.x += (tx - dd.x) * 0.12; dd.y += (ty - dd.y) * 0.12;
        const x = bx + dd.x, y = by + dd.y;
        const ln = lineSet[i];
        if (ln) { ln.setAttribute('x1', String(w / 2)); ln.setAttribute('y1', String(h / 2)); ln.setAttribute('x2', String(w / 2 + x)); ln.setAttribute('y2', String(h / 2 + y)); }
        const pl = pulseSet[i];
        if (pl) { pl.setAttribute('x1', String(w / 2)); pl.setAttribute('y1', String(h / 2)); pl.setAttribute('x2', String(w / 2 + x)); pl.setAttribute('y2', String(h / 2 + y)); }
        (dd as { x: number; y: number; s: number; px?: number; py?: number }).px = x; (dd as { px?: number; py?: number }).py = y;
      });
      state.forEach((_, i) => {
        const dd = disp[i] as { x: number; y: number; s: number; px?: number; py?: number };
        const target = ptr.inside && i === nearest && nearestD < 120 ? 1.14 : 1;
        dd.s += (target - dd.s) * 0.15;
        items[i].style.transform = `translate(${dd.px}px, ${dd.py}px) scale(${dd.s.toFixed(3)})`;
        items[i].style.zIndex = i === nearest && ptr.inside ? '4' : '2';
        items[i].style.boxShadow = i === nearest && ptr.inside && nearestD < 120 ? '0 12px 28px -8px rgba(117,36,205,0.35)' : '';
        const ln = lineSet[i];
        if (ln) ln.style.stroke = i === nearest && ptr.inside && nearestD < 120 ? 'var(--primary)' : '';
      });
      if (svg) svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(el);
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = (t - last) / 1000; last = t;
      if (!reduced) {
        // a órbita nunca para: o lado do mouse acelera/desacelera levemente o giro
        const w = el.clientWidth || 1;
        const targetSpin = ptr.inside ? 1 + (ptr.x / (w / 2)) * 0.6 : 1;
        spin += (targetSpin - spin) * 0.05;
        state.forEach((s) => { s.a += dt * (s.ring === 1 ? 0.12 : -0.07) * spin; });
      }
      place();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onMove = (e: PointerEvent) => { const r = el.getBoundingClientRect(); ptr.x = e.clientX - r.left - r.width / 2; ptr.y = e.clientY - r.top - r.height / 2; ptr.inside = true; };
    const onLeave = () => { ptr.inside = false; };
    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    // pulsos correndo nos fios
    const ctx = gsap.context(() => {
      if (reduced) return;
      el.querySelectorAll<SVGLineElement>('.hub__svg .pulse').forEach((p, i) => {
        gsap.fromTo(p, { strokeDashoffset: 600 }, { strokeDashoffset: -20, duration: 2.6 + (i % 4) * 0.5, repeat: -1, ease: 'none', delay: i * 0.35 });
      });
      gsap.from(items, { scrollTrigger: { trigger: el, start: 'top 75%' }, scale: 0, opacity: 0, duration: 0.9, stagger: 0.06, ease: 'back.out(2)' });
    }, el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); ctx.revert(); el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); };
  }, [reduced]);

  return (
    <section ref={root} className="section" id="integracoes" aria-labelledby="integrations-title">
      <div className="container">
        <SectionHead eyebrow={integrations.eyebrow} title={<span id="integrations-title">{integrations.title}</span>} lead={integrations.body1} align="center">
          <p className="body-lg" data-reveal style={{ marginTop: '1rem', marginInline: 'auto', maxWidth: '52ch' }}>{integrations.body2}</p>
        </SectionHead>
        <div ref={hub} className="integrations__hub" aria-label="Clickzz no centro, conectada a pixels, webhooks e ferramentas de marketing e vendas">
          <span className="hub__group hub__group--mk">MARKETING</span>
          <span className="hub__group hub__group--sl">VENDAS</span>
          <div className="hub__ring hub__ring--1" /><div className="hub__ring hub__ring--2" />
          <svg className="hub__svg" aria-hidden="true">
            {nodes.map((n) => <line key={n.label} />)}
            {nodes.map((n) => <line key={n.label + '-p'} className="pulse" />)}
          </svg>
          <div className="hub__core"><LogoMark size={64} /></div>
          {nodes.map((n) => (
            <div key={n.label} className="hub__node" title={n.label}>
              <n.icon size={22} color="#7524cd" />
              <span>{n.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
