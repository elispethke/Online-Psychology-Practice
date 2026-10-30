import type { TFunction } from 'i18next'
import { SITE_URL } from '@/config/site'
import { DOCS } from '@/legal/content'
import { OG_LOCALE, PATHS, type Route } from '@/lib/paths'

const abs = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`)

/** Title / description / robots de uma rota. A home é a única página indexável. */
export function metaFor(route: Route, t: TFunction) {
  if (route.page === 'home') {
    return { title: t('meta.title'), description: t('meta.description'), robots: 'index, follow, max-image-preview:large', ogAlt: t('meta.ogAlt') }
  }
  if (route.page === 'notfound') {
    return { title: `${t('notFound.title')} · Elaine Teixeira`, description: t('notFound.text'), robots: 'noindex, follow', ogAlt: t('meta.ogAlt') }
  }
  const doc = DOCS[route.page][route.lang]
  return {
    title: `${doc.title.replace(/ \(.*\)$/, '')} · Elaine Teixeira`,
    description: doc.lead,
    robots: 'noindex, follow',
    ogAlt: t('meta.ogAlt'),
  }
}

/**
 * Decisão: o SEO é feito DUAS vezes de propósito.
 *  1) `scripts/postbuild-seo.mjs` grava um HTML estático por rota, para crawlers e scrapers de redes
 *     sociais que NÃO executam JavaScript verem <title>, hreflang e JSON-LD corretos — um "prerender"
 *     barato, sem precisar migrar para Next.js/SSR.
 *  2) Esta função mantém o <head> coerente na navegação client-side (trocar de idioma sem recarregar).
 * Ambos agora compartilham a tabela de rotas (`lib/paths.ts`); o que ainda é duplicado é a regra de
 * montagem das metas — próximo passo de limpeza, se o projeto crescer.
 */
export function applySeo(route: Route, t: TFunction) {
  const m = metaFor(route, t)
  document.documentElement.lang = route.lang
  document.title = m.title

  const setMeta = (selector: string, content: string) => document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content)
  setMeta('meta[name="description"]', m.description)
  setMeta('meta[name="robots"]', m.robots)
  setMeta('meta[name="googlebot"]', m.robots)
  setMeta('meta[property="og:title"]', m.title)
  setMeta('meta[property="og:description"]', m.description)
  setMeta('meta[property="og:locale"]', OG_LOCALE[route.lang])
  setMeta('meta[property="og:locale:alternate"]', route.lang === 'en' ? 'pt_BR' : 'en_US')
  setMeta('meta[property="og:image:alt"]', m.ogAlt)
  setMeta('meta[name="twitter:title"]', m.title)
  setMeta('meta[name="twitter:description"]', m.description)
  setMeta('meta[name="twitter:image:alt"]', m.ogAlt)

  // Os <link> com data-seo são sempre reconstruídos do zero: mais simples que atualizar um a um.
  document.querySelectorAll('link[data-seo]').forEach(el => el.remove())
  // 404 não tem canonical nem alternates: não existe uma URL "correta" para apontar.
  if (route.page === 'notfound') return

  const url = abs(PATHS[route.page][route.lang] ?? '/')
  setMeta('meta[property="og:url"]', url)
  const add = (rel: string, href: string, hreflang?: string) => {
    const l = document.createElement('link')
    l.rel = rel; l.href = href; l.dataset.seo = ''
    if (hreflang) l.hreflang = hreflang
    document.head.appendChild(l)
  }
  add('canonical', url)
  const alternates = PATHS[route.page] as Record<string, string>
  for (const l of Object.keys(alternates)) add('alternate', abs(alternates[l]), l)
  if (route.page === 'home') add('alternate', abs('/'), 'x-default')
}
