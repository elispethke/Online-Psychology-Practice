import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import imgConsulting from '@/assets/img/elaine3.webp'
import imgCorporate from '@/assets/img/elaine4.webp'

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
      style={{ padding: 'clamp(5rem, 9vw, 8rem) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── THIRD SECTOR — intro + portrait ───────────────────────── */}
        <div
          className="grid gap-14 lg:gap-20 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))' }}
        >
          <div>
            <div ref={ref1} className="reveal flex gap-5">
              <span
                className="font-display font-light leading-none select-none hidden sm:block"
                style={{ fontSize: '3.2rem', color: 'var(--rose-light)' }}
                aria-hidden="true"
              >
                
              </span>
              <SectionTitle
                label={t('consulting.label')}
                title={t('consulting.thirdSector.title')}
                subtitle={t('consulting.thirdSector.description')}
              />
            </div>

            <div className="mt-8 flex flex-col gap-4 max-w-lg">
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
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="img-zoom relative"
          >
            <img
              src={imgConsulting}
              alt="Elaine Teixeira"
              width={1066}
              height={1600}
              loading="lazy"
              className="w-full h-auto object-cover aspect-[4/5]"
              style={{ objectPosition: '50% 10%' }}
            />
          </motion.div>
        </div>

        {/* Areas — editorial numbered rows */}
        <motion.h4
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow mt-16 mb-6"
        >
          {t('consulting.thirdSector.areasTitle')}
        </motion.h4>

        {/* Deliberate 2×2 dossier matrix — exact count, no orphaned cell */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-[var(--border-soft)]">
          {areas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="p-8 border-r border-b border-[var(--border-soft)]"
            >
              <p
                className="font-display font-light mb-3 leading-none"
                style={{ fontSize: '1.8rem', color: 'var(--rose-light)' }}
                aria-hidden="true"
              >
                0{i + 1}
              </p>
              <p className="text-ink-soft text-[0.9rem] leading-relaxed max-w-sm">{area}</p>
            </motion.div>
          ))}
        </div>

        {/* Audience + contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 max-w-2xl border-l-2 border-[var(--rose-light)] pl-6"
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
          <Button href="#contact" variant="outline">{t('consulting.thirdSector.cta')}</Button>
        </motion.div>

        {/* ── DIVIDER ─────────────────────────────────────────────── */}
        <hr className="hr-thin my-20" />

        {/* ── CORPORATE — full-width intro, then a wide banner photo ─── */}
        <div ref={ref2} className="reveal flex gap-5">
          <span
            className="font-display font-light leading-none select-none hidden sm:block"
            style={{ fontSize: '3.2rem', color: 'var(--rose-light)' }}
            aria-hidden="true"
          >
            
          </span>
          <SectionTitle
            label={t('consulting.corporate.label')}
            title={t('consulting.corporate.title')}
            subtitle={t('consulting.corporate.description')}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 max-w-2xl">
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

        {/* Wide banner crop — a different photographic register from the portrait above */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="img-zoom relative mt-10"
        >
          <img
            src={imgCorporate}
            alt="Elaine Teixeira em Berlim"
            width={1306}
            height={1600}
            loading="lazy"
            className="w-full h-auto object-cover aspect-[21/9]"
            style={{ objectPosition: '50% 25%' }}
          />
        </motion.div>

        {/* Topics + Impact side by side */}
        <div
          className="grid gap-x-12 gap-y-10 mt-14 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}
        >
          {/* Topics */}
          <div>
            <h4 className="font-display font-medium mb-1" style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>
              {t('consulting.corporate.topicsTitle')}
            </h4>
            <p className="text-ink-soft text-[0.83rem] mb-4">
              {t('consulting.corporate.topicsIntro')}
            </p>
            <div>
              {topics.map((item) => (
                <div key={item} className="flex items-center gap-2 py-2.5 text-[0.85rem] text-ink-soft border-t border-[var(--border-soft)] last:border-b">
                  <span
                    className="text-[0.65rem] flex-shrink-0"
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

          {/* Impact */}
          <div>
            <h4 className="font-display font-medium mb-5" style={{ fontSize: '1.05rem', color: 'var(--ink)' }}>
              {t('consulting.corporate.impactTitle')}
            </h4>
            <div>
              {impact.map((item) => (
                <div key={item} className="flex items-start gap-3 py-3 border-t border-[var(--border-soft)] last:border-b">
                  <span
                    className="text-[0.7rem] font-bold flex-shrink-0 mt-0.5"
                    style={{ color: 'var(--rose-deep)' }}
                    aria-hidden="true"
                  >
                    ◆
                  </span>
                  <span className="text-[0.85rem] text-ink-soft leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Methodology + Format + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-12 border-t border-[var(--border-soft)] max-w-2xl"
        >
          <h4 className="font-display font-medium mb-2" style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>
            {t('consulting.corporate.methodologyTitle')}
          </h4>
          <p className="text-ink-soft text-[0.88rem] leading-relaxed mb-6">
            {t('consulting.corporate.methodology')}
          </p>
          <h4 className="font-display font-medium mb-2" style={{ fontSize: '1.1rem', color: 'var(--ink)' }}>
            {t('consulting.corporate.formatTitle')}
          </h4>
          <p className="text-ink-soft text-[0.88rem] leading-relaxed mb-6">
            {t('consulting.corporate.format')}
          </p>
          <Button href="#contact" variant="outline">{t('consulting.corporate.cta')}</Button>
        </motion.div>

      </div>
    </section>
  )
}
