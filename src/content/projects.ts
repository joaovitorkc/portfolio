import type { I18nList, I18nText } from './types';

/* ============================================================
   Project registry.

   Two depths, on purpose:

   'case'   — earns its own page at /work/<slug>. Reserved for work where the
              engineering story is worth reading end to end.
   'listed' — real, delivered, named and counted, but shown as one compact line.

   That split is what keeps the portfolio honest AND readable. Five heavyweight
   dossiers for the same client read as padding; naming every system while
   giving pages only to the ones with a story reads as judgement.

   `codeVisibility: 'private'` hides every code affordance — proprietary client
   work never gets a repo link.
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
  /** the client the work was delivered for — never an employer */
  client?: string;
  /** omit when the real period isn't confirmed. Never guess a date. */
  year?: I18nText;
  status: 'live' | 'wip' | 'archived';
  codeVisibility: 'public' | 'private';
  /** the one project that gets the full-width treatment on the home page */
  featured: boolean;
  /** 'case' gets a page; 'listed' appears only in the compact strip */
  depth: 'case' | 'listed';
  /** the ecosystem hub rather than a system in it */
  isHub?: boolean;

  liveUrl?: string;
  repoUrl?: string;

  role: I18nText;
  /** one paragraph for listings */
  summary: I18nText;

  tech: string[];
  metrics?: ProjectMetric[];

  /* ---- case-study body: only 'case' projects fill these ---- */
  context?: I18nText;
  problem?: I18nText;
  approach?: I18nText;
  architecture?: ArchitectureLayer[];
  modules?: ProjectModule[];
  hardParts?: { title: I18nText; body: I18nText }[];
  responsibilities?: I18nList;
  outcome?: I18nText;
  learned?: I18nList;
};

const WI = 'Wi Consultoria';
const CATSUC = 'Catsuc Labs';

export const projects: Project[] = [
  /* ==========================================================
     01 — e-Gestão · the flagship case
     ========================================================== */
  {
    slug: 'egestao',
    index: '01',
    name: 'e-Gestão',
    kicker: {
      pt: 'O hub de um ecossistema de saúde pública',
      en: 'The hub of a public healthcare ecosystem',
    },
    sector: { pt: 'Saúde pública municipal · Brasil', en: 'Municipal public health · Brazil' },
    client: WI,
    year: { pt: '2023 — presente', en: '2023 — present' },
    status: 'live',
    codeVisibility: 'private',
    featured: true,
    depth: 'case',
    isHub: true,
    liveUrl: 'https://egestao.esus.com.br',

    role: {
      pt: 'Desenvolvedor full stack · condução do projeto · banco e infraestrutura',
      en: 'Full stack developer · project delivery · database and infrastructure',
    },

    summary: {
      pt: 'Não é um sistema — é o portal único de onde a secretaria acessa todos eles: relatórios da atenção primária, portal do cidadão, vigilância sanitária, BPA, painel de chamadas e assistente com IA. Multi-inquilino por código IBGE, em uso em mais de 400 municípios, em 26 estados. É o maior projeto em que eu trabalho, e o que mais me ensinou.',
      en: 'Not a system — the single portal a health department logs into to reach all of them: primary-care reporting, citizen portal, health surveillance, BPA, call panel and an AI assistant. Multi-tenant by municipal IBGE code, in use across more than 400 municipalities in 26 states. The largest project I work on, and the one that taught me the most.',
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
          pt: 'Em 26 estados. Cada um isolado como inquilino próprio.',
          en: 'Across 26 states. Each isolated as its own tenant.',
        },
      },
      {
        value: '200+',
        label: { pt: 'telas em produção', en: 'screens in production' },
        hint: {
          pt: 'Relatórios, gestão, vigilância, portal do cidadão e painéis.',
          en: 'Reports, management, surveillance, citizen portal and panels.',
        },
      },
      {
        value: '50+',
        label: { pt: 'módulos de API', en: 'API route modules' },
        hint: {
          pt: 'Cada um com suas rotas, ACL e camada de exportação.',
          en: 'Each with its own routes, ACL and export layer.',
        },
      },
      {
        value: '300+',
        label: { pt: 'migrations de banco', en: 'database migrations' },
        hint: {
          pt: 'Schema versionado desde o primeiro dia.',
          en: 'Schema versioned from day one.',
        },
      },
      {
        value: '7',
        label: { pt: 'sistemas sob o hub', en: 'systems under the hub' },
        hint: {
          pt: 'R-SUS, SUS Direto, Willy, Painel, Visa, BPA Online, Nuvem PEC.',
          en: 'R-SUS, SUS Direto, Willy, Call Panel, Visa, BPA Online, Nuvem PEC.',
        },
      },
    ],

    context: {
      pt: 'Toda secretaria municipal de saúde do Brasil registra atendimento no PEC — o Prontuário Eletrônico do Cidadão do e-SUS APS, instalado localmente, município por município. O dado existe, mas fica preso: para responder “como está a atenção primária aqui?” o gestor depende de exportação manual, planilha e boa vontade. Quando a resposta chega, o mês já passou.',
      en: 'Every municipal health department in Brazil records care in PEC — the citizen electronic health record of e-SUS APS, installed locally, city by city. The data exists but stays trapped: to answer “how is primary care doing here?” a manager depends on manual exports, spreadsheets and goodwill. By the time the answer arrives, the month is over.',
    },

    problem: {
      pt: 'Transformar bases locais e heterogêneas de PEC em relatório confiável, comparável e auditável — para centenas de municípios ao mesmo tempo, com regra ditada por nota técnica do Ministério da Saúde que muda, e sem nunca deixar dado de um município aparecer para outro. E o detalhe que muda tudo: um número errado aqui não é bug de UI, é decisão de saúde tomada em cima de informação falsa.',
      en: 'Turn heterogeneous local PEC databases into reporting that is reliable, comparable and auditable — for hundreds of municipalities at once, with rules dictated by Ministry of Health technical notes that keep changing, and never letting one city’s data surface in another’s. And the detail that changes everything: a wrong number here isn’t a UI bug, it’s a health decision made on false information.',
    },

    approach: {
      pt: 'Nada de consultar o PEC ao vivo. O sistema extrai, transforma e espelha em tabelas próprias no PostgreSQL, e todo relatório lê do espelho. Isso dá três coisas de graça: o PEC do município nunca sofre carga de leitura pesada, o schema fica sob nosso controle, e a mesma pergunta feita duas vezes dá a mesma resposta. Em cima do espelho, um shell de relatório padronizado — filtro, tabela, exportação — que se repete em mais de 200 telas sem cada uma reinventar a roda.',
      en: 'No live querying of PEC. The system extracts, transforms and mirrors into its own PostgreSQL tables, and every report reads from the mirror. That buys three things: the city’s PEC never takes heavy read load, the schema is ours to control, and the same question asked twice gives the same answer. On top of the mirror sits one standardised report shell — filters, table, export — repeated across 200+ screens instead of each reinventing the wheel.',
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
          pt: 'Pipeline assíncrono: normaliza, deduplica e materializa nas tabelas espelho. Fila observável, com tela de acompanhamento — sincronização travada é problema visível, não silencioso.',
          en: 'Async queued pipeline: normalise, dedupe and materialise into mirror tables. The queue is observable, with its own screen — a stuck sync is a visible problem, not a silent one.',
        },
        tech: ['Bull', 'Redis', 'Node.js'],
      },
      {
        step: '03',
        name: { pt: 'Camada de indicadores', en: 'Indicator layer' },
        detail: {
          pt: 'As regras de numerador e denominador de cada indicador viram código versionado, com a nota técnica que as originou registrada ao lado. Quando o Ministério muda a regra, a mudança é rastreável — e o gestor vê na tela de onde o número saiu.',
          en: 'Numerator and denominator rules for each indicator become versioned code, with the technical note that produced them recorded alongside. When the Ministry changes a rule, the change is traceable — and the manager sees where the number came from.',
        },
        tech: ['TypeScript', 'SQL'],
      },
      {
        step: '04',
        name: { pt: 'API com ACL por papel', en: 'Role-scoped API' },
        detail: {
          pt: 'Express + Knex, mais de 50 módulos de rota. JWT em cookie httpOnly e autorização por papel — equipe interna, gestor municipal, profissional. O inquilino vem do código IBGE na URL e é verificado no servidor, nunca confiado no cliente.',
          en: 'Express + Knex, 50+ route modules. JWT in an httpOnly cookie and role-based authorization — internal team, city manager, health professional. The tenant comes from the IBGE code in the URL and is verified server-side, never trusted from the client.',
        },
        tech: ['Express', 'Knex', 'JWT', 'Zod'],
      },
      {
        step: '05',
        name: { pt: 'Interface e exportação', en: 'Interface and export' },
        detail: {
          pt: 'Next.js App Router com TanStack Query. O PDF não é montado à mão: existe uma rota de impressão que renderiza a mesma tela em layout de papel e o Puppeteer captura. Um relatório, uma verdade.',
          en: 'Next.js App Router with TanStack Query. PDFs aren’t hand-assembled: a print route renders the same screen in paper layout and Puppeteer captures it. One report, one truth.',
        },
        tech: ['Next.js', 'React', 'TanStack Query', 'Puppeteer', 'XLSX'],
      },
      {
        step: '06',
        name: { pt: 'Operação', en: 'Operations' },
        detail: {
          pt: 'VPS Linux com Nginx e PM2, processo de API separado do worker de fila, S3 para arquivos e push para notificação. Configuração, endurecimento e deploy fazem parte do meu escopo.',
          en: 'Linux VPS with Nginx and PM2, API process separated from the queue worker, S3 for files and web push. Configuration, hardening and deployment are part of my scope.',
        },
        tech: ['Linux', 'Nginx', 'PM2', 'AWS S3', 'Web Push'],
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
          pt: 'A geração de PDF era um gerador separado, em outra linguagem, com sua própria interpretação da regra — duas fontes de verdade e divergência garantida. A migração para renderizar a própria página em modo impressão e capturar matou a classe inteira de bug “o relatório não bate com a tela”.',
          en: 'PDF generation used to be a separate generator, in another language, with its own reading of the rules — two sources of truth and guaranteed drift. Moving to rendering the actual page in print mode and capturing it killed the entire bug class of “the report doesn’t match the screen”.',
        },
      },
      {
        title: { pt: 'Regra que muda por decreto', en: 'Rules that change by decree' },
        body: {
          pt: 'Indicador de saúde não é requisito estável: o Ministério publica nota técnica nova e o numerador muda. A resposta foi tratar a nota técnica como artefato de primeira classe, versionada junto ao código que a implementa e ligada à explicação que o gestor lê na tela.',
          en: 'A health indicator is not a stable requirement: the Ministry publishes a new technical note and the numerator changes. The answer was treating the technical note as a first-class artifact, versioned next to the code implementing it and wired to the explanation the manager reads on screen.',
        },
      },
      {
        title: { pt: 'Consistência em 200+ telas', en: 'Consistency across 200+ screens' },
        body: {
          pt: 'Com essa quantidade de relatório, criatividade por tela é dívida. O shell de relatório existe para que uma tela nova nasça previsível: filtro no mesmo lugar, exportação com o mesmo comportamento, vazio com a mesma cara.',
          en: 'At this report count, per-screen creativity is debt. The report shell exists so a new screen is born predictable: filters in the same place, export behaving the same way, empty states looking the same.',
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
        'Condução dos projetos em andamento — priorização, escopo e organização da entrega',
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
      pt: 'Roda em produção, em uso diário dentro de secretarias municipais de saúde de mais de 400 municípios, em 26 estados. Cresceu de relatório para ecossistema: sete sistemas sob um portal único, com painel de chamadas na recepção e assistente com IA dentro da própria ferramenta. Para o gestor, a mudança concreta é enxergar o indicador durante o mês em vez de descobrir o resultado depois.',
      en: 'It runs in production, in daily use inside municipal health departments across more than 400 municipalities in 26 states. It grew from reporting into an ecosystem: seven systems under a single portal, with a call panel in reception and an AI assistant inside the tool itself. For the manager, the concrete change is seeing the indicator during the month instead of learning the outcome afterwards.',
    },

    learned: {
      pt: [
        'Domínio antes de código. A parte difícil de saúde pública não é React, é entender a regra que o Estado escreveu.',
        'Espelhar dado em vez de consultar a fonte viva resolveu performance, estabilidade e reprodutibilidade de uma vez.',
        'Uma fonte de verdade por resposta. Duas implementações da mesma regra sempre divergem — a questão é só quando.',
        'Padrão repetível vale mais que tela bonita quando existem mais de 200 delas.',
        'Escrever software que outra pessoa depende para trabalhar é a melhor escola de engenharia que existe.',
      ],
      en: [
        'Domain before code. The hard part of public health isn’t React, it’s understanding the rule the State wrote.',
        'Mirroring data instead of querying the live source solved performance, stability and reproducibility at once.',
        'One source of truth per answer. Two implementations of the same rule always drift — the only question is when.',
        'A repeatable pattern beats a beautiful screen when there are 200+ of them.',
        'Writing software someone else depends on to do their job is the best engineering school there is.',
      ],
    },
  },

  /* ==========================================================
     02 — Painel de Chamadas
     ========================================================== */
  {
    slug: 'painel-de-chamadas',
    index: '02',
    name: 'Painel de Chamadas',
    kicker: { pt: 'Chamada de paciente em tempo real', en: 'Real-time patient calling' },
    sector: { pt: 'Recepção de unidade de saúde', en: 'Health unit waiting room' },
    client: WI,
    year: { pt: '2024 — presente', en: '2024 — present' },
    status: 'live',
    codeVisibility: 'private',
    featured: false,
    depth: 'case',
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
          pt: 'A mesma extensão também lê o cidadão aberto na tela e busca alertas na nossa API — informação útil aparecendo no fluxo de trabalho que já existe.',
          en: 'The same extension also reads the citizen open on screen and fetches alerts from our API — useful information surfacing inside the workflow that already exists.',
        },
        tech: ['Express', 'REST'],
      },
    ],

    hardParts: [
      {
        title: { pt: 'Integrar sem poder alterar', en: 'Integrating with no permission to modify' },
        body: {
          pt: 'Injeção no DOM de um sistema de terceiro é frágil por natureza: uma atualização do PEC pode mudar a estrutura embaixo de você. A defesa foi manter a superfície de contato mínima e explícita — ler o menos possível, num só lugar, com falha silenciosa em vez de tela quebrada.',
          en: 'DOM injection into third-party software is fragile by nature: a PEC update can change the structure underneath you. The defence was keeping the contact surface minimal and explicit — read as little as possible, in one place, failing quietly instead of breaking the screen.',
        },
      },
      {
        title: { pt: 'Identificar a TV certa', en: 'Addressing the right TV' },
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
     03 — Roleta Online · Catsuc Labs
     ========================================================== */
  {
    slug: 'roleta-online',
    index: '03',
    name: 'Roleta Online',
    kicker: {
      pt: 'Sorteio por cotas, com vaga limitada',
      en: 'Quota-based draw with limited seats',
    },
    sector: { pt: 'Produto de consumo · web', en: 'Consumer product · web' },
    client: CATSUC,
    status: 'live',
    codeVisibility: 'private',
    featured: false,
    depth: 'case',

    role: { pt: 'Desenvolvedor full stack', en: 'Full stack developer' },

    summary: {
      pt: 'A pessoa entra, compra fichas e cada ficha é um lugar na roleta. Quando a roleta enche — 20, 40 ou 100 participantes, conforme o tipo — o sorteio roda e sai um vencedor. Simples de descrever e cheio de armadilha de concorrência: é dinheiro, é vaga limitada e o resultado precisa ser confiável.',
      en: 'You come in, buy chips, and each chip is a seat on the wheel. When the wheel fills — 20, 40 or 100 entrants depending on the type — the draw runs and one winner comes out. Simple to describe and full of concurrency traps: real money, limited seats, and a result people have to trust.',
    },

    tech: ['TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'Prisma', 'Redis'],

    metrics: [
      {
        value: '20/40/100',
        label: { pt: 'capacidades de roleta', en: 'wheel capacities' },
        hint: {
          pt: 'O sorteio dispara no instante em que a última vaga é preenchida.',
          en: 'The draw fires the instant the final seat is taken.',
        },
      },
      {
        value: '1',
        label: { pt: 'ficha por posição', en: 'chip per seat' },
        hint: {
          pt: 'Garantido por restrição única no banco, não por checagem no código.',
          en: 'Guaranteed by a unique constraint in the database, not a check in the code.',
        },
      },
      {
        value: '0',
        label: { pt: 'vaga vendida duas vezes', en: 'seats sold twice' },
        hint: {
          pt: 'Alocação transacional — o banco recusa a segunda venda.',
          en: 'Transactional allocation — the database refuses the second sale.',
        },
      },
    ],

    context: {
      pt: 'Bolão de cotas é um formato antigo e conhecido: um grupo divide um prêmio em partes iguais, cada um compra a sua e um sorteio decide. Levar isso para a web parece trivial até você perceber que a parte interessante não é a roleta girando — é o que acontece quando duas pessoas clicam em comprar a última ficha no mesmo milissegundo.',
      en: 'A quota pool is an old, well-known format: a group splits a prize into equal parts, each person buys one, and a draw decides. Moving it to the web looks trivial until you notice the interesting part isn’t the wheel spinning — it’s what happens when two people click to buy the last chip in the same millisecond.',
    },

    problem: {
      pt: 'Vaga é finita e tem dinheiro envolvido. Isso transforma três coisas em requisito duro: nenhuma posição pode ser vendida duas vezes, nenhum pagamento repetido pode gerar ficha extra, e o sorteio precisa ser explicável depois — porque quem perdeu vai querer entender como perdeu.',
      en: 'Seats are finite and money is involved. That turns three things into hard requirements: no seat may be sold twice, no repeated payment may grant an extra chip, and the draw has to be explainable after the fact — because whoever lost is going to want to understand how.',
    },

    approach: {
      pt: 'Coloquei as garantias no banco, não no código de aplicação. Cada posição da roleta é uma linha com restrição única, e a compra acontece dentro de uma transação que ou reserva a posição ou falha — o banco recusa a corrida, em vez de a aplicação torcer para não acontecer. A confirmação de pagamento é idempotente por chave, então reenvio de webhook não vira ficha nova. E o sorteio grava a semente e o resultado, para poder ser reconstruído depois.',
      en: 'I put the guarantees in the database, not in application code. Each seat is a row with a unique constraint, and a purchase happens inside a transaction that either reserves the seat or fails — the database refuses the race instead of the app hoping it won’t happen. Payment confirmation is idempotent by key, so a re-delivered webhook never becomes an extra chip. And the draw records its seed and its result, so it can be reconstructed later.',
    },

    modules: [
      {
        name: 'Roletas',
        tag: { pt: 'Capacidade e estado', en: 'Capacity and state' },
        body: {
          pt: 'Cada roleta tem capacidade, preço da ficha e estado — aberta, cheia, sorteada. O estado é do servidor: o cliente exibe, não decide.',
          en: 'Each wheel has capacity, chip price and state — open, full, drawn. State lives on the server: the client displays it, never decides it.',
        },
      },
      {
        name: 'Fichas',
        tag: { pt: 'Compra e alocação', en: 'Purchase and allocation' },
        body: {
          pt: 'Comprar uma ficha é reservar uma posição numerada dentro de uma transação. Se a roleta encheu no meio do caminho, a compra falha limpa e o valor não é capturado.',
          en: 'Buying a chip means reserving a numbered seat inside a transaction. If the wheel filled up mid-flow, the purchase fails cleanly and no money is captured.',
        },
      },
      {
        name: 'Sorteio',
        tag: { pt: 'Disparo e registro', en: 'Trigger and record' },
        body: {
          pt: 'Roda no instante em que a última vaga é preenchida, uma única vez por roleta, com semente e resultado persistidos.',
          en: 'Runs the instant the final seat is taken, exactly once per wheel, with seed and result persisted.',
        },
      },
      {
        name: 'Histórico',
        tag: { pt: 'Auditoria', en: 'Audit trail' },
        body: {
          pt: 'Quem comprou qual posição, quando, e qual foi o resultado. Sem isso não existe confiança num produto onde alguém perde dinheiro.',
          en: 'Who bought which seat, when, and what the result was. Without it there is no trust in a product where somebody loses money.',
        },
      },
    ],

    hardParts: [
      {
        title: {
          pt: 'A última ficha e duas pessoas clicando',
          en: 'The last chip and two people clicking',
        },
        body: {
          pt: 'É o problema central, e não se resolve com “verifica se ainda tem vaga antes de gravar” — entre a verificação e a gravação cabe outra requisição. A posição é uma linha com restrição única e a reserva acontece na transação: a segunda venda simplesmente não é aceita pelo banco. Deixar a garantia no nível mais baixo possível é o que torna o resto do código simples.',
          en: 'This is the core problem, and it isn’t solved by “check whether a seat is free before writing” — another request fits between the check and the write. The seat is a row with a unique constraint and the reservation happens inside the transaction: the second sale is simply not accepted by the database. Pushing the guarantee to the lowest possible level is what keeps the rest of the code simple.',
        },
      },
      {
        title: { pt: 'Webhook chega duas vezes', en: 'The webhook arrives twice' },
        body: {
          pt: 'Provedor de pagamento reentrega notificação — é comportamento normal, não exceção. Sem idempotência por chave, a segunda entrega gera uma ficha que ninguém pagou. Tratar reentrega como o caso esperado, e não como erro, é a diferença entre um produto que fecha a conta e um que não fecha.',
          en: 'Payment providers redeliver notifications — that is normal behaviour, not an exception. Without idempotency by key, the second delivery mints a chip nobody paid for. Treating redelivery as the expected case rather than an error is the difference between a product whose books balance and one whose books don’t.',
        },
      },
      {
        title: { pt: 'O resultado tem que ser defensável', en: 'The result has to be defensible' },
        body: {
          pt: 'Num produto de sorteio, a suspeita é o padrão. O sorteio roda uma vez só por roleta, guarda a semente e o resultado, e não pode ser rodado de novo — nem por mim. Poder reconstruir o sorteio depois vale mais que qualquer animação de roleta girando.',
          en: 'In a draw product, suspicion is the default. The draw runs exactly once per wheel, stores its seed and its result, and cannot be re-run — not even by me. Being able to reconstruct the draw afterwards is worth more than any spinning-wheel animation.',
        },
      },
    ],

    responsibilities: {
      pt: [
        'Modelagem das roletas, posições e fichas, com as garantias de unicidade no banco',
        'Fluxo de compra transacional e confirmação de pagamento idempotente',
        'Disparo do sorteio no preenchimento da última vaga, com registro auditável',
        'Interface de participação, acompanhamento do preenchimento e histórico',
      ],
      en: [
        'Modeling wheels, seats and chips, with uniqueness guarantees in the database',
        'Transactional purchase flow and idempotent payment confirmation',
        'Draw triggered on the final seat, with an auditable record',
        'The participation UI, live fill tracking and history',
      ],
    },

    outcome: {
      pt: 'Um formato de bolão que funcionava no papel passou a funcionar sozinho na web, com vaga limitada, dinheiro real e resultado reconstruível. Foi o projeto que mais me ensinou sobre concorrência — não a teoria, a versão em que errar custa o dinheiro de alguém.',
      en: 'A pool format that worked on paper now runs itself on the web, with limited seats, real money and a reconstructible result. It’s the project that taught me the most about concurrency — not the theory, the version where getting it wrong costs somebody money.',
    },

    learned: {
      pt: [
        'Garantia de integridade pertence ao banco. Checagem na aplicação é uma sugestão, restrição é uma lei.',
        'Reentrega de webhook é o caso normal. Idempotência não é refinamento, é requisito.',
        'Em produto onde alguém perde, auditabilidade é feature de confiança — não de compliance.',
      ],
      en: [
        'Integrity guarantees belong in the database. An application check is a suggestion; a constraint is a law.',
        'Webhook redelivery is the normal case. Idempotency isn’t polish, it’s a requirement.',
        'In a product where someone loses, auditability is a trust feature — not a compliance one.',
      ],
    },
  },

  /* ==========================================================
     04 — Bolão de Futebol · Catsuc Labs
     ========================================================== */
  {
    slug: 'bolao-de-futebol',
    index: '04',
    name: 'Bolão de Futebol',
    kicker: { pt: 'Palpites, apuração e ranking', en: 'Predictions, scoring and ranking' },
    sector: { pt: 'Produto de consumo · web', en: 'Consumer product · web' },
    client: CATSUC,
    status: 'live',
    codeVisibility: 'private',
    featured: false,
    depth: 'case',

    role: { pt: 'Desenvolvedor full stack', en: 'Full stack developer' },

    summary: {
      pt: 'Bolão de campeonato: o participante palpita nos resultados da rodada, o sistema apura quando os jogos acabam e o ranking se atualiza. O desafio não é somar pontos — é o prazo, a regra de pontuação que muda de campeonato para campeonato, e o resultado que às vezes é corrigido depois.',
      en: 'A tournament pool: entrants predict the round’s results, the system scores them once matches end, and the leaderboard updates. The challenge isn’t adding points — it’s the deadline, the scoring rule that changes between tournaments, and results that sometimes get corrected after the fact.',
    },

    tech: ['TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'Prisma'],

    metrics: [
      {
        value: 'apito',
        label: { pt: 'trava do palpite', en: 'prediction lock' },
        hint: {
          pt: 'Prazo verificado no servidor — nunca no relógio do cliente.',
          en: 'Deadline checked on the server — never on the client clock.',
        },
      },
      {
        value: '100%',
        label: { pt: 'apuração recalculável', en: 'recomputable scoring' },
        hint: {
          pt: 'Pontuação é função pura do resultado, então correção é reprocessamento.',
          en: 'Scoring is a pure function of the result, so a correction is a reprocess.',
        },
      },
    ],

    context: {
      pt: 'Bolão entre amigos sempre existiu em planilha e grupo de mensagem. O problema nunca foi calcular — foi confiar: quem palpitou antes do jogo, quem mudou depois, e por que o ranking mudou de um dia para o outro.',
      en: 'Pools among friends have always lived in spreadsheets and group chats. The problem was never the maths — it was trust: who predicted before kickoff, who changed it afterwards, and why the leaderboard shifted overnight.',
    },

    problem: {
      pt: 'Três coisas que parecem detalhe e não são: o palpite tem que travar no início do jogo de forma inegociável; a regra de pontuação varia por campeonato e não pode estar espalhada pelo código; e resultado oficial pode ser corrigido — então a apuração precisa poder rodar de novo sem virar bagunça.',
      en: 'Three things that look like details and aren’t: the prediction has to lock at kickoff, non-negotiably; the scoring rule varies per tournament and can’t be scattered through the code; and official results can be corrected — so scoring has to be re-runnable without turning into a mess.',
    },

    approach: {
      pt: 'O prazo é do servidor. O cliente esconde o formulário por cortesia, mas quem recusa o palpite atrasado é a rota — relógio de cliente é sugestão, não autoridade. A pontuação virou função pura de (palpite, resultado, regra do campeonato), então apurar de novo é seguro por construção: se um resultado é corrigido, reprocessa e o ranking se refaz sem estado sujo pelo caminho.',
      en: 'The deadline belongs to the server. The client hides the form as a courtesy, but the route is what rejects a late prediction — a client clock is a suggestion, not an authority. Scoring became a pure function of (prediction, result, tournament rule), so re-scoring is safe by construction: if a result is corrected, reprocess and the leaderboard rebuilds with no dirty state left behind.',
    },

    modules: [
      {
        name: 'Campeonatos',
        tag: { pt: 'Rodadas e jogos', en: 'Rounds and matches' },
        body: {
          pt: 'Estrutura do torneio, com a regra de pontuação atrelada ao campeonato em vez de fixa no código.',
          en: 'Tournament structure, with the scoring rule attached to the tournament instead of hardcoded.',
        },
      },
      {
        name: 'Palpites',
        tag: { pt: 'Com prazo', en: 'Deadline-bound' },
        body: {
          pt: 'Registro e edição até o início do jogo. Depois disso, a rota recusa — e o participante vê exatamente por quê.',
          en: 'Entry and editing until kickoff. After that the route refuses — and the entrant sees exactly why.',
        },
      },
      {
        name: 'Apuração',
        tag: { pt: 'Determinística', en: 'Deterministic' },
        body: {
          pt: 'Roda sobre o resultado oficial e pode rodar de novo. Correção de resultado é reprocessamento, não remendo.',
          en: 'Runs over the official result and can run again. A corrected result is a reprocess, not a patch.',
        },
      },
      {
        name: 'Ranking',
        tag: { pt: 'Com desempate', en: 'With tie-breaks' },
        body: {
          pt: 'Classificação com critério de desempate explícito, para que dois participantes empatados tenham ordem estável.',
          en: 'Standings with explicit tie-break criteria, so two tied entrants get a stable order.',
        },
      },
    ],

    hardParts: [
      {
        title: { pt: 'O relógio do cliente mente', en: 'The client clock lies' },
        body: {
          pt: 'Esconder o formulário quando o jogo começa é UX. Recusar o palpite atrasado é integridade — e só o servidor pode fazer isso. Num bolão, um palpite aceito depois do apito não é bug de borda: é a razão para ninguém mais confiar no ranking.',
          en: 'Hiding the form at kickoff is UX. Refusing a late prediction is integrity — and only the server can do that. In a pool, one prediction accepted after the whistle isn’t an edge-case bug: it’s the reason nobody trusts the leaderboard again.',
        },
      },
      {
        title: { pt: 'Regra de pontuação como dado', en: 'Scoring rule as data' },
        body: {
          pt: 'Cada campeonato pontua diferente. Espalhar isso em condicional pelo código garante divergência na primeira mudança. Tratar a regra como configuração do campeonato e a apuração como função pura tornou o recálculo trivial — o que salvou quando resultado oficial foi corrigido.',
          en: 'Every tournament scores differently. Scattering that through conditionals guarantees drift at the first change. Treating the rule as tournament configuration and scoring as a pure function made recomputation trivial — which is what saved us when an official result was corrected.',
        },
      },
    ],

    responsibilities: {
      pt: [
        'Modelagem de campeonatos, rodadas, jogos e palpites',
        'Trava de prazo no servidor e as mensagens que explicam a recusa',
        'Motor de apuração determinístico e reprocessável',
        'Ranking com desempate e as telas de participação',
      ],
      en: [
        'Modeling tournaments, rounds, matches and predictions',
        'Server-side deadline enforcement and the messages explaining a refusal',
        'A deterministic, re-runnable scoring engine',
        'Standings with tie-breaks, and the participation screens',
      ],
    },

    outcome: {
      pt: 'O bolão saiu da planilha e do print no grupo. O prazo é o mesmo para todos, o ranking se explica, e correção de resultado deixou de ser uma discussão para virar um reprocessamento.',
      en: 'The pool moved off the spreadsheet and the screenshot in the group chat. The deadline is the same for everyone, the leaderboard explains itself, and a corrected result stopped being an argument and became a reprocess.',
    },

    learned: {
      pt: [
        'Prazo é regra de servidor. Qualquer coisa validada só no cliente não é validada.',
        'Cálculo determinístico e reprocessável vale mais que cálculo rápido.',
        'Em produto competitivo, o ranking precisa ser explicável — senão a discussão vira suporte.',
      ],
      en: [
        'A deadline is a server rule. Anything validated only on the client is not validated.',
        'Deterministic, re-runnable computation beats fast computation.',
        'In a competitive product the leaderboard must be explainable — otherwise the argument becomes support.',
      ],
    },
  },

  /* ==========================================================
     05 — Dodreams · Catsuc Labs
     ========================================================== */
  {
    slug: 'dodreams',
    index: '05',
    name: 'Dodreams',
    kicker: { pt: 'Do sonho ao plano', en: 'From dream to plan' },
    sector: { pt: 'Produto de consumo · web', en: 'Consumer product · web' },
    client: CATSUC,
    status: 'live',
    codeVisibility: 'private',
    featured: false,
    depth: 'case',

    role: { pt: 'Desenvolvedor full stack', en: 'Full stack developer' },

    summary: {
      pt: 'Um lugar para registrar e gerenciar sonhos — viagem, conquista, objetivo de longo prazo — e transformar cada um em algo com etapa, prazo e progresso. A diferença entre “um dia eu quero” e um plano que dá para acompanhar.',
      en: 'A place to record and manage dreams — a trip, an achievement, a long-term goal — and turn each one into something with steps, a deadline and progress. The difference between “someday I want to” and a plan you can actually track.',
    },

    tech: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Prisma'],

    metrics: [
      {
        value: '1',
        label: { pt: 'sonho, várias etapas', en: 'dream, many steps' },
        hint: {
          pt: 'O progresso vem das etapas concluídas, não de um número digitado à mão.',
          en: 'Progress comes from completed steps, not a hand-typed number.',
        },
      },
      {
        value: 'CRUD+',
        label: { pt: 'não é só cadastro', en: 'more than a form' },
        hint: {
          pt: 'A parte difícil é modelar algo subjetivo sem engessar o usuário.',
          en: 'The hard part is modeling something subjective without boxing the user in.',
        },
      },
    ],

    context: {
      pt: 'Sonho fica na cabeça, em nota do celular ou em captura de tela de passagem aérea. Espalhado assim, ele não avança — não porque falte vontade, mas porque não existe lugar onde ele seja uma coisa acompanhável.',
      en: 'A dream lives in your head, in a phone note, or in a screenshot of a flight price. Scattered like that it doesn’t move forward — not for lack of will, but because there’s nowhere it exists as a trackable thing.',
    },

    problem: {
      pt: 'Modelar algo subjetivo. “Ir para o Japão” e “aprender a tocar violão” não têm a mesma forma, mas precisam caber na mesma estrutura sem virar um formulário genérico que não serve para nenhum dos dois. E o progresso tem que ser honesto: barra que enche sozinha não motiva, mente.',
      en: 'Modeling something subjective. “Go to Japan” and “learn guitar” don’t share a shape, but they have to fit one structure without becoming a generic form that serves neither. And progress has to be honest: a bar that fills itself doesn’t motivate, it lies.',
    },

    approach: {
      pt: 'Um sonho é a entidade central e carrega o mínimo: o que é, quando, quanto e por quê. O resto vem das etapas — e é delas que o progresso é derivado, nunca digitado. Assim a mesma estrutura serve para uma viagem com passagem e hospedagem e para um objetivo sem preço nenhum, e o número que a pessoa vê significa algo.',
      en: 'A dream is the central entity and carries the minimum: what, when, how much and why. Everything else comes from its steps — and progress is derived from them, never typed in. That way one structure serves both a trip with flights and lodging and a goal with no price at all, and the number the person sees actually means something.',
    },

    modules: [
      {
        name: 'Sonhos',
        tag: { pt: 'A entidade central', en: 'The core entity' },
        body: {
          pt: 'Registro do que é o sonho, com prazo e custo opcionais — porque nem todo sonho tem preço, e forçar um campo obrigatório afasta metade dos casos.',
          en: 'What the dream is, with optional deadline and cost — because not every dream has a price, and forcing the field away half the use cases.',
        },
      },
      {
        name: 'Etapas',
        tag: { pt: 'O plano', en: 'The plan' },
        body: {
          pt: 'A quebra em passos concretos. É o que transforma intenção em algo que se pode marcar como feito.',
          en: 'The breakdown into concrete steps. It’s what turns intent into something you can tick off.',
        },
      },
      {
        name: 'Progresso',
        tag: { pt: 'Derivado', en: 'Derived' },
        body: {
          pt: 'Calculado a partir das etapas concluídas. Nunca um campo que o usuário edita — progresso editável é decoração.',
          en: 'Computed from completed steps. Never a field the user edits — editable progress is decoration.',
        },
      },
    ],

    hardParts: [
      {
        title: { pt: 'Estrutura para algo sem forma', en: 'Structure for something shapeless' },
        body: {
          pt: 'A tentação era criar um tipo de sonho para cada caso — viagem, compra, objetivo — e cada um com seus campos. Isso multiplica a interface e envelhece rápido. Um núcleo pequeno com campos opcionais e etapas livres cobre muito mais caso e continua simples de usar.',
          en: 'The temptation was a dream type per case — trip, purchase, goal — each with its own fields. That multiplies the interface and ages fast. A small core with optional fields and free-form steps covers far more cases and stays simple to use.',
        },
      },
      {
        title: { pt: 'Progresso que não mente', en: 'Progress that doesn’t lie' },
        body: {
          pt: 'Deixar a pessoa arrastar a barra de progresso é fácil e inútil. Derivar das etapas dá um número menor no começo — e é justamente isso que faz concluir uma etapa significar algo.',
          en: 'Letting people drag their own progress bar is easy and useless. Deriving it from steps gives a smaller number at the start — and that is exactly what makes completing a step mean something.',
        },
      },
    ],

    responsibilities: {
      pt: [
        'Modelagem do domínio de sonhos e etapas, com progresso derivado',
        'Interface de cadastro, planejamento e acompanhamento',
        'API e persistência em PostgreSQL',
      ],
      en: [
        'Domain modeling for dreams and steps, with derived progress',
        'The UI for creating, planning and tracking',
        'API and PostgreSQL persistence',
      ],
    },

    outcome: {
      pt: 'Sonho deixou de ser nota solta e passou a ser uma coisa com etapa e prazo. É o projeto mais leve dos que eu listo aqui e o que mais me obrigou a pensar em modelagem — porque quando o domínio é subjetivo, o schema é a decisão de produto.',
      en: 'A dream stopped being a loose note and became a thing with steps and a deadline. It’s the lightest project on this list and the one that pushed me hardest on modeling — because when the domain is subjective, the schema *is* the product decision.',
    },

    learned: {
      pt: [
        'Núcleo pequeno com campo opcional cobre mais caso que um tipo para cada situação.',
        'Número derivado vale mais que número digitado. Se o usuário pode editar, não é métrica.',
        'Domínio subjetivo é onde a modelagem deixa de ser detalhe técnico e vira produto.',
      ],
      en: [
        'A small core with optional fields covers more cases than a type per situation.',
        'A derived number beats a typed one. If the user can edit it, it isn’t a metric.',
        'A subjective domain is where modeling stops being a technical detail and becomes the product.',
      ],
    },
  },

  /* ==========================================================
     Entregas listadas — reais, nomeadas, sem página própria
     ========================================================== */
  {
    slug: 'r-sus',
    index: '06',
    name: 'R-SUS',
    kicker: { pt: 'Relatórios da atenção primária', en: 'Primary-care reporting' },
    sector: { pt: 'Saúde pública municipal', en: 'Municipal public health' },
    client: WI,
    status: 'live',
    codeVisibility: 'private',
    featured: false,
    depth: 'listed',
    role: { pt: 'Desenvolvedor full stack', en: 'Full stack developer' },
    summary: {
      pt: 'O núcleo de relatórios do ecossistema: cidadãos, produção, saúde bucal, vínculos e equipes multiprofissionais, cada um com filtro, tabela e exportação em PDF, CSV e XLSX sobre as tabelas espelho.',
      en: 'The reporting core of the ecosystem: citizens, production, oral health, care linkage and multiprofessional teams, each with filters, tables and PDF, CSV and XLSX export over the mirror tables.',
    },
    tech: ['TypeScript', 'Next.js', 'Express', 'PostgreSQL', 'Puppeteer'],
  },
  {
    slug: 'sus-direto',
    index: '07',
    name: 'SUS Direto',
    kicker: { pt: 'Portal do cidadão', en: 'Citizen portal' },
    sector: { pt: 'Saúde pública municipal', en: 'Municipal public health' },
    client: WI,
    status: 'live',
    codeVisibility: 'private',
    featured: false,
    depth: 'listed',
    role: { pt: 'Desenvolvedor full stack', en: 'Full stack developer' },
    summary: {
      pt: 'A ponta que o munícipe vê: canal direto com a secretaria, sem precisar entender como o sistema funciona por dentro.',
      en: 'The end the resident actually sees: a direct channel to the health department, with no need to understand how the system works inside.',
    },
    tech: ['TypeScript', 'Next.js', 'React', 'Express'],
  },
  {
    slug: 'visa',
    index: '08',
    name: 'Visa',
    kicker: { pt: 'Vigilância sanitária municipal', en: 'Municipal health surveillance' },
    sector: { pt: 'Fiscalização', en: 'Regulatory inspection' },
    client: WI,
    status: 'live',
    codeVisibility: 'private',
    featured: false,
    depth: 'listed',
    role: { pt: 'Desenvolvedor full stack', en: 'Full stack developer' },
    summary: {
      pt: 'Cadastro de estabelecimentos, roteiro de inspeção, emissão de licença e tratamento de reclamação — com o documento oficial saindo em PDF a partir da própria tela. Fastify com a regra de negócio isolada em casos de uso.',
      en: 'Establishment registry, inspection workflow, licence issuing and complaint handling — with the official PDF generated from the screen itself. Fastify with business rules isolated into use cases.',
    },
    tech: ['TypeScript', 'Next.js', 'Fastify', 'PostgreSQL', 'Puppeteer'],
  },
  {
    slug: 'bpa-online',
    index: '09',
    name: 'BPA Online',
    kicker: {
      pt: 'Produção ambulatorial até o arquivo oficial',
      en: 'Outpatient production to the official file',
    },
    sector: { pt: 'Faturamento SUS', en: 'SUS billing' },
    client: WI,
    status: 'live',
    codeVisibility: 'private',
    featured: false,
    depth: 'listed',
    role: { pt: 'Desenvolvedor full stack', en: 'Full stack developer' },
    summary: {
      pt: 'Digitação otimizada para teclado, fluxo de aprovação por município, geração dos lotes no formato posicional oficial e leitura do arquivo de erro de volta como lista de pendência.',
      en: 'Keyboard-first data entry, per-city approval flow, batch generation in the official positional format, and parsing the rejection file back into a to-fix list.',
    },
    tech: ['TypeScript', 'Next.js', 'Express', 'PostgreSQL', 'XLSX'],
  },
  {
    slug: 'raid',
    index: '10',
    name: 'RAID',
    kicker: {
      pt: 'Gestão clínica herdada, mantida viva',
      en: 'Inherited clinical management, kept alive',
    },
    sector: { pt: 'Clínica terapêutica · legado', en: 'Therapeutic clinic · legacy' },
    client: WI,
    status: 'live',
    codeVisibility: 'private',
    featured: false,
    depth: 'listed',
    role: {
      pt: 'Manutenção e correção em sistema legado',
      en: 'Maintenance and fixes on a legacy system',
    },
    summary: {
      pt: 'Sistema em produção que eu não escrevi e que não pode parar. Correção cirúrgica, endurecimento da autorização no servidor — menu escondido não é permissão — e a disciplina de não levar as práticas antigas para os produtos novos.',
      en: 'A production system I didn’t write and that cannot stop. Surgical fixes, hardening authorization on the server — a hidden menu is not a permission — and the discipline not to carry the old practices into the newer products.',
    },
    tech: ['JavaScript', 'React', 'Vite', 'Express', 'Prisma'],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/** Projects with a page at /work/<slug>. */
export const caseProjects = projects.filter((p) => p.depth === 'case');

/** Case studies other than the featured one. */
export const secondaryProjects = caseProjects.filter((p) => !p.featured);

/** Delivered and named, but shown as a compact line. */
export const listedProjects = projects.filter((p) => p.depth === 'listed');

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug && p.depth === 'case');

export const projectSlugs = caseProjects.map((p) => p.slug);

/** Everything delivered for one client, cases first. */
export const projectsForClient = (client: string) => projects.filter((p) => p.client === client);
