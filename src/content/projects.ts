import type { I18nList, I18nText } from './types';

/* ============================================================
   Project registry.

   To add a project later: append an object to `projects`.
   Everything downstream (home listing, /work/[slug] case study,
   command palette, sitemap) is generated from this array.

   `codeVisibility: 'private'` hides every code affordance —
   proprietary client work never gets a repo link.
   ============================================================ */

export type ProjectMetric = {
  value: string;
  label: I18nText;
  hint?: I18nText;
};

export type ProjectModule = {
  name: string;
  tag: I18nText;
  body: I18nText;
};

export type ArchitectureLayer = {
  step: string;
  name: I18nText;
  detail: I18nText;
  tech: string[];
};

export type Project = {
  slug: string;
  /** dossier index, e.g. "02" */
  index: string;
  name: string;
  /** what it is, in a few words */
  kicker: I18nText;
  sector: I18nText;
  year: I18nText;
  status: 'live' | 'wip' | 'archived';
  codeVisibility: 'public' | 'private';
  /** the one project that gets the full-width treatment on the home page */
  featured: boolean;

  liveUrl?: string;
  repoUrl?: string;

  role: I18nText;
  /** one paragraph for the home listing */
  summary: I18nText;

  tech: string[];
  metrics: ProjectMetric[];

  /* ---- case-study body ---- */
  context: I18nText;
  problem: I18nText;
  approach: I18nText;
  /** optional: only the projects whose pipeline is the story */
  architecture?: ArchitectureLayer[];
  modules?: ProjectModule[];
  hardParts?: { title: I18nText; body: I18nText }[];
  responsibilities: I18nList;
  outcome: I18nText;
  /** honest reflection — what recruiters actually read for */
  learned?: I18nList;
};

export const projects: Project[] = [
  /* ==========================================================
     01 — e-Gestão
     ========================================================== */
  {
    slug: 'egestao',
    index: '01',
    name: 'e-Gestão',
    kicker: {
      pt: 'Ecossistema de gestão em saúde pública',
      en: 'Public healthcare management ecosystem',
    },
    sector: {
      pt: 'Saúde pública municipal · Brasil',
      en: 'Municipal public health · Brazil',
    },
    year: { pt: '2023 — presente', en: '2023 — present' },
    status: 'live',
    codeVisibility: 'private',
    featured: true,
    liveUrl: 'https://egestao.esus.com.br',

    role: {
      pt: 'Desenvolvedor full stack · gestão de projeto · banco e infraestrutura',
      en: 'Full stack developer · project management · database and infrastructure',
    },

    summary: {
      pt: 'Um portal, vários sistemas: relatórios da atenção primária, Saúde Brasil 360, vigilância sanitária, BPA Online, painel de chamadas na recepção, portal do cidadão e assistente com IA. Multi-inquilino por código IBGE, usado dentro de secretarias municipais de saúde em mais de 400 municípios. É o maior sistema em que eu trabalho — e o que mais me ensinou.',
      en: 'One portal, many systems: primary-care reporting, Saúde Brasil 360, health surveillance, BPA Online, a waiting-room call panel, a citizen portal and an AI assistant. Multi-tenant by municipal IBGE code, in use inside city health departments across more than 400 municipalities. It’s the largest system I work on — and the one that taught me the most.',
    },

    tech: [
      'TypeScript',
      'Next.js',
      'React',
      'TanStack Query',
      'Tailwind CSS',
      'Express',
      'Fastify',
      'Knex',
      'PostgreSQL',
      'Redis',
      'Bull',
      'Socket.IO',
      'Puppeteer',
      'Ollama · RAG',
      'JWT',
      'AWS S3',
      'Nginx',
      'PM2',
      'Linux',
    ],

    metrics: [
      {
        value: '400+',
        label: { pt: 'municípios atendidos', en: 'municipalities served' },
        hint: {
          pt: 'Cada um isolado como inquilino próprio.',
          en: 'Each one isolated as its own tenant.',
        },
      },
      {
        value: '161',
        label: { pt: 'telas em produção', en: 'screens in production' },
        hint: {
          pt: 'Relatórios, gestão, portal do cidadão e painéis.',
          en: 'Reports, management, citizen portal and panels.',
        },
      },
      {
        value: '47',
        label: { pt: 'módulos de API', en: 'API route modules' },
        hint: {
          pt: 'Cada um com suas rotas, ACL e camada de exportação.',
          en: 'Each with its own routes, ACL and export layer.',
        },
      },
      {
        value: '297',
        label: { pt: 'migrations de banco', en: 'database migrations' },
        hint: {
          pt: 'Schema versionado desde o primeiro dia.',
          en: 'Schema versioned from day one.',
        },
      },
      {
        value: '~405k',
        label: { pt: 'linhas de TypeScript', en: 'lines of TypeScript' },
        hint: {
          pt: '≈268 mil no front, ≈137 mil no servidor.',
          en: '≈268k on the front end, ≈137k on the server.',
        },
      },
      {
        value: '6',
        label: { pt: 'produtos no ecossistema', en: 'products in the ecosystem' },
        hint: {
          pt: 'R-SUS, Vigilância, BPA Online, Painel, SUS Direto, Nuvem PEC.',
          en: 'R-SUS, Surveillance, BPA Online, Call Panel, SUS Direto, Nuvem PEC.',
        },
      },
    ],

    context: {
      pt: 'Toda secretaria municipal de saúde do Brasil registra atendimento no PEC — o Prontuário Eletrônico do Cidadão do e-SUS APS, instalado localmente, município por município. O dado existe, mas fica preso: para responder “como está a atenção primária aqui?” o gestor depende de exportação manual, planilha e boa vontade. Quando a resposta chega, o mês já passou.',
      en: 'Every municipal health department in Brazil records care in PEC — the citizen electronic health record of e-SUS APS, installed locally, city by city. The data exists but stays trapped: to answer “how is primary care doing here?” a manager depends on manual exports, spreadsheets and goodwill. By the time the answer arrives, the month is over.',
    },

    problem: {
      pt: 'Transformar bases locais e heterogêneas de PEC em relatório confiável, comparável e auditável — para centenas de municípios ao mesmo tempo, com regra de negócio ditada por nota técnica do Ministério da Saúde que muda, e sem nunca deixar dado de um município aparecer para outro. E o detalhe que muda tudo: um número errado aqui não é bug de UI, é decisão de saúde tomada em cima de informação falsa.',
      en: 'Turn heterogeneous local PEC databases into reporting that is reliable, comparable and auditable — for hundreds of municipalities at once, with business rules dictated by Ministry of Health technical notes that keep changing, and never letting one city’s data surface in another’s. And the detail that changes everything: a wrong number here isn’t a UI bug, it’s a health decision made on false information.',
    },

    approach: {
      pt: 'Nada de consultar o PEC ao vivo. O sistema extrai, transforma e espelha em tabelas próprias no PostgreSQL, e todo relatório lê do espelho. Isso dá três coisas de graça: o PEC do município nunca sofre carga de leitura pesada, o schema fica sob nosso controle, e a mesma pergunta feita duas vezes dá a mesma resposta. Em cima do espelho, um shell de relatório padronizado — filtro, tabela, exportação — que se repete em 161 telas sem cada uma reinventar a roda.',
      en: 'No live querying of PEC. The system extracts, transforms and mirrors into its own PostgreSQL tables, and every report reads from the mirror. That buys three things: the city’s PEC never takes heavy read load, the schema is ours to control, and the same question asked twice gives the same answer. On top of the mirror sits one standardised report shell — filters, table, export — repeated across 161 screens instead of each reinventing the wheel.',
    },

    architecture: [
      {
        step: '01',
        name: { pt: 'Extração', en: 'Extraction' },
        detail: {
          pt: 'Leitura das bases do PEC no município. Fonte da verdade clínica, tratada como read-only — o sistema nunca escreve no prontuário.',
          en: 'Reading the city’s PEC databases. The clinical source of truth, treated as read-only — the system never writes into the health record.',
        },
        tech: ['PostgreSQL', 'Knex'],
      },
      {
        step: '02',
        name: { pt: 'Transformação em fila', en: 'Queued transformation' },
        detail: {
          pt: 'Pipeline assíncrono em fila: normaliza, deduplica e materializa nas tabelas espelho. Fila observável, com tela de acompanhamento — sincronização travada é problema visível, não silencioso.',
          en: 'Async queued pipeline: normalise, dedupe and materialise into mirror tables. The queue is observable, with its own screen — a stuck sync is a visible problem, not a silent one.',
        },
        tech: ['Bull', 'Redis', 'Node.js'],
      },
      {
        step: '03',
        name: { pt: 'Camada de indicadores', en: 'Indicator layer' },
        detail: {
          pt: 'As regras de numerador e denominador de cada indicador viram código versionado, com a nota técnica que as originou registrada ao lado. Quando o Ministério muda a regra, a mudança é rastreável — e o gestor vê na tela de onde o número saiu.',
          en: 'Numerator and denominator rules for each indicator become versioned code, with the technical note that produced them recorded alongside. When the Ministry changes a rule, the change is traceable — and the manager sees on screen where the number came from.',
        },
        tech: ['TypeScript', 'SQL'],
      },
      {
        step: '04',
        name: { pt: 'API com ACL por papel', en: 'Role-scoped API' },
        detail: {
          pt: 'Express + Knex, 47 módulos de rota. Autenticação por JWT em cookie httpOnly e autorização por papel — equipe interna, gestor municipal, profissional. O inquilino vem do código IBGE na URL e é verificado no servidor, nunca confiado no cliente.',
          en: 'Express + Knex, 47 route modules. JWT auth in an httpOnly cookie and role-based authorization — internal team, city manager, health professional. The tenant comes from the IBGE code in the URL and is verified server-side, never trusted from the client.',
        },
        tech: ['Express', 'Knex', 'JWT', 'Zod'],
      },
      {
        step: '05',
        name: { pt: 'Interface e exportação', en: 'Interface and export' },
        detail: {
          pt: 'Next.js App Router com TanStack Query. O PDF não é montado à mão: existe uma rota de impressão que renderiza a mesma tela em layout de papel e o Puppeteer captura. Um relatório, uma verdade — a tela e o PDF não podem divergir.',
          en: 'Next.js App Router with TanStack Query. PDFs aren’t hand-assembled: a print route renders the same screen in paper layout and Puppeteer captures it. One report, one truth — screen and PDF cannot drift apart.',
        },
        tech: ['Next.js', 'React', 'TanStack Query', 'Puppeteer', 'XLSX'],
      },
      {
        step: '06',
        name: { pt: 'Operação', en: 'Operations' },
        detail: {
          pt: 'VPS Linux com Nginx e PM2, processo de API separado do worker de fila, S3 para arquivos e push para notificação. Configuração, endurecimento e deploy fazem parte do meu escopo.',
          en: 'Linux VPS with Nginx and PM2, API process separated from the queue worker, S3 for files and web push for notifications. Configuration, hardening and deployment are part of my scope.',
        },
        tech: ['Linux', 'Nginx', 'PM2', 'AWS S3', 'Web Push'],
      },
    ],

    modules: [
      {
        name: 'R-SUS',
        tag: { pt: 'Relatórios da atenção primária', en: 'Primary-care reporting' },
        body: {
          pt: 'O núcleo. Relatórios de cidadãos, produção, saúde bucal, vínculos e acompanhamento, equipes multiprofissionais — cada um com filtro, tabela e exportação em PDF, CSV e XLSX.',
          en: 'The core. Reports on citizens, production, oral health, care linkage and follow-up, multiprofessional teams — each with filters, tables and PDF, CSV and XLSX export.',
        },
      },
      {
        name: 'Saúde Brasil 360',
        tag: { pt: 'Painel de gestão', en: 'Management dashboard' },
        body: {
          pt: 'Visão consolidada para quem decide: onde o município está, o que está caindo e qual equipe precisa de atenção. O número vem com a explicação de como foi calculado.',
          en: 'A consolidated view for decision-makers: where the city stands, what is slipping and which team needs attention. Every number ships with an explanation of how it was computed.',
        },
      },
      {
        name: 'Willy',
        tag: { pt: 'Assistente com RAG', en: 'RAG assistant' },
        body: {
          pt: 'Ajuda dentro do produto em duas camadas: base de artigos curada, buscável e ilimitada; e chat com IA sobre modelo auto-hospedado, com recuperação de contexto, cota diária por usuário e uma camada de segurança que barra pergunta fora de escopo e vazamento de dado sensível de paciente.',
          en: 'In-product help in two layers: a curated, searchable, unlimited article base; and an AI chat over a self-hosted model, with context retrieval, a daily per-user quota, and a safety layer that blocks out-of-scope questions and leakage of sensitive patient data.',
        },
      },
      {
        name: 'SUS Direto',
        tag: { pt: 'Portal do cidadão', en: 'Citizen portal' },
        body: {
          pt: 'A ponta que o munícipe vê: canal direto com a secretaria, sem precisar entender como o sistema funciona por dentro.',
          en: 'The end the resident actually sees: a direct channel to the health department, with no need to understand how the system works inside.',
        },
      },
      {
        name: 'Nuvem PEC',
        tag: { pt: 'e-SUS hospedado', en: 'Hosted e-SUS' },
        body: {
          pt: 'O próprio e-SUS APS rodando em nuvem gerenciada, para município que não quer manter servidor local. Backup, monitoramento e atualização deixam de ser problema da secretaria.',
          en: 'e-SUS APS itself running on managed cloud, for cities that don’t want to maintain a local server. Backups, monitoring and updates stop being the department’s problem.',
        },
      },
      {
        name: 'Fila de sincronização',
        tag: { pt: 'Observabilidade', en: 'Observability' },
        body: {
          pt: 'Tela própria para a fila: o que sincronizou, o que travou e onde. Se o dado do relatório está velho, dá para ver o motivo em vez de adivinhar.',
          en: 'The queue gets its own screen: what synced, what stalled and where. If a report’s data is stale, you can see why instead of guessing.',
        },
      },
    ],

    hardParts: [
      {
        title: {
          pt: 'Multi-inquilino que não pode falhar uma vez',
          en: 'Multi-tenancy that cannot fail once',
        },
        body: {
          pt: 'O código IBGE de seis dígitos vive na URL, mas ele não é a autorização — é só a intenção. Cada requisição resolve o município no servidor e confere contra o papel do usuário. Com mais de 400 municípios na mesma instalação, vazar dado de saúde entre eles não é bug de severidade média; é o tipo de falha que encerra um produto.',
          en: 'The six-digit IBGE code lives in the URL, but it isn’t the authorization — it’s only the intent. Every request resolves the municipality server-side and checks it against the user’s role. With 400+ cities on one installation, leaking health data across them isn’t a medium-severity bug; it’s the kind of failure that ends a product.',
        },
      },
      {
        title: {
          pt: 'A tela e o PDF têm que contar a mesma história',
          en: 'Screen and PDF must tell the same story',
        },
        body: {
          pt: 'A geração de PDF era um gerador separado, em outra linguagem, com sua própria interpretação da regra — ou seja, duas fontes de verdade e divergência garantida. A migração para renderizar a própria página em modo impressão e capturar matou a classe inteira de bug “o relatório não bate com a tela”.',
          en: 'PDF generation used to be a separate generator, in another language, with its own reading of the rules — two sources of truth and guaranteed drift. Moving to rendering the actual page in print mode and capturing it killed the entire bug class of “the report doesn’t match the screen”.',
        },
      },
      {
        title: {
          pt: 'Regra que muda por decreto',
          en: 'Rules that change by decree',
        },
        body: {
          pt: 'Indicador de saúde não é requisito estável: o Ministério publica nota técnica nova e o numerador muda. A resposta foi tratar a nota técnica como artefato de primeira classe, condensada e versionada junto ao código que a implementa, e ligada à explicação que aparece na tela para o gestor.',
          en: 'A health indicator is not a stable requirement: the Ministry publishes a new technical note and the numerator changes. The answer was to treat the technical note as a first-class artifact, condensed and versioned next to the code implementing it, and wired to the explanation the manager reads on screen.',
        },
      },
      {
        title: {
          pt: 'Consistência em 161 telas',
          en: 'Consistency across 161 screens',
        },
        body: {
          pt: 'Com essa quantidade de relatório, criatividade por tela é dívida. O shell de relatório e as classificações de listagem existem para que uma tela nova nasça previsível: filtro no mesmo lugar, exportação com o mesmo comportamento, vazio com a mesma cara.',
          en: 'At this report count, per-screen creativity is debt. The report shell and listing classifications exist so a new screen is born predictable: filters in the same place, export behaving the same way, empty states looking the same.',
        },
      },
    ],

    responsibilities: {
      pt: [
        'Desenvolvimento full stack das telas de relatório e das rotas de API que as alimentam',
        'Modelagem do banco, escrita e otimização de query, e as migrations que versionam o schema',
        'Pipeline de sincronização PEC → tabelas espelho, com fila e acompanhamento',
        'Camada de exportação: rota de impressão, captura em PDF, CSV e XLSX',
        'Autenticação, ACL por papel e isolamento por inquilino',
        'Configuração, segurança e deploy dos servidores de produção',
        'Gestão dos projetos em andamento — priorização, escopo e organização da entrega',
      ],
      en: [
        'Full stack development of the report screens and the API routes feeding them',
        'Database modeling, query writing and tuning, and the migrations that version the schema',
        'The PEC → mirror-table sync pipeline, with queueing and monitoring',
        'The export layer: print route, PDF capture, CSV and XLSX',
        'Authentication, role-based ACL and per-tenant isolation',
        'Configuration, security and deployment of the production servers',
        'Running the ongoing projects — prioritisation, scope and delivery organisation',
      ],
    },

    outcome: {
      pt: 'Está em produção, em uso diário dentro de secretarias municipais de saúde de mais de 400 municípios, e cresceu de relatório para ecossistema: seis produtos sob um portal, com painel de chamadas na recepção e assistente com IA dentro da própria ferramenta. Para o gestor, a mudança concreta é enxergar o indicador durante o mês em vez de descobrir o resultado depois.',
      en: 'It runs in production, in daily use inside municipal health departments across more than 400 municipalities, and it grew from reporting into an ecosystem: six products under one portal, with a call panel in reception and an AI assistant inside the tool itself. For the manager, the concrete change is seeing the indicator during the month instead of learning the outcome afterwards.',
    },

    learned: {
      pt: [
        'Domínio antes de código. A parte difícil de saúde pública não é React, é entender a regra que o Estado escreveu.',
        'Espelhar dado em vez de consultar a fonte viva resolveu performance, estabilidade e reprodutibilidade de uma vez.',
        'Uma fonte de verdade por resposta. Duas implementações da mesma regra sempre divergem — a questão é só quando.',
        'Padrão repetível vale mais que tela bonita quando existem 161 delas.',
        'Escrever software que outra pessoa depende para trabalhar é a melhor escola de engenharia que existe.',
      ],
      en: [
        'Domain before code. The hard part of public health isn’t React, it’s understanding the rule the State wrote.',
        'Mirroring data instead of querying the live source solved performance, stability and reproducibility at once.',
        'One source of truth per answer. Two implementations of the same rule always drift — the only question is when.',
        'A repeatable pattern beats a beautiful screen when there are 161 of them.',
        'Writing software someone else depends on to do their job is the best engineering school there is.',
      ],
    },
  },

  /* ==========================================================
     02 — Visa · Vigilância Sanitária
     ========================================================== */
  {
    slug: 'visa',
    index: '02',
    name: 'Visa',
    kicker: {
      pt: 'Vigilância sanitária municipal',
      en: 'Municipal health surveillance',
    },
    sector: { pt: 'Fiscalização · Brasil', en: 'Regulatory inspection · Brazil' },
    year: { pt: '2024 — presente', en: '2024 — present' },
    status: 'live',
    codeVisibility: 'private',
    featured: false,
    liveUrl: 'https://egestao.esus.com.br/produtos/visa',

    role: {
      pt: 'Desenvolvedor full stack',
      en: 'Full stack developer',
    },

    summary: {
      pt: 'O sistema que o fiscal usa na rua e o coordenador usa na mesa: cadastro de estabelecimentos, roteiro de inspeção, emissão de licença sanitária e tratamento de reclamação — com documento oficial saindo em PDF no fim do fluxo.',
      en: 'The system the inspector uses in the field and the coordinator uses at the desk: establishment registry, inspection workflow, sanitary licence issuing and complaint handling — with the official document coming out as a PDF at the end of the flow.',
    },

    tech: [
      'TypeScript',
      'Next.js',
      'React',
      'Tailwind CSS',
      'Fastify',
      'Knex',
      'PostgreSQL',
      'Puppeteer',
      'JWT',
      'Zod',
    ],

    metrics: [
      {
        value: '4',
        label: { pt: 'fluxos de ponta a ponta', en: 'end-to-end workflows' },
        hint: {
          pt: 'Estabelecimento, inspeção, licença e reclamação.',
          en: 'Establishment, inspection, licence and complaint.',
        },
      },
      {
        value: 'JWT',
        label: { pt: 'inquilino no token', en: 'tenant in the token' },
        hint: {
          pt: 'O município vem do JWT, não da URL — modelo diferente do R-SUS.',
          en: 'The city comes from the JWT, not the URL — a different model from R-SUS.',
        },
      },
      {
        value: 'PDF',
        label: { pt: 'documento com valor legal', en: 'legally meaningful document' },
        hint: {
          pt: 'Licença e auto de inspeção gerados por captura da própria tela.',
          en: 'Licences and inspection reports generated by capturing the actual screen.',
        },
      },
    ],

    context: {
      pt: 'Vigilância sanitária é o braço da secretaria que entra no restaurante, na farmácia e na escola para verificar se o lugar pode funcionar. O trabalho é intensivo em documento: cada inspeção gera um registro, cada licença tem validade, cada reclamação tem que ir a algum lugar. Feito em papel e planilha, some.',
      en: 'Health surveillance is the arm of the department that walks into the restaurant, the pharmacy and the school to check whether the place is fit to operate. The work is document-heavy: every inspection produces a record, every licence has an expiry, every complaint has to land somewhere. Done on paper and spreadsheets, it disappears.',
    },

    problem: {
      pt: 'Fluxo longo, com muitos campos e muitas regras, feito por gente que está com pressa — às vezes em pé, dentro do estabelecimento. Se o formulário for hostil, o dado entra errado ou não entra. E no fim tem que sair um documento formal, correto, com a cara que a fiscalização precisa apresentar.',
      en: 'Long workflows with many fields and many rules, filled in by people in a hurry — sometimes standing up, inside the establishment. If the form is hostile, the data goes in wrong or doesn’t go in at all. And at the end a formal document has to come out, correct, looking the way an inspection body needs it to look.',
    },

    approach: {
      pt: 'Interface construída em torno de painéis laterais e formulários em etapas em vez de telas cheias: o fiscal abre o registro, resolve uma coisa e fecha, sem perder o contexto da lista. No servidor, Fastify com a lógica de domínio isolada em casos de uso — a rota não sabe regra de negócio, o caso não sabe HTTP. Isso deixou fluxo complicado testável sem subir a interface.',
      en: 'The interface is built around side sheets and stepped forms instead of full-page screens: the inspector opens a record, resolves one thing and closes it, without losing the context of the list. On the server, Fastify with domain logic isolated into use cases — the route knows no business rule, the use case knows no HTTP. That made a complicated workflow testable without booting the UI.',
    },

    modules: [
      {
        name: 'Estabelecimentos',
        tag: { pt: 'Cadastro', en: 'Registry' },
        body: {
          pt: 'Quem existe, onde, de que tipo e com que situação. É a base de tudo: sem cadastro confiável, inspeção e licença não têm onde se ancorar.',
          en: 'Who exists, where, of what type and in what standing. It’s the base for everything: with no reliable registry, inspections and licences have nothing to anchor to.',
        },
      },
      {
        name: 'Inspeções',
        tag: { pt: 'Roteiro de campo', en: 'Field workflow' },
        body: {
          pt: 'O roteiro que o fiscal preenche, com o histórico do estabelecimento à mão e o auto saindo em PDF no fim.',
          en: 'The checklist the inspector fills in, with the establishment’s history at hand and the official report coming out as a PDF at the end.',
        },
      },
      {
        name: 'Licenças',
        tag: { pt: 'Emissão e validade', en: 'Issuing and validity' },
        body: {
          pt: 'Emissão, renovação e controle de vencimento. O documento é gerado a partir da própria tela, então o que a secretaria vê é o que o estabelecimento recebe.',
          en: 'Issuing, renewal and expiry control. The document is generated from the screen itself, so what the department sees is what the establishment receives.',
        },
      },
      {
        name: 'Reclamações',
        tag: { pt: 'Entrada do cidadão', en: 'Citizen intake' },
        body: {
          pt: 'A denúncia entra, vira fila de trabalho e termina em inspeção — em vez de morrer num caderno na recepção.',
          en: 'A complaint comes in, becomes a work queue and ends in an inspection — instead of dying in a notebook at the front desk.',
        },
      },
    ],

    hardParts: [
      {
        title: {
          pt: 'Dois produtos, dois modelos de inquilino',
          en: 'Two products, two tenancy models',
        },
        body: {
          pt: 'No R-SUS o município vem do código IBGE na URL; aqui vem do JWT. Trabalhar nos dois no mesmo dia exige disciplina: o instinto de copiar o padrão do outro produto é exatamente o que gera falha de isolamento. A regra que eu sigo é confirmar o produto antes de escrever a primeira linha.',
          en: 'In R-SUS the city comes from the IBGE code in the URL; here it comes from the JWT. Working on both in the same day takes discipline: the instinct to copy the other product’s pattern is exactly what creates isolation bugs. My rule is to confirm which product I’m in before writing the first line.',
        },
      },
      {
        title: {
          pt: 'Formulário longo que não pode cansar',
          en: 'A long form that mustn’t exhaust anyone',
        },
        body: {
          pt: 'Roteiro de inspeção tem dezenas de campos condicionais. Resolver isso com validação declarativa e formulário em etapas, dentro de painel lateral, foi o que fez a diferença entre “o fiscal usa” e “o fiscal preenche depois, de memória”.',
          en: 'An inspection checklist has dozens of conditional fields. Solving that with declarative validation and stepped forms inside a side sheet was the difference between “the inspector uses it” and “the inspector fills it in later, from memory”.',
        },
      },
    ],

    responsibilities: {
      pt: [
        'Telas de cadastro, inspeção, licença e reclamação — painéis laterais e formulários em etapas',
        'Rotas Fastify com a regra de negócio isolada em casos de uso',
        'Modelagem e queries no PostgreSQL para o domínio de fiscalização',
        'Geração dos documentos oficiais em PDF a partir da própria interface',
      ],
      en: [
        'Registry, inspection, licence and complaint screens — side sheets and stepped forms',
        'Fastify routes with business rules isolated into use cases',
        'PostgreSQL modeling and queries for the inspection domain',
        'Official PDF document generation straight from the interface',
      ],
    },

    outcome: {
      pt: 'A vigilância sanitária do município passa a operar dentro de um sistema em vez de em cima de papel: o histórico do estabelecimento fica, a licença tem prazo controlado e a reclamação do cidadão tem destino. Faz parte do mesmo ecossistema do e-Gestão, com um login só.',
      en: 'Municipal health surveillance starts operating inside a system instead of on top of paper: establishment history persists, licence expiry is tracked, and a citizen’s complaint has a destination. It lives in the same e-Gestão ecosystem, behind a single login.',
    },

    learned: {
      pt: [
        'Separar rota de caso de uso não é purismo: é o que permite testar regra complicada sem interface.',
        'Formulário é interface de trabalho, não formalidade. Ergonomia aqui vale mais que estética.',
        'Produtos irmãos com padrões diferentes exigem regra explícita de qual padrão vale onde.',
      ],
      en: [
        'Separating route from use case isn’t purism: it’s what lets you test complicated rules with no UI.',
        'A form is a work surface, not a formality. Ergonomics here beats aesthetics.',
        'Sibling products with different patterns demand an explicit rule about which pattern applies where.',
      ],
    },
  },

  /* ==========================================================
     03 — Painel de Chamadas
     ========================================================== */
  {
    slug: 'painel-de-chamadas',
    index: '03',
    name: 'Painel de Chamadas',
    kicker: {
      pt: 'Chamada de paciente em tempo real',
      en: 'Real-time patient calling',
    },
    sector: { pt: 'Recepção de unidade de saúde', en: 'Health unit waiting room' },
    year: { pt: '2024 — presente', en: '2024 — present' },
    status: 'live',
    codeVisibility: 'private',
    featured: false,
    liveUrl: 'https://egestao.esus.com.br/produtos/r-sus/painel',

    role: {
      pt: 'Desenvolvedor full stack — extensão, servidor WebSocket e painel',
      en: 'Full stack developer — extension, WebSocket server and panel',
    },

    summary: {
      pt: 'A TV da sala de espera chama o paciente por nome, em voz alta, no segundo em que o profissional clica dentro do próprio e-SUS. Quatro peças conversando — extensão de navegador, servidor WebSocket, painel na TV e API — sem tocar uma linha do código do PEC.',
      en: 'The waiting-room TV calls the patient by name, out loud, the moment the professional clicks inside e-SUS itself. Four pieces talking to each other — a browser extension, a WebSocket server, the TV panel and the API — without touching a single line of PEC’s code.',
    },

    tech: [
      'TypeScript',
      'React',
      'Next.js',
      'Fastify',
      'WebSocket',
      'Chrome Extension',
      'Web Speech API',
      'Redis',
    ],

    metrics: [
      {
        value: '4',
        label: { pt: 'peças no ecossistema', en: 'pieces in the ecosystem' },
        hint: {
          pt: 'Extensão, servidor de chamada, painel na TV e API.',
          en: 'Extension, call server, TV panel and API.',
        },
      },
      {
        value: '0',
        label: { pt: 'linha alterada no PEC', en: 'lines changed in PEC' },
        hint: {
          pt: 'A integração é por injeção no DOM — o prontuário fica intacto.',
          en: 'Integration is by DOM injection — the health record stays untouched.',
        },
      },
      {
        value: 'WS',
        label: { pt: 'entrega em tempo real', en: 'real-time delivery' },
        hint: {
          pt: 'Pub/sub por WebSocket, sem polling na TV.',
          en: 'WebSocket pub/sub, no polling on the TV.',
        },
      },
    ],

    context: {
      pt: 'O PEC é software federal instalado no município. A gente não pode alterá-lo — mas o profissional trabalha dentro dele o dia inteiro. Chamar o próximo paciente, na prática, era grito no corredor ou uma TV com lista estática que ninguém atualizava.',
      en: 'PEC is federal software installed in the municipality. We can’t modify it — but the professional works inside it all day. Calling the next patient was, in practice, shouting down the corridor or a TV showing a static list nobody updated.',
    },

    problem: {
      pt: 'Disparar uma chamada a partir de um sistema que não é nosso, entregar em tempo real numa TV que pode estar em outra sala, e fazer isso de forma que a unidade instale sozinha — sem técnico no local, sem alterar o PEC e sem depender de rede perfeita.',
      en: 'Trigger a call from a system that isn’t ours, deliver it in real time to a TV that may be in another room, and do it in a way the unit can install by itself — no technician on site, no changes to PEC and no dependency on a perfect network.',
    },

    approach: {
      pt: 'Uma extensão de navegador injeta o botão “chamar” na própria tela de atendimento do PEC, lendo o contexto que já está ali. O clique vira um POST para um servidor Fastify dedicado, que publica a chamada em pub/sub e empurra por WebSocket para o painel inscrito naquela sala. O painel mostra o nome e usa a síntese de voz do navegador para falar. Sem fila de mensagem pesada, sem polling e sem estado difícil de depurar.',
      en: 'A browser extension injects a “call” button into PEC’s own attendance screen, reading the context already there. The click becomes a POST to a dedicated Fastify server, which publishes the call over pub/sub and pushes it by WebSocket to the panel subscribed to that room. The panel shows the name and uses the browser’s speech synthesis to say it out loud. No heavy message broker, no polling and no state that’s hard to debug.',
    },

    architecture: [
      {
        step: '01',
        name: { pt: 'Extensão no PEC', en: 'Extension inside PEC' },
        detail: {
          pt: 'Injeta o botão na lista de atendimento e guarda sala, triagem e modelo de chamada localmente. Integração por DOM, porque o código do PEC não é nosso para mudar.',
          en: 'Injects the button into the attendance list and keeps room, triage and call template locally. DOM-level integration, because PEC’s code isn’t ours to change.',
        },
        tech: ['Chrome Extension', 'React'],
      },
      {
        step: '02',
        name: { pt: 'Servidor de chamada', en: 'Call server' },
        detail: {
          pt: 'Fastify recebe a chamada, normaliza o identificador do painel e publica em pub/sub. Serviço pequeno e dedicado: se cair, nada mais cai com ele.',
          en: 'Fastify receives the call, normalises the panel identifier and publishes it over pub/sub. A small dedicated service: if it goes down, nothing else goes with it.',
        },
        tech: ['Fastify', 'WebSocket', 'Redis'],
      },
      {
        step: '03',
        name: { pt: 'Painel na TV', en: 'TV panel' },
        detail: {
          pt: 'Página Next.js inscrita no canal daquela sala. Recebe pelo WebSocket, exibe o nome em tipo grande e fala com a síntese de voz do navegador.',
          en: 'A Next.js page subscribed to that room’s channel. It receives over WebSocket, shows the name in large type and speaks it with the browser’s speech synthesis.',
        },
        tech: ['Next.js', 'Web Speech API'],
      },
      {
        step: '04',
        name: { pt: 'Alertas no prontuário', en: 'Alerts in the record' },
        detail: {
          pt: 'A mesma extensão também lê o cidadão aberto na tela e busca alertas na nossa API — informação útil aparecendo no fluxo de trabalho que já existe, em vez de em outro sistema.',
          en: 'The same extension also reads the citizen open on screen and fetches alerts from our API — useful information surfacing inside the workflow that already exists, instead of in yet another system.',
        },
        tech: ['Express', 'REST'],
      },
    ],

    hardParts: [
      {
        title: {
          pt: 'Integrar sem poder alterar',
          en: 'Integrating with no permission to modify',
        },
        body: {
          pt: 'Injeção no DOM de um sistema de terceiro é frágil por natureza: uma atualização do PEC pode mudar a estrutura embaixo de você. A defesa foi manter a superfície de contato mínima e explícita — ler o menos possível, num só lugar, com falha silenciosa em vez de tela quebrada.',
          en: 'DOM injection into third-party software is fragile by nature: a PEC update can change the structure underneath you. The defence was keeping the contact surface minimal and explicit — read as little as possible, in one place, failing quietly instead of breaking the screen.',
        },
      },
      {
        title: {
          pt: 'Identificar a TV certa',
          en: 'Addressing the right TV',
        },
        body: {
          pt: 'Uma unidade pode ter vários painéis; um município, muitas unidades. O identificador do painel é derivado e normalizado do mesmo jeito nas duas pontas — se a extensão e o painel discordarem de uma letra, a chamada vai para o vazio. Regra de normalização única, escrita uma vez.',
          en: 'One unit can have several panels; one city, many units. The panel identifier is derived and normalised identically on both ends — if the extension and the panel disagree by one character, the call goes nowhere. One normalisation rule, written once.',
        },
      },
    ],

    responsibilities: {
      pt: [
        'Extensão de navegador que injeta a chamada e os alertas dentro do PEC',
        'Servidor Fastify com WebSocket e pub/sub das chamadas',
        'Painel da TV: layout de tipo grande, fila e síntese de voz',
        'Normalização do identificador de painel compartilhada entre as pontas',
      ],
      en: [
        'Browser extension injecting the call button and alerts into PEC',
        'Fastify server with WebSocket and call pub/sub',
        'The TV panel: large-type layout, queue and speech synthesis',
        'Panel-identifier normalisation shared across both ends',
      ],
    },

    outcome: {
      pt: 'A sala de espera passou a funcionar sozinha: o profissional clica onde já estava trabalhando e o paciente ouve o próprio nome. É o módulo que mais rápido se explica para quem nunca viu o sistema — e o que mostra melhor que integração boa é a que não pede permissão para existir.',
      en: 'The waiting room started running itself: the professional clicks where they were already working and the patient hears their own name. It’s the module that explains itself fastest to someone who has never seen the system — and the one that best shows that good integration is the kind that doesn’t need permission to exist.',
    },

    learned: {
      pt: [
        'Serviço pequeno e dedicado vale mais que módulo dentro do monolito quando a falha tem que ser isolada.',
        'Tempo real com WebSocket é simples; a parte difícil é endereçar o destinatário certo.',
        'A melhor integração é a que o usuário não percebe que é integração.',
      ],
      en: [
        'A small dedicated service beats a module inside the monolith when failure has to stay contained.',
        'Real time over WebSocket is the easy part; addressing the right recipient is the hard part.',
        'The best integration is the one the user never notices is an integration.',
      ],
    },
  },

  /* ==========================================================
     04 — BPA Online
     ========================================================== */
  {
    slug: 'bpa-online',
    index: '04',
    name: 'BPA Online',
    kicker: {
      pt: 'Produção ambulatorial até o arquivo oficial',
      en: 'Outpatient production through to the official file',
    },
    sector: { pt: 'Faturamento SUS · Brasil', en: 'SUS billing · Brazil' },
    year: { pt: '2025 — presente', en: '2025 — present' },
    status: 'live',
    codeVisibility: 'private',
    featured: false,
    liveUrl: 'https://egestao.esus.com.br/produtos/bpa-online',

    role: { pt: 'Desenvolvedor full stack', en: 'Full stack developer' },

    summary: {
      pt: 'Digitação, aprovação, exportação e auditoria do Boletim de Produção Ambulatorial — BPA-C, BPA-I e BPA-S. O ciclo inteiro que a secretaria precisa fechar por competência para o município receber pela produção que realizou.',
      en: 'Data entry, approval, export and audit of the outpatient production report — BPA-C, BPA-I and BPA-S. The whole cycle a health department must close each period for the city to be paid for the care it delivered.',
    },

    tech: [
      'TypeScript',
      'Next.js',
      'React',
      'Tailwind CSS',
      'Express',
      'Knex',
      'PostgreSQL',
      'XLSX',
      'Puppeteer',
    ],

    metrics: [
      {
        value: '3',
        label: { pt: 'tipos de BPA suportados', en: 'BPA types supported' },
        hint: {
          pt: 'Consolidado, individualizado e terceirizadas.',
          en: 'Consolidated, individual and outsourced.',
        },
      },
      {
        value: 'SIGTAP',
        label: { pt: 'tabela oficial integrada', en: 'official table integrated' },
        hint: {
          pt: 'Procedimentos e CID validados na digitação, não depois.',
          en: 'Procedures and ICD codes validated at entry time, not after.',
        },
      },
      {
        value: '100%',
        label: { pt: 'lançamentos auditáveis', en: 'auditable entries' },
        hint: {
          pt: 'Quem digitou, quem aprovou, o que foi excluído e quando.',
          en: 'Who typed it, who approved it, what was deleted and when.',
        },
      },
    ],

    context: {
      pt: 'Todo procedimento ambulatorial feito pelo município tem que ser informado ao Ministério da Saúde num arquivo com formato rígido, fechado por competência. Se o arquivo é recusado ou vem incompleto, o município não recebe pela produção que realizou. Na prática, isso costuma ser digitado em um programa antigo, por uma pessoa só, sem rastro.',
      en: 'Every outpatient procedure the city performs must be reported to the Ministry of Health in a strictly formatted file, closed per period. If the file is rejected or comes in incomplete, the city doesn’t get paid for the care it delivered. In practice this is usually typed into an old program, by one person, with no audit trail.',
    },

    problem: {
      pt: 'Digitação em volume é trabalho de teclado: qualquer atrito por lançamento se multiplica por milhares. Ao mesmo tempo, o dado tem que estar certo — procedimento válido, CID compatível, profissional e estabelecimento existentes — e alguém tem que poder responder depois quem lançou o quê.',
      en: 'High-volume data entry is keyboard work: any friction per entry multiplies by thousands. At the same time the data has to be right — valid procedure, compatible ICD code, existing professional and establishment — and someone has to be able to answer later who entered what.',
    },

    approach: {
      pt: 'A tela de digitação foi desenhada para o teclado: Enter avança, o cadastro do cidadão se auto-preenche por CNS ou CPF, e a validação acontece no campo em vez de no fim. Em volta disso, um fluxo de aprovação configurável por município, importação do CNES para não redigitar profissional e estabelecimento, e exportação por competência em lotes com leitura do arquivo de erros — porque recusa do Ministério tem que virar lista de correção, não mistério.',
      en: 'The entry screen was designed for the keyboard: Enter advances, citizen data auto-fills from the national health card or tax id, and validation happens in the field instead of at the end. Around that: a per-city configurable approval flow, CNES import so professionals and establishments aren’t retyped, and per-period batch export with parsing of the rejection file — because a Ministry rejection should become a correction list, not a mystery.',
    },

    modules: [
      {
        name: 'Digitação',
        tag: { pt: 'Otimizada para teclado', en: 'Keyboard-first' },
        body: {
          pt: 'Enter avança, auto-preenchimento por CNS/CPF, validação no campo. A diferença entre digitar mil lançamentos e digitar mil lançamentos sem raiva.',
          en: 'Enter advances, auto-fill by national health card or tax id, in-field validation. The difference between typing a thousand entries and typing a thousand entries without rage.',
        },
      },
      {
        name: 'Aprovação',
        tag: { pt: 'Configurável por município', en: 'Configurable per city' },
        body: {
          pt: 'Lançamento e exclusão passam por aprovação quando o município exige. Perfis hierárquicos: quem digita não é necessariamente quem libera.',
          en: 'Entries and deletions go through approval when the city requires it. Hierarchical profiles: whoever types isn’t necessarily whoever releases.',
        },
      },
      {
        name: 'Exportação',
        tag: { pt: 'Competência e lotes', en: 'Period and batches' },
        body: {
          pt: 'Fecha a competência, gera os lotes no formato oficial e interpreta o arquivo de erro de volta como lista de pendência.',
          en: 'Closes the period, generates the batches in the official format and reads the error file back as a to-fix list.',
        },
      },
      {
        name: 'Auditoria',
        tag: { pt: 'Rastro completo', en: 'Full trail' },
        body: {
          pt: 'Quem digitou, quem aprovou, o que foi excluído e quando. Mais relatórios por profissional, estabelecimento e digitador.',
          en: 'Who typed it, who approved it, what was deleted and when. Plus reports by professional, establishment and data-entry operator.',
        },
      },
    ],

    hardParts: [
      {
        title: { pt: 'O formato não negocia', en: 'The format does not negotiate' },
        body: {
          pt: 'Arquivo oficial é posicional e implacável: um campo fora de lugar invalida o lote inteiro. A saída foi tratar a geração como contrato testável e transformar o retorno de erro em informação acionável na tela, em vez de deixar a secretaria decifrando um .txt.',
          en: 'The official file is positional and unforgiving: one field out of place invalidates the whole batch. The answer was treating generation as a testable contract and turning the error response into actionable information on screen, instead of leaving the department decoding a .txt.',
        },
      },
      {
        title: {
          pt: 'Velocidade é requisito, não conforto',
          en: 'Speed is a requirement, not a comfort',
        },
        body: {
          pt: 'Quem digita BPA passa o dia nessa tela. Cada clique evitado e cada campo auto-preenchido é tempo real economizado — e menos erro entrando na base. Otimizar essa tela rendeu mais que qualquer refatoração de back nesse produto.',
          en: 'Whoever types BPA spends the day on that screen. Every click avoided and every auto-filled field is real time saved — and fewer errors entering the database. Optimising that one screen paid off more than any backend refactor in this product.',
        },
      },
    ],

    responsibilities: {
      pt: [
        'Tela de digitação com navegação por teclado e validação em campo',
        'Fluxo de aprovação e perfis hierárquicos por município',
        'Geração dos lotes no formato oficial e leitura do arquivo de erros',
        'Integração com a tabela SIGTAP e importação do CNES',
        'Relatórios em PDF e Excel por profissional, estabelecimento e digitador',
      ],
      en: [
        'Entry screen with keyboard navigation and in-field validation',
        'Approval flow and hierarchical profiles per city',
        'Official-format batch generation and rejection-file parsing',
        'SIGTAP table integration and CNES import',
        'PDF and Excel reports by professional, establishment and operator',
      ],
    },

    outcome: {
      pt: 'A secretaria governa o ciclo do BPA inteiro dentro de uma ferramenta, com rastro de quem fez o quê e com o erro do Ministério vindo traduzido. É um produto separado do e-Gestão de propósito: aqui a secretaria digita e responde pelo dado, não só exporta o que já existe.',
      en: 'The health department governs the entire BPA cycle inside one tool, with a trail of who did what and Ministry rejections arriving translated. It’s a separate product from e-Gestão on purpose: here the department types and owns the data, rather than just exporting what already exists.',
    },

    learned: {
      pt: [
        'Quando o formato de saída é lei, geração de arquivo é contrato — e contrato se testa.',
        'Ergonomia de teclado é feature de performance, não enfeite.',
        'Mensagem de erro boa economiza mais suporte que documentação boa.',
      ],
      en: [
        'When the output format is law, file generation is a contract — and contracts get tested.',
        'Keyboard ergonomics is a performance feature, not decoration.',
        'A good error message saves more support hours than good documentation.',
      ],
    },
  },

  /* ==========================================================
     05 — RAID
     ========================================================== */
  {
    slug: 'raid',
    index: '05',
    name: 'RAID',
    kicker: {
      pt: 'Gestão clínica herdada, mantida viva',
      en: 'Inherited clinical management, kept alive',
    },
    sector: { pt: 'Clínica terapêutica · legado', en: 'Therapeutic clinic · legacy' },
    year: { pt: '2024 — presente', en: '2024 — present' },
    status: 'live',
    codeVisibility: 'private',
    featured: false,

    role: {
      pt: 'Desenvolvedor full stack — manutenção e correção em sistema legado',
      en: 'Full stack developer — maintenance and fixes on a legacy system',
    },

    summary: {
      pt: 'Sistema de gestão de clínica terapêutica que eu não escrevi e que não pode parar: hóspedes, internamentos, grupos terapêuticos, estoque de medicamentos, financeiro e relatórios. React com Vite na frente, Express com Prisma atrás — e a disciplina de consertar sem reescrever.',
      en: 'A therapeutic-clinic management system I didn’t write and that cannot stop: residents, admissions, therapy groups, medication stock, finance and reports. React with Vite up front, Express with Prisma behind — and the discipline to fix without rewriting.',
    },

    tech: ['JavaScript', 'React', 'Vite', 'Express', 'Prisma', 'PostgreSQL', 'JWT', 'AWS S3'],

    metrics: [
      {
        value: '6',
        label: { pt: 'módulos em operação', en: 'modules in operation' },
        hint: {
          pt: 'Hóspedes, internamentos, grupos, medicamentos, financeiro e relatórios.',
          en: 'Residents, admissions, groups, medication, finance and reports.',
        },
      },
      {
        value: 'PII',
        label: { pt: 'dado sensível de saúde', en: 'sensitive health data' },
        hint: {
          pt: 'Autorização real no servidor, nunca no menu do front.',
          en: 'Real authorization on the server, never in the front-end menu.',
        },
      },
      {
        value: '0',
        label: { pt: 'reescritas por impulso', en: 'rewrites on impulse' },
        hint: {
          pt: 'Modernização só com escopo aprovado e regressão manual.',
          en: 'Modernisation only with approved scope and manual regression.',
        },
      },
    ],

    context: {
      pt: 'RAID é brownfield: um sistema em produção, construído com outras convenções, de que uma instituição real depende para operar todo dia. Não tem o luxo de ser bonito — tem a obrigação de continuar funcionando enquanto recebe correção.',
      en: 'RAID is brownfield: a production system, built with other conventions, that a real institution depends on to operate every day. It doesn’t get the luxury of being pretty — it has the obligation to keep working while being fixed.',
    },

    problem: {
      pt: 'A tentação óbvia em legado é reescrever. Mas cada mudança aqui toca dado clínico e financeiro de gente internada, e o sistema não tem rede de testes para me segurar. O problema real não é técnico, é de contenção: como entregar correção sem virar a mesa e sem levar as práticas antigas para os outros produtos.',
      en: 'The obvious temptation in legacy code is to rewrite. But every change here touches clinical and financial data of people in care, and the system has no test net to catch me. The real problem isn’t technical, it’s containment: how to ship fixes without flipping the table, and without carrying the old practices over into the other products.',
    },

    approach: {
      pt: 'Duas regras. Primeira: mudança cirúrgica — preservar os padrões existentes em correção pontual, e exigir escopo explícito e regressão manual para qualquer modernização. Segunda: isolamento — nada do RAID vira referência para os produtos novos, e isso está escrito, não combinado. Sobre autorização, a única postura defensável: menu escondido não é permissão; quem autoriza é a rota no servidor.',
      en: 'Two rules. First: surgical change — preserve existing patterns in point fixes, and demand explicit scope plus manual regression for any modernisation. Second: containment — nothing from RAID becomes a reference for the newer products, and that is written down, not assumed. On authorization, the only defensible stance: a hidden menu is not a permission; the server route is what authorises.',
    },

    hardParts: [
      {
        title: {
          pt: 'Autorização que estava no lugar errado',
          en: 'Authorization in the wrong place',
        },
        body: {
          pt: 'Em sistema legado é comum o front decidir o que aparece e o back confiar. Com dado de paciente, isso não é dívida, é exposição. Tratar a rota protegida no servidor como única fonte de autorização foi a correção mais importante que eu fiz aqui.',
          en: 'In legacy systems it’s common for the front end to decide what shows and the backend to trust it. With patient data, that isn’t debt, it’s exposure. Treating the protected server route as the single source of authorization was the most important fix I made here.',
        },
      },
      {
        title: { pt: 'Não contaminar o resto', en: 'Not contaminating the rest' },
        body: {
          pt: 'Trabalhar em legado e em produto novo na mesma semana cria contaminação de padrão nos dois sentidos. A defesa foi documentar explicitamente o que não deve ser replicado — um documento de “práticas a não copiar” vale mais que boa intenção.',
          en: 'Working on legacy and greenfield in the same week creates pattern contamination in both directions. The defence was explicitly documenting what must not be replicated — a “do not copy these practices” document beats good intentions.',
        },
      },
    ],

    responsibilities: {
      pt: [
        'Correção de bugs e manutenção evolutiva nos módulos em produção',
        'Endurecimento de autenticação e autorização nas rotas do servidor',
        'Ajustes de Prisma e queries sem quebrar contrato existente',
        'Documentação do legado e das práticas que não devem ser replicadas',
      ],
      en: [
        'Bug fixing and evolutionary maintenance across the production modules',
        'Hardening authentication and authorization on the server routes',
        'Prisma and query adjustments without breaking existing contracts',
        'Documenting the legacy and the practices that must not be replicated',
      ],
    },

    outcome: {
      pt: 'O sistema segue operando e ficou mais seguro na parte que importa, sem reescrita e sem parada. Para mim, foi a experiência que mais me ensinou sobre engenharia de verdade: escrever código novo é fácil; manter código de outra pessoa, em produção, com gente dependendo, é o exercício completo.',
      en: 'The system keeps operating and got safer where it matters, with no rewrite and no downtime. For me it was the experience that taught me most about real engineering: writing new code is easy; maintaining someone else’s code, in production, with people depending on it, is the full exercise.',
    },

    learned: {
      pt: [
        'Legado não é código ruim, é código sem contexto. O trabalho é recuperar o contexto antes de julgar.',
        'Autorização vive no servidor. Sempre. Menu não é segurança.',
        'Escrever o que não se deve copiar é tão útil quanto escrever o padrão a seguir.',
      ],
      en: [
        'Legacy isn’t bad code, it’s code without context. The job is recovering the context before judging.',
        'Authorization lives on the server. Always. A menu is not security.',
        'Writing down what must not be copied is as useful as writing down the pattern to follow.',
      ],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const secondaryProjects = projects.filter((p) => !p.featured);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectSlugs = projects.map((p) => p.slug);
