import { ArrowLeft, Sparkles, Palette, Link2, FileText, CircleDollarSign, Undo2, Redo2, History, Save, Settings, Globe, LayoutGrid, Shuffle, ExternalLink } from 'lucide-react';
import { GhostCursor } from './GhostCursor';

/**
 * Aba "Conexões" do builder de quiz (reproduzida da captura real):
 * canvas pontilhado, nós = miniaturas de celular com número e nome, fios roxos
 * saindo das portas de cada opção até a próxima etapa. Inclui um Randomizador
 * e uma bifurcação para a seção 06.
 */
export interface FlowNode { id: string; n: number; name: string; x: number; y: number; kind: 'welcome' | 'options' | 'form' | 'result' | 'rand'; opts?: string[]; }

export const FLOW_NODES: FlowNode[] = [
  { id: 'n1', n: 1, name: 'Boas-vindas', x: 60, y: 300, kind: 'welcome' },
  { id: 'n2', n: 2, name: 'Preocupação…', x: 330, y: 240, kind: 'options', opts: ['Manchas', 'Linhas finas', 'Flacidez', 'Acne'] },
  { id: 'n3', n: 3, name: 'Rotina de Cui…', x: 600, y: 120, kind: 'options', opts: ['Todo dia', 'Algumas vezes', 'Raramente'] },
  { id: 'n3b', n: 3, name: 'Rotina (acne)', x: 600, y: 470, kind: 'options', opts: ['Todo dia', 'Raramente'] },
  { id: 'r1', n: 0, name: 'Randomizador', x: 870, y: 330, kind: 'rand' },
  { id: 'n4', n: 4, name: 'Cadastro para…', x: 1090, y: 150, kind: 'form' },
  { id: 'n4b', n: 4, name: 'Cadastro (B)', x: 1090, y: 480, kind: 'form' },
];

// [from, port index, to]
export const FLOW_EDGES: [string, number, string][] = [
  ['n1', 0, 'n2'],
  ['n2', 0, 'n3'], ['n2', 1, 'n3'], ['n2', 2, 'n3'], ['n2', 3, 'n3b'],
  ['n3', 0, 'r1'], ['n3', 1, 'r1'], ['n3', 2, 'r1'],
  ['n3b', 0, 'r1'], ['n3b', 1, 'r1'],
  ['r1', 0, 'n4'], ['r1', 1, 'n4b'],
];

const NODE_W = 190;
function portPos(node: FlowNode, port: number) {
  const baseY = node.kind === 'options' ? 92 + port * 30 : node.kind === 'rand' ? 44 + port * 26 : 90;
  return { x: node.x + NODE_W, y: node.y + baseY };
}
function inPos(node: FlowNode) { return { x: node.x, y: node.y + (node.kind === 'rand' ? 44 : 60) }; }

export function edgePath(from: FlowNode, port: number, to: FlowNode) {
  const a = portPos(from, port);
  const b = inPos(to);
  const dx = Math.max(60, (b.x - a.x) * 0.5);
  return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
}

export function FlowCanvasScreen({ chrome = true, offsetY = 0 }: { chrome?: boolean; offsetY?: number }) {
  const byId = Object.fromEntries(FLOW_NODES.map((n) => [n.id, n]));
  return (
    <div className="scr">
      {chrome && (
        <div className="bld__top" style={{ height: 56, borderBottom: '1px solid #e5e7eb' }}>
          <div className="bld__crumb"><ArrowLeft size={16} /><b style={{ fontSize: 14, maxWidth: 170, lineHeight: 1.2 }}>Diagnóstico de Pele — Clínica Lumen</b><span className="pill" style={{ fontFamily: 'monospace' }}>#FTTWP9</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#f4f4f5', padding: 4, borderRadius: 999 }}>
            <span className="sbtn sbtn--sm sbtn--ghost" style={{ color: '#4b5563' }}><Sparkles /> Builder</span>
            <span className="sbtn sbtn--sm sbtn--ghost" style={{ color: '#4b5563' }}><Palette /> Estilo</span>
            <span className="sbtn sbtn--sm" style={{ background: '#6b26d9', color: '#fff', borderRadius: 999 }}><Link2 /> Conexões</span>
            <span className="sbtn sbtn--sm sbtn--ghost" style={{ color: '#4b5563' }}><FileText /> Preenchimentos</span>
            <span className="sbtn sbtn--sm sbtn--outline" style={{ borderRadius: 999, gap: 6 }}><CircleDollarSign color="#6b26d9" /> <b>145</b> <span className="smuted" style={{ fontSize: 12 }}>Recarregar</span></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#6b7280' }}>
            <Undo2 size={16} /><Redo2 size={16} /><History size={16} />
            <span className="sbtn sbtn--sm sbtn--outline" style={{ color: '#9ca3af' }}><Save /> Salvar</span>
            <Settings size={16} />
            <span className="sbtn sbtn--sm sbtn--primary"><Globe /> Publicar</span>
          </div>
        </div>
      )}
      <div className="flow" style={{ height: chrome ? 844 : 900 }}>
        <div style={{ position: 'absolute', left: 12, top: 12, display: 'flex', gap: 10, alignItems: 'center', zIndex: 5 }}>
          <span className="sbtn sbtn--outline"><LayoutGrid /> Auto-organizar</span>
          <span className="sbtn sbtn--outline" data-rand-btn><Shuffle /> Randomizador</span>
          <span className="sbtn sbtn--outline"><ExternalLink /> Link externo</span>
          <span className="smuted" style={{ fontSize: 12 }}>100%</span>
        </div>
        <div style={{ position: 'absolute', inset: 0, transform: `translateY(${offsetY}px)` }} data-flow-world>
          <svg className="flow__svg" viewBox="0 0 1440 844" preserveAspectRatio="none">
            {FLOW_EDGES.map(([f, p, t], i) => (
              <path key={i} d={edgePath(byId[f], p, byId[t])} data-edge={i} data-from={f} pathLength={1} />
            ))}
            {FLOW_EDGES.map(([f, p, t], i) => (
              <path key={'p' + i} className="pulse" d={edgePath(byId[f], p, byId[t])} data-pulse={i} pathLength={1} />
            ))}
          </svg>
          {FLOW_NODES.map((n) => (
            <div key={n.id} className={`node ${n.kind === 'rand' ? 'node--rand' : ''}`} data-node={n.id} style={{ left: n.x, top: n.y, width: NODE_W, padding: 0 }}>
              <span className="node__in" style={{ top: n.kind === 'rand' ? 40 : 56 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', fontSize: 12, fontWeight: 600 }}>
                {n.kind === 'rand' ? <Shuffle size={14} color="#6b26d9" /> : <span className="step__num" style={{ width: 18, height: 18, fontSize: 10, background: '#6b26d9', color: '#fff' }}>{n.n}</span>}
                {n.name}
              </div>
              {n.kind === 'rand' ? (
                <div style={{ padding: '4px 8px 10px' }}>
                  {['Caminho A', 'Caminho B'].map((c, i) => (
                    <div key={c} className="node__opt" style={{ position: 'relative', marginTop: 4, padding: '4px 8px' }}>
                      <span>{c}</span><b data-rand-pct={i} style={{ color: '#6b26d9' }}>50%</b>
                      <span className="node__port" style={{ right: -14 }} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ margin: '0 8px 8px', background: '#fff', border: '1px solid #ececef', borderRadius: 12, padding: '8px 8px 10px', boxShadow: '0 4px 12px -6px rgba(0,0,0,0.15)' }}>
                  <div style={{ width: 50, height: 6, borderRadius: 3, background: '#e5e7eb', margin: '0 auto' }} />
                  <div style={{ fontSize: 7, color: '#6b26d9', marginTop: 6 }}>← Voltar</div>
                  <div style={{ height: 3, background: '#e5e7eb', marginTop: 3, borderRadius: 2 }}><div style={{ width: `${20 * n.n}%`, height: '100%', background: '#6b26d9' }} /></div>
                  {n.kind === 'welcome' && (<>
                    <div style={{ fontSize: 9, fontWeight: 700, textAlign: 'center', marginTop: 10, lineHeight: 1.2 }}>Descubra o tratamento ideal para a sua pele em 1 minuto</div>
                    <div style={{ height: 14, background: '#6b26d9', borderRadius: 4, marginTop: 8, color: '#fff', fontSize: 7, display: 'grid', placeItems: 'center' }}>Começar</div>
                  </>)}
                  {n.kind === 'options' && (<>
                    <div style={{ fontSize: 7, marginTop: 8 }}>{n.n === 2 ? 'Qual é a sua maior preocupação hoje?' : 'Com que frequência você cuida da pele?'}</div>
                    {n.opts!.map((o, i) => (
                      <div key={o} style={{ position: 'relative', marginTop: 6, height: 22, border: '1px solid #ececef', borderRadius: 5, fontSize: 7, display: 'flex', alignItems: 'center', gap: 4, padding: '0 6px' }}>
                        <span style={{ width: 7, height: 7, borderRadius: 999, border: '1px solid #c4c4cc' }} />{o}
                        <span className="node__port" style={{ right: -22 }} data-port={`${n.id}-${i}`} />
                      </div>
                    ))}
                    <div style={{ height: 14, background: '#6b26d9', borderRadius: 4, marginTop: 8, color: '#fff', fontSize: 7, display: 'grid', placeItems: 'center' }}>Próximo</div>
                  </>)}
                  {n.kind === 'form' && (<>
                    <div style={{ fontSize: 7, marginTop: 8 }}>Nome Completo</div>
                    {['Digite seu nome completo', 'exemplo@email.com', '(00) 00000-0000'].map((p) => <div key={p} style={{ marginTop: 5, height: 18, border: '1px solid #ececef', borderRadius: 4, fontSize: 6.5, color: '#9ca3af', display: 'flex', alignItems: 'center', padding: '0 6px' }}>{p}</div>)}
                    <div style={{ height: 14, background: '#6b26d9', borderRadius: 4, marginTop: 8, color: '#fff', fontSize: 7, display: 'grid', placeItems: 'center' }}>Ver meu resultado</div>
                  </>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <GhostCursor />
    </div>
  );
}
