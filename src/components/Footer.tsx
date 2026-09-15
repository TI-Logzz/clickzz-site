import { footer } from '../content/copy';
import { Logo } from './Logo';
import './footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo height={28} />
          <p className="body" style={{ marginTop: '1rem' }}>{footer.tagline1}</p>
          <p className="body">{footer.tagline2}</p>
        </div>
        {footer.columns.map((col) => (
          <div key={col.title} className="footer__col">
            <div className="footer__title">{col.title}</div>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer__bottom">
        <span className="small">© {new Date().getFullYear()} {footer.brand}</span>
      </div>
    </footer>
  );
}
