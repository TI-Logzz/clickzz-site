import { useRef } from 'react';
import { Sparkles, Blocks, Waypoints, Palette, Webhook, BarChart3 } from 'lucide-react';
import { allInOne } from '../content/copy';
import { CtaLink, SectionHead } from '../components/ui';
import { Logo } from '../components/Logo';
import { useReveal, useSectionProgress } from '../lib/scroll';
import { Traces } from '../components/Traces';

const icons = [Sparkles, Blocks, Waypoints, Palette, Webhook, BarChart3];

/**
 * S13 — Tudo em um só lugar. Revisão 21/09 (C22/C23): sem revelação progressiva nem tijolos caindo;
 * a coluna esquerda fica enxuta (título, seis tópicos curtos, fechamento e CTA) e a pilha à direita
 * é uma composição estática que só entra com o reveal padrão.
 */
export function AllInOneSection() {
  const root = useRef<HTMLElement>(null);
  useSectionProgress('allinone', root);
  useReveal(root);

  return (
    <section ref={root} className="section" aria-labelledby="allinone-title">
      <Traces corners={['tr']} />
      <div className="container split split--even">
        <div>
          <SectionHead eyebrow={allInOne.eyebrow} title={<span id="allinone-title">{allInOne.title}</span>} size="h3" />
          <ul className="allinone__lines" data-reveal>
            {allInOne.lines.map((l, i) => {
              const Icon = icons[i];
              return <li key={l} className="allinone__line"><Icon size={14} aria-hidden="true" />{l}</li>;
            })}
          </ul>
          <div className="allinone__close" data-reveal>
            <h3 className="h4">{allInOne.close}</h3>
            <div style={{ marginTop: '1.25rem' }}><CtaLink size="lg">{allInOne.cta}</CtaLink></div>
          </div>
        </div>
        <div className="allinone__stack" aria-hidden="true">
          {allInOne.lines.map((l, i) => {
            const Icon = icons[i];
            return <div key={l} className="allinone__brick" data-reveal><i><Icon size={13} /></i>{l.replace(/\.$/, '')}</div>;
          })}
          <div className="allinone__brick allinone__brick--core" data-reveal><Logo height={20} light /></div>
        </div>
      </div>
    </section>
  );
}
