import { Download, CirclePlus, Settings, Copy } from 'lucide-react';
import { AppShell } from './AppShell';
import { GhostCursor } from './GhostCursor';

/** Dashboard "Meus Projetos", reproduzido da captura real (card com miniatura, status, tipo, #ID, data e Configurações). */
export function DashboardScreen({ projects = true }: { projects?: boolean }) {
  const items = [
    { name: 'Diagnóstico de Pele — Clínica Lumen', kind: 'QUIZ', id: '#FTTWP9', status: 'Publicado', date: '15/09/2026', thumb: 'quiz' },
    { name: 'Curso Confeitaria Lucrativa', kind: 'PÁGINA', id: '#K2M7QA', status: 'Publicado', date: '15/09/2026', thumb: 'page' },
    { name: 'Quiz Renda Extra — Mentoria', kind: 'QUIZ', id: '#9XPL3D', status: 'Rascunho', date: '12/09/2026', thumb: 'quiz2' },
  ];
  return (
    <AppShell active="projects">
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="stitle" style={{ fontSize: 26 }}>Meus Projetos</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="sbtn sbtn--outline"><Download /> Importar Funil</span>
            <span className="sbtn sbtn--primary" data-new-project><CirclePlus /> Novo Projeto</span>
          </div>
        </div>
        <div className="stabs" style={{ marginTop: 22 }}>
          <span className="stab stab--active">Todos</span><span className="stab">Quizzes</span><span className="stab">Páginas</span>
        </div>
        {projects ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 368px)', gap: 16, marginTop: 20 }}>
            {items.map((p, i) => (
              <div key={p.id} className="scard" data-project={i} style={{ overflow: 'hidden' }}>
                <div style={{ height: 160, background: '#fff', borderBottom: '1px solid #e5e7eb', padding: 14, position: 'relative' }}>
                  {p.thumb === 'page' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px', gap: 10 }}>
                      <div><div style={{ height: 8, width: '70%', background: '#e5e7eb', borderRadius: 4 }} /><div style={{ height: 6, width: '90%', background: '#ececef', borderRadius: 4, marginTop: 8 }} /><div style={{ height: 6, width: '60%', background: '#ececef', borderRadius: 4, marginTop: 6 }} /><div style={{ height: 14, width: 70, background: '#a21caf', borderRadius: 4, marginTop: 12 }} /></div>
                      <div style={{ height: 70, borderRadius: 8, background: 'linear-gradient(135deg,#fde7f3,#f5d0fe)' }} />
                      <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>{[0, 1, 2].map((k) => <div key={k} style={{ height: 26, background: '#f4f4f5', borderRadius: 6 }} />)}</div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 8, color: '#6b26d9' }}>T Título</div>
                      <div style={{ height: 10, background: '#6b26d9', borderRadius: 2, marginTop: 4, color: '#fff', fontSize: 6, textAlign: 'center' }}>Começar</div>
                      {p.thumb === 'quiz2' && [0, 1, 2].map((k) => <div key={k} style={{ height: 14, border: '1px solid #e5e7eb', borderRadius: 4, marginTop: 6 }} />)}
                    </div>
                  )}
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <b style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{p.name}</b>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: p.status === 'Publicado' ? '#ecfdf5' : '#f4f4f5', color: p.status === 'Publicado' ? '#047857' : '#282c34', whiteSpace: 'nowrap' }} data-status>{p.status}</span>
                      <div className="smuted" style={{ fontSize: 10, letterSpacing: '0.06em', marginTop: 6 }}>{p.kind}</div>
                    </div>
                  </div>
                  <div className="smuted" style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}><Copy size={11} /> {p.id}</div>
                  <div className="smuted" style={{ fontSize: 12, marginTop: 8 }}>Criado em {p.date}</div>
                  <div className="sbtn sbtn--outline" style={{ width: '100%', marginTop: 12, height: 38 }}><Settings /> Configurações</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="scard" style={{ marginTop: 20, height: 120, display: 'grid', placeItems: 'center', color: '#6b7280', fontSize: 16 }}>Nenhum projeto encontrado.</div>
        )}
      </div>
      <GhostCursor />
    </AppShell>
  );
}
