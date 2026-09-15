// Copy literal da página de vendas Clickzz. Fonte: "Página Clickzz.docx".
// Nada aqui pode ser reescrito. Apenas aria-labels e microcopy das telas simuladas vivem fora deste arquivo.

export const nav = {
  links: [
    { label: 'Recursos', href: '#builder' },
    { label: 'Integrações', href: '#integracoes' },
    { label: 'Preços', href: '#prices' },
  ],
  cta: 'Comece de graça',
} as const;

export const hero = {
  eyebrow: 'NOVO • O JEITO MAIS RÁPIDO DE CONSTRUIR PARA CONVERTER',
  title: 'Transforme suas ideias em projetos de conversão com IA',
  titleStar: '✦',
  body: 'Crie páginas de venda e quizzes completos a partir de uma simples descrição. A Clickzz estrutura, organiza e constrói seu projeto para você personalizar e publicar.',
  cta: 'Comece de graça',
  checks: ['Crie projetos com IA', 'Personalize tudo visualmente', 'Publique e acompanhe resultados'],
} as const;

export const positioning = {
  eyebrow: 'A PLATAFORMA',
  title: 'Seu builder de projetos de conversão com IA',
  body1: 'Da primeira ideia à publicação, tenha em um único lugar tudo o que precisa para construir projetos digitais pensados para transformar acessos em ação.',
  body2: 'Use IA para começar praticamente pronto ou construa cada detalhe do seu jeito.',
  cta: 'Comece de graça',
} as const;

export const formats = {
  eyebrow: 'SEUS PROJETOS',
  title1: 'Um objetivo: converter.',
  title2: 'Diferentes formas de chegar até lá.',
  body: 'Na Clickzz, você escolhe o formato mais adequado para cada estratégia.',
  quiz: {
    title: 'Quiz',
    body: 'Crie experiências interativas em etapas, com perguntas, respostas, lógica condicional e caminhos personalizados de acordo com cada usuário.',
    ideal: 'Ideal para: qualificação, recomendação de produtos, geração de leads, diagnóstico, segmentação e funis interativos.',
  },
  page: {
    title: 'Página',
    body: 'Construa páginas completas em uma única URL, organizadas em seções e totalmente personalizáveis para apresentar sua oferta e conduzir o visitante à conversão.',
    ideal: 'Ideal para: páginas de venda, landing pages, ofertas, campanhas, captação e apresentação de produtos ou serviços.',
  },
  cta: 'Criar meu primeiro projeto',
} as const;

export const ai = {
  eyebrow: 'CLICKZZ AI',
  title1: 'Você descreve.',
  title2: 'A Clickzz constrói.',
  titleStar: '✦',
  body1: 'Não comece mais todo projeto diante de uma tela em branco.',
  body2: 'Conte para a IA o que você deseja criar e deixe que ela transforme sua descrição em uma estrutura completa.',
  lead: 'Ela pode organizar:',
  items: [
    { title: 'Estrutura do projeto', body: 'Etapas ou seções distribuídas de acordo com seu objetivo.' },
    { title: 'Conteúdo e copy', body: 'Textos organizados dentro da estrutura do projeto.' },
    { title: 'Elementos', body: 'Títulos, textos, imagens, botões, formulários e demais componentes distribuídos automaticamente.' },
    { title: 'Lógica', body: 'Em quizzes, crie jornadas, respostas, caminhos e condicionais de forma estruturada.' },
  ],
  close: 'Depois, tudo continua completamente editável por você.',
  cta: 'Gerar meu projeto com IA',
  ctaStar: '✦',
} as const;

export const builder = {
  eyebrow: 'BUILDER VISUAL',
  title: 'Crie. Personalize. Publique.',
  titleWords: ['Crie.', 'Personalize.', 'Publique.'],
  subtitle: 'Construa visualmente, sem ficar preso ao que a IA criou.',
  body: 'Comece com IA ou do zero. Depois, edite seu projeto através de um builder visual criado para dar liberdade sem transformar cada alteração em trabalho técnico.',
  cards: [
    { title: 'Elementos para construir do seu jeito', body: 'Adicione e organize títulos, textos, imagens, vídeos, botões, formulários, preços, ícones, badges e muito mais.' },
    { title: 'Estrutura flexível', body: 'Monte seções, containers, colunas, grids e diferentes composições para adaptar cada projeto à sua estratégia.' },
    { title: 'Identidade visual completa', body: 'Personalize fontes, cores, gradientes, espaçamentos, bordas, sombras e estilos para deixar cada projeto com a cara da sua marca.' },
  ],
  cta: 'Comece de graça',
} as const;

export const quizzes = {
  eyebrow: 'QUIZZES INTERATIVOS',
  title: 'Muito mais que perguntas e respostas.',
  body: 'Monte quizzes e funis interativos com etapas, elementos e recursos personalizados em um editor visual flexível e modular.',
  cards: [
    { title: 'Variáveis e Condições', body: 'Personalize textos, blocos e caminhos com variáveis dinâmicas, visibilidade condicional e conexões entre etapas.' },
    { title: 'Caminhos personalizados', body: 'Faça diferentes respostas conduzirem usuários para diferentes jornadas dentro do mesmo projeto.' },
    { title: 'Randomizadores', body: 'Distribua acessos entre diferentes caminhos e crie variações para suas estratégias.' },
  ],
} as const;

export const pages = {
  eyebrow: 'PÁGINAS DE CONVERSÃO',
  title1: 'Da primeira dobra ao último CTA.',
  title2: 'Tudo em uma única experiência.',
  body1: 'Construa páginas completas organizando seu conteúdo em seções e blocos totalmente personalizáveis.',
  body2: 'Crie sua estrutura, reorganize seções, combine diferentes elementos e adapte cada detalhe da página ao objetivo da sua campanha.',
  blocks: ['Hero', 'Oferta', 'Benefícios', 'Prova', 'Comparações', 'Bônus', 'Garantia', 'FAQ', 'CTAs'],
  close: 'Tudo dentro do mesmo builder.',
  cta: 'Criar uma página',
} as const;

export const publish = {
  eyebrow: 'PUBLIQUE',
  title: 'Seu projeto. Seu domínio. Sua estratégia.',
  body: 'Publique seus projetos e tenha controle sobre como eles entram na sua operação.',
  cards: [
    { title: 'Domínio customizado', body: 'Personalize o endereço do seu projeto e publique usando seu próprio domínio.' },
    { title: 'Pixel da Meta', body: 'Configure seu Pixel Meta e acompanhe os eventos dos seus projetos.' },
    { title: 'Teste A/B', body: 'Randomize de forma nativa os acessos e teste possibilidades de conversão.' },
    { title: 'Links e direcionamentos', body: 'Conecte seus projetos às próximas etapas da sua estratégia.' },
  ],
  cta: 'Comece de graça',
} as const;

export const analytics = {
  eyebrow: 'DADOS',
  title: 'Não publique no escuro.',
  body1: 'Acompanhe o desempenho dos seus projetos e entenda como os usuários avançam até a conversão.',
  body2: 'Visualize acessos, interações, progresso e dados capturados para identificar o que está funcionando e onde sua estratégia pode melhorar.',
  cards: [
    { title: 'Acompanhe visitas', body: 'Entenda o volume de pessoas entrando nos seus projetos.' },
    { title: 'Analise a interação', body: 'Veja como os usuários avançam através da experiência.' },
    { title: 'Centralize seus leads', body: 'Tenha os contatos gerados pelos seus projetos organizados dentro da plataforma.' },
    { title: 'Tome decisões com dados', body: 'Compare comportamento e desempenho para evoluir continuamente suas estratégias.' },
  ],
} as const;

export const compare = {
  eyebrow: 'BENEFÍCIOS',
  title: 'Construir para converter não precisa ser lento, travado e manual.',
  oldTitle: 'O jeito antigo',
  oldItems: [
    'Começar do zero diante de uma tela em branco',
    'Usar ferramentas diferentes para página, quiz, lógica e dados',
    'Gastar tempo construindo toda a estrutura manualmente',
    'Criar projetos genéricos e jornadas lineares',
    'Ter pouca flexibilidade para personalização',
    'Depender de conhecimento técnico para pequenas alterações',
    'Ter dificuldade para testar novas variações',
  ],
  newTitle: 'O jeito Clickzz',
  newTitleStar: '✦',
  newItems: [
    'Estrutura inicial gerada com IA',
    'Páginas e quizzes dentro da mesma plataforma',
    'Builder visual completo e modular',
    'Personalização completa de cada projeto',
    'Variáveis dinâmicas e lógica condicional',
    'Randomização nativa para testes',
    'Pixels, webhooks e integrações',
    'Analytics e dados dos seus projetos em um só lugar',
  ],
  cta: 'Criar meu projeto',
} as const;

export const integrations = {
  eyebrow: 'INTEGRAÇÕES',
  title: 'Conecte seus projetos com todo o seu ecossistema',
  body1: 'Use webhooks de entrada e saída, Pixel Meta e integrações externas para conectar a Clickzz às ferramentas que já fazem parte da sua operação.',
  body2: 'Transforme interações em dados, automações e ações dentro da sua estratégia.',
} as const;

export const plans = {
  eyebrow: 'PLANOS',
  title: 'Comece grátis e evolua conforme sua operação cresce',
  body: 'Comece a construir sem custo e escolha um plano maior conforme seus projetos, contatos e operação aumentarem.',
  toggle: { monthly: 'Mensal', yearly: 'Anual', save: 'Economize 40%' },
  perMonth: '/Mês',
  included: 'O que está incluso:',
  cta: 'Escolher esse',
  items: [
    { name: 'Gratuito', monthly: 0, yearly: 0, desc: 'Ideal para começar, testar a plataforma e publicar seus primeiros projetos.', limits: ['3 projetos', '500 contatos', '100 MB de armazenamento'] },
    { name: 'Starter', monthly: 97, yearly: 58, desc: 'Ideal para operações que já utilizam projetos de conversão como parte da estratégia.', limits: ['5 projetos', '5.000 contatos', '250 MB de armazenamento'], featured: true },
    { name: 'Advanced', monthly: 497, yearly: 333, desc: 'Para operações com maior volume de projetos, contatos e necessidade de escala.', limits: ['50 projetos', '50.000 contatos', '5 GB de armazenamento'] },
  ],
} as const;

export const allInOne = {
  eyebrow: 'TUDO EM UM SÓ LUGAR',
  title: 'Uma ideia não deveria precisar de cinco ferramentas para virar um projeto.',
  lines: [
    'IA para começar.',
    'Um builder para construir.',
    'Quiz ou Página para escolher o formato.',
    'Personalização para deixar do seu jeito.',
    'Integrações para conectar sua operação.',
    'Dados para continuar melhorando.',
  ],
  close: 'Tudo dentro da Clickzz.',
  cta: 'Comece de graça',
} as const;

export const finalCta = {
  eyebrow: 'CLICKZZ AI',
  eyebrowStar: '✦',
  title: 'Sua próxima ideia pode estar publicada antes do que você imagina.',
  body: 'Descreva o projeto que deseja criar e use IA para transformar sua ideia em uma página ou quiz completo, pronto para você personalizar, publicar e converter.',
  cta: 'Criar meu primeiro projeto grátis',
  note: 'Sem precisar começar do zero.',
} as const;

export const footer = {
  brand: 'Clickzz',
  tagline1: 'Builder de projetos de conversão com IA.',
  tagline2: 'Crie, personalize e publique páginas e quizzes criados para converter.',
  columns: [
    { title: 'A Plataforma', links: [{ label: 'Recursos', href: '#builder' }, { label: 'Integrações', href: '#integracoes' }, { label: 'Preços', href: '#prices' }] },
    { title: 'Projetos', links: [{ label: 'Quiz', href: '#quiz' }, { label: 'Páginas', href: '#paginas' }] },
    { title: 'Legal', links: [{ label: 'Termos de uso', href: '#' }, { label: 'Política de privacidade', href: '#' }] },
  ],
} as const;

export const APP_URL = 'https://app.quizmaker.com.br';
