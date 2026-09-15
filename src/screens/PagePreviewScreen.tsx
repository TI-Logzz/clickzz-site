import { Check, Star, ShieldCheck, ChevronDown, Play, Lock, Clock, Users, Sparkles, Gift, MessageCircle } from 'lucide-react';

/**
 * Página de vendas publicada "Curso Confeitaria Lucrativa" — demonstração do resultado que o builder entrega.
 * Conteúdo sintético (curso, alunas e números ilustrativos). Desenhada em 1440 px de largura; a moldura corta a altura.
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

/** Bolo de três andares com cobertura escorrendo e cerejas — ilustração autoral em SVG. */
function Cake() {
  return (
    <svg viewBox="0 0 320 300" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id="cakeA" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fde7f3" /><stop offset="1" stopColor="#f9a8d4" /></linearGradient>
        <linearGradient id="cakeB" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff1f2" /><stop offset="1" stopColor="#fbcfe8" /></linearGradient>
        <linearGradient id="plate" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#e9d5ff" /><stop offset="1" stopColor="#c4b5fd" /></linearGradient>
        <radialGradient id="cherry" cx="0.35" cy="0.3" r="0.8"><stop stopColor="#fda4af" /><stop offset="1" stopColor="#be123c" /></radialGradient>
      </defs>
      <ellipse cx="160" cy="262" rx="130" ry="18" fill="url(#plate)" />
      <ellipse cx="160" cy="258" rx="118" ry="12" fill="#f5f3ff" />
      {/* andar 1 */}
      <rect x="55" y="180" width="210" height="72" rx="14" fill="url(#cakeA)" />
      <path d="M55 194 q20 -14 40 0 t40 0 t40 0 t40 0 t40 0 v-12 h-200z" fill="#fff" />
      <path d="M75 190 q6 22 -2 34 M125 190 q8 18 0 30 M215 190 q6 26 -2 36" stroke="#fff" strokeWidth="9" strokeLinecap="round" fill="none" />
      {/* andar 2 */}
      <rect x="85" y="120" width="150" height="66" rx="12" fill="url(#cakeB)" />
      <path d="M85 132 q15 -12 30 0 t30 0 t30 0 t30 0 t30 0 v-10 h-150z" fill={ROSE} opacity="0.85" />
      <path d="M100 128 q5 20 -1 30 M175 128 q6 16 0 26" stroke={ROSE} strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.85" />
      {/* andar 3 */}
      <rect x="112" y="70" width="96" height="56" rx="10" fill="url(#cakeA)" />
      <path d="M112 80 q12 -10 24 0 t24 0 t24 0 t24 0 v-8 h-96z" fill="#fff" />
      {/* cerejas */}
      {[[132, 62], [160, 54], [188, 62]].map(([x, y]) => (
        <g key={x}><path d={`M${x} ${y - 8} q6 -16 14 -14`} stroke="#4d7c0f" strokeWidth="3" fill="none" strokeLinecap="round" /><circle cx={x} cy={y} r="10" fill="url(#cherry)" /></g>
      ))}
      {/* brilhos */}
      <path d="M40 90 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z" fill={ROSE} opacity="0.5" />
      <path d="M280 120 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="#c084fc" opacity="0.7" />
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
        Turma 12 com <b>vagas abertas até 30/09</b> · bônus de fotografia só nesta turma
      </div>
      <header style={{ height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${px}px`, borderBottom: '1px solid #f3eaf7', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.9)', zIndex: 3 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 30, height: 30, borderRadius: 9, background: `linear-gradient(135deg, ${ROSE}, #ec4899)`, display: 'grid', placeItems: 'center', color: '#fff' }}><Sparkles size={15} /></span>
          <b style={{ ...HEAD, fontSize: 17 }}>Confeitaria <span style={{ color: ROSE }}>Lucrativa</span></b>
        </span>
        <span style={{ display: 'flex', gap: 24, fontSize: 13, color: '#4b4560' }}><span>Conteúdo</span><span>Depoimentos</span><span>Bônus</span><span>Dúvidas</span></span>
        <Btn>Quero minha vaga</Btn>
      </header>

      {sec('hero', (
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: ROSE, background: '#fdf2f8', border: '1px solid #fbcfe8', padding: '6px 12px', borderRadius: 999 }}><Users size={12} /> 2.300+ ALUNAS · TURMA 12</span>
            <h1 style={{ ...HEAD, fontSize: 46, lineHeight: 1.06, margin: '16px 0 0' }}>Monte seu negócio de bolos e doces em casa, <span style={{ color: ROSE }}>do zero à primeira venda.</span></h1>
            <p style={{ fontSize: 17, color: MUTED, marginTop: 16, lineHeight: 1.55, maxWidth: 520 }}>40 aulas práticas, grupo de alunas e a planilha de precificação que faz cada receita dar lucro. Sem precisar de equipamento profissional.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26, alignItems: 'center' }}>
              <Btn big>Quero começar agora</Btn>
              <Btn ghost big><Play size={14} /> Ver aula gratuita</Btn>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22 }}>
              <span style={{ display: 'flex' }}>
                {[['Mariana Souza', '#a21caf'], ['Cláudia Reis', '#ec4899'], ['Patrícia Melo', '#7c3aed'], ['Juliana Alves', '#f59e0b'], ['Renata Lima', '#0ea5e9']].map(([n, c], i) => <span key={n} style={{ marginLeft: i ? -10 : 0 }}><Avatar name={n} bg={c} /></span>)}
              </span>
              <span style={{ fontSize: 13, color: MUTED }}><span style={{ color: '#f59e0b', letterSpacing: 1 }}>★★★★★</span> <b style={{ color: INK }}>4,9</b> · nota média de 2.300 alunas</span>
            </div>
          </div>
          <div style={{ position: 'relative', aspectRatio: '1 / 0.92', borderRadius: 28, background: 'linear-gradient(160deg, #fff1f2 0%, #fce7f3 45%, #f3e8ff 100%)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: '8% 10% 6%' }}><Cake /></div>
            {/* card flutuante: pedido */}
            <div style={{ position: 'absolute', left: 18, bottom: 22, background: '#fff', borderRadius: 14, padding: '10px 14px', boxShadow: '0 12px 28px -12px rgba(29,22,51,0.3)', display: 'flex', gap: 10, alignItems: 'center', fontSize: 12 }}>
              <span style={{ width: 32, height: 32, borderRadius: 999, background: '#dcfce7', color: '#15803d', display: 'grid', placeItems: 'center' }}><MessageCircle size={16} /></span>
              <div><b style={{ display: 'block' }}>Novo pedido no WhatsApp</b><span style={{ color: MUTED }}>12 bolos de pote · R$ 168,00</span></div>
            </div>
            {/* card flutuante: margem */}
            <div style={{ position: 'absolute', right: 18, top: 22, background: '#fff', borderRadius: 14, padding: '10px 14px', boxShadow: '0 12px 28px -12px rgba(29,22,51,0.3)', fontSize: 12 }}>
              <span style={{ color: MUTED }}>Margem por receita</span><b style={{ display: 'block', fontSize: 20, color: '#15803d', ...HEAD }}>62%</b>
            </div>
          </div>
        </div>
      ))}

      {/* faixa de números */}
      <div style={{ margin: `0 ${px}px`, borderTop: '1px solid #f3eaf7', borderBottom: '1px solid #f3eaf7', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '22px 0' }} data-sec="numeros">
        {[['40', 'aulas práticas'], ['12', 'módulos passo a passo'], ['Vitalício', 'acesso e atualizações'], ['7 dias', 'de garantia total']].map(([n, l]) => (
          <div key={l} style={{ textAlign: 'center' }}><b style={{ ...HEAD, fontSize: 26, display: 'block' }}>{n}</b><span style={{ fontSize: 13, color: MUTED }}>{l}</span></div>
        ))}
      </div>

      {sec('oferta', (
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: ROSE }}>O QUE VOCÊ RECEBE</span>
          <h2 style={{ ...HEAD, fontSize: 32, margin: '10px 0 0', maxWidth: 620 }}>Tudo o que você precisa para vender já na primeira semana</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 28 }}>
            {[
              ['40 aulas passo a passo', 'Receitas testadas com custo calculado: bolo de pote, brigadeiros gourmet, tortas e docinhos para festa.', Play],
              ['Grupo de alunas no WhatsApp', 'Tire dúvidas, troque fornecedores e receba feedback das suas primeiras fotos e encomendas.', Users],
              ['Planilha de precificação', 'Coloque os ingredientes, a planilha devolve o preço certo com a sua margem. Atualizada mensalmente.', Check],
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
          {/* planilha de precificação ilustrada */}
          <div style={{ borderRadius: 22, background: '#faf5ff', padding: 22, border: '1px solid #efe6fb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <b style={{ ...HEAD, fontSize: 14 }}>Planilha · Bolo de pote (12 un.)</b><span style={{ fontSize: 11, color: '#15803d', background: '#dcfce7', padding: '3px 8px', borderRadius: 999, fontWeight: 700 }}>margem 62%</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
              <thead><tr style={{ color: MUTED, textAlign: 'left' }}><th style={{ padding: '8px 12px', fontWeight: 500 }}>Ingrediente</th><th style={{ padding: '8px 12px', fontWeight: 500 }}>Qtd.</th><th style={{ padding: '8px 12px', fontWeight: 500, textAlign: 'right' }}>Custo</th></tr></thead>
              <tbody>
                {[['Leite condensado', '2 latas', 'R$ 11,80'], ['Chocolate 50%', '400 g', 'R$ 14,90'], ['Creme de leite', '2 cx', 'R$ 6,40'], ['Embalagem + colher', '12 un.', 'R$ 9,60']].map((r) => (
                  <tr key={r[0]} style={{ borderTop: '1px solid #f3eaf7' }}>{r.map((c, i) => <td key={i} style={{ padding: '8px 12px', textAlign: i === 2 ? 'right' : 'left' }}>{c}</td>)}</tr>
                ))}
                <tr style={{ borderTop: '2px solid #efe6fb', fontWeight: 700 }}><td style={{ padding: '10px 12px' }}>Preço sugerido</td><td /><td style={{ padding: '10px 12px', textAlign: 'right', color: ROSE }}>R$ 14,00 / un.</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: ROSE }}>POR QUE FUNCIONA</span>
            <h2 style={{ ...HEAD, fontSize: 32, margin: '10px 0 0' }}>Renda extra sem sair de casa, com preço que dá lucro</h2>
            <ul style={{ marginTop: 18, display: 'grid', gap: 12 }}>
              {['Receitas testadas, com rendimento e custo calculados', 'Como fotografar com o celular para vender no Instagram', 'Precificação que garante pelo menos 60% de margem', 'Fornecedores e embalagens que as alunas já usam'].map((t) => (
                <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, lineHeight: 1.4 }}><span style={{ width: 22, height: 22, borderRadius: 999, background: '#fdf2f8', color: ROSE, display: 'grid', placeItems: 'center', flex: '0 0 auto' }}><Check size={13} strokeWidth={3} /></span>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {sec('prova', (
        <div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: ROSE }}>ALUNAS QUE JÁ VENDEM</span>
            <h2 style={{ ...HEAD, fontSize: 32, margin: '10px 0 0' }}>Quem começou do zero e hoje tem agenda cheia</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 28 }}>
            {[
              ['Mariana Souza', 'Campinas · SP', '#a21caf', 'Em três semanas já tinha pago o curso com encomendas de bolo de pote. A planilha tirou o medo de cobrar.'],
              ['Cláudia Reis', 'Recife · PE', '#ec4899', 'Nunca tinha vendido nada. Hoje faço 40 potes por semana e meu marido ajuda a entregar.'],
              ['Patrícia Melo', 'Curitiba · PR', '#7c3aed', 'As aulas de foto mudaram tudo: mesma receita, o dobro de pedidos pelo Instagram.'],
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
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: ROSE }}>SUA VAGA</span>
            <h2 style={{ ...HEAD, fontSize: 32, margin: '10px 0 0' }}>Comece hoje e recupere o investimento na primeira encomenda</h2>
            <p style={{ color: MUTED, marginTop: 12, fontSize: 15, lineHeight: 1.55 }}>Acesso imediato a todas as aulas, ao grupo e à planilha. Estude no seu ritmo, pelo celular ou computador.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
              {[[Clock, 'Acesso vitalício'], [Users, 'Grupo com mentoria semanal'], [Gift, '2 bônus exclusivos'], [ShieldCheck, 'Garantia de 7 dias']].map(([I, t]) => {
                const Icon = I as React.ComponentType<{ size?: number }>;
                return <span key={String(t)} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13 }}><span style={{ color: ROSE }}><Icon size={15} /></span>{String(t)}</span>;
              })}
            </div>
          </div>
          <div style={{ borderRadius: 24, padding: 26, background: INK, color: '#fff', boxShadow: '0 30px 60px -30px rgba(29,22,51,0.6)', position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', right: -40, top: -40, width: 160, height: 160, borderRadius: 999, background: `radial-gradient(circle, ${ROSE} 0%, transparent 70%)`, opacity: 0.55 }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#f9a8d4' }}>TURMA 12 · OFERTA DE LANÇAMENTO</span>
            <div style={{ marginTop: 12, fontSize: 13, color: '#c4b5fd', textDecoration: 'line-through' }}>de R$ 497,00</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}><span style={{ fontSize: 16 }}>12x de</span><b style={{ ...HEAD, color: '#fff', fontSize: 44 }}>R$ 29,70</b></div>
            <div style={{ fontSize: 13, color: '#d8d4e8' }}>ou R$ 297,00 à vista</div>
            <ul style={{ marginTop: 16, display: 'grid', gap: 8, fontSize: 13 }}>
              {['40 aulas + 12 módulos', 'Planilha de precificação', 'Grupo de alunas + mentoria', 'Bônus: fotografia e fornecedores'].map((t) => <li key={t} style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Check size={14} color="#f9a8d4" /> {t}</li>)}
            </ul>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 999, background: ROSE, fontWeight: 700, fontSize: 15, marginTop: 20, boxShadow: '0 10px 24px -8px rgba(162,28,175,0.7)' }}>Quero minha vaga agora</span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'center', marginTop: 12, fontSize: 11, color: '#c4b5fd' }}><Lock size={11} /> Pagamento seguro · Pix, cartão ou boleto</div>
          </div>
        </div>
      ))}

      {sec('bonus', (
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: ROSE }}>BÔNUS DESTA TURMA</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 14 }}>
            {[['Aula de fotografia de doces com celular', 'Luz de janela, fundos baratos e edição em 3 minutos para o seu feed vender sozinho.', 'R$ 97'], ['Lista de fornecedores por região', 'Onde as alunas compram embalagem, chocolate e insumos com preço de atacado.', 'R$ 47']].map(([t, d, v]) => (
              <div key={t} style={{ display: 'flex', gap: 16, border: '1px dashed #e9d5ff', borderRadius: 18, padding: 20, background: '#faf5ff' }}>
                <span style={{ width: 44, height: 44, borderRadius: 14, background: '#fff', color: ROSE, display: 'grid', placeItems: 'center', flex: '0 0 auto', border: '1px solid #efe6fb' }}><Gift size={20} /></span>
                <div><b style={{ ...HEAD, fontSize: 15, display: 'block' }}>{t}</b><span style={{ fontSize: 13, color: MUTED, lineHeight: 1.5, display: 'block', marginTop: 4 }}>{d}</span><span style={{ fontSize: 12, color: ROSE, fontWeight: 700, marginTop: 6, display: 'inline-block' }}>valor {v} · grátis nesta turma</span></div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {sec('garantia', (
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: 28, borderRadius: 22, background: 'linear-gradient(120deg, #fdf2f8, #f3e8ff)' }}>
          <span style={{ width: 72, height: 72, borderRadius: 999, background: '#fff', display: 'grid', placeItems: 'center', color: ROSE, boxShadow: '0 8px 20px -8px rgba(162,28,175,0.4)', flex: '0 0 auto' }}><ShieldCheck size={36} /></span>
          <div><b style={{ ...HEAD, fontSize: 22, display: 'block' }}>Garantia incondicional de 7 dias</b><p style={{ color: '#4b4560', margin: '6px 0 0', fontSize: 15, lineHeight: 1.5 }}>Assista às primeiras aulas, entre no grupo, use a planilha. Se não for para você, devolvemos 100% do valor. Sem perguntas.</p></div>
        </div>
      ))}

      {sec('faq', (
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ ...HEAD, fontSize: 28, margin: 0, textAlign: 'center' }}>Perguntas frequentes</h2>
          {[['Preciso ter experiência na cozinha?', 'Não. As aulas partem do zero, com as receitas mais simples primeiro.'], ['Por quanto tempo tenho acesso?', 'Para sempre, incluindo as atualizações e novas receitas.'], ['Preciso de equipamentos profissionais?', 'Não. Tudo é feito com fogão, batedeira comum e utensílios básicos.'], ['Como funciona a garantia?', 'Você tem 7 dias para pedir o reembolso integral, direto pela plataforma.']].map(([q, a], i) => (
            <div key={q} style={{ padding: '16px 0', borderBottom: '1px solid #f3eaf7' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 600 }}>{q}<ChevronDown size={18} color={MUTED} style={{ transform: i === 0 ? 'rotate(180deg)' : undefined }} /></div>
              {i === 0 && <p style={{ margin: '8px 0 0', fontSize: 14, color: MUTED, lineHeight: 1.5 }}>{a}</p>}
            </div>
          ))}
        </div>
      ))}

      {sec('cta', (
        <div style={{ textAlign: 'center', padding: '26px 0 10px' }}>
          <h2 style={{ ...HEAD, fontSize: 36, margin: 0 }}>Sua primeira encomenda pode sair esta semana.</h2>
          <p style={{ color: MUTED, marginTop: 10, fontSize: 16 }}>Entre na Turma 12 por 12x de R$ 29,70 e comece hoje.</p>
          <div style={{ marginTop: 20 }}><Btn big>Quero minha vaga</Btn></div>
          <p style={{ fontSize: 12, color: MUTED, marginTop: 12 }}>Garantia de 7 dias · Acesso imediato · Suporte no grupo</p>
        </div>
      ))}

      <footer style={{ padding: `26px ${px}px`, borderTop: '1px solid #f3eaf7', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: MUTED }}>
        <span>© Confeitaria Lucrativa · Termos · Privacidade</span><span>Feito com Clickzz</span>
      </footer>
    </div>
  );
}
