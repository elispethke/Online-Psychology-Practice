import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Reveal } from '@/components/ui/Reveal'
import { EASE } from '@/lib/motionVariants'
import group1 from '@/assets/img/group-1.webp' // foto2
import group2 from '@/assets/img/group-2.webp' // foto3
import group3 from '@/assets/img/group-3.webp' // foto5

/**
 * The three photographs below were chosen by the client specifically for the group
 * work section. They must not be used anywhere else on the site.
 */
const PHOTOS = [group1, group2, group3] as const
const STEPS: readonly (readonly string[])[] = [['p1', 'p2a'], ['p2b', 'p2c'], ['p3']]
const IMG_W = 1068
const IMG_H = 1600

/**
 * Sticky storytelling: on desktop the photograph stays pinned while the text steps
 * scroll past; the picture cross-fades to the one that belongs to the current step.
 * On small screens each step simply carries its own photograph.
 */
export function GroupWork() {
  const { t } = useTranslation()
  const alts = t('counselling.group.photosAlt', { returnObjects: true }) as string[]
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    stepRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="group"
      aria-labelledby="group-title"
      className="bg-[var(--paper)]"
      style={{ padding: 'var(--section-y) 0' }}
    >
      <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--content-w)' }}>
        <Reveal><p className="eyebrow mb-6">{t('counselling.group.label')}</p></Reveal>
        <Reveal delay={0.08}>
          <h2
            id="group-title"
            className="max-w-[14ch] font-display font-light leading-[0.98] text-[var(--forest)]"
            style={{ fontSize: 'clamp(3rem, 7.4vw, 6rem)', textWrap: 'balance' }}
          >
            {t('counselling.group.title')}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[5fr_6fr] lg:gap-24">
          {/* Pinned photograph (desktop) */}
          <div className="relative hidden lg:block">
            <div
              className="sticky overflow-hidden bg-[var(--sand)]"
              style={{
                top: 'calc(var(--header-h) + 2rem)',
                height: 'min(calc(100svh - var(--header-h) - 4rem), 46rem)',
              }}
            >
              {PHOTOS.map((src, i) => (
                <motion.img
                  key={src}
                  src={src}
                  alt={alts[i]}
                  width={IMG_W}
                  height={IMG_H}
                  loading="lazy"
                  aria-hidden={active !== i}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: '50% 58%' }}
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.07 }}
                  transition={{ duration: 1.1, ease: EASE }}
                />
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-16 lg:gap-0">
            {STEPS.map((keys, i) => (
              <div
                key={i}
                ref={el => { stepRefs.current[i] = el }}
                data-step={i}
                className="flex flex-col justify-center gap-7 lg:min-h-[78svh]"
              >
                <Reveal className="lg:hidden">
                  <img
                    src={PHOTOS[i]}
                    alt={alts[i]}
                    width={IMG_W}
                    height={IMG_H}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                    style={{ objectPosition: '50% 58%' }}
                  />
                </Reveal>
                {keys.map((key, k) => (
                  <Reveal key={key} delay={0.06 * k}>
                    <p
                      className={[
                        'max-w-[32rem]',
                        k === 0
                          ? 'font-display text-[clamp(1.5rem,2.4vw,2rem)] font-light leading-snug text-[var(--forest)]'
                          : 'text-[0.98rem] leading-[1.85] text-ink-soft',
                      ].join(' ')}
                    >
                      {t(`counselling.group.${key}`)}
                    </p>
                  </Reveal>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
