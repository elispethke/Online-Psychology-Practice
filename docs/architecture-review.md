# Avaliação técnica e arquitetura

Nível geral: **pleno sólido, com partes de sênior** (SEO, consentimento/LGPD/DSGVO, acessibilidade e decisões bem comentadas).
O que separa de "sênior completo": **sem testes, sem lint funcionando, sem CI, e alguma duplicação/código morto**.

## O que já está em nível sênior
- **Consentimento opt-in** (`lib/consent.ts`, `lib/analytics.ts`): `useSyncExternalStore`, analytics só carrega após aceite, "Aceitar" e "Recusar" idênticos.
- **SEO sem SSR** (`scripts/postbuild-seo.mjs`): HTML estático por rota/idioma com hreflang, canonical e JSON-LD; sitemap/robots gerados.
- **URL como fonte única do idioma** (`lib/route.ts` + `App.tsx`).
- **Design tokens em CSS variables** + Tailwind mapeando para elas; escala de tipografia fluida com `clamp()`.
- **Acessibilidade**: `prefers-reduced-motion` (CSS + `MotionConfig`), foco visível, `aria-*`, botão de pausa na galeria (WCAG 2.2.2).
- **Segurança de borda**: CSP, HSTS, X-Frame-Options, Permissions-Policy no `vercel.json`.
- **Separação de pastas** clara: `components/{layout,sections,ui}`, `lib`, `hooks`, `config`, `data`, `i18n`, `legal`.

## Melhorias de arquitetura — status

**Aplicadas:** 1 (testes: 55), 2 (ESLint + CI), 3 (código morto), 4 (Reveal unificado), 5 (`useScrolledPast`), 6 (constantes e `useLang`), 7 (`lib/paths.ts` compartilhado), 8 (code splitting: `LegalPage` e `motion` em chunks; o texto legal em si ainda fica no bundle principal porque `seo.ts` o usa), 9 (formulário), 10 (404), 11 (dependências), 12 (README), 14 parcial. **Pendentes:** 13 (rodar Prettier no projeto inteiro gera um diff grande; a config já existe: `npm run format`) e o conteúdo do item 14 (fotos e endereço dependem da cliente).

### Lista original (por prioridade)
1. **Testes: zero.** Começar por `parseRoute`, `consent` (read/write/versão), `isRateLimited` e um teste de fumaça do formulário (Vitest + Testing Library). É o gap nº 1 em entrevista.
2. **`npm run lint` quebra**: não existe `.eslintrc`/`eslint.config`. As dependências estão instaladas mas o script nunca roda. Criar config + rodar `tsc`, `lint`, `build` em **CI** (GitHub Actions).
3. **Código morto**: `components/ui/Card.tsx` (Card/ServiceCard sem uso), exports de `lib/motionVariants.ts` além de `EASE`/`VIEWPORT_ONCE`, keyframes do `tailwind.config.ts`, `.price-ribbon`, `package-lock 2.json` (versionado por engano). Remover.
4. **Dois sistemas de reveal**: `useScrollReveal` + `.reveal` (CSS) em Contact/Prices/FAQ vs `<Reveal>` (motion) no resto. Unificar em `<Reveal>`.
5. **Listeners de scroll duplicados 4×** (Header, ScrollProgress, BackToTop, WhatsApp). Extrair `useScrollY()` com um único listener (ou IntersectionObserver).
6. **Constantes duplicadas**: e-mail em `config/site.ts`, `legal.ts`, `Contact.tsx`, `Prices.tsx`; número do WhatsApp dentro do componente; `i18n.language === 'en' ? 'en' : 'pt'` repetido 4× → hook `useLang()`.
7. **Tabela de rotas duplicada** em `lib/route.ts` e `postbuild-seo.mjs` (e lógica de meta em `seo.ts`). Extrair um módulo compartilhado.
8. **Bundle único de 520 kB (172 kB gz)**: `LegalPage` + `legal/content.ts` (21 kB) e os 3 JSON de i18n carregam sempre. `React.lazy` nas páginas legais e `manualChunks` para `motion`.
9. **Formulário**: `<label>` sem `htmlFor` (usa `aria-label` duplicado), 7 `useState` → um objeto/`useReducer` ou `react-hook-form`; validação só de "não vazio" (e-mail não é validado). O rate limit em `localStorage` é só UX (ver comentário em `Contact.tsx`).
10. **Rota desconhecida cai silenciosamente na home** (soft 404, `parseRoute`). Criar página 404 com `noindex`.
11. **Dependências**: `emailjs-com` está descontinuado (usar `@emailjs/browser`); `esbuild` e `@vercel/node` em `dependencies` (esbuild só roda no build → devDependencies); `lucide-react` 0.263 antigo.
12. **README desatualizado** (cita Framer Motion, MiniCV, About, placeholder). Atualizar estrutura real.
13. **Estilo misto**: aspas simples/duplas, `style={{}}` inline ao lado de Tailwind. Prettier resolve.
14. **Conteúdo pendente em produção**: galeria da África só tem placeholders (`data/africaMission.ts`, tiles "em breve") e `legal.ts` tem campos `null` obrigatórios (endereço — § 5 DDG).

## Responsividade (medido no Chrome, 320 → 3840 px)
| Largura | Antes | Depois |
|---|---|---|
| 320 | scroll horizontal de 12 px | sem overflow |
| 375–1180 (celular/tablet) | ok, mas 19 alvos de toque < 40 px | idioma e menu com 44 px (`.touch-target`, só em `pointer: coarse`) |
| 1280–1920 | ok | ok |
| 2560–3840 (telão) | coluna fixa de 1240 px (~32 % da tela), texto minúsculo | `rem` escala com a viewport a partir de 1920 px; layout cresce junto (rem = 32 px em 4K) |

Mudanças feitas: tokens de layout em `rem`; `html { font-size: 0.8334vw }` ≥ 1920 px; `overflow-x: clip` no `html`; `viewport-fit=cover`; botões flutuantes com `safe-area-inset` (iPhone) e margem menor no celular; Contact/Prices/FAQ/CookieBanner agora usam `--content-w`/`--gutter` como as demais seções (antes `max-w-[1200px] px-6`).

**Limite que código não resolve**: a foto do hero é retrato (1306×1600). Em tela 16:9 grande o rosto fica sob o texto. Solução correta: uma segunda foto paisagem via `<picture>`/`srcset` com `media="(min-width: 1536px)"`.
**Ainda pendente**: testar em dispositivo real (iOS Safari: `100svh`, barra de URL) e iPad em paisagem (1024–1180 usa menu hambúrguer, `xl` = 1280).
