import { useEffect, useState, type ReactNode } from 'react';

/**
 * Monta os filhos só depois que o hero pintou, em levas escalonadas (ordem = `stage`).
 * Reduz o trabalho de primeira pintura no mobile: o visitante vê o hero de imediato e o
 * restante da página monta em seguida, sem bloquear a thread principal em uma tarefa longa.
 */
let ready = false;
const listeners = new Set<() => void>();
function markReady() {
  ready = true;
  listeners.forEach((l) => l());
  listeners.clear();
}
if (typeof window !== 'undefined') {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void };
  const kick = () => w.setTimeout(markReady, 0);
  if (w.requestIdleCallback) w.requestIdleCallback(kick, { timeout: 600 });
  else w.setTimeout(kick, 200);
}

export function Deferred({ stage = 0, children, minHeight = 600 }: { stage?: number; children: ReactNode; minHeight?: number }) {
  const [show, setShow] = useState(ready);
  useEffect(() => {
    if (show) return;
    let t = 0;
    const go = () => { t = window.setTimeout(() => setShow(true), stage * 90); };
    if (ready) go();
    else listeners.add(go);
    return () => { listeners.delete(go); window.clearTimeout(t); };
  }, [show, stage]);
  if (!show) return <div style={{ minHeight }} aria-hidden="true" />;
  return <>{children}</>;
}
