import { Check, Star, ShieldCheck, ChevronDown, Play, Lock, Truck, HandCoins, Sparkles, Gift, Sun, Droplets, PackageCheck } from 'lucide-react';

/**
 * Página de vendas publicada "Sérum Vitamina C — Lumen Skin" — demonstração do resultado que o builder entrega.
 * Produto físico com frete grátis e pagamento na entrega (o perfil de quem anuncia na Logzz).
 * Conteúdo sintético (marca, clientes e números ilustrativos). Desenhada em 1440 px de largura; a moldura corta a altura.
 * Cada bloco tem data-sec para a timeline do hero montá-los um a um.
 */
const ROSE = '#a21caf';
const INK = '#1d1633';
const MUTED = '#6b6480';
const HEAD: React.CSSProperties = { fontFamily: "'Sora', var(--font-app)", letterSpacing: '-0.025em', color: INK, fontWeight: 700 };

function Avatar({ name, bg }: { name: string; bg: string }) {
  return (
    <span style={{ width: 34, height: 34, borderRadius: 999, background: bg, color: '#fff', fontSize: 12, fontWeight: 700, display: 'grid', placeItems: 'center', border: '2px solid #fff', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
      {name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
    </span>
  );
}

/** Frasco de sérum com conta-gotas, rodela de laranja e gotas — ilustração autoral em SVG. */
function Serum() {
  return (
    <svg viewBox="0 0 320 300" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id="srGlass" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#c2410c" /><stop offset="0.45" stopColor="#f59e0b" /><stop offset="1" stopColor="#b45309" /></linearGradient>
        <linearGradient id="srCap" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#3b2a4d" /><stop offset="0.5" stopColor="#5b476e" /><stop offset="1" stopColor="#2a1d38" /></linearGradient>
        <linearGradient id="srBase" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#e9d5ff" /><stop offset="1" stopColor="#c4b5fd" /></linearGradient>
        <radialGradient id="srOrange" cx="0.5" cy="0.5" r="0.5"><stop stopColor="#fde68a" /><stop offset="0.85" stopColor="#fb923c" /><stop offset="1" stopColor="#ea580c" /></radialGradient>
      </defs>
      {/* pedestal */}
      <ellipse cx="160" cy="266" rx="126" ry="16" fill="url(#srBase)" />
      <ellipse cx="160" cy="262" rx="114" ry="11" fill="#f5f3ff" />
      {/* rodela de laranja atrás do frasco */}
      <g transform="translate(236 208)">
        <circle r="44" fill="url(#srOrange)" />
        <circle r="36" fill="#fed7aa" opacity="0.7" />
        {[0, 45, 90, 135].map((a) => <path key={a} d="M0 -34 L0 34" stroke="#fdba74" strokeWidth="2.5" transform={`rotate(${a})`} />)}
        <circle r="5" fill="#fff7ed" />
      </g>
      {/* frasco */}
      <rect x="112" y="118" width="96" height="140" rx="22" fill="url(#srGlass)" />
      <rect x="124" y="130" width="14" height="112" rx="7" fill="#fff" opacity="0.28" />
      {/* rótulo */}
      <rect x="122" y="168" width="76" height="62" rx="10" fill="#fffaf5" />
      <text x="160" y="190" textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="11" fontWeight="700" fill="#1d1633">LUMEN</text>
      <text x="160" y="206" textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="8.5" fill="#6b6480">Vitamina C 10%</text>
      <rect x="140" y="215" width="40" height="4" rx="2" fill={ROSE} opacity="0.7" />
      {/* gargalo e conta-gotas */}
      <rect x="138" y="100" width="44" height="22" rx="4" fill="url(#srCap)" />
      <rect x="146" y="44" width="28" height="60" rx="14" fill="url(#srCap)" />
      <rect x="152" y="52" width="5" height="40" rx="2.5" fill="#fff" opacity="0.22" />
      {/* gotas */}
      <path d="M86 150 c0 -10 8 -18 8 -18 s8 8 8 18 a8 8 0 0 1 -16 0z" fill="#f59e0b" opacity="0.85" />
      <path d="M68 196 c0 -7 6 -13 6 -13 s6 6 6 13 a6 6 0 0 1 -12 0z" fill="#fbbf24" opacity="0.7" />
      {/* brilhos */}
      <path d="M40 90 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z" fill={ROSE} opacity="0.5" />
      <path d="M268 96 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="#c084fc" opacity="0.7" />
    </svg>
  );
}

export function PagePreviewScreen({ compact = false }: { compact?: boolean }) {
  const px = compact ? 64 : 96;
  const sec = (name: string, children: React.ReactNode, style: React.CSSProperties = {}) => (
    <section data-sec={name} style={{ padding: `${compact ? 44 : 60}px ${px}px`, ...style }}>{children}</section>
  );
  const Btn = ({ children, ghost = false, big = false }: { children: React.ReactNode; ghost?: boolean; big?: boolean }) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: big ? 54 : 44, padding: big ? '0 26px' : '0 20px', borderRadius: 999, fontWeight: 700, fontSize: big ? 15 : 13, background: ghost ? '#fff' : ROSE, color: ghost ? INK : '#fff', border: ghost ? '1px solid #eadcf2' : 'none', boxShadow: ghost ? 'none' : '0 10px 24px -10px rgba(162,28,175,0.55)' }}>{children}</span>
  );

  return (
    <div className="scr" style={{ height: 'auto', minHeight: 900, fontFamily: 'var(--font-app)', color: INK, background: '#fff' }}>
      {/* barra de aviso */}
      <div style={{ background: INK, color: '#fff', fontSize: 12, textAlign: 'center', padding: '8px 0', letterSpacing: '0.02em' }}>
        <b>Frete grátis para todo o Brasil</b> · você só paga quando o pedido chegar
      </div>
      <header style={{ height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${px}px`, borderBottom: '1px solid #f3eaf7', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.9)', zIndex: 3 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 30, height: 30, borderRadius: 9, background: `linear-gradient(135deg, ${ROSE}, #ec4899)`, display: 'grid', placeItems: 'center', color: '#fff' }}><Sparkles size={15} /></span>
          <b style={{ ...HEAD, fontSize: 17 }}>Lumen <span style={{ color: ROSE }}>Skin</span></b>
        </span>
        <span style={{ display: 'flex', gap: 24, fontSize: 13, color: '#4b4560' }}><span>Fórmula</span><span>Como usar</span><span>Avaliações</span><span>Dúvidas</span></span>
        <Btn>Comprar agora</Btn>
      </header>

      {sec('hero', (
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: ROSE, background: '#fdf2f8', border: '1px solid #fbcfe8', padding: '6px 12px', borderRadius: 999 }}><Star size={12} fill={ROSE} /> 4,8 · 12.400+ AVALIAÇÕES</span>
            <h1 style={{ ...HEAD, fontSize: 46, lineHeight: 1.06, margin: '16px 0 0' }}>Pele mais uniforme e luminosa <span style={{ color: ROSE }}>em 4 semanas, com um sérum só.</span></h1>
            <p style={{ fontSize: 17, color: MUTED, marginTop: 16, lineHeight: 1.55, maxWidth: 520 }}>Sérum Vitamina C 10% com ácido hialurônico e niacinamida. Textura leve, para todos os tipos de pele, de manhã e à noite.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26, alignItems: 'center' }}>
              <Btn big>Quero o meu</Btn>
              <Btn ghost big><Play size={14} /> Ver como usar</Btn>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22 }}>
              <span style={{ display: 'flex' }}>
                {[['Mariana Souza', '#a21caf'], ['Cláudia Reis', '#ec4899'], ['Patrícia Melo', '#7c3aed'], ['Juliana Alves', '#f59e0b'], ['Renata Lima', '#0ea5e9']].map(([n, c], i) => <span key={n} style={{ marginLeft: i ? -10 : 0 }}><Avatar name={n} bg={c} /></span>)}
              </span>
              <span style={{ fontSize: 13, color: MUTED }}><span style={{ color: '#f59e0b', letterSpacing: 1 }}>★★★★★</span> <b style={{ color: INK }}>4,8</b> · nota média de 12.400 clientes</span>
            </div>
          </div>
          <div style={{ position: 'relative', aspectRatio: '1 / 0.92', borderRadius: 28, background: 'linear-gradient(160deg, #fff7ed 0%, #fce7f3 50%, #f3e8ff 100%)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: '8% 10% 6%' }}><Serum /></div>
            {/* card flutuante: pedido pago na entrega */}
            <div style={{ position: 'absolute', left: 18, bottom: 22, background: '#fff', borderRadius: 14, padding: '10px 14px', boxShadow: '0 12px 28px -12px rgba(29,22,51,0.3)', display: 'flex', gap: 10, alignItems: 'center', fontSize: 12 }}>
              <span style={{ width: 32, height: 32, borderRadius: 999, background: '#dcfce7', color: '#15803d', display: 'grid', placeItems: 'center' }}><PackageCheck size={16} /></span>
              <div><b style={{ display: 'block' }}>Pedido entregue e pago</b><span style={{ color: MUTED }}>Kit com 3 frascos · R$ 197,00</span></div>
            </div>
            {/* card flutuante: prazo */}
            <div style={{ position: 'absolute', right: 18, top: 22, background: '#fff', borderRadius: 14, padding: '10px 14px', boxShadow: '0 12px 28px -12px rgba(29,22,51,0.3)', fontSize: 12 }}>
              <span style={{ color: MUTED }}>Chega em</span><b style={{ display: 'block', fontSize: 20, color: '#15803d', ...HEAD }}>2 a 5 dias</b>
            </div>
          </div>
        </div>
      ))}

      {/* faixa de números */}
      <div style={{ margin: `0 ${px}px`, borderTop: '1px solid #f3eaf7', borderBottom: '1px solid #f3eaf7', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '22px 0' }} data-sec="numeros">
        {[['30 ml', 'rende cerca de 2 meses'], ['3 ativos', 'em um único frasco'], ['Frete grátis', 'para todo o Brasil'], ['30 dias', 'de garantia total']].map(([n, l]) => (
          <div key={l} style={{ textAlign: 'center' }}><b style={{ ...HEAD, fontSize: 26, display: 'block' }}>{n}</b><span style={{ fontSize: 13, color: MUTED }}>{l}</span></div>
        ))}
      </div>

      {sec('oferta', (
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: ROSE }}>POR DENTRO DA FÓRMULA</span>
          <h2 style={{ ...HEAD, fontSize: 32, margin: '10px 0 0', maxWidth: 620 }}>Três ativos em um frasco, sem precisar de dez passos</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 28 }}>
            {[
              ['Vitamina C 10%', 'Uniformiza o tom, suaviza manchinhas de sol e devolve o viço da pele cansada.', Sun],
              ['Ácido hialurônico', 'Hidrata sem pesar e deixa a pele macia ao toque, mesmo nos dias de calor.', Droplets],
              ['Niacinamida', 'Controla a oleosidade ao longo do dia e reduz a aparência dos poros.', Sparkles],
            ].map(([t, d, Icon]) => {
              const I = Icon as React.ComponentType<{ size?: number }>;
              return (
                <div key={String(t)} style={{ border: '1px solid #f3eaf7', borderRadius: 18, padding: 22, background: '#fff' }}>
                  <span style={{ width: 40, height: 40, borderRadius: 12, background: '#fdf2f8', color: ROSE, display: 'grid', placeItems: 'center' }}><I size={18} /></span>
                  <b style={{ ...HEAD, display: 'block', marginTop: 14, fontSize: 16 }}>{String(t)}</b>
                  <span style={{ color: MUTED, fontSize: 13, lineHeight: 1.5, display: 'block', marginTop: 6 }}>{String(d)}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {sec('beneficios', (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          {/* rotina de uso ilustrada */}
          <div style={{ borderRadius: 22, background: '#faf5ff', padding: 22, border: '1px solid #efe6fb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <b style={{ ...HEAD, fontSize: 14 }}>Sua rotina · manhã e noite</b><span style={{ fontSize: 11, color: '#15803d', background: '#dcfce7', padding: '3px 8px', borderRadius: 999, fontWeight: 700 }}>menos de 2 min</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
              <thead><tr style={{ color: MUTED, textAlign: 'left' }}><th style={{ padding: '8px 12px', fontWeight: 500 }}>Passo</th><th style={{ padding: '8px 12px', fontWeight: 500 }}>Como</th><th style={{ padding: '8px 12px', fontWeight: 500, textAlign: 'right' }}>Tempo</th></tr></thead>
              <tbody>
                {[['1. Limpeza', 'Sabonete suave', '30 s'], ['2. Sérum Vitamina C', '3 a 4 gotas', '20 s'], ['3. Hidratante', 'Camada fina', '20 s'], ['4. Protetor solar', 'Só de manhã', '15 s']].map((r) => (
                  <tr key={r[0]} style={{ borderTop: '1px solid #f3eaf7' }}>{r.map((c, i) => <td key={i} style={{ padding: '8px 12px', textAlign: i === 2 ? 'right' : 'left' }}>{c}</td>)}</tr>
                ))}
                <tr style={{ borderTop: '2px solid #efe6fb', fontWeight: 700 }}><td style={{ padding: '10px 12px' }}>Rotina completa</td><td /><td style={{ padding: '10px 12px', textAlign: 'right', color: ROSE }}>85 s</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: ROSE }}>POR QUE FUNCIONA</span>
            <h2 style={{ ...HEAD, fontSize: 32, margin: '10px 0 0' }}>Resultado visível sem complicar a sua rotina</h2>
            <ul style={{ marginTop: 18, display: 'grid', gap: 12 }}>
              {['Textura leve, absorve em segundos e não deixa a pele grudando', 'Vitamina C estabilizada: não oxida nem escurece no frasco', 'Dermatologicamente testado, para todos os tipos de pele', 'Conta-gotas que entrega a dose certa em cada aplicação'].map((t) => (
                <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.4 }}><span style={{ width: 22, height: 22, borderRadius: 999, background: '#fdf2f8', color: ROSE, display: 'grid', placeItems: 'center', flex: '0 0 auto' }}><Check size={13} strokeWidth={3} /></span>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {sec('prova', (
        <div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: ROSE }}>QUEM JÁ USA</span>
            <h2 style={{ ...HEAD, fontSize: 32, margin: '10px 0 0' }}>Avaliações de quem já recebeu em casa</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 28 }}>
            {[
              ['Mariana Souza', 'Campinas · SP', '#a21caf', 'Em três semanas as manchinhas de sol clarearam. Já estou no segundo frasco e não troco mais.'],
              ['Cláudia Reis', 'Recife · PE', '#ec4899', 'Paguei na entrega e chegou em três dias. A textura é levinha, não pesa nem no calor daqui.'],
              ['Patrícia Melo', 'Curitiba · PR', '#7c3aed', 'Tenho pele oleosa e não me deu nenhuma espinha. Pedi o kit com 3 para dividir com a minha mãe.'],
            ].map(([n, c, bg, q]) => (
              <div key={n} style={{ border: '1px solid #f3eaf7', borderRadius: 18, padding: 22, background: '#fff' }}>
                <div style={{ display: 'flex', gap: 2, color: '#f59e0b' }}>{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="#f59e0b" />)}</div>
                <p style={{ fontSize: 14, color: '#3b3450', marginTop: 12, lineHeight: 1.55 }}>"{q}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}><Avatar name={n} bg={bg} /><div><b style={{ display: 'block', fontSize: 13 }}>{n}</b><span style={{ fontSize: 12, color: MUTED }}>{c}</span></div></div>
              </div>
            ))}
          </div>
        </div>
      ), { background: '#fdfaff' })}

      {sec('preco', (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 48, alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: ROSE }}>ESCOLHA SEU KIT</span>
            <h2 style={{ ...HEAD, fontSize: 32, margin: '10px 0 0' }}>Kit com 3 frascos: seis meses de rotina e frete grátis</h2>
            <p style={{ color: MUTED, marginTop: 12, fontSize: 15, lineHeight: 1.55 }}>O kit mais vendido. Você recebe em casa, confere o pedido e só então paga ao entregador.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
              {[[Truck, 'Frete grátis'], [HandCoins, 'Pagamento na entrega'], [Gift, '2 brindes no kit'], [ShieldCheck, 'Garantia de 30 dias']].map(([I, t]) => {
                const Icon = I as React.ComponentType<{ size?: number }>;
                return <span key={String(t)} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13 }}><span style={{ color: ROSE }}><Icon size={15} /></span>{String(t)}</span>;
              })}
            </div>
          </div>
          <div style={{ borderRadius: 24, padding: 26, background: INK, color: '#fff', boxShadow: '0 30px 60px -30px rgba(29,22,51,0.6)', position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', right: -40, top: -40, width: 160, height: 160, borderRadius: 999, background: `radial-gradient(circle, ${ROSE} 0%, transparent 70%)`, opacity: 0.55 }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#f9a8d4' }}>KIT 3 FRASCOS · MAIS VENDIDO</span>
            <div style={{ marginTop: 12, fontSize: 13, color: '#c4b5fd', textDecoration: 'line-through' }}>de R$ 269,70</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontSize: 16 }}>12x de</span><b style={{ ...HEAD, color: '#fff', fontSize: 44 }}>R$ 19,70</b></div>
            <div style={{ fontSize: 13, color: '#d8d4e8' }}>ou R$ 197,00 à vista</div>
            <ul style={{ marginTop: 16, display: 'grid', gap: 8, fontSize: 13 }}>
              {['3 frascos de 30 ml', 'Frete grátis para todo o Brasil', 'Pague só quando receber', 'Brindes: nécessaire e faixa'].map((t) => <li key={t} style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Check size={14} color="#f9a8d4" /> {t}</li>)}
            </ul>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 999, background: ROSE, fontWeight: 700, fontSize: 15, marginTop: 20, boxShadow: '0 10px 24px -8px rgba(162,28,175,0.7)' }}>Quero o kit com 3</span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'center', marginTop: 12, fontSize: 11, color: '#c4b5fd' }}><Lock size={11} /> Pague na entrega · Pix, cartão ou dinheiro</div>
          </div>
        </div>
      ))}

      {sec('bonus', (
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: ROSE }}>BRINDES DO KIT</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 14 }}>
            {[['Nécessaire Lumen Skin', 'Em tecido impermeável, do tamanho certo para levar a rotina na bolsa.', 'R$ 39'], ['Faixa de cabelo para skincare', 'Tecido macio que prende o cabelo na hora de aplicar os produtos.', 'R$ 19']].map(([t, d, v]) => (
              <div key={t} style={{ display: 'flex', gap: 16, border: '1px dashed #e9d5ff', borderRadius: 18, padding: 20, background: '#faf5ff' }}>
                <span style={{ width: 44, height: 44, borderRadius: 14, background: '#fff', color: ROSE, display: 'grid', placeItems: 'center', flex: '0 0 auto', border: '1px solid #efe6fb' }}><Gift size={20} /></span>
                <div><b style={{ ...HEAD, fontSize: 15, display: 'block' }}>{t}</b><span style={{ fontSize: 13, color: MUTED, lineHeight: 1.5, display: 'block', marginTop: 4 }}>{d}</span><span style={{ fontSize: 12, color: ROSE, fontWeight: 700, marginTop: 6, display: 'inline-block' }}>valor {v} · grátis no kit com 3</span></div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {sec('garantia', (
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: 28, borderRadius: 22, background: 'linear-gradient(120deg, #fdf2f8, #f3e8ff)' }}>
          <span style={{ width: 72, height: 72, borderRadius: 999, background: '#fff', display: 'grid', placeItems: 'center', color: ROSE, boxShadow: '0 8px 20px -8px rgba(162,28,175,0.4)', flex: '0 0 auto' }}><ShieldCheck size={36} /></span>
          <div><b style={{ ...HEAD, fontSize: 22, display: 'block' }}>Garantia incondicional de 30 dias</b><p style={{ color: '#4b4560', margin: '6px 0 0', fontSize: 15, lineHeight: 1.5 }}>Use o sérum por um mês inteiro. Se não gostar do resultado, devolvemos 100% do valor. Sem perguntas.</p></div>
        </div>
      ))}

      {sec('faq', (
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ ...HEAD, fontSize: 28, margin: 0, textAlign: 'center' }}>Perguntas frequentes</h2>
          {[['Como funciona o pagamento na entrega?', 'Você faz o pedido sem pagar nada. Quando o entregador chegar, paga no Pix, no cartão ou em dinheiro.'], ['Serve para pele oleosa ou sensível?', 'Sim. A fórmula é leve, sem óleo e foi testada em todos os tipos de pele.'], ['Em quanto tempo o pedido chega?', 'De 2 a 5 dias úteis nas capitais, com código de rastreio pelo WhatsApp.'], ['Como funciona a garantia?', 'Você tem 30 dias para pedir o reembolso integral, mesmo com o frasco aberto.']].map(([q, a], i) => (
            <div key={q} style={{ padding: '16px 0', borderBottom: '1px solid #f3eaf7' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 600 }}>{q}<ChevronDown size={18} color={MUTED} style={{ transform: i === 0 ? 'rotate(180deg)' : undefined }} /></div>
              {i === 0 && <p style={{ margin: '8px 0 0', fontSize: 14, color: MUTED, lineHeight: 1.5 }}>{a}</p>}
            </div>
          ))}
        </div>
      ))}

      {sec('cta', (
        <div style={{ textAlign: 'center', padding: '26px 0 10px' }}>
          <h2 style={{ ...HEAD, fontSize: 36, margin: 0 }}>Sua rotina nova chega em poucos dias.</h2>
          <p style={{ color: MUTED, marginTop: 10, fontSize: 16 }}>Kit com 3 frascos por 12x de R$ 19,70, com frete grátis e pagamento na entrega.</p>
          <div style={{ marginTop: 20 }}><Btn big>Quero o meu kit</Btn></div>
          <p style={{ fontSize: 12, color: MUTED, marginTop: 12 }}>Frete grátis · Pague na entrega · Garantia de 30 dias</p>
        </div>
      ))}

      <footer style={{ padding: `26px ${px}px`, borderTop: '1px solid #f3eaf7', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: MUTED }}>
        <span>© Lumen Skin · Termos · Privacidade</span><span>Feito com Clickzz</span>
      </footer>
    </div>
  );
}
