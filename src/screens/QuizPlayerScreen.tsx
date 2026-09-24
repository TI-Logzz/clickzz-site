/**
 * Quiz publicado no celular (/quiz/:slug) — "Diagnóstico de Pele — Lumen Skin" (marca de skincare que vende com pagamento na entrega).
 * Quatro etapas empilhadas em [data-qstep] (2: preocupação, 3: rotina, 4: cadastro, 5: resultado);
 * a timeline do hero desliza o [data-qtrack], digita o cadastro ([data-qfield]) e mostra o resultado.
 * A etapa 5 recomenda um kit de produtos: o público da Clickzz anuncia, na maior parte, produtos físicos.
 */
export const QUIZ_FORM_VALUES = ['Vinicius Pires', 'viniciuspiresltda@gmail.com', '(11) 9 8765-4321'];
const FORM_PLACEHOLDERS = ['Seu nome', 'Seu e-mail', 'Seu WhatsApp'];

export function QuizPlayerScreen() {
  const steps = [
    { n: 2, q: 'Qual é a sua maior preocupação hoje?', opts: ['Manchas', 'Linhas finas', 'Flacidez', 'Acne'], on: 1, progress: 40, btn: 'Continuar' },
    { n: 3, q: 'Com que frequência você cuida da pele?', opts: ['Todo dia', 'Algumas vezes por semana', 'Raramente'], on: 0, progress: 60, btn: 'Continuar' },
    { n: 4, q: 'Para onde enviamos o seu resultado?', opts: [], on: -1, progress: 80, btn: 'Ver meu resultado', form: true },
    { n: 5, q: 'Seu kit recomendado', opts: [], on: -1, progress: 100, btn: 'Quero meu kit', result: true },
  ];
  const N = steps.length;
  return (
    <div className="scr scr--mobile" style={{ position: 'relative' }}>
      {/* barra de status do iOS ocupa a faixa da ilha: nenhum conteúdo fica atrás dela */}
      <div className="ios-status" aria-hidden="true">
        <span>9:41</span>
        <span className="ios-status__right">
          <span className="ios-status__bars"><i style={{ height: 4 }} /><i style={{ height: 6 }} /><i style={{ height: 8.5 }} /><i style={{ height: 11 }} /></span>
          <span className="ios-status__bat"><i /></span>
        </span>
      </div>
      <div className="qz__head">
        <span style={{ width: 8, height: 8, borderRadius: 999, background: '#6b26d9' }} /> Lumen Skin
      </div>
      <div className="ios-home" aria-hidden="true" />
      <div data-qtrack style={{ position: 'absolute', inset: 0, display: 'flex', width: `${N * 100}%` }}>
        {steps.map((s, i) => (
          <div key={i} data-qstep={i} className="qz" style={{ width: `${100 / N}%`, flex: '0 0 auto' }}>
            <div className="qz__bar"><i data-qbar style={{ width: `${s.progress}%` }} /></div>
            <div className="qz__body">
              <div className="smuted" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em' }}>ETAPA {s.n} DE 5</div>
              {s.result ? (
                <>
                  <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(145deg,#f3eefc,#e4d5f5)', display: 'grid', placeItems: 'center', margin: '18px auto 6px', fontSize: 28, color: '#6b26d9' }}>✦</div>
                  <div className="qz__q" style={{ textAlign: 'center' }}>{s.q}</div>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: '#3f4650', textAlign: 'center' }}>
                    Para a sua pele, o ideal é o Sérum Vitamina C com o Hidratante Leve. Frete grátis e você só paga quando o kit chegar.
                  </p>
                  <div style={{ marginTop: 6, padding: '12px 14px', borderRadius: 12, background: '#faf7ff', border: '1px solid #ede4fb', fontSize: 13, color: '#3f4650' }}>
                    <b style={{ display: 'block', color: '#282c34' }}>Resultado enviado para</b>
                    <span data-qresult-email>{QUIZ_FORM_VALUES[1]}</span>
                  </div>
                </>
              ) : (
                <div className="qz__q">{s.q}</div>
              )}
              {s.form ? (
                <div style={{ display: 'grid', gap: 10, marginTop: 6 }}>
                  {FORM_PLACEHOLDERS.map((p, k) => (
                    <div key={p} className="sinput" style={{ height: 50, borderRadius: 12 }} data-qfield={k} data-placeholder={p}>{p}</div>
                  ))}
                </div>
              ) : (
                s.opts.map((o, k) => (
                  <div key={o} className={`qz__opt ${k === s.on ? 'qz__opt--on' : ''}`} data-qopt={`${i}-${k}`}><i />{o}</div>
                ))
              )}
              <div className="qz__btn" data-qbtn={i}>{s.btn}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
