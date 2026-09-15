import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { nav, APP_URL } from '../content/copy';
import { scrollTo } from '../lib/scroll';
import { Logo } from './Logo';
import './nav.css';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setPct(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(href);
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__progress" aria-hidden="true" style={{ transform: `scaleX(${pct})` }} />
      <div className="nav__inner container--wide">
        <a href="#" className="nav__brand" onClick={go('#top')} aria-label="Clickzz — início">
          <Logo height={30} />
        </a>
        <nav className="nav__links" aria-label="Seções da página">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} onClick={go(l.href)}>{l.label}</a>
          ))}
        </nav>
        <div className="nav__actions">
          <a className="nav__login" href={`${APP_URL}/login`}>Entrar</a>
          <a className="btn btn--primary btn--sm" href={APP_URL}>
            <span className="btn__sheen" aria-hidden="true" />
            <span style={{ position: 'relative' }}>{nav.cta}</span>
          </a>
          <button className="nav__burger" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <div className="nav__sheet" hidden={!open}>
        {nav.links.map((l) => (
          <a key={l.href} href={l.href} onClick={go(l.href)}>{l.label}</a>
        ))}
        <a href={`${APP_URL}/login`}>Entrar</a>
        <a className="btn btn--primary" href={APP_URL}><span style={{ position: 'relative' }}>{nav.cta}</span></a>
      </div>
    </header>
  );
}
