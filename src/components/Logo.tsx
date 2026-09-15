/**
 * Logo Clickzz — arquivos reais fornecidos pelo cliente (public/brand/*).
 * A proporção da logo completa é ~3.06:1 (marca quadrada + wordmark).
 */
const RATIO = 3.06;
const BASE = import.meta.env.BASE_URL;

export function Logo({ height = 28, mark = false, light = false }: { height?: number; mark?: boolean; light?: boolean }) {
  if (mark) return <LogoMark size={height} />;
  const src = `${BASE}brand/${light ? 'clickzz-logo-white@120.png' : 'clickzz-logo@120.png'}`;
  return (
    <img
      src={src}
      alt="Clickzz"
      height={height}
      width={Math.round(height * RATIO)}
      style={{ height, width: 'auto', display: 'block' }}
      decoding="async"
    />
  );
}

export function LogoMark({ size = 28 }: { size?: number }) {
  return <img src={`${BASE}brand/clickzz-mark-256.v2.png`} alt="" aria-hidden="true" width={size} height={size} style={{ width: size, height: size, display: 'block', borderRadius: size * 0.22 }} decoding="async" />;
}
