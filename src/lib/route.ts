import { useEffect, useState } from 'react'

export type Lang = 'pt' | 'en' | 'de'
export type Page = 'home' | 'privacy' | 'imprint'
export interface Route { lang: Lang; page: Page }

/** Language is part of the URL: `/` = Português (default), `/en` = English, `/de/...` = legal pages in German only. */
export const PATHS: Record<Page, Partial<Record<Lang, string>>> = {
  home: { pt: '/', en: '/en' },
  privacy: { pt: '/privacidade', en: '/en/privacy', de: '/de/datenschutz' },
  imprint: { pt: '/impressum', en: '/en/impressum', de: '/de/impressum' },
}

export function parseRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/'
  for (const page of Object.keys(PATHS) as Page[]) {
    for (const lang of Object.keys(PATHS[page]) as Lang[]) {
      if (PATHS[page][lang] === path) return { lang, page }
    }
  }
  return { lang: 'pt', page: 'home' }
}

export const hrefFor = (page: Page, lang: Lang) => PATHS[page][lang] ?? PATHS[page].pt ?? '/'

export function navigate(to: string) {
  if (to === window.location.pathname + window.location.hash) return
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.pathname))
  useEffect(() => {
    const onPop = () => setRoute(parseRoute(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return route
}
