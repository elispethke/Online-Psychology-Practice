import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import imgIntercultural from '@/assets/img/elaine2.webp'
import { EASE, VIEWPORT_ONCE } from '@/lib/motionVariants'

/**
 * Intercultural — the recognition moment. A sticky quote on the left holds the
 * theme while the story (what it feels like → who this is for → what helps)
 * scrolls on the right.
 */
export function Intercultural() {
  const { t } = useTranslation()
  const challenges = t('intercultural.challenges', { returnObjects: true }) as string[]
  const listRef = useRef<HTMLDivElement>(null)

  // Scroll-linked rule that draws down the list as it passes through the viewport
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 60%'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="intercultural"
      aria-labelledby="intercultural-title"
      className="bg-[var(--surface)]"
      style={{ padding: 'var(--section-y) 0' }}
    >
      <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--content-w)' }}>
        {/* Masthead */}
        <Reveal>
          <p className="eyebrow mb-6">{t('intercultural.label')}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            id="intercultural-title"
            className="max-w-[16ch] font-display font-light leading-[0.98] tracking-[0.005em] text-[var(--forest)]"
            style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
          >
            {t('intercultural.title')}
          </h2>
        </Reveal>
        <Reveal delay={0.16} className="mt-8 max-w-[38rem]">
          <p className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-light italic leading-snug text-[var(--sage)]">
            {t('intercultural.intro')}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-[5fr_7fr] lg:gap-24">
          {/* Sticky theme */}
          <aside className="lg:sticky lg:self-start" style={{ top: 'calc(var(--header-h) + 2.5rem)' }}>
            <ParallaxImage
              src={imgIntercultural}
              alt={t('intercultural.imageAlt')}
              width={1066}
              height={1600}
              position="50% 22%"
              travel={7}
              className="aspect-[4/5] w-full"
            />
            <motion.figure
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 1, ease: EASE }}
              className="relative -mt-16 ml-6 bg-[var(--forest)] px-7 py-9 text-[var(--surface)] sm:-mt-20 sm:ml-12 sm:px-10 sm:py-11"
            >
              <span aria-hidden="true" className="absolute left-7 top-3 font-display text-[4.5rem] leading-none text-[var(--gold)] sm:left-10">
                “
              </span>
              <blockquote className="relative pt-9 font-display text-[clamp(1.4rem,2.3vw,1.9rem)] font-light italic leading-[1.2]">
                {t('intercultural.quote').replace(/^"|"$/g, '')}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[var(--gold)]">
                <span aria-hidden="true" className="h-px w-8 bg-[var(--gold)]" />
                {t('intercultural.quoteAuthor')}
              </figcaption>
            </motion.figure>
          </aside>

          {/* Story */}
          <div className="flex flex-col gap-14 lg:gap-20">
            <Reveal>
              <p className="max-w-[34rem] text-[1rem] leading-[1.85] text-ink-soft">{t('intercultural.p1')}</p>
            </Reveal>

            <div className="flex flex-col gap-10">
              {(['question1', 'question2'] as const).map(key => (
                <Reveal key={key} delay={0.05}>
                  <p className="max-w-[30ch] font-display text-[clamp(1.7rem,3.2vw,2.6rem)] font-light leading-[1.18] text-[var(--forest)]">
                    {t(`intercultural.${key}`)}
                  </p>
                </Reveal>
              ))}
              <Reveal>
                <p className="max-w-[34rem] border-l-2 border-[var(--gold)] pl-6 text-[1rem] leading-[1.85] text-ink-soft">
                  {t('intercultural.answer')}
                </p>
              </Reveal>
            </div>

            <div ref={listRef} className="relative">
              <Reveal>
                <h3 className="mb-8 font-display text-[1.5rem] font-normal text-[var(--forest)]">
                  {t('intercultural.challengesTitle')}
                </h3>
              </Reveal>
              <div className="relative pl-8">
                <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-[var(--border)]" />
                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-px origin-top bg-[var(--gold)]"
                  style={{ scaleY: lineScale }}
                />
                <ul className="m-0 grid list-none gap-x-10 p-0 sm:grid-cols-2">
                  {challenges.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={VIEWPORT_ONCE}
                      transition={{ duration: 0.7, ease: EASE, delay: (i % 2) * 0.08 }}
                      className="border-t border-[var(--border-soft)] py-4 text-[0.93rem] leading-snug text-[var(--forest)]"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <Reveal>
              <p className="max-w-[34rem] text-[1rem] leading-[1.85] text-ink-soft">{t('intercultural.p2')}</p>
            </Reveal>
            <Reveal>
              <p className="max-w-[34rem] text-[1rem] leading-[1.85] text-ink-soft">{t('intercultural.p3')}</p>
              <div className="mt-8 flex flex-col items-start gap-4">
                <Button href="#contact">{t('intercultural.cta')}</Button>
                <p className="text-[0.82rem] italic text-ink-faint">{t('intercultural.ctaNote')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
