import { Check, Waypoints, LayoutTemplate } from 'lucide-react';
import { AppShell } from './AppShell';
import { GhostCursor } from './GhostCursor';

/** Tela "Novo Projeto" — escolha entre Funil de Quiz e Página de Venda (copiada do app). */
export function NewProjectScreen({ selected }: { selected?: 'quiz' | 'page' }) {
  return (
    <AppShell active="new">
      <div style={{ padding: '32px 200px' }}>
        <div className="scard" style={{ padding: '28px 28px', background: 'linear-gradient(90deg,#f6f1fd 0%, #fff 55%)' }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em' }}>Novo Projeto</div>
          <div className="smuted" style={{ fontSize: 14, marginTop: 4 }}>Escolha o tipo de projeto que deseja criar.</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 32 }}>
          <div className={`choice ${selected === 'quiz' ? 'choice--on' : ''}`} data-choice="quiz">
            {selected === 'quiz' && <span className="choice__check"><Check size={13} strokeWidth={3} /></span>}
            <div className="choice__art">
              <div className="mini" style={{ transform: 'rotate(-2deg)' }}>
                <div className="mini__bar" style={{ width: '46%' }} />
                <div className="mini__opt mini__opt--on" />
                <div className="mini__opt" />
                <div className="mini__opt" />
                <div className="mini__progress"><i /></div>
              </div>
            </div>
            <div className="choice__title">
              <span className="choice__icon"><Waypoints /></span>
              <div><b>Funil de Quiz</b><span>Várias etapas com perguntas, coleta de dados e navegação condicional.</span></div>
            </div>
          </div>
          <div className={`choice ${selected === 'page' ? 'choice--on' : ''}`} data-choice="page">
            {selected === 'page' && <span className="choice__check"><Check size={13} strokeWidth={3} /></span>}
            <div className="choice__art">
              <div className="mini">
                <div className="mini__bar" style={{ width: '100%', background: '#e4e4e7' }} />
                <div className="mini__hero">
                  <div><div className="mini__bar" style={{ width: '70%', marginTop: 4 }} /><div className="mini__bar" style={{ width: '90%', marginTop: 8 }} /><div className="mini__btn" /></div>
                  <div className="mini__img" />
                </div>
                <div className="mini__grid"><i /><i /><i /></div>
              </div>
            </div>
            <div className="choice__title">
              <span className="choice__icon"><LayoutTemplate /></span>
              <div><b>Página de Venda</b><span>Uma única página com seções verticais de conversão.</span></div>
            </div>
          </div>
        </div>
      </div>
      <GhostCursor />
    </AppShell>
  );
}
