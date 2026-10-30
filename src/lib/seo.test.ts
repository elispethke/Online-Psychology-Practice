import { beforeEach, describe, expect, it } from 'vitest'
import type { TFunction } from 'i18next'
import { applySeo, metaFor } from '@/lib/seo'

const t = ((key: string) => key) as unknown as TFunction

describe('metaFor', () => {
  it('a home é indexável', () => {
    expect(metaFor({ lang: 'pt', page: 'home' }, t).robots).toContain('index')
  })

  it('páginas legais e 404 são noindex', () => {
    expect(metaFor({ lang: 'pt', page: 'privacy' }, t).robots).toMatch(/^noindex/)
    expect(metaFor({ lang: 'en', page: 'notfound' }, t).robots).toMatch(/^noindex/)
  })
})

describe('applySeo', () => {
  beforeEach(() => {
    document.head.innerHTML = '<meta name="robots" content=""><meta name="description" content=""><meta property="og:url" content="">'
  })

  it('home em inglês: lang, canonical e hreflang coerentes', () => {
    applySeo({ lang: 'en', page: 'home' }, t)
    expect(document.documentElement.lang).toBe('en')
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toMatch(/\/en$/)
    const hreflangs = [...document.querySelectorAll('link[rel="alternate"]')].map(l => l.getAttribute('hreflang'))
    expect(hreflangs).toEqual(expect.arrayContaining(['pt', 'en', 'x-default']))
  })

  it('trocar de rota substitui os links antigos em vez de acumular', () => {
    applySeo({ lang: 'pt', page: 'home' }, t)
    applySeo({ lang: 'en', page: 'home' }, t)
    expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1)
  })

  it('404 não declara canonical', () => {
    applySeo({ lang: 'pt', page: 'notfound' }, t)
    expect(document.querySelector('link[rel="canonical"]')).toBeNull()
  })
})
