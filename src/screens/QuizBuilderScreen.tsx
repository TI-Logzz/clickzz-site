import {
  ArrowLeft, Sparkles, Palette, Link2, FileText, CircleDollarSign, Undo2, Redo2, History, Save, Settings, Globe,
  GripVertical, Plus, Search, User, Mail, Phone, Hash, AlignLeft, Ruler, Weight, Calendar, MousePointerClick, ToggleLeft, LayoutGrid, Tag,
  Heading, Pilcrow, List, Image as ImageIcon, Video, Sigma, Smartphone, Monitor, CheckCircle2,
} from 'lucide-react';
import { GhostCursor } from './GhostCursor';

/**
 * Builder de quiz, reproduzido da captura real (/dashboard/funnels/:id/builder):
 * topbar com abas Builder/Estilo/Conexões/Preenchimentos, colunas ETAPAS e ELEMENTOS,
 * preview mobile ao centro e CONFIGURAÇÕES DA ETAPA à direita.
 */
export const QUIZ_STEPS = ['Boas-vindas', 'Preocupação Principal', 'Rotina de Cuidados', 'Cadastro para Resultado', 'Resultado Final'];

export function QuizBuilderScreen({ activeStep = 1, showToast = false, showProps = false }: { activeStep?: number; showToast?: boolean; showProps?: boolean }) {
  const elGroups: [string, [string, React.ComponentType<{ size?: number }>][]][] = [
    ['SOLICITAÇÕES DE DADOS', [['Nome', User], ['E-mail', Mail], ['Telefone', Phone], ['Número', Hash], ['Texto longo', AlignLeft], ['Altura', Ruler], ['Peso', Weight], ['Data', Calendar]]],
    ['CONVERSÃO', [['Botão', MousePointerClick], ['Sim/Não', ToggleLeft], ['Cards de opção', LayoutGrid], ['Preço', Tag]]],
    ['INFORMATIVOS', [['Título', Heading], ['Parágrafo', Pilcrow], ['Lista de itens', List]]],
    ['MÍDIAS', [['Imagem', ImageIcon], ['Vídeo', Video]]],
  ];
  return (
    <div className="scr">
      <div className="bld" style={{ gridTemplateColumns: '208px 224px 1fr 288px' }}>
        <div className="bld__top">
          <div className="bld__crumb">
            <ArrowLeft size={16} />
            <b style={{ fontSize: 14, lineHeight: 1.2, maxWidth: 170 }}>Diagnóstico de Pele — Clínica Lumen</b>
            <span className="pill" style={{ fontFamily: 'monospace' }}>#FTTWP9</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#f4f4f5', padding: 4, borderRadius: 999 }}>
            <span className="sbtn sbtn--sm" style={{ background: '#6b26d9', color: '#fff', borderRadius: 999 }} data-tab="builder"><Sparkles /> Builder</span>
            <span className="sbtn sbtn--sm sbtn--ghost" style={{ color: '#4b5563' }} data-tab="estilo"><Palette /> Estilo</span>
            <span className="sbtn sbtn--sm sbtn--ghost" style={{ color: '#4b5563' }} data-tab="conexoes"><Link2 /> Conexões</span>
            <span className="sbtn sbtn--sm sbtn--ghost" style={{ color: '#4b5563' }}><FileText /> Preenchimentos</span>
            <span className="sbtn sbtn--sm sbtn--outline" style={{ borderRadius: 999, gap: 6 }}><CircleDollarSign color="#6b26d9" /> <b data-coins>145</b> <span className="smuted" style={{ fontSize: 12 }}>Recarregar</span></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#6b7280' }}>
            <Undo2 size={16} /><Redo2 size={16} /><History size={16} />
            <span className="sbtn sbtn--sm sbtn--outline" style={{ color: '#9ca3af' }}><Save /> Salvar</span>
            <Settings size={16} />
            <span className="sbtn sbtn--sm sbtn--primary" data-publish><Globe /> Publicar</span>
          </div>
        </div>

        <aside className="bld__left" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="bld__panelhead" style={{ letterSpacing: '0.08em', fontSize: 12 }}>ETAPAS</div>
          <div style={{ padding: '8px 0' }} data-steps>
            {QUIZ_STEPS.map((s, i) => (
              <div key={s} className={`step ${i + 1 === activeStep ? 'step--active' : ''}`} data-step={i + 1} style={{ margin: '4px 8px', padding: '8px 8px' }}>
                <GripVertical size={14} color="#9ca3af" />
                <span className="step__num">{i + 1}</span>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', borderTop: '1px solid #e5e7eb', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }} data-new-step><Plus size={16} /> Nova etapa</div>
        </aside>

        <aside style={{ background: '#fff', borderRight: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <div className="bld__panelhead" style={{ letterSpacing: '0.08em', fontSize: 12 }}>ELEMENTOS</div>
          <div className="bld__search" data-search><Search /> Buscar elementos</div>
          <div style={{ padding: '4px 12px 12px' }} data-elements>
            {elGroups.map(([g, items]) => (
              <div key={g}>
                <div className="smuted" style={{ fontSize: 11, letterSpacing: '0.08em', fontWeight: 600, margin: '14px 0 8px' }}>{g}</div>
                {items.map(([n, Icon]) => (
                  <div key={n} className="scard" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 38, padding: '0 12px', marginTop: 8, fontSize: 14, borderRadius: 8 }} data-el={n}>
                    <Icon size={14} /> {n}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </aside>

        <div className="bld__canvas" style={{ display: 'flex', flexDirection: 'column', background: '#f5f5f7' }}>
          <div style={{ flex: 1, display: 'grid', placeItems: 'center', padding: '24px 0' }}>
            <div data-preview style={{ width: 384, height: 700, background: '#fff', borderRadius: 32, boxShadow: '0 8px 24px -8px rgba(0,0,0,0.15), 0 0 0 1px #e5e7eb', padding: '14px 16px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ width: 110, height: 16, borderRadius: 999, background: '#e5e7eb', margin: '0 auto' }} />
              <div className="smuted" style={{ fontSize: 12, marginTop: 14 }}>← Voltar</div>
              <div style={{ height: 5, background: '#e5e7eb', borderRadius: 3, marginTop: 8 }}><div data-progress style={{ width: '20%', height: '100%', background: '#6b26d9', borderRadius: 3 }} /></div>
              <div data-preview-body style={{ marginTop: 56 }}>
                {activeStep === 1 && (
                  <>
                    <div style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', lineHeight: 1.25, letterSpacing: '-0.01em' }} data-el-title>Descubra o tratamento ideal para a sua pele em 1 minuto</div>
                    <div style={{ marginTop: 22, height: 44, borderRadius: 8, background: '#6b26d9', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 600 }} data-el-button>Começar</div>
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    <div style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', lineHeight: 1.25 }}>Qual é a sua maior preocupação hoje?</div>
                    <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
                      {['Manchas', 'Linhas finas', 'Flacidez', 'Acne'].map((o, i) => (
                        <div key={o} className={`qz__opt ${i === 1 ? 'qz__opt--on' : ''}`} style={{ padding: '12px 14px', fontSize: 14 }} data-el-opt={i}><i />{o}</div>
                      ))}
                    </div>
                  </>
                )}
                {activeStep === 4 && (
                  <>
                    <div style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', lineHeight: 1.25 }}>Para onde enviamos o seu resultado?</div>
                    <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
                      {['Nome', 'E-mail', 'WhatsApp'].map((o) => (
                        <div key={o} className="sinput" style={{ height: 44 }}>{o}</div>
                      ))}
                      <div style={{ height: 44, borderRadius: 8, background: '#6b26d9', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 600 }}>Ver meu resultado</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div style={{ height: 52, borderTop: '1px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, color: '#6b7280', fontSize: 13 }}>
            <Undo2 size={16} /><Redo2 size={16} /><span style={{ width: 1, height: 20, background: '#e5e7eb' }} /><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Sigma size={16} /> Fórmulas matemáticas</span>
            <span style={{ width: 1, height: 20, background: '#e5e7eb' }} /><span style={{ background: '#f4f4f5', borderRadius: 6, padding: 6 }}><Smartphone size={16} /></span><Monitor size={16} />
          </div>
        </div>

        <aside className="bld__right">
          <div className="bld__panelhead" style={{ letterSpacing: '0.08em', fontSize: 12 }}>{showProps ? 'PROPRIEDADES DO ELEMENTO' : 'CONFIGURAÇÕES DA ETAPA'}</div>
          {showProps ? (
            <div data-props>
              <div className="prop"><div className="prop__label">Texto</div><div className="prop__field" data-prop-text>Olá, {'{{nome}}'}! Seu resultado está pronto.</div></div>
              <div className="prop"><div className="prop__label">Fonte</div><div className="prop__field" data-prop-font>Plus Jakarta Sans</div></div>
              <div className="prop"><div className="prop__label">Cor</div><div className="prop__row"><span className="prop__swatch" data-prop-color style={{ background: '#6b26d9' }} /><div className="prop__field" data-prop-color-hex>#6B26D9</div></div></div>
              <div className="prop"><div className="prop__label">Alinhamento</div><div className="prop__seg"><i>Esq.</i><i className="on">Centro</i><i>Dir.</i></div></div>
              <div className="prop"><div className="prop__label">Visibilidade condicional</div><div className="prop__field" data-prop-cond>Mostrar se preocupação = "Linhas finas"</div></div>
            </div>
          ) : (
            <div>
              <div className="prop" style={{ borderBottom: 0 }}><div className="prop__label">Nome da etapa</div><div className="prop__field" data-step-name>{QUIZ_STEPS[activeStep - 1]}</div></div>
              <div className="prop" style={{ borderBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 13 }}>Permitir voltar uma etapa</span><Toggle /></div>
              <div className="prop" style={{ borderBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 13 }}>Exibir progresso</span><Toggle /></div>
            </div>
          )}
        </aside>
      </div>
      {showToast && (
        <div className="stoast" data-toast><CheckCircle2 size={18} /> Funil criado com IA! (5 moeda(s) debitada(s))</div>
      )}
      <GhostCursor />
    </div>
  );
}

function Toggle() {
  return <span style={{ width: 44, height: 24, borderRadius: 999, background: '#6b26d9', position: 'relative', display: 'inline-block' }}><span style={{ position: 'absolute', top: 3, right: 3, width: 18, height: 18, borderRadius: 999, background: '#fff' }} /></span>;
}
