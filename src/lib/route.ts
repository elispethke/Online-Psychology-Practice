import { useEffect, useState } from 'react'
import { parseRoute, type Route } from '@/lib/paths'

export * from '@/lib/paths'

/**
 * Decisão: um roteador próprio de ~30 linhas em vez de react-router.
 * O site tem 3 páginas × 3 idiomas, sem parâmetros, sem layouts aninhados e sem carregamento de dados;
 * uma dependência de roteador (~15 kB gzip) não traria nada. O custo é que passamos a ser donos dos
 * casos de borda (ex.: a 404 em `parseRoute`). Se um dia houver rotas com parâmetros/loaders, troque
 * por react-router — é uma migração pequena porque tudo passa por `navigate`, `useRoute` e `Link`.
 */
export function navigate(to: string) {
  if (to === window.location.pathname + window.location.hash) return
  window.history.pushState({}, '', to)
  // pushState não dispara "popstate" sozinho; emitimos o evento para o useRoute reagir.
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
