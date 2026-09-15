import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { Check, X } from 'lucide-react';
import { APP_URL } from '../content/copy';

type BtnVariant = 'primary' | 'ghost' | 'dark';
type BtnSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  size?: BtnSize;
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }: ButtonProps) {
  return (
    <button className={`btn btn--${variant} ${size !== 'md' ? `btn--${size}` : ''} ${className}`} {...rest}>
      {variant === 'primary' && <span className="btn__sheen" aria-hidden="true" />}
      <span style={{ position: 'relative' }}>{children}</span>
    </button>
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: BtnVariant;
  size?: BtnSize;
}

/** CTA que leva para o app. */
export function CtaLink({ variant = 'primary', size = 'md', className = '', children, href = APP_URL, ...rest }: LinkButtonProps) {
  return (
    <a className={`btn btn--${variant} ${size !== 'md' ? `btn--${size}` : ''} ${className}`} href={href} {...rest}>
      {variant === 'primary' && <span className="btn__sheen" aria-hidden="true" />}
      <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>{children}</span>
    </a>
  );
}

export function Eyebrow({ children, plain = false }: { children: ReactNode; plain?: boolean }) {
  return <span className={`eyebrow ${plain ? 'eyebrow--plain' : ''}`}>{children}</span>;
}

/** Estrela ✦ desenhada como gema de vidro (SVG autoral) para títulos. Mantém o glifo ✦ acessível. */
export function StarGem({ size = '0.72em' }: { size?: string }) {
  return (
    <span className="star-gem" role="img" aria-label="✦" style={{ display: 'inline-block', width: size, height: size, verticalAlign: '-0.06em', marginLeft: '0.08em' }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
        <defs>
          <linearGradient id="gemA" x1="20" y1="10" x2="80" y2="95" gradientUnits="userSpaceOnUse"><stop stopColor="#c9a4ff" /><stop offset="0.55" stopColor="#8b3fe0" /><stop offset="1" stopColor="#5b21b6" /></linearGradient>
          <linearGradient id="gemB" x1="50" y1="0" x2="50" y2="60" gradientUnits="userSpaceOnUse"><stop stopColor="#ffffff" stopOpacity="0.9" /><stop offset="1" stopColor="#ffffff" stopOpacity="0" /></linearGradient>
          <filter id="gemS" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#6d28d9" floodOpacity="0.35" /></filter>
        </defs>
        <path d="M50 2 C56 34 66 44 98 50 C66 56 56 66 50 98 C44 66 34 56 2 50 C34 44 44 34 50 2 Z" fill="url(#gemA)" filter="url(#gemS)" />
        <path d="M50 2 C56 34 66 44 98 50 L50 50 Z" fill="url(#gemB)" opacity="0.8" />
        <path d="M50 2 C44 34 34 44 2 50 L50 50 Z" fill="#ffffff" opacity="0.28" />
        <path d="M50 98 C56 66 66 56 98 50 L50 50 Z" fill="#2e1065" opacity="0.28" />
      </svg>
    </span>
  );
}

/** A estrela ✦ da marca, com brilho. */
export function Star({ size = '0.8em', className = '' }: { size?: string; className?: string }) {
  return (
    <span className={`star-glyph ${className}`} aria-hidden="true" style={{ fontSize: size }}>
      ✦
    </span>
  );
}

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li>
      <span className="mark" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
      <span>{children}</span>
    </li>
  );
}

export function CrossItem({ children }: { children: ReactNode }) {
  return (
    <li>
      <span className="mark" aria-hidden="true"><X size={14} strokeWidth={3} /></span>
      <span>{children}</span>
    </li>
  );
}

interface SectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  level?: 'h2' | 'h3';
  size?: 'h2' | 'h3';
  children?: ReactNode;
}

export function SectionHead({ eyebrow, title, lead, align = 'left', level = 'h2', size = 'h2', children }: SectionHeadProps) {
  const Tag = level;
  return (
    <div className={`section-head ${align === 'center' ? 'center' : ''}`}>
      <div data-reveal><Eyebrow>{eyebrow}</Eyebrow></div>
      <Tag className={`display ${size}`} data-reveal style={{ marginTop: '1.25rem' }}>{title}</Tag>
      {lead && <p className="lead" data-reveal style={{ marginTop: '1.25rem' }}>{lead}</p>}
      {children}
    </div>
  );
}
