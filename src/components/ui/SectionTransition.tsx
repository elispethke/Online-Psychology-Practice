import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

/**
 * Transição entre seções: ao rolar, a nova seção "entra" por cima da anterior — começa como um cartão
 * mais estreito, com cantos arredondados e recuado do topo, e se abre até ocupar a largura toda.
 *
 * Decisões (para estudo):
 * - Sem `position: sticky` na seção inteira (o efeito clássico de "cartas empilhadas"): várias seções
 *   têm elementos sticky internos e alturas maiores que a tela; sticky aninhado quebraria o scroll.
 * - Em vez disso, `clip-path` ligado ao progresso do scroll via MotionValue: a animação roda FORA do
 *   ciclo do React (sem setState por evento) e não causa reflow — clip-path só recorta na pintura.
 * - A margem negativa faz a seção nova sobrepor o fim da anterior (que é só padding vazio), então o
 *   recorte revela a seção de baixo "por trás". No fim do progresso o clip é zero: layout idêntico.
 * - `prefers-reduced-motion`: renderiza sem efeito nenhum.
 */
const OVERLAP = '3rem'

export function SectionTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  // 0 = topo da seção encostando no rodapé da tela; 1 = topo da seção a 30% da altura da tela.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 30%'] })
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      `inset(${OVERLAP} 5% 0% 5% round 2.25rem 2.25rem 0rem 0rem)`,
      'inset(0rem 0% 0% 0% round 0rem 0rem 0rem 0rem)',
    ],
  )

  if (reduce) return <>{children}</>

  return (
    <motion.div ref={ref} style={{ clipPath, marginTop: `-${OVERLAP}`, position: 'relative' }}>
      {children}
    </motion.div>
  )
}
