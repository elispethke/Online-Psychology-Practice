import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { EASE } from '@/lib/motionVariants'
import imgHero from '@/assets/img/elaine-hero.webp'

/**
 * Hero — a composição segue a "hero-referencia": foto de largura total sob o
 * header, o título e uma linha de apoio embaixo à esquerda, e um CTA de linha fina
 * embaixo à direita. O header é um componente separado, acima desta seção.
 */
export function Hero() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)

  // Ligado ao scroll: a foto desliza mais devagar que a página (parallax) enquanto a
  // legenda sobe e some conforme a pessoa sai do hero.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '5%'])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[var(--forest)]"
      style={{ height: 'clamp(560px, calc(100svh - var(--header-h)), 56rem)' }}
    >
      <motion.img
        src={imgHero}
        alt={t('hero.imageAlt')}
        width={1306}
        height={1600}
        {...({ fetchpriority: 'high' } as object)}
        className="absolute left-0 w-full object-cover object-[46%_30%] sm:object-[50%_44%] 2xl:object-[50%_32%]"
        style={{ top: '-3%', height: '106%', y: imgY }}
      />

      {/* The photograph stays in full colour. A forest veil is confined to the bottom of the
          frame, where the caption sits, so the text keeps strong contrast and the face stays clear. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            'linear-gradient(0deg, var(--forest) 0%, color-mix(in srgb, var(--forest) 94%, transparent) 30%, color-mix(in srgb, var(--forest) 55%, transparent) 52%, transparent 72%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden sm:block"
        style={{
          // véu inferior para a faixa da legenda + um véu lateral que só alcança a coluna de texto
          background: [
            'linear-gradient(0deg, var(--forest) 0%, color-mix(in srgb, var(--forest) 92%, transparent) 20%, color-mix(in srgb, var(--forest) 50%, transparent) 38%, transparent 55%)',
            'linear-gradient(90deg, color-mix(in srgb, var(--forest) 88%, transparent) 0%, color-mix(in srgb, var(--forest) 72%, transparent) 26%, color-mix(in srgb, var(--forest) 30%, transparent) 46%, transparent 60%)',
          ].join(', '),
        }}
      />

      <motion.div
        className="relative mx-auto flex h-full w-full flex-col justify-end px-[var(--gutter)] pb-10 sm:pb-14 lg:pb-16"
        style={{ maxWidth: 'var(--content-w)', y: textY, opacity: textOpacity }}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[44rem]">
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="font-display font-normal leading-[1.02] tracking-[0.005em] text-[var(--surface)]"
              style={{ fontSize: 'clamp(2.3rem, 5.2vw, 4.3rem)', textWrap: 'balance', textShadow: '0 2px 28px color-mix(in srgb, var(--forest) 60%, transparent)' }}
            >
              {t('hero.subheadline')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.38 }}
              className="mt-5 max-w-[34rem] text-[0.95rem] leading-relaxed text-[var(--on-dark)] sm:text-[1.05rem]"
            >
              {t('hero.headline')}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="shrink-0"
          >
            <Button href="#contact" variant="light">
              {t('hero.ctaBook')}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
