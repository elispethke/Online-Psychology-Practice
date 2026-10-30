import { type AnchorHTMLAttributes, type MouseEvent } from 'react'
import { navigate } from '@/lib/route'

/** Link interno: navegação no cliente para cliques simples com o botão esquerdo; comportamento normal nos demais casos (nova aba, copiar link, crawlers). */
export function Link({ href, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(href)
    if (!href.includes('#')) window.scrollTo({ top: 0 })
  }
  return <a href={href} onClick={handle} {...rest} />
}
