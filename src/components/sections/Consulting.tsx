import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

interface Feature {
  num: string
  title: string
  desc: string
}

export function Consulting() {
  const { t } = useTranslation()
  const features = t('consulting.features', { returnObjects: true }) as Feature[]
  const clients = t('consulting.clients', { returnObjects: true }) as string[]
  const { ref } = useScrollReveal()

  return (
    <section
      id="consulting"
      className="bg-white"
      style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={ref} className="reveal">
          <SectionTitle
            label={t('consulting.label')}
            title={t('consulting.title')}
            subtitle={t('consulting.description')}
          />
        </div>

        {/* Feature grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 mt-10"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.num}
              variants={cardVariant}
              className="p-6 rounded-md border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-sm hover:border-[var(--rose-mid)]"
              style={{ border: '1px solid var(--border)' }}
            >
              <p
                className="font-display font-light mb-2 leading-none"
                style={{ fontSize: '2rem', color: 'var(--rose-light)' }}
                aria-hidden="true"
              >
                {feature.num}
              </p>
              <h4 className="font-body font-medium text-ink mb-1.5" style={{ fontSize: '0.9rem' }}>
                {feature.title}
              </h4>
              <p className="text-ink-soft" style={{ fontSize: '0.82rem' }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Clients banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-6 mt-10 p-8 rounded-md border"
          style={{
            background: 'var(--rose-wash)',
            border: '1px solid var(--border)',
          }}
        >
          <div className="flex-1 min-w-[200px]">
            <p
              className="text-2xs font-medium tracking-[0.22em] uppercase mb-3"
              style={{ color: 'var(--rose-mid)' }}
            >
              {t('consulting.clientsLabel')}
            </p>
            <div className="flex flex-wrap gap-2">
              {clients.map((c) => (
                <span
                  key={c}
                  className="inline-flex text-[0.7rem] font-medium tracking-[0.08em] px-2.5 py-1 rounded-full border"
                  style={{
                    background: 'var(--rose-wash)',
                    color: 'var(--rose-deep)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <Button href="#contact">{t('consulting.cta')}</Button>
        </motion.div>
      </div>
    </section>
  )
}
