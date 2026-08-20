# DOSSIÊ — sistema visual de João Vitor

> **Como usar:** cole este arquivo inteiro na primeira mensagem de uma conversa
> nova (Claude Design, Claude, qualquer uma). Ele é autocontido: quem ler isto
> tem tudo para produzir peças no padrão sem ver o site.
>
> Fonte de verdade: `src/app/[locale]/globals.css` (cores), `src/libs/fonts.ts`
> (tipos), `src/components/brand/monogram.tsx` (marca). Se divergir, o código ganha.

---

## 1. A ideia em uma frase

**Um dossiê técnico impresso.** Papel creme, tinta quase preta, um laranja de
carimbo. Réguas finas, cantos retos, grão de papel. Tudo numerado e rotulado como
documento de arquivo — não como interface de app.

Quem assina: **João Vitor Cavalcanti da Silva**, desenvolvedor full stack em
Caruaru/PE. Constrói sistemas de gestão em saúde pública (400+ municípios).
Empresa própria: **Quiral Labs**. Clientes: **Wi Consultoria**, **Catsuc Labs**.

Tom: direto, técnico, confiante. Frase curta. Zero jargão de marketing.
Nunca "soluções inovadoras", "transformação digital", "excelência".

---

## 2. Cores

### Claro — "paper" (padrão, é a identidade)

| token | hex | uso |
|---|---|---|
| `paper` | `#F2EFE9` | fundo |
| `surface-1` | `#E9E5DD` | bloco elevado / faixa alternada |
| `surface-2` | `#E0DBD1` | segundo nível |
| `hairline` | `#CBC5B9` | **toda** régua e borda |
| `ink` | `#110F0D` | texto principal, fundos invertidos |
| `ink-muted` | `#58534B` | texto secundário |
| `ink-faint` | `#8C867D` | rótulos, metadados |
| `brand` | `#FF5A1F` | o laranja. **Um** por peça |
| `brand-dim` | `#E24A12` | laranja mais fechado |
| `on-brand` | `#110F0D` | texto **sobre** laranja (nunca branco) |

### Escuro — "carbon"

| token | hex |
|---|---|
| `paper` | `#0F0C0A` |
| `surface-1` | `#1B1613` |
| `surface-2` | `#27211C` |
| `hairline` | `#3B322B` |
| `ink` | `#F7F3ED` |
| `ink-muted` | `#B4ABA2` |
| `ink-faint` | `#7F756C` |
| `brand` | `#FF5A1F` (o mesmo) |
| `brand-dim` | `#FA7B4C` |
| `on-brand` | `#140E0B` |

**Regras de cor**

- O laranja é **acento**, não cor de fundo genérica. Em uma peça ele aparece em
  no máximo 2 lugares: um destaque e um detalhe.
- Sobre laranja o texto é **tinta escura** (`#110F0D`), nunca branco — branco
  sobre `#FF5A1F` dá 3,1:1 e não passa contraste.
- Nunca gradiente. Nunca sombra difusa. Nunca vidro/blur.
- Laranja sobre creme dá 2,7:1 — **só para tipo grande** (≥40px). Para texto
  corrido em laranja, use `brand-dim` ou tinta.

---

## 3. Tipografia

Todas do Google Fonts.

| papel | família | como usar |
|---|---|---|
| **Display** | **Bricolage Grotesque** — 800, eixos `opsz` + `wdth` | títulos, sempre **CAIXA ALTA**, `letter-spacing: -0.045em`, `line-height: 0.82–0.92` |
| **Texto** | **Instrument Sans** — 400/500/600, eixo `wdth` | corpo, parágrafos |
| **Serifa** | **Instrument Serif** — 400, **só itálico** | uma frase de destaque por peça. Nunca em caixa alta |
| **Mono** | **JetBrains Mono** — 500 | rótulos, números, índices |

### O rótulo mono (assinatura do sistema)

É o elemento mais reconhecível depois do laranja:

```
font-family: JetBrains Mono
font-size: 10–12px
font-weight: 500
letter-spacing: 0.18em
text-transform: uppercase
```

Usado em: `01 — MANIFESTO`, `REF · JVCS-03`, `DESDE 2023`, `CLIENTE`.

### Escala (px em 1200 de largura)

`12 · 15 · 18 · 24 · 32 · 44 · 60 · 80 · 112 · 160` — e "poster" para palavra
solta gigante (até 208px, `line-height: 0.82`).

Títulos: `text-wrap: balance`. Parágrafos: `text-wrap: pretty`.

---

## 4. A marca

SVG completo, artboard 120×120. Lê como um **J**.

```svg
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <rect width="120" height="120" fill="#1A1A1A"/>
  <path d="M54 99L28 47H54L67 21H93L54 99Z" fill="#FF5A1F"/>
</svg>
```

- **Placa escura** `#1A1A1A` sobre fundo claro; **placa creme/branca** sobre fundo escuro.
- **Sem placa** (só o `path` laranja) quando usada como ornamento tipográfico,
  no lugar de um bullet ou asterisco — nesse caso ~0,75× do tamanho do texto ao lado.
- Sobre fundo laranja a marca vira tinta escura, não laranja.
- Nunca girar, distorcer, aplicar contorno ou trocar a cor por outra que não
  `#FF5A1F` / tinta.

---

## 5. Layout e texturas

**Estrutura**

- Raio de canto: **0**. Sempre. Nada arredondado.
- Espessura de régua/borda: **1,5px**, cor `hairline`.
- Grade rígida de 12 colunas. Alinhamento à esquerda.
- Todo bloco tem cabeçalho: `número` + `RÓTULO MONO` + régua horizontal atravessando.
- Numeração de duas casas: `01`, `02`, `03`.
- Blocos "impressos" podem ter deslocamento sólido: `box-shadow: 6px 6px 0 0 #110F0D` (sem blur).

**Grão de papel** (dá o ar impresso — sempre por cima de tudo)

```css
/* ruído SVG, opacity 0.055 e mix-blend-mode: multiply no claro;
   0.085 e screen no escuro */
<svg><filter id="n"><feTurbulence type="fractalNoise"
  baseFrequency="0.82" numOctaves="3" stitchTiles="stitch"/>
  <feColorMatrix type="saturate" values="0"/></filter>
<rect width="180" height="180" filter="url(#n)" opacity="0.62"/></svg>
```

**Malha de pontos** (fundo, meio-tom)

```css
background-image: radial-gradient(rgba(17,15,13,0.22) 1px, transparent 1.2px);
background-size: 8px 8px;
```

**Hachura diagonal**

```css
background-image: repeating-linear-gradient(45deg,
  rgba(17,15,13,0.14) 0 1px, transparent 1px 6px);
```

**Meio-tom / risografia** — o retrato do site é a foto convertida em pontos: grade
de ~6px, raio do ponto proporcional à escuridão do pixel, e os 18% mais escuros
saem em **laranja** em vez de tinta. É o efeito assinatura. Se a peça tiver foto,
converta assim.

---

## 6. Formatos de Instagram

| peça | tamanho | observações |
|---|---|---|
| Feed quadrado | 1080 × 1080 | |
| Feed retrato | 1080 × 1350 | melhor alcance |
| Story / Reels capa | 1080 × 1920 | **margem segura de 250px** em cima e embaixo |
| Carrossel | 1080 × 1350 por slide | numerar `01/05` no rótulo mono |
| Banner/capa LinkedIn | 1584 × 396 | |
| Open Graph | 1200 × 630 | |

**Receita de post que funciona nesse sistema**

1. Fundo creme com malha de pontos suave + grão.
2. Topo: rótulo mono com número e assunto (`03 — CLIENTES`) e régua atravessando.
3. Miolo: **uma** frase em Bricolage caixa alta, gigante, alinhada à esquerda,
   quebrando em 2–3 linhas. Uma palavra em laranja — só uma.
4. Opcional: uma linha em Instrument Serif itálico como contraponto.
5. Rodapé: régua + `joaovitorkc.com.br` em mono + a marca pequena.
6. Carrossel: faixa laranja com texto tinta no último slide para a CTA.

---

## 7. O que nunca fazer

- Cantos arredondados, sombra suave, gradiente, glassmorphism, neon, glow.
- Mais de um laranja, ou laranja como fundo de página inteira.
- Texto branco sobre o laranja.
- Emoji na arte. Ícone colorido. Ilustração 3D genérica.
- Centralizar tudo — o sistema é alinhado à esquerda.
- Título em Instrument Serif, ou serifa em caixa alta.
- Frase de efeito vazia. Se não é verificável, sai.
- Stock photo de "pessoa apontando para gráfico".

---

## 8. Fatos que podem entrar nas peças

Todos verificáveis, contados no código ou públicos nos sites dos clientes.

- **400+** municípios atendidos, em **26** estados
- **200+** telas em produção · **50+** módulos de API · **300+** migrations
- **5** sistemas com case completo: e-Gestão, Visa, Painel de Chamadas, BPA Online, RAID
- Stack: TypeScript, Next.js, React, Express, Fastify, PostgreSQL, Redis, Bull, Socket.IO
- Formação: Ciência da Computação (UniFavip Wyden, cursando) · AWS Academy ×2 · Cisco
- Desde março de 2023
- Site: `joaovitorkc.com.br`

**Frases de marca já aprovadas** (use como voz de referência)

> Construo os sistemas que fazem a saúde pública brasileira funcionar.

> Software que ninguém pode ver quebrar.

> Você para de perguntar "isso funciona?" e passa a perguntar "isso aguenta?".

> Um projeto grande vale mais que dez pequenos.

> Ferramenta é escolha, não identidade.
