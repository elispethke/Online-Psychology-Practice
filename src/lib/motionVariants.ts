import type { Variants } from 'motion/react'

/** House easing: quick start, long soft landing. Used by every reveal. */
export const EASE = [0.22, 1, 0.36, 1] as const

/** Reveal once, slightly before the element is fully inside the viewport. */
export const VIEWPORT_ONCE = { once: true, margin: '0px 0px -12% 0px' } as const

/** Fade up with optional delay */
export const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
})

/** Container that staggers its children */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

/** Child of staggerContainer */
export const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const slideFromLeft = {
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: VIEWPORT_ONCE,
  transition: { duration: 0.8, ease: EASE },
}

export const slideFromRight = {
  initial: { opacity: 0, x: 24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: VIEWPORT_ONCE,
  transition: { duration: 0.8, ease: EASE, delay: 0.12 },
}
