import { Check, Plus, Sparkles, ArrowLeft } from 'lucide-react';
import { AppShell } from './AppShell';
import { GhostCursor } from './GhostCursor';

export const PAGE_BRIEF =
  'Página de vendas para o curso online Confeitaria Lucrativa. Público: mulheres de 25 a 45 anos que querem renda extra. Oferta: 40 aulas, grupo de alunas e planilha de precificação. Bônus: aula de fotografia de doces. Garantia de 7 dias. 12x de R$ 29,70.';

/** Tela "Nova Página de Venda", reproduzida do app. */
export function PageStartScreen() {
  return (
    <AppShell active="new">
      <div style={{ padding: '32px 200px 0', height: '100%', overflow: 'hidden' }}>
        <div className="scard" style={{ padding: '28px 28px', background: 'linear-gradient(90deg,#f6f1fd 0%, #fff 55%)' }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em' }}>Nova Página de Venda</div>
          <div className="smuted" style={{ fontSize: 14, marginTop: 4 }}>Monte do zero ou deixe a IA criar as seções, os textos e o visual.</div>
        </div>
        <div className="scard" style={{ padding: 20, marginTop: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Título da página <span style={{ color: '#dc2626' }}>*</span></div>
          <div className="sinput" style={{ marginTop: 8 }} data-page-title>
            <span className="smuted" data-title-placeholder>Título da sua página...</span>
            <span data-title-value style={{ color: '#282c34', display: 'none' }}>Curso Confeitaria Lucrativa</span>
          </div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 500, marginTop: 20 }}>Como começar</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 10 }}>
          <div className="choice" data-choice="blank">
            <div className="choice__art" style={{ background: '#f7f7f8' }}>
              <div style={{ width: 170, height: 140, border: '2px dashed #d4d4d8', borderRadius: 10, display: 'grid', placeItems: 'center', color: '#6b26d9', background: '#fafafa' }}><Plus size={30} /></div>
            </div>
            <div className="choice__title">
              <span className="choice__icon"><Plus /></span>
              <div><b>Em branco</b><span>Uma página vazia para montar do zero.</span></div>
            </div>
          </div>
          <div className="choice" data-choice="ai">
            <span className="choice__check" data-ai-check style={{ opacity: 0 }}><Check size={13} strokeWidth={3} /></span>
            <div className="choice__art">
              <div className="mini" style={{ position: 'relative' }}>
                <div className="mini__bar" style={{ width: '60%', background: '#c4b5fd' }} />
                <div className="mini__bar" style={{ width: '90%', marginTop: 8 }} />
                <div className="mini__bar" style={{ width: '75%', marginTop: 8 }} />
                <div className="mini__hero"><div className="mini__img" /><div style={{ background: '#e4e4e7', borderRadius: 8 }} /></div>
                <div className="mini__btn" />
                <Sparkles size={26} color="#6b26d9" fill="#6b26d9" style={{ position: 'absolute', right: 10, top: 6 }} />
              </div>
            </div>
            <div className="choice__title">
              <span className="choice__icon"><Sparkles /></span>
              <div><b>Gerar com IA</b><span>A IA cria seções, textos e visual.</span></div>
            </div>
          </div>
        </div>
        <div className="scard" style={{ marginTop: 20, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="smuted" style={{ fontSize: 12 }}>Você pode alterar tudo depois no editor.</span>
          <div style={{ display: 'flex', gap: 10 }}>
            <span className="sbtn sbtn--outline"><ArrowLeft /> Voltar</span>
            <span className="sbtn sbtn--primary" data-page-create>Criar página</span>
          </div>
        </div>
      </div>
      <GhostCursor />
    </AppShell>
  );
}
