import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface CVRow {
  period: string
  role: string
  org: string
  context: string
}

const CURRENT_BADGE_PERIODS = ['Atual', 'Current', 'Aktuell']

export function MiniCV() {
  const { t } = useTranslation()
  const rows = t('cv.rows', { returnObjects: true }) as CVRow[]
  const { ref } = useScrollReveal()

  return (
    <section
      id="mini-cv"
      className="bg-white"
      style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={ref} className="reveal">
          <SectionTitle label={t('cv.label')} title={t('cv.title')} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 rounded-md border overflow-hidden shadow-sm"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="overflow-x-auto">
            <table className="cv-table" aria-label={t('cv.title')}>
              <thead>
                <tr>
                  <th scope="col">{t('cv.colPeriod')}</th>
                  <th scope="col">{t('cv.colRole')}</th>
                  <th scope="col">{t('cv.colContext')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td style={{ width: 130 }}>
                      {CURRENT_BADGE_PERIODS.includes(row.period) ? (
                        <span
                          className="inline-flex items-center text-2xs font-medium tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full border"
                          style={{
                            background: 'var(--rose-wash)',
                            color: 'var(--rose-deep)',
                            borderColor: 'var(--border)',
                          }}
                        >
                          {t('cv.currentBadge')}
                        </span>
                      ) : (
                        <span
                          className="font-display font-medium whitespace-nowrap"
                          style={{ color: 'var(--rose-deep)' }}
                        >
                          {row.period}
                        </span>
                      )}
                    </td>
                    <td>
                      <p className="font-medium text-ink" style={{ fontSize: '0.88rem' }}>
                        {row.role}
                      </p>
                      <p className="mt-0.5" style={{ fontSize: '0.78rem', color: 'var(--ink-faint)' }}>
                        {row.org}
                      </p>
                    </td>
                    <td>
                      <p className="text-ink-soft" style={{ fontSize: '0.83rem' }}>
                        {row.context}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
