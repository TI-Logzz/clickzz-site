# Mapa de movimento

Um relógio: Lenis roda no `gsap.ticker`; cada seção registra um ScrollTrigger de progresso (`useSectionProgress`) que escreve em `lib/store.ts`; o canvas 3D lê `clock.active` e interpola a coreografia de `three/choreography.ts` (cristal, blocos, fios, partículas, wash).

| Seção | Trigger (desktop) | Pin | O que anima | Uniforms / 3D |
|---|---|---|---|---|
| S01 Hero | seção `top top → bottom bottom`, 230 vh | sticky | título por palavras (entrada), builder ao fundo acorda, página desktop monta seção a seção e rola, quiz mobile avança 3 etapas, parallax de mouse nos 3 planos, copy sai no fim | cristal em [4.5, 2.4], blocos em órbita atrás dos planos, wash 0.6 |
| S02 Posicionamento | `top bottom → bottom top` | não | chips orbitando o núcleo (loop), cluster inclina com o scroll, reveals | blocos em grade à direita |
| S03 Formatos | reveals + hover 3D nos cards | não | pulsos nos fios (loop), seções da página empilhando (loop), tilt por ponteiro + glow | anel de blocos ao fundo |
| S04 Clickzz AI | seção `top top → bottom bottom`, 460 vh | sticky | Fluxo A: Novo Projeto → clique Quiz → briefing digitado → Continuar → 3 estados de carregamento → builder (etapas, preview, elementos, toast, moedas 150→145) → Conexões (nós e fios) ; os 4 itens acendem em sincronia | cristal grande à direita do título, partículas 1.0, wash 0.8 |
| S05 Builder | seção `top top → bottom bottom`, 380 vh | sticky | Crie (arrasta "Depoimentos" para Prova social) → Personalize (Estilo: fonte Sora e cor magenta) → Publique (diálogo + toast "Página publicada! 🎉") | blocos pequenos no canto inferior esquerdo |
| S06 Quiz | palco `top 75% → bottom 55%` | não | nós entram, fios se desenham (dashoffset), pulsos em loop, Randomizador 50/50 → 62/38, mesa inclina de 14° a 4° | fios 1.0 |
| S07 Páginas | seção `top 60% → bottom 80%` | não | blocos "Hero…CTAs" caem um a um; seções do builder aparecem e a página rola; fecho aparece | pilha de blocos sob o dispositivo |
| S08 Publicação | palco `top 75% → bottom 50%` | não | dispositivo pousa, domínio digitado na barra, variantes A/B entram, partículas de tráfego se dividem | — |
| S09 Analytics | tela `top 70% → bottom 60%` | não | linha do gráfico se desenha, área e pontos, barras do funil, KPIs e linhas da tabela | — |
| S10 Antes x Clickzz | grade `top 80% → bottom 40%` | não | coluna antiga afunda (z, blur), coluna Clickzz sobe; ✕ tremem, ✓ desenham | cristal pequeno no topo direito |
| S11 Integrações | hub | não | dois anéis orbitando (rAF), pulsos nos fios, hover pausa | fios 1.0, anel de blocos |
| S12 Planos | reveals | não | toggle Mensal/Anual (estado), hover 3D + sheen | — |
| S13 Tudo em um só lugar | seção `top 60% → bottom 70%` | não | linhas acendem, tijolos caem e se encaixam, núcleo Clickzz aparece | cristal no topo esquerdo |
| S14 CTA final | reveals | não | campo digitando 3 exemplos em loop | cristal grande à direita, partículas 1.0, wash 0.9 |

Mobile (≤ 960 px) e `prefers-reduced-motion`: nenhuma seção pina; as timelines usam `trigger: palco, start: top 85%, end: bottom 15%`.
