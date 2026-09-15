import type { ReactNode } from 'react';
import { User, CreditCard, CircleDollarSign, FolderOpen, CirclePlus, PanelLeft } from 'lucide-react';
import { Logo } from '../components/Logo';

interface Props {
  active?: 'projects' | 'new' | 'plan' | 'coins' | 'profile';
  coins?: number;
  children: ReactNode;
  /** oculta a sidebar (ex.: builder em tela cheia) */
  bare?: boolean;
}

/** Chrome do app Clickzz: sidebar + topbar, reproduzido a partir das capturas reais. */
export function AppShell({ active = 'projects', coins = 150, children, bare = false }: Props) {
  if (bare) return <div className="scr">{children}</div>;
  return (
    <div className="scr">
      <div className="shell">
        <aside className="shell__side">
          <div className="shell__logo"><Logo height={30} /></div>
          <div className="shell__group">
            <div className="shell__label">Perfil</div>
            <div className={`shell__item ${active === 'profile' ? 'shell__item--active' : ''}`}><User /> Minhas Informações</div>
            <div className={`shell__item ${active === 'plan' ? 'shell__item--active' : ''}`}><CreditCard /> Meu Plano</div>
            <div className={`shell__item ${active === 'coins' ? 'shell__item--active' : ''}`}><CircleDollarSign /> Moedas</div>
          </div>
          <div className="shell__group">
            <div className="shell__label">Painel</div>
            <div className={`shell__item ${active === 'projects' ? 'shell__item--active' : ''}`}><FolderOpen /> Meus Projetos</div>
            <div className={`shell__item ${active === 'new' ? 'shell__item--active' : ''}`}><CirclePlus /> Novo Projeto</div>
          </div>
          <div className="shell__foot"><span>ana.marques@…</span><b>Sair</b></div>
        </aside>
        <header className="shell__top">
          <PanelLeft size={16} color="#3f4650" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="shell__coins"><CircleDollarSign size={18} /> <span data-coins>{coins}</span></span>
            <span className="sbtn sbtn--outline">Recarregar</span>
          </div>
        </header>
        <div className="shell__main">{children}</div>
      </div>
    </div>
  );
}
