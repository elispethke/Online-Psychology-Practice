import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Counselling() {
  const { t } = useTranslation()
  const audienceList = t('counselling.audience', { returnObjects: true }) as string[]
  const preventionList = t('counselling.prevention', { returnObjects: true }) as string[]
  const { ref: titleRef } = useScrollReveal()

  return (
    <section
      id="counselling"
      style={{
        background: 'var(--rose-wash)',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={titleRef} className="reveal">
          <SectionTitle
            label={t('counselling.label')}
            title={t('counselling.title')}
            subtitle={t('counselling.description')}
          />
        </div>

        <div
          className="grid gap-12 mt-12 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}
        >
          {/* Audience */}
          <div>
            <h3
              className="font-display font-medium mb-4"
              style={{ fontSize: '1.15rem', color: 'var(--ink)' }}
            >
              {t('counselling.audienceTitle')}
            </h3>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 gap-2"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}
            >
              {audienceList.map((item) => (
                <motion.div
                  key={item}
                  variants={itemVariant}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-sm bg-white border text-[0.88rem] text-ink-soft transition-colors hover:border-[var(--rose-mid)] hover:text-ink"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <span
                    className="text-[0.7rem] flex-shrink-0"
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

          {/* Prevention */}
          <div>
            <h3
              className="font-display font-medium mb-2"
              style={{ fontSize: '1.15rem', color: 'var(--ink)' }}
            >
              {t('counselling.preventionTitle')}
            </h3>
            <p className="text-ink-soft text-[0.88rem] mb-4">
              {t('counselling.preventionDesc')}
            </p>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-2"
            >
              {preventionList.map((item) => (
                <motion.div
                  key={item}
                  variants={itemVariant}
                  className="flex items-center gap-3 px-4 py-3 rounded-sm bg-white border transition-all hover:border-[var(--rose-mid)] hover:shadow-sm"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <span
                    className="text-[0.75rem] font-bold flex-shrink-0"
                    style={{ color: 'var(--rose-deep)' }}
                    aria-hidden="true"
                  >
                    ◆
                  </span>
                  <span className="text-[0.88rem] text-ink">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
