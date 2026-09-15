import { AppShell } from './AppShell';

/**
 * Tela de dados de um projeto: visitas, interação, progresso por etapa e leads.
 * Números sintéticos de demonstração. O gráfico é SVG desenhado por stroke (a timeline anima).
 */
export function AnalyticsScreen() {
  const pts = [12, 18, 15, 22, 30, 26, 34, 41, 38, 47, 52, 49, 58, 66];
  const W = 760, H = 220;
  const max = Math.max(...pts) * 1.15;
  const d = pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i / (pts.length - 1)) * W} ${H - (v / max) * H}`).join(' ');
  const area = `${d} L ${W} ${H} L 0 ${H} Z`;
  return (
    <AppShell active="projects">
      <div className="an">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="stitle">Diagnóstico de Pele — Clínica Lumen</div>
            <div className="smuted" style={{ fontSize: 13 }}>Últimos 14 dias · quiz publicado em clinicalumen.com.br/diagnostico</div>
          </div>
          <div className="stabs"><span className="stab stab--active">Visão geral</span><span className="stab">Etapas</span><span className="stab">Leads</span><span className="stab">Teste A/B</span></div>
        </div>
        <div className="an__kpis">
          {[
            ['Visitas', '4.128', '+18%'],
            ['Taxa de interação', '71,4%', '+6,2 pts'],
            ['Leads capturados', '1.362', '+22%'],
            ['Taxa de conversão', '33,0%', '+3,1 pts'],
          ].map(([l, v, dlt]) => (
            <div key={l} className="an__kpi" data-kpi>
              <small>{l}</small><b data-kpi-value>{v}</b><em>{dlt}</em>
            </div>
          ))}
        </div>
        <div className="an__grid">
          <div className="an__chart">
            <div className="an__h">Visitas por dia</div>
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="an-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6b26d9" stopOpacity="0.28" /><stop offset="1" stopColor="#6b26d9" stopOpacity="0" /></linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#eeeef1" />)}
              <path d={area} fill="url(#an-fill)" data-an-area />
              <path d={d} fill="none" stroke="#6b26d9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" data-an-line pathLength={1} />
              {pts.map((v, i) => <circle key={i} cx={(i / (pts.length - 1)) * W} cy={H - (v / max) * H} r="3.5" fill="#fff" stroke="#6b26d9" strokeWidth="2" data-an-dot />)}
            </svg>
          </div>
          <div className="an__chart">
            <div className="an__h">Progresso por etapa</div>
            <ul className="an__funnel">
              {[
                ['Boas-vindas', 100, '4.128'],
                ['Preocupação', 86, '3.550'],
                ['Rotina', 74, '3.055'],
                ['Cadastro', 41, '1.692'],
                ['Resultado', 33, '1.362'],
              ].map(([n, p, v]) => (
                <li key={String(n)}><span>{n}</span><i data-an-bar style={{ width: `${p}%` }} /><b>{v}</b></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="an__table">
          <table>
            <thead><tr><th>Lead</th><th>WhatsApp</th><th>Resposta principal</th><th>Origem</th><th>Status</th></tr></thead>
            <tbody>
              {[
                ['Ana Marques', '(11) 9 8123-4567', 'Linhas finas', 'Instagram', 'Novo'],
                ['Beatriz Lopes', '(21) 9 9876-1122', 'Manchas', 'Meta Ads', 'Novo'],
                ['Carla Nunes', '(31) 9 7011-3344', 'Flacidez', 'Google', 'Contatado'],
              ].map((r) => (
                <tr key={r[0]} data-an-row>{r.map((c, i) => <td key={i}>{i === 4 ? <span className="an__badge">{c}</span> : c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
