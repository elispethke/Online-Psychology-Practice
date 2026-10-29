import type { TFunction } from 'i18next'
import { SITE_URL } from '@/config/site'
import { DOCS } from '@/legal/content'
import { PATHS, type Lang, type Route } from '@/lib/route'

const OG_LOCALE: Record<Lang, string> = { pt: 'pt_BR', en: 'en_US', de: 'de_DE' }
const abs = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`)

/** Title / description / robots for a route. The home page is the only indexable page. */
export function metaFor(route: Route, t: TFunction) {
  if (route.page === 'home') {
    return { title: t('meta.title'), description: t('meta.description'), robots: 'index, follow, max-image-preview:large', ogAlt: t('meta.ogAlt') }
  }
  const doc = DOCS[route.page][route.lang]
  return {
    title: `${doc.title.replace(/ \(.*\)$/, '')} · Elaine Teixeira`,
    description: doc.lead,
    robots: 'noindex, follow',
    ogAlt: t('meta.ogAlt'),
  }
}

/** Keeps canonical, hreflang, robots and social tags in step with the current route (client-side navigation). */
export function applySeo(route: Route, t: TFunction) {
  const m = metaFor(route, t)
  const url = abs(PATHS[route.page][route.lang] ?? '/')
  document.documentElement.lang = route.lang
  document.title = m.title

  const setMeta = (selector: string, content: string) => document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content)
  setMeta('meta[name="description"]', m.description)
  setMeta('meta[name="robots"]', m.robots)
  setMeta('meta[name="googlebot"]', m.robots)
  setMeta('meta[property="og:title"]', m.title)
  setMeta('meta[property="og:description"]', m.description)
  setMeta('meta[property="og:url"]', url)
  setMeta('meta[property="og:locale"]', OG_LOCALE[route.lang])
  setMeta('meta[property="og:locale:alternate"]', route.lang === 'en' ? 'pt_BR' : 'en_US')
  setMeta('meta[property="og:image:alt"]', m.ogAlt)
  setMeta('meta[name="twitter:title"]', m.title)
  setMeta('meta[name="twitter:description"]', m.description)
  setMeta('meta[name="twitter:image:alt"]', m.ogAlt)

  document.querySelectorAll('link[data-seo]').forEach(el => el.remove())
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
