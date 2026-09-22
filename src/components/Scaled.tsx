import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { ScrollTrigger } from '../lib/scroll';

let refreshTimer = 0;
function scheduleRefresh() {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
}

/**
 * Composição desenhada em tamanho nativo e escalada para a largura do contêiner
 * (mesmo mecanismo da moldura Device, sem moldura). Mantém texto nítido via transform: scale.
 */
export function Scaled({ width, height, children, className = '' }: { width: number; height: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const cw = e.contentRect.width;
      if (cw > 0) { setScale(cw / width); scheduleRefresh(); }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={ref} className={className} style={{ width: '100%', height: height * scale, position: 'relative' }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', left: 0, top: 0, width, height }}>
        {children}
      </div>
    </div>
  );
}
