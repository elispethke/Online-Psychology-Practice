import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { Reveal } from '@/components/ui/Reveal'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import { EASE, VIEWPORT_ONCE } from '@/lib/motionVariants'
import imgCounselling from '@/assets/img/elaine7.webp'

/**
 * Terapia — atendimento individual e abordagem intercultural. O trabalho em grupo tem
 * seção própria (GroupWork), logo depois desta.
 */
export function Counselling() {
  const { t } = useTranslation()
  const techniques = t('counselling.techniques.items', { returnObjects: true }) as string[]
  const challenges = t('counselling.challenges.items', { returnObjects: true }) as string[]

  return (
    <section id="counselling" aria-labelledby="counselling-title">
      {/* 1 — O que é: foto fixa (sticky), texto rolando ao lado */}
      <div className="bg-[var(--paper)]" style={{ padding: 'var(--section-y) 0' }}>
        <div
          className="mx-auto grid items-start gap-14 px-[var(--gutter)] lg:grid-cols-[5fr_6fr] lg:gap-24"
          style={{ maxWidth: 'var(--content-w)' }}
        >
          <div className="lg:sticky" style={{ top: 'calc(var(--header-h) + 2.5rem)' }}>
            <ParallaxImage
              src={imgCounselling}
              alt={t('counselling.imageAlt')}
              width={1600}
              height={1066}
              position="44% 40%"
              travel={7}
              className="aspect-[4/5] w-full"
            />
          </div>

          <div className="flex flex-col gap-8 lg:pt-6">
            <Reveal><p className="eyebrow">{t('counselling.label')}</p></Reveal>
            <Reveal delay={0.08}>
              <h2
                id="counselling-title"
                className="font-display font-light leading-[1.02] text-[var(--forest)]"
                style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.4rem)', textWrap: 'balance' }}
              >
                {t('counselling.title')}
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="font-display text-[clamp(1.3rem,2.2vw,1.7rem)] font-light italic leading-snug text-[var(--sage)]">
                {t('counselling.intro')}
              </p>
            </Reveal>
            <div className="flex max-w-[34rem] flex-col gap-5 text-[0.98rem] leading-[1.85] text-ink-soft">
              <Reveal><p>{t('counselling.p1')}</p></Reveal>
              <Reveal><p>{t('counselling.p2')}</p></Reveal>
              <Reveal><p>{t('counselling.p3')}</p></Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* 2 — Individual counselling */}
      <div className="bg-[var(--surface)]" style={{ padding: 'var(--section-y) 0' }}>
        <div
          className="mx-auto grid gap-12 px-[var(--gutter)] lg:grid-cols-[4fr_7fr] lg:gap-24"
          style={{ maxWidth: 'var(--content-w)' }}
        >
          <div className="lg:sticky lg:self-start" style={{ top: 'calc(var(--header-h) + 2.5rem)' }}>
            <Reveal><p className="eyebrow mb-5">{t('counselling.modalitiesTitle')}</p></Reveal>
            <Reveal delay={0.08}>
              <h3
                className="font-display font-light leading-[1.05] text-[var(--forest)]"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', textWrap: 'balance' }}
              >
                {t('counselling.individual.title')}
              </h3>
            </Reveal>
          </div>

          <div className="flex max-w-[40rem] flex-col gap-6 text-[0.98rem] leading-[1.85] text-ink-soft">
            {(['p1', 'p2', 'p3', 'p4', 'p5'] as const).map(key => (
              <Reveal key={key}>
                <p className={key === 'p1' ? 'dropcap' : ''}>{t(`counselling.individual.${key}`)}</p>
              </Reveal>
            ))}
            <Reveal>
              <p className="mt-4 font-display text-[1.7rem] font-light italic leading-snug text-[var(--forest)]">
                {t('counselling.individual.closing')}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* 3 — Abordagem, na superfície escura da marca para dar ritmo */}
      <div className="bg-[var(--forest)] text-[var(--on-dark)]" style={{ padding: 'var(--section-y) 0' }}>
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--content-w)' }}>
          <Reveal>
            <h3
              className="max-w-[18ch] font-display font-light leading-[1.05]"
              style={{ fontSize: 'clamp(2.2rem, 4.6vw, 3.8rem)', textWrap: 'balance' }}
            >
              {t('counselling.approach.title')}
            </h3>
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-[7fr_4fr] lg:gap-24">
            <div className="flex max-w-[40rem] flex-col gap-6 text-[0.98rem] leading-[1.85] text-[var(--on-dark-soft)]">
              {(['p1', 'p2', 'p3', 'p4', 'p5'] as const).map(key => (
                <Reveal key={key}><p>{t(`counselling.approach.${key}`)}</p></Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="border-t border-[var(--gold)] pt-6">
                <p className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-[var(--gold)]">
                  {t('counselling.techniques.title')}
                </p>
                <ul className="m-0 flex list-none flex-col gap-4 p-0">
                  {techniques.map(item => (
                    <li key={item} className="font-display text-[1.25rem] font-light leading-snug">{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* 4 — No que trabalhamos */}
      <div className="bg-[var(--surface)]" style={{ padding: 'var(--section-y) 0' }}>
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--content-w)' }}>
          <Reveal>
            <h3
              className="mb-12 max-w-[20ch] font-display font-light leading-[1.05] text-[var(--forest)]"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', textWrap: 'balance' }}
            >
              {t('counselling.challenges.title')}
            </h3>
          </Reveal>
          <ul className="m-0 grid list-none gap-x-12 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.07 }}
                className="border-t border-[var(--border-soft)] py-5 text-[0.95rem] leading-snug text-[var(--forest)]"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
