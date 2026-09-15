/**
 * Quiz publicado no celular (/quiz/:slug) — "Diagnóstico de Pele — Clínica Lumen".
 * Quatro etapas empilhadas em [data-qstep] (2: preocupação, 3: rotina, 4: cadastro, 5: resultado);
 * a timeline do hero desliza o [data-qtrack], digita o cadastro ([data-qfield]) e mostra o resultado.
 * Textos da etapa 5 copiados do quiz real gerado na conta de teste.
 */
export const QUIZ_FORM_VALUES = ['Vinicius Pires', 'viniciuspiresltda@gmail.com', '(11) 9 8765-4321'];
const FORM_PLACEHOLDERS = ['Seu nome', 'Seu e-mail', 'Seu WhatsApp'];

export function QuizPlayerScreen() {
  const steps = [
    { n: 2, q: 'Qual é a sua maior preocupação hoje?', opts: ['Manchas', 'Linhas finas', 'Flacidez', 'Acne'], on: 1, progress: 40, btn: 'Continuar' },
    { n: 3, q: 'Com que frequência você cuida da pele?', opts: ['Todo dia', 'Algumas vezes por semana', 'Raramente'], on: 0, progress: 60, btn: 'Continuar' },
    { n: 4, q: 'Para onde enviamos o seu resultado?', opts: [], on: -1, progress: 80, btn: 'Ver meu resultado', form: true },
    { n: 5, q: 'Seu tratamento recomendado', opts: [], on: -1, progress: 100, btn: 'Agendar avaliação gratuita', result: true },
  ];
  const N = steps.length;
  return (
    <div className="scr scr--mobile" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#6b26d9', zIndex: 2 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: '#6b26d9' }} /> Clínica Lumen
      </div>
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
                    Com base nas suas respostas, nossa equipe preparou um protocolo exclusivo para renovar a saúde e o brilho da sua pele. Clique abaixo para garantir sua vaga.
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
