import {
  ArrowLeft, Sparkles, Palette, Users, CircleDollarSign, Undo2, Redo2, History, Save, Globe, Plus, Search, Monitor, Smartphone, ZoomIn, PanelLeftClose,
  Box, Layers, Columns3, Grid3x3, MousePointerClick, DollarSign, ClipboardList, LayoutGrid, Type, Pilcrow, List, MessageSquareQuote, Clock, Database, HelpCircle, Quote,
  GalleryHorizontal, Image as ImageIcon, Video, CheckCircle2, PanelTop, PanelBottom, GripVertical, ChevronDown, Trash2,
} from 'lucide-react';
import { GhostCursor } from './GhostCursor';
import { PublishDialog } from './PublishDialog';

/**
 * Builder de página (/dashboard/projects/:id/builder), reproduzido das capturas reais:
 * topbar (título + PÁGINA, abas Builder/Estilo/Preenchimentos, desktop/mobile, zoom, moedas, Salvar, Publicar),
 * painel Seções/Camadas com Cabeçalho e Rodapé, painel Elementos (ESTRUTURA, CONVERSÃO, INFORMATIVOS, MÍDIAS)
 * ou ESTILO DO PROJETO (Tipografia/Cores/Layout), e o canvas com a página em zoom.
 */
export const PAGE_SECTIONS = ['Destaque', 'Oferta', 'Benefícios', 'Prova social', 'Comparação', 'Bônus', 'Garantia', 'FAQ', 'CTA final'];

interface Props {
  variant?: 'hero' | 'full';
  /** 'elements' = paleta; 'style' = Estilo do projeto (Tipografia); 'colors' = Estilo do projeto (Cores) */
  panel?: 'elements' | 'style' | 'colors';
  theme?: 'default' | 'brand';
  activeSection?: number;
  publishing?: boolean;
  toast?: string;
  chrome?: boolean;
}

type IconT = React.ComponentType<{ size?: number }>;
const GROUPS: [string, [string, IconT][]][] = [
  ['ESTRUTURA', [['Container', Box], ['Pilha', Layers], ['Colunas', Columns3], ['Grade', Grid3x3]]],
  ['CONVERSÃO', [['Botão', MousePointerClick], ['Preço', DollarSign], ['Formulário', ClipboardList], ['Planos', LayoutGrid]]],
  ['INFORMATIVOS', [['Título', Type], ['Parágrafo', Pilcrow], ['Lista de itens', List], ['Argumentos', Quote], ['Linha do tempo', Clock], ['Bloco de Dados', Database], ['FAQ', HelpCircle], ['Depoimentos', MessageSquareQuote], ['Carrossel', GalleryHorizontal]]],
  ['MÍDIAS', [['Imagem', ImageIcon], ['Vídeo', Video]]],
];

export function PageBuilderScreen({ panel = 'elements', theme = 'default', activeSection = 0, publishing = false, toast, chrome = true }: Props) {
  const accent = theme === 'brand' ? '#a21caf' : '#6b26d9';
  const titleFont = theme === 'brand' ? "'Sora', var(--font-app)" : 'var(--font-app)';
  const styleMode = panel === 'style' || panel === 'colors';
  const tabStyle = (on: boolean) => (on ? { background: '#ede4fb', color: '#6b26d9', borderRadius: 8 } : { color: '#4b5563' });

  return (
    <div className="scr" style={{ position: 'relative', background: '#f5f5f7' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '230px 288px 1fr', gridTemplateRows: chrome ? '56px 1fr' : '1fr', height: '100%' }}>
        {chrome && (
          <div className="bld__top" style={{ gridColumn: '1 / -1' }}>
            <div className="bld__crumb" style={{ gap: 14 }}>
              <ArrowLeft size={16} />
              <b style={{ fontSize: 15, fontWeight: 600 }}>Sérum Vitamina C · Lumen Skin</b>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', color: '#6b26d9', background: '#ede4fb', padding: '2px 8px', borderRadius: 6 }}>PÁGINA</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="sbtn sbtn--sm" style={tabStyle(!styleMode)} data-tab="builder"><Sparkles /> Builder</span>
              <span className="sbtn sbtn--sm" style={tabStyle(styleMode)} data-tab="estilo"><Palette /> Estilo</span>
              <span className="sbtn sbtn--sm" style={{ color: '#4b5563' }}><Users /> Preenchimentos</span>
              <span style={{ display: 'inline-flex', border: '1px solid #e5e7eb', borderRadius: 8, padding: 3, gap: 2, marginLeft: 14 }}>
                <span style={{ background: '#f4f4f5', borderRadius: 6, padding: '4px 8px', display: 'grid', placeItems: 'center' }}><Monitor size={14} /></span>
                <span style={{ padding: '4px 8px', display: 'grid', placeItems: 'center', color: '#6b7280' }}><Smartphone size={14} /></span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, padding: '0 8px' }}><ZoomIn size={14} /> 64%</span>
              <span className="sbtn sbtn--sm sbtn--outline" style={{ borderRadius: 999, gap: 6 }}><CircleDollarSign color="#6b26d9" /> <b data-coins>141</b> <span className="smuted" style={{ fontSize: 12 }}>Recarregar</span></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#6b7280' }}>
              <Undo2 size={16} /><Redo2 size={16} /><History size={16} />
              <span className="sbtn sbtn--outline" style={{ height: 36 }}><Save /> Salvar</span>
              <span className="sbtn sbtn--primary" style={{ height: 36 }} data-publish><Globe /> Publicar</span>
            </div>
          </div>
        )}

        {/* Seções / Camadas */}
        <aside style={{ background: '#fff', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 8px' }}>
            <span style={{ display: 'inline-flex', background: '#f4f4f5', borderRadius: 8, padding: 3, flex: 1 }}>
              <span style={{ flex: 1, textAlign: 'center', fontSize: 13, fontWeight: 500, padding: '6px 0', background: '#fff', borderRadius: 6, boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>Seções</span>
              <span style={{ flex: 1, textAlign: 'center', fontSize: 13, fontWeight: 500, padding: '6px 0', color: '#4b5563' }}>Camadas</span>
            </span>
            <Plus size={16} /><PanelLeftClose size={16} color="#6b7280" />
          </div>
          <div style={{ padding: '4px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 10px', borderRadius: 8, background: activeSection === -2 ? '#ede4fb' : 'transparent', fontSize: 14 }}><PanelTop size={15} /> Cabeçalho <span style={{ marginLeft: 'auto', fontSize: 11, color: '#6b26d9' }}>Ativo</span></div>
          </div>
          <div style={{ padding: '4px 8px', flex: 1 }} data-sections>
            {PAGE_SECTIONS.map((s, i) => (
              <div key={s} data-sec-item={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, fontSize: 14, background: i === activeSection ? '#ede4fb' : 'transparent', color: i === activeSection ? '#6b26d9' : '#282c34' }}>
                <GripVertical size={14} color="#9ca3af" /><span style={{ width: 20, height: 20, borderRadius: 5, background: i === activeSection ? '#6b26d9' : '#f4f4f5', color: i === activeSection ? '#fff' : '#3f4650', fontSize: 11, fontWeight: 600, display: 'grid', placeItems: 'center' }}>{i + 1}</span>{s}
              </div>
            ))}
          </div>
          <div style={{ padding: '4px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 10px', borderRadius: 8, fontSize: 14 }}><PanelBottom size={15} /> Rodapé <span style={{ marginLeft: 'auto', fontSize: 11, color: '#6b26d9' }}>Ativo</span></div>
          </div>
          <div style={{ padding: 8, borderTop: '1px solid #e5e7eb' }}><div className="sbtn sbtn--outline" style={{ width: '100%', height: 40 }} data-add-section><Plus /> Nova seção</div></div>
        </aside>

        {/* Elementos / Estilo do projeto */}
        <aside style={{ background: '#fff', borderRight: '1px solid #e5e7eb', overflow: 'hidden' }}>
          {styleMode ? (
            <div data-style-panel>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 12px', borderBottom: '1px solid #e5e7eb' }}><b style={{ fontSize: 12, letterSpacing: '0.08em' }}>ESTILO DO PROJETO</b><PanelLeftClose size={16} color="#6b7280" /></div>
              <div style={{ margin: 12, display: 'flex', background: '#f4f4f5', borderRadius: 8, padding: 3 }}>
                {['Tipografia', 'Cores', 'Layout'].map((t) => {
                  const on = (t === 'Tipografia' && panel === 'style') || (t === 'Cores' && panel === 'colors');
                  return <span key={t} style={{ flex: 1, textAlign: 'center', fontSize: 13, padding: '6px 0', borderRadius: 6, background: on ? '#fff' : 'transparent', boxShadow: on ? '0 1px 2px rgba(0,0,0,0.06)' : undefined, color: on ? '#282c34' : '#4b5563' }}>{t}</span>;
                })}
              </div>
              {panel === 'style' ? (
                <div style={{ padding: '0 12px' }}>
                  <div className="smuted" style={{ fontSize: 11, letterSpacing: '0.08em', fontWeight: 600 }}>FONTES</div>
                  <div style={{ fontSize: 13, marginTop: 12 }}>Fonte primária (títulos)</div>
                  <div className="prop__field" style={{ height: 38, marginTop: 6, fontSize: 15, fontWeight: 500 }} data-style-font>{theme === 'brand' ? 'Sora' : 'Plus Jakarta Sans'}<ChevronDown size={14} style={{ marginLeft: 'auto', color: '#6b7280' }} /></div>
                  <div style={{ marginTop: 10, background: '#f4f4f5', borderRadius: 8, padding: 12, fontFamily: titleFont }}><b style={{ fontSize: 15 }}>Lorem ipsum vitae</b><div style={{ fontSize: 14 }}>Lorem ipsum vitae</div><div style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div><div style={{ fontSize: 12, color: '#6b7280' }}>abcdefghijklmnopqrstuvwxyz</div></div>
                  <div style={{ fontSize: 13, marginTop: 14 }}>Fonte secundária (texto)</div>
                  <div className="prop__field" style={{ height: 38, marginTop: 6, fontSize: 15, fontWeight: 500 }}>Inter<ChevronDown size={14} style={{ marginLeft: 'auto', color: '#6b7280' }} /></div>
                  <div style={{ marginTop: 10, background: '#f4f4f5', borderRadius: 8, padding: 12 }}><b style={{ fontSize: 15 }}>Lorem ipsum vitae</b><div style={{ fontSize: 14 }}>Lorem ipsum vitae</div><div style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div></div>
                  <div style={{ fontSize: 13, marginTop: 14 }}>Fonte terciária (destaques)</div>
                  <div className="prop__field" style={{ height: 38, marginTop: 6, fontSize: 15, fontWeight: 500 }}>Inter<ChevronDown size={14} style={{ marginLeft: 'auto', color: '#6b7280' }} /></div>
                </div>
              ) : (
                <div style={{ padding: '0 12px' }}>
                  <div className="smuted" style={{ fontSize: 11, letterSpacing: '0.08em', fontWeight: 600 }}>CORES</div>
                  {[['Cor primária', accent, 'primary'], ['Cor de fundo', '#FFFFFF', 'bg'], ['Cor de títulos', theme === 'brand' ? '#1D1633' : '#111827', 'title'], ['Cor de textos', '#374151', 'text'], ['Cor de destaque', theme === 'brand' ? '#FBCFE8' : '#EDE4FB', 'accent']].map(([l, c, k]) => (
                    <div key={l} style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 12 }}>
                      <span className="prop__swatch" data-swatch={k} style={{ background: c, width: 36, height: 36, borderRadius: 8 }} />
                      <div style={{ flex: 1 }}><div style={{ fontSize: 13 }}>{l}</div><div className="prop__field" style={{ height: 30, fontSize: 12, fontFamily: 'monospace', marginTop: 4 }} data-hex={k}>{c.toUpperCase()}</div></div>
                    </div>
                  ))}
                  <div className="smuted" style={{ fontSize: 11, letterSpacing: '0.08em', fontWeight: 600, marginTop: 18 }}>PALETAS SUGERIDAS</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 10 }}>
                    {[['#6b26d9', '#ede4fb'], ['#a21caf', '#fbcfe8'], ['#0f766e', '#ccfbf1'], ['#b45309', '#fef3c7']].map(([a, b]) => (
                      <span key={a} style={{ height: 32, borderRadius: 8, border: a === accent ? '2px solid #6b26d9' : '1px solid #e5e7eb', background: `linear-gradient(90deg, ${a} 50%, ${b} 50%)` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div data-elements-panel>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 8px' }}>
                <span style={{ flex: 1, textAlign: 'center', fontSize: 13, fontWeight: 500, padding: 7, border: '1px solid #e5e7eb', borderRadius: 8 }}>Elementos</span>
                <PanelLeftClose size={16} color="#6b7280" />
              </div>
              <div className="bld__search" style={{ margin: '4px 8px 8px', height: 38 }}><Search /> Buscar elementos...</div>
              <div style={{ padding: '0 8px 8px' }} data-elements>
                {GROUPS.map(([g, items]) => (
                  <div key={g}>
                    <div className="smuted" style={{ fontSize: 11, letterSpacing: '0.1em', fontWeight: 600, margin: '14px 0 6px 4px' }}>{g}</div>
                    {items.map(([n, Icon]) => (
                      <div key={n} className="scard" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 40, padding: '0 12px', marginTop: 6, fontSize: 14, borderRadius: 8 }} data-el={n}>
                        <span style={{ color: '#6b26d9', display: 'grid', placeItems: 'center' }}><Icon size={15} /></span> {n}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Canvas */}
        <div style={{ position: 'relative', overflow: 'hidden', padding: '20px 40px 0' }}>
          <div className="pgdoc" data-pgdoc style={{ width: '100%', maxWidth: 820, margin: '0 auto', fontFamily: 'var(--font-app)', color: theme === 'brand' ? '#1d1633' : '#282c34', borderRadius: 10 }}>
            {/* Cabeçalho flutuante */}
            <div style={{ margin: '12px 20px 0', height: 40, borderRadius: 10, boxShadow: '0 4px 14px -6px rgba(0,0,0,0.18)', border: '1px solid #f0f0f2', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 16, fontSize: 9, background: '#fff', position: 'relative', zIndex: 2 }}>
              <b style={{ fontSize: 9 }}>Lumen Skin</b>
              <span style={{ marginLeft: 'auto', display: 'flex', gap: 12, color: '#3f4650' }}><span>Benefícios</span><span>Como usar</span><span>Dúvidas</span></span>
              <span style={{ background: theme === 'brand' ? accent : '#4f7df3', color: '#fff', borderRadius: 999, padding: '5px 10px', fontWeight: 600 }}>Ver oferta</span>
            </div>
            {/* Destaque */}
            <div className={`pgsec ${activeSection === 0 ? 'pgsec--sel' : ''}`} data-bsec={0} style={{ padding: '36px 40px 30px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24, alignItems: 'center' }}>
              {activeSection === 0 && <span className="pgsec__tag">Destaque · Impacto</span>}
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', fontFamily: titleFont }} data-el-title>Sérum Vitamina C: pele mais uniforme e luminosa em 4 semanas, com um frasco só.</div>
                <div style={{ fontSize: 11, color: '#6b6480', marginTop: 10, lineHeight: 1.5 }} data-el-text>Vitamina C, ácido hialurônico e niacinamida em uma textura leve. Frete grátis e pagamento na entrega.</div>
                <div style={{ display: 'inline-flex', height: 32, padding: '0 16px', borderRadius: theme === 'brand' ? 999 : 6, background: accent, color: '#fff', fontSize: 11, fontWeight: 600, alignItems: 'center', marginTop: 14 }} data-el-button>Quero o meu sérum</div>
                <div style={{ fontSize: 9, color: '#6b6480', marginTop: 10 }}>Kit com 3 por R$ 197 ou 12× de R$ 19,70. Garantia de 30 dias.</div>
              </div>
              <div style={{ aspectRatio: '4/3', borderRadius: 12, background: theme === 'brand' ? 'linear-gradient(135deg,#fde7f3,#f5d0fe)' : 'linear-gradient(135deg,#ede4fb,#d6bcfa)' }} data-el-image />
            </div>
            {/* Oferta */}
            <div className={`pgsec ${activeSection === 1 ? 'pgsec--sel' : ''}`} data-bsec={1} style={{ padding: '26px 40px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, borderTop: '1px solid #f0eef5' }}>
              {activeSection === 1 && <span className="pgsec__tag">Oferta</span>}
              {['Vitamina C 10%', 'Ácido hialurônico', 'Niacinamida'].map((t) => (
                <div key={t} style={{ border: '1px solid #f0eef5', borderRadius: 10, padding: 12 }}><div style={{ width: 22, height: 22, borderRadius: 6, background: theme === 'brand' ? '#fdf4ff' : '#ede4fb' }} /><b style={{ display: 'block', fontSize: 10, marginTop: 8, fontFamily: titleFont }}>{t}</b></div>
              ))}
            </div>
            {/* Benefícios */}
            <div className={`pgsec ${activeSection === 2 ? 'pgsec--sel' : ''}`} data-bsec={2} style={{ padding: '26px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'center', borderTop: '1px solid #f0eef5' }}>
              {activeSection === 2 && <span className="pgsec__tag">Benefícios</span>}
              <div style={{ aspectRatio: '4/3', borderRadius: 12, background: theme === 'brand' ? 'linear-gradient(160deg,#fff1f2,#fce7f3)' : '#f4f4f5' }} />
              <div><div style={{ fontSize: 16, fontWeight: 700, fontFamily: titleFont }}>Resultado sem complicar a rotina</div>{['Textura leve', 'Não oxida no frasco', 'Todos os tipos de pele'].map((t) => <div key={t} style={{ fontSize: 10, marginTop: 6, display: 'flex', gap: 6, alignItems: 'center' }}><span style={{ width: 6, height: 6, borderRadius: 999, background: accent }} />{t}</div>)}</div>
            </div>
            {/* Prova social */}
            <div className={`pgsec ${activeSection === 3 ? 'pgsec--sel' : ''}`} data-bsec={3} style={{ padding: '26px 40px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, borderTop: '1px solid #f0eef5', background: theme === 'brand' ? '#fdfaff' : '#fafafa' }}>
              {activeSection === 3 && <span className="pgsec__tag">Prova social · Depoimentos</span>}
              {['Mariana S.', 'Cláudia R.', 'Patrícia M.'].map((n) => <div key={n} style={{ background: '#fff', border: '1px solid #f0eef5', borderRadius: 10, padding: 12, fontSize: 9 }}><div style={{ color: '#f59e0b' }}>★★★★★</div><div style={{ marginTop: 6, color: '#6b6480' }}>"Chegou em 3 dias e paguei na entrega."</div><b style={{ display: 'block', marginTop: 6 }}>{n}</b></div>)}
            </div>
            {/* Comparação */}
            <div className={`pgsec ${activeSection === 4 ? 'pgsec--sel' : ''}`} data-bsec={4} style={{ padding: '26px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, borderTop: '1px solid #f0eef5' }}>
              {activeSection === 4 && <span className="pgsec__tag">Comparação</span>}
              <div style={{ border: '1px solid #f0eef5', borderRadius: 10, padding: 12, fontSize: 9, color: '#6b6480' }}><b style={{ color: '#282c34' }}>Rotina comum</b><div style={{ marginTop: 6 }}>✕ Dez passos e produtos</div><div>✕ Vitamina C que oxida</div></div>
              <div style={{ border: `1px solid ${accent}`, borderRadius: 10, padding: 12, fontSize: 9 }}><b>Com a Lumen</b><div style={{ marginTop: 6 }}>✓ Três ativos em um frasco</div><div>✓ Fórmula estabilizada</div></div>
            </div>
            {/* Bônus */}
            <div className={`pgsec ${activeSection === 5 ? 'pgsec--sel' : ''}`} data-bsec={5} style={{ padding: '26px 40px', borderTop: '1px solid #f0eef5' }}>
              {activeSection === 5 && <span className="pgsec__tag">Bônus</span>}
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: titleFont }}>Brindes do kit</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>{['Nécessaire Lumen Skin', 'Faixa de cabelo para skincare'].map((t) => <div key={t} style={{ border: '1px dashed #d4d4d8', borderRadius: 10, padding: 10, fontSize: 10 }}>{t}</div>)}</div>
            </div>
            {/* Garantia */}
            <div className={`pgsec ${activeSection === 6 ? 'pgsec--sel' : ''}`} data-bsec={6} style={{ padding: '26px 40px', borderTop: '1px solid #f0eef5' }}>
              {activeSection === 6 && <span className="pgsec__tag">Garantia</span>}
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 14, borderRadius: 12, background: theme === 'brand' ? '#fdf4ff' : '#ede4fb' }}><CheckCircle2 size={24} color={accent} /><div><b style={{ fontSize: 12, fontFamily: titleFont }}>Garantia de 30 dias</b><div style={{ fontSize: 9, color: '#6b6480' }}>Devolvemos 100% do valor. Sem perguntas.</div></div></div>
            </div>
            {/* FAQ */}
            <div className={`pgsec ${activeSection === 7 ? 'pgsec--sel' : ''}`} data-bsec={7} style={{ padding: '26px 40px', borderTop: '1px solid #f0eef5' }}>
              {activeSection === 7 && <span className="pgsec__tag">FAQ</span>}
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: titleFont }}>Perguntas frequentes</div>
              {['Como funciona o pagamento na entrega?', 'Serve para pele oleosa?'].map((q) => <div key={q} style={{ fontSize: 10, padding: '8px 0', borderBottom: '1px solid #f0eef5', display: 'flex', justifyContent: 'space-between' }}>{q}<ChevronDown size={10} /></div>)}
            </div>
            {/* CTA */}
            <div className={`pgsec ${activeSection === 8 ? 'pgsec--sel' : ''}`} data-bsec={8} style={{ padding: '30px 40px', borderTop: '1px solid #f0eef5', textAlign: 'center' }}>
              {activeSection === 8 && <span className="pgsec__tag">CTA final</span>}
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', fontFamily: titleFont }}>Kit com 3 por 12x de R$ 19,70</div>
              <div style={{ display: 'inline-flex', height: 34, padding: '0 18px', borderRadius: theme === 'brand' ? 999 : 6, background: accent, color: '#fff', fontSize: 11, fontWeight: 600, alignItems: 'center', marginTop: 12 }}>Quero o meu kit</div>
            </div>
            {/* Rodapé */}
            <div style={{ padding: '24px 40px', borderTop: '1px solid #f0eef5', display: 'flex', justifyContent: 'space-between', fontSize: 9 }}>
              <div><b style={{ fontSize: 11 }}>Lumen Skin</b><div style={{ color: '#6b6480', marginTop: 4, maxWidth: 220 }}>Skincare com ativos de verdade, entregue na sua casa e pago só na entrega.</div></div>
              <div style={{ display: 'flex', gap: 28 }}><div><b>O produto</b><div style={{ color: '#6b26d9', marginTop: 4 }}>Benefícios</div><div style={{ color: '#6b26d9' }}>Como usar</div></div><div><b>Sua compra</b><div style={{ color: '#6b26d9', marginTop: 4 }}>Kits e garantia</div><div style={{ color: '#6b26d9' }}>Perguntas frequentes</div></div></div>
            </div>
          </div>
        </div>
      </div>
      {activeSection >= 0 && (
        <span style={{ position: 'absolute', right: 56, top: 96, display: 'flex', gap: 6, zIndex: 3 }} aria-hidden="true"><i style={{ width: 26, height: 26, borderRadius: 6, background: '#fff', border: '1px solid #e5e7eb', display: 'grid', placeItems: 'center' }}><Trash2 size={12} color="#dc2626" /></i></span>
      )}
      {publishing && <PublishDialog kind="página" slug="serum-vitamina-c" domain="lumenskin.com.br/" />}
      {toast && <div className="stoast" data-toast><CheckCircle2 size={18} /> {toast}</div>}
      <GhostCursor />
    </div>
  );
}
