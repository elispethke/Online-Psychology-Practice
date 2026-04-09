import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { staggerContainer, cardVariant } from '@/lib/motionVariants'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export function Counselling() {
  const { t } = useTranslation()
  const techniques = t('counselling.techniques.items', { returnObjects: true }) as string[]
  const challenges = t('counselling.challenges.items', { returnObjects: true }) as string[]
  const { ref: titleRef } = useScrollReveal()

  return (
    <section
      id="counselling"
      style={{ background: 'var(--rose-wash)', padding: 'clamp(4rem, 8vw, 7rem) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Section title */}
        <div ref={titleRef} className="reveal">
          <SectionTitle
            label={t('counselling.label')}
            title={t('counselling.title')}
            subtitle={t('counselling.description')}
          />
        </div>

        {/* Intro paragraphs */}
        <div className="mt-8 max-w-3xl flex flex-col gap-4">
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

        {/* ── Modalities ─────────────────────────────────────────── */}
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display font-medium mt-14 mb-6"
          style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: 'var(--ink)' }}
        >
          {t('counselling.modalitiesTitle')}
        </motion.h3>

        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}
        >
          {/* Individual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-md border p-7 flex flex-col gap-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <h4 className="font-display font-medium" style={{ fontSize: '1.15rem', color: 'var(--ink)' }}>
              {t('counselling.individual.title')}
            </h4>
            {(['p1', 'p2', 'p3', 'p4', 'p5'] as const).map((key) => (
              <p key={key} className="text-ink-soft text-[0.88rem] leading-relaxed">
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

          {/* Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="bg-white rounded-md border p-7 flex flex-col gap-4"
            style={{ borderColor: 'var(--border)' }}
          >
            <h4 className="font-display font-medium" style={{ fontSize: '1.15rem', color: 'var(--ink)' }}>
              {t('counselling.group.title')}
            </h4>
            {(['p1', 'p2', 'p3'] as const).map((key) => (
              <p key={key} className="text-ink-soft text-[0.88rem] leading-relaxed">
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
          className="mt-6 bg-white rounded-md border p-7 flex flex-col gap-4"
          style={{ borderColor: 'var(--border)' }}
        >
          <h4 className="font-display font-medium" style={{ fontSize: '1.15rem', color: 'var(--ink)' }}>
            {t('counselling.approach.title')}
          </h4>
          {(['p1', 'p2', 'p3', 'p4', 'p5'] as const).map((key) => (
            <p key={key} className="text-ink-soft text-[0.88rem] leading-relaxed">
              {t(`counselling.approach.${key}`)}
            </p>
          ))}
        </motion.div>

        {/* ── Techniques + Challenges ────────────────────────────── */}
        <div
          className="grid gap-6 mt-6 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}
        >
          {/* Techniques */}
          <div className="bg-white rounded-md border p-7" style={{ borderColor: 'var(--border)' }}>
            <h4 className="font-display font-medium mb-4" style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>
              {t('counselling.techniques.title')}
            </h4>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-2"
            >
              {techniques.map((item) => (
                <motion.div
                  key={item}
                  variants={itemVariant}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-sm border"
                  style={{ background: 'var(--rose-wash)', borderColor: 'var(--border)' }}
                >
                  <span
                    className="text-[0.75rem] font-bold flex-shrink-0 mt-0.5"
                    style={{ color: 'var(--rose-deep)' }}
                    aria-hidden="true"
                  >
                    ◆
                  </span>
                  <span className="text-[0.85rem] text-ink-soft">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Challenges */}
          <div className="bg-white rounded-md border p-7" style={{ borderColor: 'var(--border)' }}>
            <h4 className="font-display font-medium mb-4" style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>
              {t('counselling.challenges.title')}
            </h4>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-2"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}
            >
              {challenges.map((item) => (
                <motion.div
                  key={item}
                  variants={cardVariant}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-sm border text-[0.83rem] text-ink-soft transition-colors hover:border-[var(--rose-mid)] hover:text-ink"
                  style={{ background: 'var(--rose-wash)', border: '1px solid var(--border)' }}
                >
                  <span
                    className="text-[0.65rem] flex-shrink-0"
                    style={{ color: 'var(--rose-deep)' }}
                    aria-hidden="true"
                  >
                    ✦
                  </span>
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  )
}
