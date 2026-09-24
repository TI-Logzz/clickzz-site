import { useId } from 'react';
import './traces.css';

/**
 * Fundo das seções (referência: quizmaker.com.br): contornos finos de painéis com cantos
 * arredondados, trechos curtos de luz correndo pelas linhas, malha de pontos e um brilho roxo,
 * tudo ancorado num canto e sumindo em direção ao conteúdo. As cores vêm de tokens (--trace-*),
 * então a mesma composição serve às seções claras e às escuras. Estático e decorativo.
 */
export type Corner = 'tl' | 'tr' | 'bl' | 'br';

export function Traces({ corners }: { corners: Corner[] }) {
  return (
    <div className="traces" aria-hidden="true">
      {corners.map((c) => <TraceArt key={c} corner={c} />)}
    </div>
  );
}

function TraceArt({ corner }: { corner: Corner }) {
  const id = useId();
  const h = `${id}h`; // luz horizontal
  const v = `${id}v`; // luz vertical
  const k = `${id}k`; // luz de canto
  return (
    <div className={`traces__art traces__art--${corner}`}>
      <i className="traces__glow" />
      <i className="traces__dots" />
      <svg viewBox="0 0 640 560" preserveAspectRatio="xMinYMin meet">
        <defs>
          <linearGradient id={h} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--trace-hi)" stopOpacity="0" />
            <stop offset="0.55" stopColor="var(--trace-hi)" />
            <stop offset="1" stopColor="var(--trace-hi-2)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={v} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--trace-hi-2)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--trace-hi)" />
            <stop offset="1" stopColor="var(--trace-hi)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={k} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--trace-hi)" stopOpacity="0" />
            <stop offset="0.35" stopColor="var(--trace-hi)" />
            <stop offset="1" stopColor="var(--trace-hi-2)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="traces__lines">
          {/* guias que atravessam o canto */}
          <path d="M0 44 H640" />
          <path d="M452 0 V560" />
          {/* painéis */}
          <rect x="44" y="84" width="372" height="248" rx="16" />
          <rect x="-24" y="152" width="96" height="212" rx="14" />
          <rect x="484" y="72" width="120" height="156" rx="14" />
          <rect x="484" y="248" width="120" height="64" rx="12" />
          <rect x="136" y="368" width="280" height="72" rx="14" />
          <path d="M72 258 H136 V368" />
        </g>
        {/* trechos de luz */}
        <rect x="170" y="43.25" width="150" height="1.5" rx="0.75" fill={`url(#${h})`} />
        <rect x="451.25" y="330" width="1.5" height="110" rx="0.75" fill={`url(#${v})`} />
        <rect x="43.25" y="150" width="1.5" height="92" rx="0.75" fill={`url(#${v})`} />
        <rect x="200" y="439.25" width="130" height="1.5" rx="0.75" fill={`url(#${h})`} />
        <path d="M484.75 132 V86 a13.25 13.25 0 0 1 13.25 -13.25 H566" fill="none" stroke={`url(#${k})`} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
