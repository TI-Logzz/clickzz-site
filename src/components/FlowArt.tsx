import { Shuffle, Sparkles, UserRound, Trophy } from 'lucide-react';
import { Scaled } from './Scaled';
import './flowart.css';

/**
 * Composição ilustrada de um fluxo de quiz (não é uma captura do editor):
 * etapas grandes e legíveis, fios roxos, uma condição e um randomizador.
 * Três recortes, um por lugar da página — nenhum se repete:
 *   'teaser' → card "Quiz" em Seus projetos: a jornada (boas-vindas → pergunta → resultado);
 *   'full'   → Quizzes interativos no desktop: a mesa de lógica inteira;
 *   'logic'  → Quizzes interativos no mobile: o recorte da lógica (condição e randomizador),
 *              com os nós maiores para continuarem legíveis em 390px.
 * Atributos data-node / data-edge / data-pulse / data-rand-pct alimentam as timelines das seções.
 */
type Kind = 'welcome' | 'options' | 'form' | 'result' | 'rand';
interface Node { id: string; n?: number; name: string; x: number; y: number; kind: Kind; q?: string; opts?: string[]; sel?: number; }
type Edge = [string, number, string, string?];

const W = 200;
const HEAD = 34;

const FULL: { size: [number, number]; nodes: Node[]; edges: Edge[] } = {
  size: [1040, 560],
  nodes: [
    { id: 'n1', n: 1, name: 'Boas-vindas', x: 24, y: 200, kind: 'welcome', q: 'Descubra o tratamento ideal para a sua pele' },
    { id: 'n2', n: 2, name: 'Preocupação', x: 290, y: 110, kind: 'options', q: 'Qual é a sua maior preocupação hoje?', opts: ['Manchas', 'Linhas finas', 'Flacidez', 'Acne'], sel: 0 },
    { id: 'r1', name: 'Randomizador', x: 560, y: 120, kind: 'rand' },
    { id: 'n3', n: 3, name: 'Rotina (acne)', x: 560, y: 340, kind: 'options', q: 'Com que frequência você cuida da pele?', opts: ['Todo dia', 'Raramente'], sel: 1 },
    { id: 'n4', n: 4, name: 'Cadastro', x: 820, y: 40, kind: 'form' },
    { id: 'n5', n: 5, name: 'Resultado', x: 820, y: 320, kind: 'result' },
  ],
  edges: [
    ['n1', 0, 'n2'],
    ['n2', 0, 'r1'], ['n2', 1, 'r1'], ['n2', 2, 'r1'],
    ['n2', 3, 'n3', 'Condição'],
    ['r1', 0, 'n4', 'A'], ['r1', 1, 'n5', 'B'],
    ['n3', 0, 'n5'], ['n3', 1, 'n5'],
  ],
};

/** Recorte da lógica: uma pergunta que bifurca entre um randomizador e um caminho condicional. */
const LOGIC: typeof FULL = {
  size: [520, 430],
  nodes: [
    { id: 'q', n: 2, name: 'Pergunta', x: 12, y: 118, kind: 'options', q: 'Qual é a sua maior preocupação hoje?', opts: ['Manchas', 'Linhas finas', 'Acne'], sel: 0 },
    { id: 'r', name: 'Randomizador', x: 300, y: 30, kind: 'rand' },
    { id: 'res', n: 5, name: 'Resultado', x: 300, y: 252, kind: 'result' },
  ],
  edges: [['q', 0, 'r'], ['q', 1, 'r'], ['q', 2, 'res', 'Condição']],
};

const TEASER: typeof FULL = {
  size: [720, 380],
  nodes: [
    { id: 'c1', n: 1, name: 'Boas-vindas', x: 16, y: 130, kind: 'welcome', q: 'Descubra o tratamento ideal para você' },
    { id: 'c2', n: 2, name: 'Pergunta', x: 236, y: 36, kind: 'options', q: 'Qual é o seu maior desafio hoje?', opts: ['Manchas', 'Linhas finas', 'Acne'], sel: 0 },
    { id: 'c3', n: 3, name: 'Resultado', x: 504, y: 206, kind: 'result' },
  ],
  edges: [['c1', 0, 'c2'], ['c2', 0, 'c3'], ['c2', 1, 'c3'], ['c2', 2, 'c3', 'Condição']],
};

function portY(node: Node, port: number) {
  switch (node.kind) {
    case 'welcome': return HEAD + 12 + 34 + 10 + 13;
    case 'options': return HEAD + 12 + 30 + 8 + port * 32 + 13;
    case 'form': return HEAD + 12 + 84 + 10 + 13;
    case 'rand': return HEAD + 10 + port * 32 + 13;
    default: return HEAD / 2;
  }
}
function path(from: Node, port: number, to: Node) {
  const a = { x: from.x + W, y: from.y + portY(from, port) };
  const b = { x: to.x, y: to.y + HEAD / 2 };
  const dx = Math.max(50, (b.x - a.x) * 0.5);
  return { d: `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`, mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } };
}

export function FlowArt({ variant = 'full' }: { variant?: 'full' | 'teaser' | 'logic' }) {
  const { size, nodes, edges } = variant === 'teaser' ? TEASER : variant === 'logic' ? LOGIC : FULL;
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <Scaled width={size[0]} height={size[1]} className="fa">
      <div className="fa__canvas" style={{ width: size[0], height: size[1] }}>
        <svg className="fa__svg" viewBox={`0 0 ${size[0]} ${size[1]}`} aria-hidden="true">
          {edges.map(([f, p, t], i) => <path key={i} d={path(byId[f], p, byId[t]).d} data-edge={i} pathLength={1} />)}
          {edges.map(([f, p, t], i) => <path key={'p' + i} className="fa__pulse" d={path(byId[f], p, byId[t]).d} data-pulse={i} pathLength={1} />)}
        </svg>
        {edges.map(([f, p, t, label], i) => {
          if (!label) return null;
          const { mid } = path(byId[f], p, byId[t]);
          return <span key={'l' + i} className={`fa__tag ${label.length === 1 ? 'fa__tag--ab' : ''}`} style={{ left: mid.x, top: mid.y }} data-node={`tag-${i}`}>{label}</span>;
        })}
        {nodes.map((n) => (
          <div key={n.id} className={`fa__node fa__node--${n.kind}`} style={{ left: n.x, top: n.y, width: W }} data-node={n.id}>
            <span className="fa__in" />
            <div className="fa__head">
              {n.kind === 'rand' ? <Shuffle size={14} /> : <b>{n.n}</b>}
              <span>{n.name}</span>
              {n.kind !== 'rand' && <Sparkles size={12} className="fa__ai" />}
            </div>
            {n.kind === 'welcome' && (
              <div className="fa__body">
                <p className="fa__q fa__q--title">{n.q}</p>
                <span className="fa__btn fa__btn--port">Começar<i className="fa__port" /></span>
              </div>
            )}
            {n.kind === 'options' && (
              <div className="fa__body">
                <p className="fa__q">{n.q}</p>
                {n.opts!.map((o, i) => (
                  <span key={o} className={`fa__opt ${i === n.sel ? 'fa__opt--on' : ''}`}><i className="fa__radio" />{o}<i className="fa__port" /></span>
                ))}
              </div>
            )}
            {n.kind === 'form' && (
              <div className="fa__body">
                {['Nome completo', 'seu@email.com', '(00) 00000-0000'].map((p, i) => <span key={p} className={`fa__field ${i === 0 ? 'fa__field--filled' : ''}`}>{i === 0 ? 'Vinicius Pires' : p}</span>)}
                <span className="fa__btn fa__btn--port">Ver meu resultado<i className="fa__port" /></span>
              </div>
            )}
            {n.kind === 'result' && (
              <div className="fa__body">
                <div className="fa__result"><Trophy size={16} /><div><b>Pele mista</b><span>Rotina recomendada</span></div></div>
                <div className="fa__bar"><i style={{ width: '78%' }} /></div>
                <span className="fa__lead"><UserRound size={11} /> Lead capturado</span>
              </div>
            )}
            {n.kind === 'rand' && (
              <div className="fa__body">
                {['Caminho A', 'Caminho B'].map((c, i) => (
                  <span key={c} className="fa__opt fa__opt--rand">{c}<b data-rand-pct={i}>50%</b><i className="fa__port" /></span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Scaled>
  );
}
