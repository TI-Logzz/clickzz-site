import { ArrowLeft, Check, Plus, Globe, FolderInput, Sparkles, LayoutGrid, Palette, CircleDollarSign, HelpCircle } from 'lucide-react';
import { AppShell } from './AppShell';
import { GhostCursor } from './GhostCursor';

export const QUIZ_BRIEF =
  'Quiz de diagnóstico para uma clínica de estética que recomenda o tratamento ideal e captura o WhatsApp. Etapa 1: boas-vindas. Etapa 2: "Qual é a sua maior preocupação hoje?" (Manchas, Linhas finas, Flacidez, Acne). Etapa 3: frequência de cuidados. Etapa 4: nome, e-mail e WhatsApp. Etapa 5: resultado com "Agendar avaliação gratuita".';

/** Tela "Novo Funil de Quiz" (Etapa 1 de 2 · Briefing), reproduzida do app. */
export function QuizStartScreen() {
  return (
    <AppShell active="new">
      <div style={{ padding: '24px 256px 0', height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}><ArrowLeft size={16} /> Trocar tipo de projeto</div>
        <div className="smuted" style={{ fontSize: 12, marginTop: 20 }}>Etapa 1 de 2 · Briefing</div>
        <div style={{ height: 6, background: '#e5e7eb', borderRadius: 3, marginTop: 8, overflow: 'hidden' }}><div style={{ width: '50%', height: '100%', background: '#6b26d9' }} /></div>
        <div className="stitle" style={{ marginTop: 22 }}>Novo Funil de Quiz</div>
        <div style={{ fontSize: 14, fontWeight: 500, marginTop: 14 }}>Título do funil <span style={{ color: '#dc2626' }}>*</span></div>
        <div className="sinput" style={{ marginTop: 8 }} data-quiz-title>
          <span className="smuted" data-title-placeholder>Título do seu funil...</span>
          <span data-title-value style={{ color: '#282c34', display: 'none' }}>Diagnóstico de Pele — Clínica Lumen</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 500, marginTop: 20 }}>Base</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 8 }}>
          <div className="choice choice--on" style={{ height: 134, display: 'grid', placeItems: 'center', padding: 0 }}>
            <span className="choice__check"><Check size={13} strokeWidth={3} /></span>
            <div style={{ textAlign: 'center', color: '#6b26d9' }}><Plus size={26} /><div style={{ color: '#282c34', fontSize: 14, marginTop: 6 }}>Do zero</div></div>
          </div>
          <div className="choice" style={{ height: 134, display: 'grid', placeItems: 'center', padding: 0, opacity: 0.6 }}>
            <div style={{ textAlign: 'center', color: '#9ca3af' }}><Globe size={26} /><div style={{ fontSize: 14, marginTop: 6 }}>Templates</div><div style={{ fontSize: 11 }}>Em breve</div></div>
          </div>
          <div className="choice" style={{ height: 134, display: 'grid', placeItems: 'center', padding: 0, opacity: 0.6 }}>
            <div style={{ textAlign: 'center', color: '#9ca3af' }}><FolderInput size={26} /><div style={{ fontSize: 14, marginTop: 6 }}>Importar</div><div style={{ fontSize: 11 }}>Em breve</div></div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24, fontSize: 14, fontWeight: 500 }}><Sparkles size={16} color="#6b26d9" /> Utilizar auxílio de IA <HelpCircle size={14} color="#9ca3af" /></div>
        <div className="smuted" style={{ fontSize: 13, marginTop: 8 }}>O que a IA deve gerar?</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 8 }}>
          <div className="choice choice--on" style={{ height: 96, display: 'grid', placeItems: 'center', padding: 0 }}>
            <span className="choice__check"><Check size={13} strokeWidth={3} /></span>
            <div style={{ textAlign: 'center' }}><LayoutGrid size={22} color="#6b26d9" /><div style={{ fontSize: 14, marginTop: 6, fontWeight: 500 }}>Apenas etapas e elementos</div></div>
          </div>
          <div className="choice" style={{ height: 96, display: 'grid', placeItems: 'center', padding: 0 }}>
            <div style={{ textAlign: 'center' }}><Palette size={22} color="#6b26d9" /><div style={{ fontSize: 14, marginTop: 6, fontWeight: 500 }}>Também identidade visual</div></div>
          </div>
        </div>
        <div className="smuted" style={{ fontSize: 12, marginTop: 8 }}>O quiz será gerado com o estilo padrão do sistema. Você pode personalizá-lo depois no editor.</div>
        <div style={{ marginTop: 12, border: '1px solid #fde68a', background: '#fffbeb', borderRadius: 8, padding: '10px 14px', fontSize: 12, display: 'flex', gap: 10 }}>
          <CircleDollarSign size={16} color="#b45309" />
          <div><b style={{ color: '#92400e' }}>Custo: 1 moeda por etapa gerada.</b><div style={{ color: '#a16207' }}>A revisão do roteiro e a identidade visual não consomem moedas.</div></div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 500, marginTop: 16 }}>Descrição do quiz ou roteiro completo etapa por etapa</div>
        <div style={{ position: 'relative', marginTop: 8, border: '1.5px solid #e5e7eb', borderRadius: 8, minHeight: 150, padding: '12px 14px', fontSize: 14, lineHeight: 1.5, background: '#fff' }} data-quiz-desc>
          <span className="smuted" data-desc-placeholder>Descreva o quiz que você deseja criar, ou cole o roteiro já dividido em etapas...</span>
          <span data-desc-typed style={{ color: '#282c34' }} />
          <span className="sbtn sbtn--primary" style={{ position: 'absolute', right: 14, bottom: 14 }} data-quiz-continue>Continuar</span>
          <span className="smuted" style={{ position: 'absolute', right: 14, bottom: -22, fontSize: 11 }} data-desc-count>0/10.000</span>
        </div>
      </div>
      <GhostCursor />
    </AppShell>
  );
}
