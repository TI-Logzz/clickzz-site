/**
 * Logo Clickzz — arquivos reais fornecidos pelo cliente (public/brand/*).
 * A proporção da logo completa é ~4.05:1 (marca quadrada + wordmark).
 * Na interface vão as versões @78 em WebP (78 px de altura = 3x a maior exibição, ~11 KB);
 * os PNG maiores ficam como originais.
 */
const RATIO = 4.05;
const BASE = import.meta.env.BASE_URL;

export function Logo({ height = 28, mark = false, light = false }: { height?: number; mark?: boolean; light?: boolean }) {
  if (mark) return <LogoMark size={height} />;
  const src = `${BASE}brand/${light ? 'clickzz-logo-white@78.webp' : 'clickzz-logo@78.webp'}`;
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
