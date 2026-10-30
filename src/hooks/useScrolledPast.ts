import { useSyncExternalStore } from 'react'

/**
 * Um ÚNICO listener de scroll compartilhado por todos os componentes (Header, BackToTop, WhatsApp).
 * Antes eram 4 listeners independentes, cada um com seu setState. Aqui o listener é ligado quando o
 * primeiro componente se inscreve e removido quando o último sai.
 */
const subscribers = new Set<() => void>()
const notify = () => subscribers.forEach(fn => fn())

function subscribe(callback: () => void) {
  subscribers.add(callback)
  if (subscribers.size === 1) window.addEventListener('scroll', notify, { passive: true })
  return () => {
    subscribers.delete(callback)
    if (subscribers.size === 0) window.removeEventListener('scroll', notify)
  }
}

/**
 * `true` quando a página rolou mais que `px`. O snapshot é um booleano: useSyncExternalStore só
 * re-renderiza quando o valor MUDA (cruzar o limiar), não a cada pixel rolado — essa é a diferença
 * para guardar `window.scrollY` em useState. No servidor/SSR o valor inicial é `false`.
 */
export function useScrolledPast(px: number): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > px,
    () => false,
  )
}
