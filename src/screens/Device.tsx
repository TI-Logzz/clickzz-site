import { useLayoutEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import { ScrollTrigger } from '../lib/scroll';

let refreshTimer = 0;
function scheduleRefresh() {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
}

interface DeviceProps {
  children: ReactNode;
  kind?: 'desktop' | 'mobile';
  url?: string;
  /** largura nativa da tela desenhada (1440 desktop, 390 mobile) */
  nativeWidth?: number;
  nativeHeight?: number;
  className?: string;
  style?: CSSProperties;
  /** deixa a moldura sem barra de navegador */
  bare?: boolean;
}

/**
 * Moldura de dispositivo. A tela é desenhada em tamanho nativo e escalada para
 * caber na largura do contêiner, mantendo o texto nítido (transform: scale).
 */
export function Device({ children, kind = 'desktop', url, nativeWidth, nativeHeight, className = '', style, bare = false }: DeviceProps) {
  const w = nativeWidth ?? (kind === 'desktop' ? 1440 : 390);
  const h = nativeHeight ?? (kind === 'desktop' ? 900 : 844);
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const cw = e.contentRect.width;
      if (cw > 0) { setScale(cw / w); scheduleRefresh(); }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  return (
    // --dscale: a escala aplicada à tela; a moldura do celular (entalhe, borda, cantos)
    // é desenhada em proporção a ela, senão o entalhe fica gigante nos aparelhos pequenos.
    <div className={`device device--${kind} ${className}`} style={{ ...style, ['--dscale' as string]: scale }}>
      <div className="device__viewport">
        {kind === 'desktop' && !bare && (
          <div className="device__bar">
            <div className="device__dots"><i /><i /><i /></div>
            <div className="device__url">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
              <span data-url>{url ?? 'app.quizmaker.com.br/dashboard/projects'}</span>
            </div>
          </div>
        )}
        {kind === 'mobile' && <div className="device__notch" />}
        <div ref={ref} className={kind === 'mobile' ? 'device__screen' : ''} style={{ width: '100%', height: h * scale, position: 'relative' }}>
          <div className="device__scale" style={{ transform: `scale(${scale})`, width: w, height: h }}>
            {children}
          </div>
        </div>
        <div className="device__glare" aria-hidden="true" />
      </div>
    </div>
  );
}
