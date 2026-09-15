# Auditoria das telas vivas

Capturas reais feitas em 15/09/2026 com login em app.quizmaker.com.br (clickzzz.lovable.app redireciona para lá), 1440×900, via Playwright. Arquivos em `scratchpad/capture/shots/` da sessão de build.

| Tela real (captura) | Componente | Fidelidade | Observações |
|---|---|---|---|
| 02-dashboard, 22-dashboard-with-projects | `screens/DashboardScreen.tsx` | alta | sidebar Perfil/Painel, topbar com moedas e Recarregar, tabs Todos/Quizzes/Páginas, botões Importar Funil / Novo Projeto, card com miniatura, status, tipo, #ID, data e Configurações. Projetos exibidos são sintéticos. |
| 04-new-project | `screens/NewProjectScreen.tsx` | alta | cards "Funil de Quiz" e "Página de Venda" com as mesmas miniaturas e textos. |
| 08-quiz-start, 10-quiz-form-filled | `screens/QuizStartScreen.tsx` | alta | Etapa 1 de 2 · Briefing, Base (Do zero / Templates / Importar), Utilizar auxílio de IA, custo em moedas, descrição com contador e botão Continuar. |
| 10c-quiz-review (Etapa 2 de 2 · Etapas) | não reproduzida | — | a página resume a revisão com os estados de carregamento; a revisão bloco a bloco pode ser adicionada depois. |
| 12-quiz-builder, 16-quiz-step2, 16c-quiz-step4 | `screens/QuizBuilderScreen.tsx` | alta | topbar (título, #FTTWP9, Builder/Estilo/Conexões/Preenchimentos, moedas, Salvar, Publicar), ETAPAS, ELEMENTOS agrupados, preview mobile, CONFIGURAÇÕES DA ETAPA, toast "Funil criado com IA! (5 moeda(s) debitada(s))". |
| 17-quiz-conexoes | `screens/FlowCanvasScreen.tsx` | alta | toolbar Auto-organizar / Randomizador / Link externo / 100%, nós em miniatura de celular com número e nome, fios roxos por opção. Adicionados um Randomizador e uma bifurcação para ilustrar a copy. |
| 18-quiz-estilo | painel Estilo em `PageBuilderScreen` (variante) | média | tipografia e cores reproduzidas; o painel real do quiz tem TOPO/Logo. |
| 20-quiz-publicar, 41-page-publicar | `screens/PublishDialog.tsx` | alta | "Publicar funil/página", URL personalizada com domínio + slug, "Disponível!", Cancelar/Publicar. |
| 28-page-builder, 37-page-section-selected, 40-page-estilo | `screens/PageBuilderScreen.tsx` | alta | topbar com PÁGINA, Builder/Estilo/Preenchimentos, desktop/mobile, zoom 64%, moedas; Seções/Camadas com Cabeçalho/Rodapé "Ativo" e "+ Nova seção"; Elementos com ESTRUTURA/CONVERSÃO/INFORMATIVOS/MÍDIAS; ESTILO DO PROJETO com Tipografia/Cores/Layout e fontes Sora/Inter; canvas com cabeçalho flutuante e rodapé. A geração da página real ficou em "Estruturando a seção 1 de 6", então o conteúdo das seções é sintético (curso Confeitaria Lucrativa). |
| — | `screens/AnalyticsScreen.tsx` | inferida | a conta de teste não tinha tráfego; tela desenhada com o vocabulário real ("Visitas", "Taxa de interação", leads) e números sintéticos. |
| — | `screens/QuizPlayerScreen.tsx`, `screens/PagePreviewScreen.tsx` | autoral | projetos publicados. A página "Confeitaria Lucrativa" é uma página de vendas completa (aviso, hero com prova social e ilustração, números, entregas, planilha de precificação, depoimentos, oferta com preço, bônus, garantia, FAQ, CTA) que representa o resultado que o builder deve alcançar. |

Tokens medidos no app: fonte Plus Jakarta Sans; `--primary: hsl(263 70% 50%)`; borda `hsl(220 13% 91%)`; muted `hsl(220 9% 46%)`; sidebar-accent `hsl(263 70% 96%)`; radius 0.5rem.
