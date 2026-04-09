import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { staggerContainer, cardVariant } from '@/lib/motionVariants'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export function Consulting() {
  const { t } = useTranslation()
  const areas = t('consulting.thirdSector.areas', { returnObjects: true }) as string[]
  const topics = t('consulting.corporate.topics', { returnObjects: true }) as string[]
  const impact = t('consulting.corporate.impact', { returnObjects: true }) as string[]
  const { ref: ref1 } = useScrollReveal()
  const { ref: ref2 } = useScrollReveal()

  return (
    <section
      id="consulting"
      className="bg-white"
      style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── THIRD SECTOR ───────────────────────────────────────── */}
        <div ref={ref1} className="reveal">
          <SectionTitle
            label={t('consulting.label')}
            title={t('consulting.thirdSector.title')}
            subtitle={t('consulting.thirdSector.description')}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 max-w-3xl">
          {(['p1', 'p2', 'p3'] as const).map((key, i) => (
            <motion.p
              key={key}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="text-ink-soft text-[0.95rem] leading-relaxed"
            >
              {t(`consulting.thirdSector.${key}`)}
            </motion.p>
          ))}
        </div>

        {/* Areas grid */}
        <motion.h4
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display font-medium mt-10 mb-4"
          style={{ fontSize: '1.1rem', color: 'var(--ink)' }}
        >
          {t('consulting.thirdSector.areasTitle')}
        </motion.h4>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}
        >
          {areas.map((area, i) => (
            <motion.div
              key={i}
              variants={cardVariant}
              className="p-5 rounded-md border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm hover:border-[var(--rose-mid)]"
              style={{ border: '1px solid var(--border)' }}
            >
              <p
                className="font-display font-light mb-2 leading-none"
                style={{ fontSize: '1.6rem', color: 'var(--rose-light)' }}
                aria-hidden="true"
              >
                0{i + 1}
              </p>
              <p className="text-ink-soft text-[0.85rem] leading-relaxed">{area}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Audience + contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 p-7 rounded-md border"
          style={{ background: 'var(--rose-wash)', borderColor: 'var(--border)' }}
        >
          <p
            className="text-2xs font-medium tracking-[0.2em] uppercase mb-2"
            style={{ color: 'var(--rose-mid)' }}
          >
            {t('consulting.thirdSector.audienceTitle')}
          </p>
          <p className="text-ink-soft text-[0.9rem] leading-relaxed mb-4">
            {t('consulting.thirdSector.audience')}
          </p>
          <p className="text-ink-soft text-[0.88rem] leading-relaxed mb-6">
            {t('consulting.thirdSector.contactDesc')}
          </p>
          <Button href="#contact">{t('consulting.thirdSector.cta')}</Button>
        </motion.div>

        {/* ── DIVIDER ─────────────────────────────────────────────── */}
        <div
          className="my-16 h-px w-full"
          style={{ background: 'var(--border)' }}
          aria-hidden="true"
        />

        {/* ── CORPORATE ──────────────────────────────────────────── */}
        <div ref={ref2} className="reveal">
          <SectionTitle
            label={t('consulting.corporate.label')}
            title={t('consulting.corporate.title')}
            subtitle={t('consulting.corporate.description')}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 max-w-3xl">
          {(['p1', 'p2'] as const).map((key, i) => (
            <motion.p
              key={key}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="text-ink-soft text-[0.95rem] leading-relaxed"
            >
              {t(`consulting.corporate.${key}`)}
            </motion.p>
          ))}
        </div>

        {/* Topics + Impact side by side */}
        <div
          className="grid gap-6 mt-10 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}
        >
          {/* Topics */}
          <div className="rounded-md border bg-white p-7" style={{ borderColor: 'var(--border)' }}>
            <h4 className="font-display font-medium mb-1" style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>
              {t('consulting.corporate.topicsTitle')}
            </h4>
            <p className="text-ink-soft text-[0.83rem] mb-4">
              {t('consulting.corporate.topicsIntro')}
            </p>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-2"
            >
              {topics.map((item) => (
                <motion.div
                  key={item}
                  variants={itemVariant}
                  className="flex items-center gap-2 px-3 py-2 rounded-sm border text-[0.85rem] text-ink-soft"
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

          {/* Impact */}
          <div className="rounded-md border bg-white p-7" style={{ borderColor: 'var(--border)' }}>
            <h4 className="font-display font-medium mb-4" style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>
              {t('consulting.corporate.impactTitle')}
            </h4>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-2"
            >
              {impact.map((item) => (
                <motion.div
                  key={item}
                  variants={itemVariant}
                  className="flex items-start gap-3 px-4 py-3 rounded-sm border transition-all hover:border-[var(--rose-mid)]"
                  style={{ background: 'var(--rose-wash)', border: '1px solid var(--border)' }}
                >
                  <span
                    className="text-[0.7rem] font-bold flex-shrink-0 mt-0.5"
                    style={{ color: 'var(--rose-deep)' }}
                    aria-hidden="true"
                  >
                    ◆
                  </span>
                  <span className="text-[0.85rem] text-ink-soft leading-snug">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Methodology + Format + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-6 p-7 rounded-md border"
          style={{ background: 'var(--rose-wash)', borderColor: 'var(--border)' }}
        >
          <h4 className="font-display font-medium mb-2" style={{ fontSize: '1rem', color: 'var(--ink)' }}>
            {t('consulting.corporate.methodologyTitle')}
          </h4>
          <p className="text-ink-soft text-[0.88rem] leading-relaxed mb-6">
            {t('consulting.corporate.methodology')}
          </p>
          <h4 className="font-display font-medium mb-2" style={{ fontSize: '1rem', color: 'var(--ink)' }}>
            {t('consulting.corporate.formatTitle')}
          </h4>
          <p className="text-ink-soft text-[0.88rem] leading-relaxed mb-6">
            {t('consulting.corporate.format')}
          </p>
          <Button href="#contact">{t('consulting.corporate.cta')}</Button>
        </motion.div>

      </div>
    </section>
  )
}
