import { Sparkles, Type, ImageIcon, MousePointerClick, ListChecks, Check } from 'lucide-react';
import { Scaled } from './Scaled';
import './aiart.css';

/**
 * Representação ilustrada do que a IA faz — não é uma captura do app.
 * Um cartão de descrição alimenta um projeto que se monta em quatro camadas, na mesma ordem
 * da copy: estrutura (etapas), conteúdo (linhas de texto), elementos (chips) e lógica (caminhos).
 * Os data-* são os ganchos da timeline da seção.
 */
export const AI_BRIEF = 'Quiz de diagnóstico para uma clínica de estética que recomenda o tratamento ideal e captura o WhatsApp.';

const STEPS = ['Boas-vindas', 'Preocupação', 'Rotina', 'Cadastro', 'Resultado'];
const ELEMENTS = [
  { label: 'Título', Icon: Type },
  { label: 'Imagem', Icon: ImageIcon },
  { label: 'Botão', Icon: MousePointerClick },
  { label: 'Formulário', Icon: ListChecks },
];

export function AiArt() {
  return (
    <Scaled width={960} height={600} className="aiart">
      <div className="aiart__canvas">
        {/* 1. a descrição */}
        <div className="aiart__prompt">
          <div className="aiart__prompt-head"><Sparkles size={15} /> Clickzz AI</div>
          <div className="aiart__prompt-label">Descreva o projeto que você quer criar</div>
          <div className="aiart__prompt-field">
            <span data-ai-type />
            <i className="aiart__caret" data-ai-caret />
          </div>
          <div className="aiart__prompt-foot">
            <span className="aiart__cost">1 moeda por etapa</span>
            <span className="aiart__btn" data-ai-btn>Gerar projeto <Sparkles size={12} /></span>
          </div>
        </div>

        {/* 2. o feixe: a descrição vira projeto */}
        <svg className="aiart__beam" viewBox="0 0 960 600" aria-hidden="true">
          <path className="aiart__beam-line" d="M 392 150 L 470 150" pathLength={1} data-ai-beam />
          <path className="aiart__beam-head" d="M 462 144 L 472 150 L 462 156" />
        </svg>

        {/* 3. o projeto se montando */}
        <div className="aiart__project">
          <div className="aiart__project-head">
            <span className="aiart__dot" />
            <b>Diagnóstico de Pele</b>
            <span className="aiart__pill">Quiz</span>
            <span className="aiart__done" data-ai-done><Check size={11} strokeWidth={3} /> Pronto para editar</span>
          </div>

          {/* estrutura: as etapas */}
          <div className="aiart__layer" data-ai-layer="0">
            <span className="aiart__layer-tag">Estrutura</span>
            <div className="aiart__steps">
              <i className="aiart__rail" data-ai-rail />
              {STEPS.map((s, i) => (
                <span key={s} className="aiart__step" data-ai-step={i}>
                  <b>{i + 1}</b>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* conteúdo e elementos: a etapa aberta */}
          <div className="aiart__layer aiart__layer--card">
            <span className="aiart__layer-tag">Conteúdo</span>
            <div className="aiart__card">
              <div className="aiart__line aiart__line--title" data-ai-line="0" />
              <div className="aiart__line" data-ai-line="1" />
              <div className="aiart__line aiart__line--short" data-ai-line="2" />
              <div className="aiart__els">
                {ELEMENTS.map((e, i) => (
                  <span key={e.label} className="aiart__el" data-ai-el={i}><e.Icon size={12} />{e.label}</span>
                ))}
              </div>
            </div>
          </div>

          {/* lógica: os caminhos */}
          <div className="aiart__layer aiart__layer--logic">
            <span className="aiart__layer-tag">Lógica</span>
            <div className="aiart__logic">
              <span className="aiart__node">Etapa 2</span>
              <svg className="aiart__wires" viewBox="0 0 250 92" preserveAspectRatio="none" aria-hidden="true">
                <path d="M 0 46 C 60 46, 60 14, 130 14" pathLength={1} data-ai-wire="0" />
                <path d="M 0 46 C 60 46, 60 78, 130 78" pathLength={1} data-ai-wire="1" />
              </svg>
              <span className="aiart__cond" data-ai-cond>Condição</span>
              <span className="aiart__branch aiart__branch--a" data-ai-branch="0">Caminho A</span>
              <span className="aiart__branch aiart__branch--b" data-ai-branch="1">Caminho B</span>
            </div>
          </div>
        </div>
      </div>
    </Scaled>
  );
}
