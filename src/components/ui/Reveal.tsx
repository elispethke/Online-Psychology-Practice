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
 * Scroll-triggered entrance. Transform animations are switched off
 * automatically for visitors who prefer reduced motion (MotionConfig in App).
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
