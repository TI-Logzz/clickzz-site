# Clickzz — página de vendas

Página de vendas da Clickzz (builder de projetos de conversão com IA), construída a partir do `PROMPT-MESTRE — Página de Vendas Clickzz.md` na pasta acima...

## Rodar

```bash
npm install --legacy-peer-deps
npm run dev        # http://localhost:5173
npm run build      # gera dist/
npm run preview
```

`--legacy-peer-deps` continua no `vercel.json` por compatibilidade; já não há dependência que exija a flag.

## Stack

- Vite 8 + React 19 + TypeScript
- 100% DOM: a camada 3D decorativa (cristal, blocos, fios) foi removida na revisão de 21/09; `simple-icons` para os logos das integrações
- GSAP 3 + ScrollTrigger (timelines por seção, scrub) e Lenis (scroll suave no ticker do GSAP)
- Zustand (relógio único: progresso das seções, velocidade do scroll, ponteiro)
- Lucide (ícones), Inter (página), Plus Jakarta Sans e Sora (telas reproduzidas do app)

## Estrutura

```
src/
  content/copy.ts        copy literal do docx (única fonte de texto da página)
  lib/store.ts           relógio compartilhado (progresso das seções, preferências)
  lib/scroll.ts          Lenis + ScrollTrigger, useSectionProgress, useReveal, usePinned
  components/            ilustrações: FlowArt (fluxo de quiz), AiArt (a IA montando um projeto),
                         PageArt (página de conversão por seções), BrandTile (logos), Scaled (escala nativa)
  screens/               "telas vivas" (metade das demonstrações): builder de página, página publicada,
                         quiz no celular e analytics — Device (moldura escalada, celular em 3D) e GhostCursor
  sections/              as 14 seções da copy + sections.css
  components/            Nav, Footer, Logo, ui (botões, eyebrow, checks)
```

## Como as telas vivas funcionam

Cada tela é desenhada em 1440×900 (ou 390×844) com HTML/CSS reais e escalada pela moldura `Device` (`transform: scale`). Os elementos carregam `data-*` (por exemplo `data-step`, `data-bsec`, `data-edge`) que as timelines GSAP das seções animam com `scrub`, incluindo um cursor fantasma (`GhostCursor`) que clica, digita e arrasta.

Metade das demonstrações são **telas reais** (hero, builder visual, publicação e dados: onde ser fiel ao app
importa) e metade são **ilustrações** (Clickzz AI, Seus projetos e Páginas de conversão: onde o que importa é a
ideia). As ilustrações usam o mesmo mecanismo de escala (`Scaled`) e os mesmos `data-*` para as timelines.

## Deploy

- Caminhos de assets são relativos (`base: './'`), então o mesmo build funciona na raiz (Vercel: https://clickzz-site.vercel.app) e em subpasta (GitHub Pages: https://ti-logzz.github.io/clickzz-site/).
- Vercel: conectada ao repositório, faz build a cada push na `main` (`vercel.json` define instalação com `--legacy-peer-deps` e cache longo para assets).
- GitHub Pages: `npm run deploy` publica `dist/` na branch `gh-pages` preservando assets de builds anteriores.

## Marca

A logo oficial (fornecida pelo cliente) está em `public/brand/`: `clickzz-logo.png` (fundo claro), `clickzz-logo-white.png` (fundo escuro), versões `@120` para a interface, `clickzz-mark.png` / `clickzz-mark-256.v2.png` (marca quadrada, usada sozinha nos núcleos das seções) e `favicon.png` / `apple-touch-icon.png`. Os fundos foram removidos por chroma key; cada PNG carrega a origem em metadado tEXt. `components/Logo.tsx` usa esses arquivos.

## Fallbacks e performance

- `prefers-reduced-motion`: sem scrub, telas no estado final, reveals instantâneos.
- ≤ 960 px (mobile): os reveals não usam blur, as seções pinadas viram fluxo normal, o plano do builder do hero não é renderizado e a mesa de lógica usa a variante compacta.
- Abaixo do hero, tudo vem em um chunk separado (`sections/Below.tsx`) montado em levas depois da primeira pintura (`components/Deferred.tsx`).
- A fonte principal (Inter latina, variável) é auto-hospedada em `public/fonts` e pré-carregada no `index.html`.

## Verificação

- `scratchpad/capture/check-copy.js` compara cada linha do docx com o texto renderizado (0 faltantes).
- `scratchpad/capture/shoot-site.js` captura desktop/mobile em várias posições de scroll.
- `docs/motion-map.md` lista cada ScrollTrigger; `docs/screens-audit.md` documenta a fidelidade das telas.
