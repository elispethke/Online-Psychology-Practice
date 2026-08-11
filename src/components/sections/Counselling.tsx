import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import imgCounselling from '@/assets/img/elaine7.webp'

export function Counselling() {
  const { t } = useTranslation()
  const techniques = t('counselling.techniques.items', { returnObjects: true }) as string[]
  const challenges = t('counselling.challenges.items', { returnObjects: true }) as string[]
  const { ref: titleRef } = useScrollReveal()

  return (
    <section
      id="counselling"
      style={{ background: 'var(--rose-wash)', padding: 'clamp(5rem, 10vw, 8.5rem) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── Intro + portrait ─────────────────────────────────────── */}
        <div
          className="grid gap-14 lg:gap-20 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))' }}
        >
          <div>
            <div ref={titleRef} className="reveal">
              <SectionTitle
                label={t('counselling.label')}
                title={t('counselling.title')}
                subtitle={t('counselling.description')}
                scale="large"
              />
            </div>

            <div className="mt-8 max-w-lg flex flex-col gap-4">
              {(['intro', 'p1', 'p2', 'p3'] as const).map((key, i) => (
                <motion.p
                  key={key}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="text-ink-soft text-[0.95rem] leading-relaxed"
                >
                  {t(`counselling.${key}`)}
                </motion.p>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="img-zoom relative lg:sticky"
            style={{ top: 'calc(var(--header-h) + 2rem)' }}
          >
            <img
              src={imgCounselling}
              alt="Elaine Teixeira em atendimento online"
              width={1600}
              height={1066}
              loading="lazy"
              className="w-full h-auto object-cover aspect-[4/3]"
              style={{ objectPosition: '44% 35%' }}
            />
          </motion.div>
        </div>

        {/* ── Modalities ─────────────────────────────────────────── */}
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow mt-20 mb-8"
        >
          {t('counselling.modalitiesTitle')}
        </motion.h3>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-14 items-start">
          {/* Individual — primary, flowing editorial column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <h4 className="font-display font-medium" style={{ fontSize: '1.3rem', color: 'var(--ink)' }}>
              {t('counselling.individual.title')}
            </h4>
            {(['p1', 'p2', 'p3', 'p4', 'p5'] as const).map((key) => (
              <p
                key={key}
                className={['text-ink-soft text-[0.88rem] leading-relaxed', key === 'p1' ? 'dropcap' : ''].join(' ')}
              >
                {t(`counselling.individual.${key}`)}
              </p>
            ))}
            <p
              className="text-[0.88rem] font-medium italic mt-2"
              style={{ color: 'var(--rose-deep)' }}
            >
              {t('counselling.individual.closing')}
            </p>
          </motion.div>

          {/* Group — secondary sidebar note, intentionally boxed and compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="flex flex-col gap-3.5 bg-white p-7 lg:sticky"
            style={{ border: '1px solid var(--border)', top: 'calc(var(--header-h) + 2rem)' }}
          >
            <h4 className="font-display font-medium" style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>
              {t('counselling.group.title')}
            </h4>
            {(['p1', 'p2', 'p3'] as const).map((key) => (
              <p key={key} className="text-ink-soft text-[0.85rem] leading-relaxed">
                {t(`counselling.group.${key}`)}
              </p>
            ))}
          </motion.div>
        </div>

        {/* ── Approach ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-12 border-t border-[var(--border-soft)] max-w-3xl flex flex-col gap-4"
        >
          <h4 className="font-display font-medium mb-1" style={{ fontSize: '1.3rem', color: 'var(--ink)' }}>
            {t('counselling.approach.title')}
          </h4>
          {(['p1', 'p2', 'p3', 'p4', 'p5'] as const).map((key) => (
            <p key={key} className="text-ink-soft text-[0.88rem] leading-relaxed">
              {t(`counselling.approach.${key}`)}
            </p>
          ))}

          {/* Techniques — a compact footnote to the approach, not a lonely box */}
          <div className="mt-4 pt-5 border-t border-[var(--border-soft)]">
            <p className="text-2xs font-medium tracking-[0.14em] uppercase mb-3" style={{ color: 'var(--rose-mid)' }}>
              {t('counselling.techniques.title')}
            </p>
            <div className="flex flex-col gap-2">
              {techniques.map((item) => (
                <div key={item} className="flex items-start gap-3 text-[0.85rem] text-ink-soft">
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--rose-deep)' }} aria-hidden="true" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Challenges — full width, matching its own weight (12 items) ── */}
        <div className="mt-16 pt-12 border-t border-[var(--border-soft)]">
          <h4 className="font-display font-medium mb-6" style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>
            {t('counselling.challenges.title')}
          </h4>
          <div
            className="grid gap-x-8 border-b border-[var(--border-soft)]"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
          >
            {challenges.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 py-3 text-[0.85rem] text-ink-soft border-t border-[var(--border-soft)]"
              >
                <span
                  className="text-[0.65rem] flex-shrink-0 mt-1"
                  style={{ color: 'var(--rose-deep)' }}
                  aria-hidden="true"
                >
                  ✦
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
