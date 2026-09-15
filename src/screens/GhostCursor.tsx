/** Cursor fantasma que a timeline move, clica e arrasta dentro de uma tela. */
export function GhostCursor() {
  return (
    <div className="ghost" data-ghost aria-hidden="true">
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
        <path d="M2 2l6.5 19 2.8-7.2L18.5 11 2 2z" fill="#18181b" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <span className="ghost__click" data-ghost-click />
    </div>
  );
}

/** Posição do centro de `el` relativa a `root` (em px nativos, sem escala). */
export function centerOf(root: HTMLElement, el: Element | null, dx = 0, dy = 0) {
  if (!el) return { x: 200, y: 200 };
  const r = root.getBoundingClientRect();
  const e = el.getBoundingClientRect();
  // a tela pode estar escalada: normaliza pela escala do root
  const scale = r.width / root.offsetWidth || 1;
  return { x: (e.left - r.left + e.width / 2) / scale + dx, y: (e.top - r.top + e.height / 2) / scale + dy };
}

/** Move o cursor até o elemento e simula um clique. Retorna a timeline. */
export function cursorTo(
  tl: gsap.core.Timeline,
  root: HTMLElement,
  target: Element | null | string,
  at: number | string,
  opts: { click?: boolean; dx?: number; dy?: number; duration?: number } = {},
) {
  const ghost = root.querySelector<HTMLElement>('[data-ghost]');
  if (!ghost) return tl;
  const el = typeof target === 'string' ? root.querySelector(target) : target;
  const { x, y } = centerOf(root, el, opts.dx ?? 0, opts.dy ?? 0);
  tl.to(ghost, { x, y, opacity: 1, duration: opts.duration ?? 0.6, ease: 'power2.inOut' }, at);
  if (opts.click) {
    const ring = ghost.querySelector('[data-ghost-click]');
    tl.fromTo(ring, { opacity: 0.9, scale: 0.4 }, { opacity: 0, scale: 1.6, duration: 0.45, ease: 'power2.out' }, '>-0.05');
    tl.to(ghost, { scale: 0.9, duration: 0.08, yoyo: true, repeat: 1 }, '<');
  }
  return tl;
}
