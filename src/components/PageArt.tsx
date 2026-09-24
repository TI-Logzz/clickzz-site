import { Star, ShieldCheck, Sparkles, ChevronDown, GripVertical, Check, X } from 'lucide-react';
import { Scaled } from './Scaled';
import './pageart.css';

/**
 * Representação ilustrada de uma página de conversão — não é uma captura do builder.
 *
 * A variante completa ilustra o que a copy da seção diz, nesta ordem:
 *   "Da primeira dobra ao último CTA. Tudo em uma única experiência." → a página aparece
 *   INTEIRA, sem corte, com a dobra marcada no topo e o último CTA aceso na base;
 *   "Crie sua estrutura, reorganize seções" → a coluna de seções à esquerda, com uma sendo
 *   arrastada para outra posição e o vão tracejado de onde ela saiu;
 *   "combine diferentes elementos" → cada bloco mostra um tipo diferente de conteúdo.
 * A variante compacta é o teaser do card "Página" em Seus projetos.
 */
const BLOCKS = ['Hero', 'Oferta', 'Benefícios', 'Prova', 'Comparações', 'Bônus', 'Garantia', 'FAQ', 'CTAs'] as const;
type Block = (typeof BLOCKS)[number];

/**
 * "Reorganize seções": no scroll, a linha "Bônus" sobe dois lugares e pousa logo abaixo de
 * "Benefícios", enquanto "Prova" e "Comparações" descem para abrir espaço. É um movimento,
 * não um estado: no fim todas as linhas ficam retas e alinhadas.
 */
export const DRAG_FROM = 5;
export const DRAG_TO = 3;
export const ROW_STEP = 40; // altura da linha (34) + respiro (6)

function BlockBody({ name, compact = false }: { name: Block; compact?: boolean }) {
  switch (name) {
    case 'Hero':
      return (
        <div className="pgart__hero">
          <div>
            <span className="pgart__eyebrow">Frete grátis · pague na entrega</span>
            <div className="pgart__h1" />
            <div className="pgart__h1 pgart__h1--2" />
            <div className="pgart__text" />
            <span className="pgart__cta">Quero começar agora</span>
          </div>
          <div className="pgart__art">
            <i className="pgart__art-blob" />
            <i className="pgart__art-ring" />
            <Sparkles className="pgart__art-star" size={compact ? 14 : 16} />
          </div>
        </div>
      );
    case 'Oferta':
      return (
        <div className="pgart__offer">
          <div>
            <div className="pgart__text pgart__text--mid" />
            <div className="pgart__price"><b>R$ 197</b><span>ou 12× de R$ 19,70</span></div>
          </div>
          <span className="pgart__badge"><ShieldCheck size={11} /> Garantia de 30 dias</span>
        </div>
      );
    case 'Benefícios':
      return (
        <div className="pgart__grid">
          {[0, 1, 2].map((k) => (
            <div key={k} className="pgart__mini">
              <i className="pgart__mini-icon" />
              <div className="pgart__text pgart__text--tiny" />
              <div className="pgart__text pgart__text--tiny pgart__text--short" />
            </div>
          ))}
        </div>
      );
    case 'Prova':
      return (
        <div className="pgart__proof">
          {[0, 1, 2].map((k) => (
            <div key={k} className="pgart__quote">
              <div className="pgart__stars">{[0, 1, 2, 3, 4].map((s) => <Star key={s} size={7} fill="#f59e0b" stroke="none" />)}</div>
              <div className="pgart__text pgart__text--tiny" />
              <span className="pgart__avatar" />
            </div>
          ))}
        </div>
      );
    case 'Comparações':
      return (
        <div className="pgart__compare">
          <div className="pgart__compare-col">
            {[0, 1].map((k) => <span key={k}><i className="pgart__mark pgart__mark--no"><X size={7} strokeWidth={3.5} /></i><b /></span>)}
          </div>
          <div className="pgart__compare-col pgart__compare-col--yes">
            {[0, 1].map((k) => <span key={k}><i className="pgart__mark pgart__mark--yes"><Check size={7} strokeWidth={3.5} /></i><b /></span>)}
          </div>
        </div>
      );
    case 'Bônus':
      return (
        <div className="pgart__bonus">
          {[0, 1].map((k) => (
            <div key={k} className="pgart__bonus-card"><i /><div className="pgart__text pgart__text--tiny" /></div>
          ))}
        </div>
      );
    case 'Garantia':
      return (
        <div className="pgart__guarantee">
          <span className="pgart__seal"><ShieldCheck size={13} /></span>
          <div><div className="pgart__text pgart__text--tiny" style={{ width: 120 }} /><div className="pgart__text pgart__text--tiny pgart__text--short" /></div>
        </div>
      );
    case 'FAQ':
      return (
        <div className="pgart__faq">
          {[0, 1].map((k) => (
            <div key={k} className="pgart__faq-row"><div className="pgart__text pgart__text--tiny" /><ChevronDown size={11} /></div>
          ))}
        </div>
      );
    case 'CTAs':
      return (
        <div className="pgart__final">
          <div className="pgart__h1 pgart__h1--center" />
          <span className="pgart__cta pgart__cta--wide">Quero o meu kit</span>
        </div>
      );
  }
}

export function PageArt({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <Scaled width={720} height={380} className="pgart">
        <div className="pgart__canvas pgart__canvas--compact" style={{ width: 720, height: 380 }}>
          <div className="pgart__page">
            {(['Hero', 'Oferta', 'Benefícios'] as Block[]).map((name, i) => (
              <div key={name} className="pgart__sec" data-pg-sec={i}><BlockBody name={name} compact /></div>
            ))}
          </div>
        </div>
      </Scaled>
    );
  }

  return (
    <Scaled width={720} height={660} className="pgart">
      <div className="pgart__canvas pgart__canvas--full" style={{ width: 720, height: 660 }}>
        {/* coluna de seções: criar a estrutura e reorganizar */}
        <div className="pgart__rail" aria-hidden="true">
          <div className="pgart__rail-head">Seções</div>
          {BLOCKS.map((name, i) => (
            <div
              key={name}
              className={`pgart__row ${i === DRAG_FROM ? 'pgart__row--drag' : ''}`}
              data-pg-row={i}
              {...(i === DRAG_FROM ? { 'data-pg-drag': '' } : {})}
              {...(i > DRAG_TO - 1 && i < DRAG_FROM ? { 'data-pg-shift': '' } : {})}
            >
              <GripVertical size={11} />{name}
            </div>
          ))}
        </div>

        {/* a página inteira: da primeira dobra ao último CTA, sem corte */}
        <div className="pgart__pagewrap">
          <div className="pgart__page pgart__page--full">
            {BLOCKS.map((name, i) => (
              <div key={name} className={`pgart__sec ${name === 'CTAs' ? 'pgart__sec--last' : ''}`} data-pg-sec={i}>
                <BlockBody name={name} />
                {name === 'Hero' && <span className="pgart__fold"><i />primeira dobra</span>}
              </div>
            ))}
          </div>
          <span className="pgart__tag pgart__tag--last" data-pg-tag>último CTA</span>
        </div>
      </div>
    </Scaled>
  );
}
