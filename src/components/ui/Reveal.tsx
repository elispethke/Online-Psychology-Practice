import { type ReactNode } from 'react'
import { motion } from 'motion/react'
import { EASE, VIEWPORT_ONCE } from '@/lib/motionVariants'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'p' | 'h2' | 'h3' | 'li' | 'blockquote'
}

/**
 * Entrada disparada pelo scroll. As animações de transform são desligadas
 * automaticamente para quem prefere movimento reduzido (MotionConfig no App).
 */
export function Reveal({ children, delay = 0, y = 26, className, as = 'div' }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}
