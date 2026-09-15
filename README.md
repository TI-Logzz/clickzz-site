# Clickzz — página de vendas

Página de vendas da Clickzz (builder de projetos de conversão com IA), construída a partir do `PROMPT-MESTRE — Página de Vendas Clickzz.md` na pasta acima.

## Rodar

```bash
npm install --legacy-peer-deps
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run preview
```

`--legacy-peer-deps` é necessário porque `@react-three/fiber` declara peers opcionais do Expo que conflitam com React 19.

## Stack

- Vite 8 + React 19 + TypeScript
- Three.js via `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` (canvas persistente atrás do DOM)
- GSAP 3 + ScrollTrigger (timelines por seção, scrub) e Lenis (scroll suave no ticker do GSAP)
- Zustand (relógio único: progresso das seções, velocidade do scroll, ponteiro)
- Lucide (ícones), Inter (página), Plus Jakarta Sans e Sora (telas reproduzidas do app)

## Estrutura

```
src/
  content/copy.ts        copy literal do docx (única fonte de texto da página)
  lib/store.ts           relógio compartilhado DOM ↔ canvas
  lib/scroll.ts          Lenis + ScrollTrigger, useSectionProgress, useReveal, usePinned
  three/                 Scene (canvas fixo), Crystal (✦ de vidro), Blocks, Wires, Particles, Wash (shader), choreography (posições por seção)
  screens/               "telas vivas": reprodução em HTML/CSS do app Clickzz (dashboard, novo projeto, briefing, builder de quiz, Conexões, builder de página, analytics, publicar), Device (moldura escalada) e GhostCursor
  sections/              as 14 seções da copy + sections.css
  components/            Nav, Footer, Logo, ui (botões, eyebrow, checks)
```

## Como as telas vivas funcionam

Cada tela é desenhada em 1440×900 (ou 390×844) com HTML/CSS reais e escalada pela moldura `Device` (`transform: scale`). Os elementos carregam `data-*` (por exemplo `data-step`, `data-bsec`, `data-edge`) que as timelines GSAP das seções animam com `scrub`, incluindo um cursor fantasma (`GhostCursor`) que clica, digita e arrasta.

Fluxo A (Quiz com IA) vive em `sections/AiSection.tsx`; Fluxo B (Página) em `sections/BuilderSection.tsx` e `sections/PagesSection.tsx`.

## Marca

A logo oficial (fornecida pelo cliente) está em `public/brand/`: `clickzz-logo.png` (fundo claro), `clickzz-logo-white.png` (fundo escuro), versões `@120` para a interface, `clickzz-mark.png` / `clickzz-mark-256.v2.png` (marca quadrada, usada sozinha nos núcleos das seções) e `favicon.png` / `apple-touch-icon.png`. Os fundos foram removidos por chroma key; cada PNG carrega a origem em metadado tEXt. `components/Logo.tsx` usa esses arquivos.

## Fallbacks

- `prefers-reduced-motion`: sem scrub, sem canvas, telas no estado final, reveals instantâneos.
- Sem WebGL: `html.no-webgl` esconde o canvas; a página é 100% DOM.
- ≤ 960 px: seções pinadas viram fluxo normal; as timelines rodam ao longo da altura natural da seção.

## Verificação

- `scratchpad/capture/check-copy.js` compara cada linha do docx com o texto renderizado (0 faltantes).
- `scratchpad/capture/shoot-site.js` captura desktop/mobile em várias posições de scroll.
- `docs/motion-map.md` lista cada ScrollTrigger; `docs/screens-audit.md` documenta a fidelidade das telas.
