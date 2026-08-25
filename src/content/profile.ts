import { SITE_HOST_DISPLAY, SITE_URL } from '@/libs/site';
import type { I18nList, I18nText } from './types';

/* ============================================================
   Single source of truth for every fact about João Vitor.
   Everything on the site reads from here — never hardcode a
   date, a number or a link in a component.
   ============================================================ */

export const profile = {
  name: 'João Vitor',
  fullName: 'João Vitor Cavalcanti da Silva',
  initials: 'JV',
  /** display text; the canonical origin lives in libs/site.ts */
  domain: SITE_HOST_DISPLAY,
  url: SITE_URL,

  role: {
    pt: 'Desenvolvedor Full Stack',
    en: 'Full Stack Developer',
  } satisfies I18nText,

  /** The one-line positioning. This is the sentence people remember. */
  headline: {
    pt: 'Construo os sistemas que fazem a saúde pública brasileira funcionar.',
    en: 'I build the systems that keep Brazilian public healthcare running.',
  } satisfies I18nText,

  location: {
    city: 'Caruaru',
    state: 'PE',
    stateFull: 'Pernambuco',
    country: { pt: 'Brasil', en: 'Brazil' } satisfies I18nText,
    label: {
      pt: 'Caruaru, Pernambuco — Brasil',
      en: 'Caruaru, Pernambuco — Brazil',
    } satisfies I18nText,
    /** agreste pernambucano */
    coords: { lat: -8.2837, lon: -35.976 },
    timezone: 'America/Recife',
    utc: 'UTC−3',
  },

  contact: {
    email: 'joaovitorrkc@gmail.com',
    phoneDisplay: '+55 (81) 98212-0328',
    phoneRaw: '+5581982120328',
    whatsapp: 'https://wa.me/5581982120328',
  },

  socials: [
    {
      key: 'github',
      label: 'GitHub',
      handle: '@joaovitorkc',
      url: 'https://github.com/joaovitorkc',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      handle: '/in/joaovitorkc',
      url: 'https://www.linkedin.com/in/joaovitorkc/',
    },
    {
      key: 'instagram',
      label: 'Instagram',
      handle: '@joaovitork.c',
      url: 'https://www.instagram.com/joaovitork.c/',
    },
  ],

  availability: {
    open: true,
    label: {
      pt: 'Aberto a conversar sobre projetos',
      en: 'Open to talk about projects',
    } satisfies I18nText,
  },

  /** Career start — used to compute "years of practice" at render time. */
  careerStart: '2023-03-01',

  /** Career start is also when the first client engagement began. */

  resume: {
    pt: '/curriculo.pdf',
    en: '/resume.pdf',
  } satisfies I18nText,
} as const;

/* ------------------------------------------------------------------ */
/* Organisations — two distinct relationships, never flattened           */
/* ------------------------------------------------------------------ */

/**
 * `relation` is the whole point of this structure.
 *
 *   'own'    — his own company. Listing it as a client would inflate the client
 *              count and misrepresent what it is.
 *   'client' — someone who hired him.
 *
 * The section renders these as two tiers for exactly that reason.
 */
export type Org = {
  id: string;
  name: string;
  url: string;
  relation: 'own' | 'client';
  sector: I18nText;
  what: I18nText;
  /** only set where the real date is known — never guessed */
  since?: string;
};

export const orgs: Org[] = [
  {
    id: 'quiral',
    name: 'Quiral Labs',
    url: 'https://www.quirallabs.com.br/',
    relation: 'own',
    sector: {
      pt: 'Software sob medida e impressão 3D',
      en: 'Custom software and 3D printing',
    },
    what: {
      pt: 'Minha empresa. Software sob medida e impressão 3D — de onde eu assino o que construo.',
      en: 'My own company. Custom software and 3D printing — where the work I build carries my name.',
    },
  },
  {
    id: 'wi',
    name: 'Wi Consultoria',
    url: 'https://www.wiconsultoria.com.br/',
    relation: 'client',
    since: '2023-03',
    sector: {
      pt: 'Software para saúde pública',
      en: 'Public health software',
    },
    what: {
      pt: 'O ecossistema e-Gestão e o e-SUS em nuvem para secretarias municipais de saúde — presente em mais de 400 municípios, em 26 estados.',
      en: 'The e-Gestão ecosystem and cloud-hosted e-SUS for municipal health departments — live across more than 400 municipalities in 26 states.',
    },
  },
  {
    id: 'catsuc',
    name: 'Catsuc Labs',
    url: 'https://www.catsuc.com/',
    relation: 'client',
    sector: {
      pt: 'Estúdio de software sob medida',
      en: 'Custom software studio',
    },
    what: {
      pt: 'Plataformas web, aplicativos, sistemas internos e infraestrutura em nuvem. Sete anos de estrada e mais de 40 projetos entregues.',
      en: 'Web platforms, mobile apps, internal systems and cloud infrastructure. Seven years in, 40+ projects delivered.',
    },
  },
];

export const ownOrgs = orgs.filter((o) => o.relation === 'own');
export const clientOrgs = orgs.filter((o) => o.relation === 'client');

/* ------------------------------------------------------------------ */
/* Manifesto — the pinned chapter. Each line reveals on its own.       */
/* ------------------------------------------------------------------ */

export const manifesto = {
  lead: {
    pt: 'Software que ninguém pode ver quebrar.',
    en: 'Software nobody can afford to see break.',
  } satisfies I18nText,

  lines: {
    pt: [
      'Eu não construo landing pages bonitas que ninguém usa.',
      'Construo sistemas que uma secretaria de saúde abre às 7h da manhã e não pode falhar.',
      'Onde um número errado num relatório é dinheiro federal que não chega no município.',
      'Onde a fila da recepção depende de um WebSocket que eu escrevi.',
      'Isso muda como você escreve código.',
      'Você para de perguntar “isso funciona?” e passa a perguntar “isso aguenta?”.',
    ],
    en: [
      'I don’t build pretty landing pages nobody uses.',
      'I build systems a health department opens at 7am that simply cannot fail.',
      'Where one wrong number in a report is federal funding a town never receives.',
      'Where the queue at the front desk depends on a WebSocket I wrote.',
      'That changes how you write code.',
      'You stop asking “does this work?” and start asking “will this hold?”.',
    ],
  } satisfies I18nList,

  close: {
    pt: 'Três anos nisso. Dez sistemas em produção. Nenhum dia entediante.',
    en: 'Three years of it. Ten systems in production. Not one boring day.',
  } satisfies I18nText,
};

/* ------------------------------------------------------------------ */
/* About — the human paragraphs                                        */
/* ------------------------------------------------------------------ */

export const about = {
  paragraphs: {
    pt: [
      'Sou desenvolvedor full stack em Caruaru e atendo clientes desde março de 2023. Comecei mexendo em tudo e acabei encontrando meu lugar onde o problema é grande: sistemas de gestão para secretarias municipais de saúde, hoje em uso em mais de 400 municípios. Meu principal cliente é a Wi Consultoria.',
      'Meu dia é TypeScript de ponta a ponta — Next.js e React na frente, Express e Fastify atrás, PostgreSQL modelado e otimizado à mão. Mas o trabalho não para no código: eu também gerencio os projetos em andamento, configuro e endureço as máquinas que rodam as aplicações e cuido do ambiente de produção.',
      'A parte que eu mais gosto é a que ninguém vê: transformar a regra crua de uma nota técnica do Ministério da Saúde em uma query que responde em milissegundos para mais de 200 telas diferentes.',
      'Em paralelo, curso Ciência da Computação na UniFavip Wyden. A faculdade me dá o alicerce; a prática me deu a velocidade.',
    ],
    en: [
      'I’m a full stack developer based in Caruaru, Brazil, working with clients since March 2023. I started out touching everything and ended up where the problem is big: management systems for municipal health departments, today in use across more than 400 municipalities. My main client is Wi Consultoria.',
      'My day is TypeScript end to end — Next.js and React up front, Express and Fastify behind, PostgreSQL modeled and tuned by hand. But the job doesn’t stop at code: I also run the ongoing projects, configure and harden the machines the applications run on, and own the production environment.',
      'My favourite part is the part nobody sees: turning the raw rule of a Ministry of Health technical note into a query that answers in milliseconds across 200+ different screens.',
      'Alongside that I’m studying Computer Science at UniFavip Wyden. College gives me the foundation; the work gave me the speed.',
    ],
  } satisfies I18nList,
};

/* ------------------------------------------------------------------ */
/* Trajectory                                                          */
/* ------------------------------------------------------------------ */

export type TimelineEntry = {
  id: string;
  from: string;
  to: string | null;
  kind: 'work' | 'study' | 'milestone';
  title: I18nText;
  org: string;
  /**
   * How he relates to `org`. Matters: 'client' must never render as employment,
   * on the page or in the structured data.
   */
  relation?: 'client' | 'school';
  place?: string;
  detail: I18nText;
  tags?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    id: 'wyden',
    from: '2025-01',
    to: null,
    kind: 'study',
    title: { pt: 'Ciência da Computação', en: 'Computer Science' },
    org: 'UniFavip Wyden',
    relation: 'school',
    place: 'Caruaru, PE',
    detail: {
      pt: 'Graduação em andamento. Estrutura de dados em C, algoritmos e complexidade — os fundamentos que a prática usa todo dia sem nomear.',
      en: 'Degree in progress. Data structures in C, algorithms and complexity — the fundamentals practice leans on daily without ever naming them.',
    },
    tags: ['C', 'Estrutura de dados', 'Algoritmos', 'Complexidade'],
  },
  {
    id: 'cloud-security',
    from: '2025',
    to: '2025',
    kind: 'study',
    title: { pt: 'Nuvem e segurança, formalizadas', en: 'Cloud and security, formalised' },
    org: 'AWS Academy · Cisco',
    detail: {
      pt: 'Arquitetura e fundamentos de nuvem pela AWS Academy, e gestão de ameaças cibernéticas pela Cisco. Eu já subia e endurecia servidor na prática; aqui foi para saber o nome do que eu estava fazendo — e o que eu estava fazendo errado.',
      en: 'Cloud architecting and cloud foundations through AWS Academy, plus cyber threat management through Cisco. I was already deploying and hardening servers; this was about learning the names for what I was doing — and what I was doing wrong.',
    },
    tags: ['AWS', 'Arquitetura em nuvem', 'Segurança', 'Redes'],
  },
  {
    id: 'fullstack-week',
    from: '2025',
    to: '2025',
    kind: 'study',
    title: { pt: 'Full Stack Week', en: 'Full Stack Week' },
    org: 'Full Stack Week',
    detail: {
      pt: 'Semana intensiva de projeto full stack ponta a ponta. Menos sobre aprender sintaxe e mais sobre ver outra pessoa tomar decisões de arquitetura em tempo real.',
      en: 'An intensive week building a full stack project end to end. Less about syntax and more about watching someone else make architecture decisions in real time.',
    },
    tags: ['Next.js', 'Prisma', 'Arquitetura'],
  },
  {
    id: 'js-deep',
    from: '2023',
    to: '2023',
    kind: 'study',
    title: { pt: 'JavaScript a fundo', en: 'JavaScript, properly' },
    org: 'Hashtag Treinamentos',
    detail: {
      pt: 'Intensivão de JavaScript no mesmo ano em que peguei o primeiro sistema em produção. Aprender a linguagem enquanto ela já estava rodando para outra pessoa muda o nível de atenção.',
      en: 'A JavaScript intensive in the same year I took on my first production system. Learning the language while it was already running for someone else changes how closely you pay attention.',
    },
    tags: ['JavaScript', 'DOM', 'Assíncrono'],
  },
  {
    id: 'first-code',
    from: '2022',
    to: '2022',
    kind: 'milestone',
    title: { pt: 'O começo, por conta', en: 'Where it started, on my own' },
    org: 'Udemy · Rocketseat',
    detail: {
      pt: 'Dois cursos longos de desenvolvimento web e React, feitos sozinho, sem ninguém cobrando. Foi o suficiente para entrar no mercado no ano seguinte — e é a parte da história que eu mais defendo.',
      en: 'Two long courses on web development and React, done alone with nobody checking. Enough to get into the industry the following year — and the part of the story I defend hardest.',
    },
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
];

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */

export type Certification = {
  id: string;
  year: string;
  issuer: string;
  kind: 'certificate' | 'course';
  title: I18nText;
};

export const certifications: Certification[] = [
  {
    id: 'aws-arch',
    year: '2025',
    issuer: 'AWS Academy',
    kind: 'certificate',
    title: {
      pt: 'Arquitetura em Nuvem',
      en: 'Cloud Architecting',
    },
  },
  {
    id: 'aws-found',
    year: '2025',
    issuer: 'AWS Academy',
    kind: 'certificate',
    title: {
      pt: 'Fundamentos da Nuvem',
      en: 'Cloud Foundations',
    },
  },
  {
    id: 'cisco-cyber',
    year: '2025',
    issuer: 'Cisco',
    kind: 'certificate',
    title: {
      pt: 'Gestão de Ameaças Cibernéticas',
      en: 'Cyber Threat Management',
    },
  },
  {
    id: 'fsw',
    year: '2025',
    issuer: 'Full Stack Week',
    kind: 'course',
    title: {
      pt: 'Full Stack Week',
      en: 'Full Stack Week',
    },
  },
  {
    id: 'hashtag-js',
    year: '2023',
    issuer: 'Hashtag Treinamentos',
    kind: 'certificate',
    title: {
      pt: 'Intensivão de JavaScript',
      en: 'JavaScript Intensive',
    },
  },
  {
    id: 'react-mastery',
    year: '2022',
    issuer: 'Udemy',
    kind: 'course',
    title: {
      pt: 'React do Zero à Maestria — hooks, router, API',
      en: 'React from Zero to Mastery — hooks, router, API',
    },
  },
  {
    id: 'web-complete',
    year: '2022',
    issuer: 'Udemy',
    kind: 'course',
    title: {
      pt: 'Desenvolvimento Web Completo — 6 projetos',
      en: 'Complete Web Development — 6 projects',
    },
  },
];

/* ------------------------------------------------------------------ */
/* Stack — grouped, with an honest depth signal                         */
/* ------------------------------------------------------------------ */

export type StackItem = {
  name: string;
  /**
   * English name, for the few entries that are Portuguese phrases rather than
   * product names. Product names ("Next.js", "Ollama") never need this — but
   * "Engenharia de contexto" printed in an English CV reads as an oversight.
   */
  nameEn?: string;
  /** daily = in production every day · working = shipped with it · learning = actively studying */
  depth: 'daily' | 'working' | 'learning';
};

/** The stack item's name in the reader's language. */
export const stackName = (item: StackItem, locale: 'pt' | 'en') =>
  locale === 'en' && item.nameEn ? item.nameEn : item.name;

export type StackGroup = {
  id: string;
  title: I18nText;
  note: I18nText;
  items: StackItem[];
};

export const stack: StackGroup[] = [
  {
    id: 'language',
    title: { pt: 'Linguagem', en: 'Language' },
    note: {
      pt: 'TypeScript de ponta a ponta. O resto entra quando o problema pede.',
      en: 'TypeScript end to end. The rest shows up when the problem asks for it.',
    },
    items: [
      { name: 'TypeScript', depth: 'daily' },
      { name: 'JavaScript', depth: 'daily' },
      { name: 'SQL', depth: 'daily' },
      { name: 'Python', depth: 'working' },
      { name: 'C', depth: 'working' },
      { name: 'PHP', depth: 'working' },
      { name: 'Java', depth: 'learning' },
    ],
  },
  {
    id: 'front',
    title: { pt: 'Interface', en: 'Interface' },
    note: {
      pt: 'Mais de 200 telas de relatório me ensinaram que consistência vale mais que criatividade solta.',
      en: '200+ report screens taught me consistency beats loose creativity.',
    },
    items: [
      { name: 'React', depth: 'daily' },
      { name: 'Next.js', depth: 'daily' },
      { name: 'Tailwind CSS', depth: 'daily' },
      { name: 'TanStack Query', depth: 'daily' },
      { name: 'shadcn/ui · Radix', depth: 'daily' },
      { name: 'React Hook Form · Zod', depth: 'daily' },
      { name: 'Recharts', depth: 'working' },
      { name: 'Vue.js', depth: 'working' },
      { name: 'GSAP', depth: 'working' },
    ],
  },
  {
    id: 'back',
    title: { pt: 'Servidor', en: 'Server' },
    note: {
      pt: 'APIs que carregam pipeline de sincronização, exportação e fila. Express onde é maduro, Fastify onde é novo.',
      en: 'APIs carrying sync pipelines, exports and queues. Express where it’s mature, Fastify where it’s new.',
    },
    items: [
      { name: 'Node.js', depth: 'daily' },
      { name: 'Express', depth: 'daily' },
      { name: 'Fastify', depth: 'daily' },
      { name: 'Knex', depth: 'daily' },
      { name: 'Prisma', depth: 'working' },
      { name: 'Bull · filas', nameEn: 'Bull · queues', depth: 'daily' },
      { name: 'WebSocket · Socket.IO', depth: 'daily' },
      { name: 'REST', depth: 'daily' },
      { name: 'Puppeteer', depth: 'working' },
    ],
  },
  {
    id: 'data',
    title: { pt: 'Dados', en: 'Data' },
    note: {
      pt: 'Modelagem, índice e plano de execução. Query lenta em relatório de saúde não é detalhe.',
      en: 'Modeling, indexes and execution plans. A slow query in a health report is not a detail.',
    },
    items: [
      { name: 'PostgreSQL', depth: 'daily' },
      { name: 'Redis', depth: 'daily' },
      { name: 'MySQL', depth: 'working' },
      { name: 'Migrations', depth: 'daily' },
      { name: 'ETL · sync', depth: 'daily' },
    ],
  },
  {
    id: 'ia',
    title: { pt: 'IA & Automação', en: 'AI & Automation' },
    note: {
      pt: 'Não é hype: eu construí o harness de agentes que orquestra o desenvolvimento de dez produtos aqui, e coloquei um assistente com RAG em produção dentro de um sistema de saúde.',
      en: 'Not hype: I built the agent harness that orchestrates development across ten products here, and shipped a RAG assistant into production inside a healthcare system.',
    },
    items: [
      { name: 'Harness de agentes', nameEn: 'Agent harness', depth: 'daily' },
      { name: 'Claude Code', depth: 'daily' },
      { name: 'Cursor · Composer', depth: 'daily' },
      { name: 'Engenharia de contexto', nameEn: 'Context engineering', depth: 'daily' },
      { name: 'RAG', depth: 'working' },
      { name: 'LLM auto-hospedado · Ollama', nameEn: 'Self-hosted LLM · Ollama', depth: 'working' },
      { name: 'MCP', depth: 'learning' },
      { name: 'Automação de processo', nameEn: 'Process automation', depth: 'working' },
    ],
  },
  {
    id: 'infra',
    title: { pt: 'Infra & Operação', en: 'Infra & Ops' },
    note: {
      pt: 'Eu subo, eu endureço, eu acordo se cair. Certificado em arquitetura de nuvem pela AWS Academy.',
      en: 'I deploy it, I harden it, I get up if it falls. AWS Academy certified in cloud architecting.',
    },
    items: [
      { name: 'Linux · VPS', depth: 'daily' },
      { name: 'Nginx', depth: 'daily' },
      { name: 'PM2', depth: 'daily' },
      { name: 'Docker', depth: 'working' },
      { name: 'AWS · S3', depth: 'working' },
      { name: 'Google Cloud', depth: 'working' },
      { name: 'Git · CI/CD', depth: 'daily' },
      { name: 'VPN · hardening', depth: 'working' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Currículo — conteúdo próprio, orientado a impacto                   */
/* ------------------------------------------------------------------ */

/**
 * A CV is not a shorter portfolio.
 *
 * The site sells with narrative; a CV is skimmed in about 30 seconds by
 * someone comparing candidates. So this block is written differently:
 * every bullet leads with what changed, not with what was used. Tools go at
 * the end of the line, never at the start.
 *
 * Everything here is verifiable — counted in the code or public on the
 * clients' own sites.
 */
export type CvRole = {
  id: string;
  title: I18nText;
  org: string;
  /** client engagement, never employment */
  relation: 'client';
  /** omit when the real period isn't confirmed — never print a guessed date */
  from?: string;
  to?: string | null;
  place: I18nText;
  /** achievement-first lines. Impact, then mechanism. */
  bullets: I18nList;
  stack: string[];
};

export const cv = {
  /** Sits under the name. Must earn the next 20 seconds of attention. */
  summary: {
    pt: 'Desenvolvedor full stack. Construo e mantenho o ecossistema de saúde pública que hoje roda em mais de 400 municípios brasileiros, em 26 estados — da modelagem do banco e do pipeline de dados até a interface, o servidor de produção e a condução do projeto. Também entrego produtos de consumo onde a parte difícil é integridade: vaga limitada, pagamento e sorteio que precisa ser auditável. TypeScript de ponta a ponta.',
    en: 'Full stack developer. I build and maintain the public healthcare ecosystem now running across more than 400 Brazilian municipalities in 26 states — from database modeling and the data pipeline through to the interface, the production servers and project delivery. I also ship consumer products where the hard part is integrity: finite seats, payments, and draws that have to be auditable. TypeScript end to end.',
  } satisfies I18nText,

  /** The numbers an analyst can check. Five is the limit before it reads as noise. */
  impact: [
    { value: '400+', label: { pt: 'municípios atendidos', en: 'municipalities served' } },
    { value: '26', label: { pt: 'estados', en: 'states' } },
    { value: '200+', label: { pt: 'telas em produção', en: 'screens in production' } },
    { value: '50+', label: { pt: 'módulos de API', en: 'API modules' } },
    { value: '300+', label: { pt: 'migrations de banco', en: 'database migrations' } },
  ],

  roles: [
    {
      id: 'wi',
      title: {
        pt: 'Desenvolvedor Full Stack · Sistemas de saúde pública',
        en: 'Full Stack Developer · Public health systems',
      },
      org: 'Wi Consultoria',
      relation: 'client',
      from: '2023-03',
      to: null,
      place: { pt: 'Caruaru, PE', en: 'Caruaru, PE' },
      bullets: {
        pt: [
          'Construo e mantenho o ecossistema e-Gestão — sete sistemas sob um portal único (R-SUS, SUS Direto, Visa, BPA Online, Painel de Chamadas e assistente com IA), em uso diário dentro de secretarias municipais de saúde de mais de 400 municípios, em 26 estados. Conduzo os projetos em andamento: priorização, escopo e organização da entrega.',
          'Projetei o pipeline que extrai as bases locais do e-SUS APS, transforma e materializa em tabelas espelho no PostgreSQL, com fila observável em Bull/Redis. Tirou a carga de leitura do prontuário do município e tornou todo relatório reprodutível.',
          'Implementei o isolamento multi-inquilino por código IBGE com resolução e verificação no servidor — requisito não negociável para dado de saúde de centenas de municípios na mesma instalação.',
          'Eliminei uma classe inteira de bug migrando a geração de PDF de um gerador legado em outra linguagem para uma rota de impressão capturada por Puppeteer: a tela e o documento passaram a ter uma única fonte de verdade.',
          'Integrei chamada de paciente em tempo real ao prontuário federal sem alterar uma linha dele — extensão de navegador, servidor Fastify com WebSocket em pub/sub e a TV da recepção com síntese de voz.',
          'Modelagem e otimização de query em PostgreSQL, schema versionado em mais de 300 migrations, e o deploy endurecido em Linux, Nginx e PM2 com a API separada do worker de fila.',
        ],
        en: [
          'I build and maintain the e-Gestão ecosystem — seven systems under a single portal (R-SUS, SUS Direto, Visa, BPA Online, Call Panel and an AI assistant), in daily use inside municipal health departments across more than 400 municipalities in 26 states. I run the ongoing projects: prioritisation, scope and delivery organisation.',
          'Designed the pipeline that extracts local e-SUS APS databases, transforms and materialises them into PostgreSQL mirror tables, with an observable Bull/Redis queue. It took read load off the city’s health record and made every report reproducible.',
          'Implemented multi-tenant isolation by municipal IBGE code, resolved and verified server-side — a non-negotiable requirement for health data from hundreds of cities on one installation.',
          'Removed an entire class of bug by migrating PDF generation from a legacy generator in another language to a print route captured with Puppeteer: screen and document now share a single source of truth.',
          'Integrated real-time patient calling into the federal health record without changing a line of it — a browser extension, a Fastify WebSocket pub/sub server, and the reception TV with speech synthesis.',
          'PostgreSQL modeling and query tuning, a schema versioned across 300+ migrations, and hardened deployment on Linux, Nginx and PM2 with the API separated from the queue worker.',
        ],
      },
      stack: [
        'TypeScript',
        'Next.js',
        'React',
        'Express',
        'Fastify',
        'PostgreSQL',
        'Redis',
        'Bull',
        'Socket.IO',
        'Puppeteer',
        'Linux',
        'Nginx',
      ],
    },
    {
      id: 'catsuc',
      title: {
        pt: 'Desenvolvedor Full Stack · Produtos web',
        en: 'Full Stack Developer · Web products',
      },
      org: 'Catsuc Labs',
      relation: 'client',
      // No `from`/`to`: the real period isn't confirmed, and the CV renders no
      // date span rather than printing a guessed one.
      to: null,
      place: { pt: 'Remoto', en: 'Remote' },
      bullets: {
        pt: [
          'Sistema de roleta por cotas: cada ficha comprada é uma posição numerada, garantida por restrição única e reserva transacional — o banco recusa a venda duplicada em vez de a aplicação torcer para a corrida não acontecer.',
          'Confirmação de pagamento idempotente por chave, tratando reentrega de webhook como o caso esperado, e sorteio de disparo único com semente e resultado persistidos para poder ser reconstruído depois.',
          'Bolão de futebol com prazo verificado no servidor (nunca no relógio do cliente) e apuração como função pura de palpite, resultado e regra do campeonato — o que tornou o recálculo seguro quando um resultado oficial foi corrigido.',
          'Dodreams: modelagem de um domínio subjetivo em um núcleo pequeno com campos opcionais e etapas livres, com progresso derivado das etapas concluídas em vez de editável pelo usuário.',
        ],
        en: [
          'Quota-based roulette system: each chip purchased is a numbered seat, guaranteed by a unique constraint and a transactional reservation — the database refuses the double sale instead of the application hoping the race never happens.',
          'Idempotent payment confirmation keyed per event, treating webhook redelivery as the expected case, and a fire-once draw with seed and result persisted so it can be reconstructed afterwards.',
          'A football pool with deadlines enforced server-side (never on the client clock) and scoring as a pure function of prediction, result and tournament rule — which made recomputation safe when an official result was corrected.',
          'Dodreams: modeling a subjective domain as a small core with optional fields and free-form steps, with progress derived from completed steps rather than editable by the user.',
        ],
      },
      stack: ['TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis'],
    },
  ] satisfies CvRole[],

  languages: [
    { name: { pt: 'Português', en: 'Portuguese' }, level: { pt: 'Nativo', en: 'Native' } },
    { name: { pt: 'Inglês', en: 'English' }, level: { pt: 'Intermediário', en: 'Intermediate' } },
  ],
};

/* ------------------------------------------------------------------ */
/* The personal chapter                                                */
/* ------------------------------------------------------------------ */

export const personal = {
  intro: {
    pt: 'Fora do editor',
    en: 'Away from the editor',
  } satisfies I18nText,

  cards: [
    {
      id: 'caruaru',
      label: { pt: 'Base', en: 'Based in' },
      value: 'Caruaru, PE',
      body: {
        pt: 'Agreste de Pernambuco, capital do forró. Dá pra construir software sério a 130 km do litoral — e eu prefiro assim.',
        en: 'The agreste of Pernambuco, capital of forró. You can build serious software 130 km inland — and I prefer it that way.',
      },
    },
    {
      id: 'how',
      label: { pt: 'Como eu trabalho', en: 'How I work' },
      value: { pt: 'Contexto antes de código', en: 'Context before code' },
      body: {
        pt: 'Eu leio o domínio antes de abrir o editor. Regra de negócio de saúde pública não se adivinha: se eu não entendi a nota técnica, o código vai estar errado e bonito.',
        en: 'I read the domain before opening the editor. You don’t guess public-health business rules: if I haven’t understood the technical note, the code will be wrong and pretty.',
      },
    },
    {
      id: 'obsession',
      label: { pt: 'Obsessão atual', en: 'Current obsession' },
      value: { pt: 'Tipagem que não mente', en: 'Types that don’t lie' },
      body: {
        pt: 'TypeScript levado a sério, do schema do banco até o componente. Se compila e ainda quebra, o tipo estava frouxo.',
        en: 'TypeScript taken seriously, from the database schema to the component. If it compiles and still breaks, the type was too loose.',
      },
    },
    {
      id: 'learning',
      label: { pt: 'Estudando agora', en: 'Learning now' },
      value: { pt: 'Arquitetura e escala', en: 'Architecture and scale' },
      body: {
        pt: 'Nuvem, observabilidade e o que separa um sistema que funciona de um sistema que aguenta crescer dez vezes.',
        en: 'Cloud, observability, and what separates a system that works from one that survives growing tenfold.',
      },
    },
    {
      id: 'lang',
      label: { pt: 'Idiomas', en: 'Languages' },
      value: { pt: 'Português · Inglês', en: 'Portuguese · English' },
      body: {
        pt: 'Português nativo. Inglês intermediário — leio documentação, spec e RFC sem tradutor.',
        en: 'Native Portuguese. Intermediate English — I read docs, specs and RFCs without a translator.',
      },
    },
  ],
};
