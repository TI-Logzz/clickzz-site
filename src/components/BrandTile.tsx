import type { SimpleIcon } from 'simple-icons';
import {
  siMeta, siTiktok, siGoogleads, siGoogletagmanager, siGooglesheets, siWhatsapp, siZapier, siMake, siN8n, siHubspot, siMailchimp, siShopify, siWoocommerce, siTelegram,
} from 'simple-icons';

const BASE = import.meta.env.BASE_URL;

/** Marcas exibidas na seção de integrações (ícones oficiais via simple-icons; Logzz e Coinzz com os SVGs das próprias marcas). */
export interface Brand { id: string; name: string; icon?: SimpleIcon; img?: string; wide?: boolean; }

export const BRANDS: Brand[] = [
  { id: 'meta', name: 'Pixel Meta', icon: siMeta },
  { id: 'gtm', name: 'Google Tag Manager', icon: siGoogletagmanager },
  { id: 'gads', name: 'Google Ads', icon: siGoogleads },
  { id: 'tiktok', name: 'TikTok', icon: siTiktok },
  { id: 'whatsapp', name: 'WhatsApp', icon: siWhatsapp },
  { id: 'sheets', name: 'Google Sheets', icon: siGooglesheets },
  { id: 'zapier', name: 'Zapier', icon: siZapier },
  { id: 'make', name: 'Make', icon: siMake },
  { id: 'n8n', name: 'n8n', icon: siN8n },
  { id: 'hubspot', name: 'HubSpot', icon: siHubspot },
  { id: 'mailchimp', name: 'Mailchimp', icon: siMailchimp },
  { id: 'shopify', name: 'Shopify', icon: siShopify },
  { id: 'woo', name: 'WooCommerce', icon: siWoocommerce },
  { id: 'telegram', name: 'Telegram', icon: siTelegram },
  { id: 'logzz', name: 'Logzz', img: `${BASE}brand/partners/logzz.svg`, wide: true },
  { id: 'coinzz', name: 'Coinzz', img: `${BASE}brand/partners/coinzz.svg`, wide: true },
];

export function BrandTile({ brand, size = 64 }: { brand: Brand; size?: number }) {
  // ícone: pastilha quadrada; wordmark (Logzz, Coinzz): mesma altura, largura pelo conteúdo
  return (
    <span
      className={`brand ${brand.wide ? 'brand--wide' : ''}`}
      title={brand.name}
      style={{ width: brand.wide ? 'auto' : size, height: size, paddingInline: brand.wide ? size * 0.34 : 0, borderRadius: size * 0.28 }}
    >
      {brand.icon ? (
        <svg viewBox="0 0 24 24" width={size * 0.44} height={size * 0.44} role="img" aria-label={brand.name}>
          <path d={brand.icon.path} fill={`#${brand.icon.hex === '000000' ? '111111' : brand.icon.hex}`} />
        </svg>
      ) : (
        <img src={brand.img} alt={brand.name} style={{ height: size * 0.32, width: 'auto' }} decoding="async" />
      )}
    </span>
  );
}
