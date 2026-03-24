import type { Variants } from 'framer-motion'

/** Fade up with optional delay — used in Hero for staggered entrance */
export const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const, delay },
})

/** Container that staggers its children */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

/** Card that fades up — used inside staggerContainer */
export const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
}

/** Slide in from left */
export const slideFromLeft = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.6 },
}

/** Slide in from right */
export const slideFromRight = {
  initial: { opacity: 0, x: 20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.6, delay: 0.15 },
}
