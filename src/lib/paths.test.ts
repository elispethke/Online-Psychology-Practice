import { describe, expect, it } from 'vitest'
import { hrefFor, parseRoute, PATHS, type Lang, type Page } from '@/lib/paths'

describe('parseRoute', () => {
  it('reconhece toda rota da tabela (ida e volta com PATHS)', () => {
    for (const page of Object.keys(PATHS) as Page[]) {
      for (const lang of Object.keys(PATHS[page]) as Lang[]) {
        expect(parseRoute(PATHS[page][lang]!)).toEqual({ lang, page })
      }
    }
  })

  it('ignora barra final: /en/ é /en', () => {
    expect(parseRoute('/en/')).toEqual({ lang: 'en', page: 'home' })
    expect(parseRoute('/privacidade///')).toEqual({ lang: 'pt', page: 'privacy' })
  })

  it('string vazia cai na home em português', () => {
    expect(parseRoute('')).toEqual({ lang: 'pt', page: 'home' })
  })

  it('caminho desconhecido vira notfound (não cai na home em silêncio)', () => {
    expect(parseRoute('/nao-existe').page).toBe('notfound')
  })

  it('a 404 herda o idioma do prefixo da URL', () => {
    expect(parseRoute('/en/nao-existe')).toEqual({ lang: 'en', page: 'notfound' })
    expect(parseRoute('/xyz')).toEqual({ lang: 'pt', page: 'notfound' })
  })
})

describe('hrefFor', () => {
  it('devolve o caminho do idioma pedido', () => {
    expect(hrefFor('privacy', 'en')).toBe('/en/privacy')
  })

  it('cai no português quando a tradução não existe (home não tem /de)', () => {
    expect(hrefFor('home', 'de')).toBe('/')
  })
})
