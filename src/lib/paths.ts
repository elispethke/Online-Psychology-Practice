/**
 * Tabela de rotas e parsing — módulo PURO (sem React, sem window).
 *
 * Por que separado de route.ts: o script `scripts/postbuild-seo.mjs` roda em Node e precisa da mesma
 * tabela para gerar um HTML por rota. Antes a tabela existia duas vezes (aqui e no script) e podia
 * divergir sem ninguém perceber. Agora há uma única fonte da verdade, e por ser pura é trivial de testar.
 */
export type Lang = 'pt' | 'en' | 'de'
export type Page = 'home' | 'privacy' | 'imprint'
/** `notfound` não é uma página "de verdade": é o resultado de uma URL que não existe na tabela. */
export interface Route { lang: Lang; page: Page | 'notfound' }

/** Idioma na URL: `/` = português (padrão), `/en` = inglês, `/de/...` = só as páginas legais em alemão. */
export const PATHS: Record<Page, Partial<Record<Lang, string>>> = {
  home: { pt: '/', en: '/en' },
  privacy: { pt: '/privacidade', en: '/en/privacy', de: '/de/datenschutz' },
  imprint: { pt: '/impressum', en: '/en/impressum', de: '/de/impressum' },
}

export const OG_LOCALE: Record<Lang, string> = { pt: 'pt_BR', en: 'en_US', de: 'de_DE' }

/** Normaliza "/en/" → "/en" e "" → "/" para a comparação ser exata. */
const normalize = (pathname: string) => pathname.replace(/\/+$/, '') || '/'

/**
 * Converte um pathname em rota. Caminho desconhecido => `notfound` (antes caía em silêncio na home,
 * o que o Google trata como "soft 404": URL inexistente respondendo conteúdo válido).
 * O idioma da 404 é deduzido do prefixo (/en/..., /de/...) para a mensagem sair na língua certa.
 */
export function parseRoute(pathname: string): Route {
  const path = normalize(pathname)
  for (const page of Object.keys(PATHS) as Page[]) {
    for (const lang of Object.keys(PATHS[page]) as Lang[]) {
      if (PATHS[page][lang] === path) return { lang, page }
    }
  }
  const prefix = path.split('/')[1]
  return { lang: prefix === 'en' ? 'en' : 'pt', page: 'notfound' }
}

/** Href de uma página num idioma; se a tradução não existe, cai no português e, por fim, na raiz. */
export const hrefFor = (page: Page, lang: Lang) => PATHS[page][lang] ?? PATHS[page].pt ?? '/'
