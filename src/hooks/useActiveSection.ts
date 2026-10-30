import { useEffect, useState } from 'react'

/** Devolve o id da seção que está cruzando a faixa do meio da tela. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) return

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
    // Decisão: IntersectionObserver em vez de ouvir o scroll — não força leitura de layout a cada frame e o
    // navegador faz a detecção fora da thread principal. O array vira uma string-chave (join) porque quem
    // chama pode passar um array novo a cada render, o que re-criaria o observer sem necessidade.
  }, [ids.join('|')]) // eslint-disable-line react-hooks/exhaustive-deps

  return active
}
