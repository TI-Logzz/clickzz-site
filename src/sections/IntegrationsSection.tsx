import { useRef } from 'react';
import { integrations } from '../content/copy';
import { Eyebrow } from '../components/ui';
import { BRANDS, BrandTile } from '../components/BrandTile';
import { useReveal, useSectionProgress, useIsMobile } from '../lib/scroll';

/** Posição (em % do campo) de cada marca ao redor do título — composição fixa, sem órbita. */
const SPOTS: [number, number][] = [
  [12, 12], [27, 22], [42, 8], [58, 8], [73, 22], [88, 12],
  [5, 44], [95, 44],
  [12, 78], [27, 90], [42, 96], [58, 96], [73, 90], [88, 78],
  [17, 58], [83, 58],
];

/** S11 — Integrações: logos reconhecíveis em volta do título, composição estável (revisão 21/09: sem movimento radial). */
export function IntegrationsSection() {
  const root = useRef<HTMLElement>(null);
  const mobile = useIsMobile();
  useSectionProgress('integrations', root);
  useReveal(root);

  const head = (
    <div className="integrations__head">
      <div data-reveal><Eyebrow>{integrations.eyebrow}</Eyebrow></div>
      <h2 id="integrations-title" className="display h2" data-reveal style={{ marginTop: '1.25rem' }}>{integrations.title}</h2>
      <p className="lead" data-reveal style={{ marginTop: '1.25rem', marginInline: 'auto' }}>{integrations.body1}</p>
      <p className="body-lg" data-reveal style={{ marginTop: '0.75rem', marginInline: 'auto', maxWidth: '52ch' }}>{integrations.body2}</p>
    </div>
  );

  return (
    <section ref={root} className="section section--dark" id="integracoes" aria-labelledby="integrations-title">
      <div className="container">
        {mobile ? (
          <>
            {head}
            <ul className="integrations__grid" aria-label="Ferramentas integráveis">
              {BRANDS.map((b) => <li key={b.id} data-reveal><BrandTile brand={b} size={56} /></li>)}
            </ul>
          </>
        ) : (
          <div className="integrations__field" aria-label="Ferramentas integráveis ao redor da Clickzz">
            <svg className="integrations__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {SPOTS.map(([x, y], i) => <line key={i} x1={x} y1={y} x2={50} y2={50} />)}
            </svg>
            {head}
            {BRANDS.map((b, i) => (
              <div key={b.id} className="integrations__spot" style={{ left: `${SPOTS[i][0]}%`, top: `${SPOTS[i][1]}%` }}>
                <div data-reveal><BrandTile brand={b} size={64} /></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
