import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function Intercultural() {
  const { t } = useTranslation()
  const challenges = t('intercultural.challenges', { returnObjects: true }) as string[]
  const { ref } = useScrollReveal()

  return (
    <section
      id="intercultural"
      className="bg-white"
      style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* ── Intro ──────────────────────────────────────────────────── */}
        <div ref={ref} className="reveal">
          <SectionTitle
            label={t('intercultural.label')}
            title={t('intercultural.title')}
          />
        </div>

        <div
          className="grid gap-14 lg:gap-20 items-start mt-8"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))' }}
        >
          <div>
            <p className="text-ink text-[1.1rem] font-medium leading-snug">
              {t('intercultural.intro')}
            </p>

            <p className="mt-4 text-ink-soft text-[0.95rem] leading-relaxed">
              {t('intercultural.p1')}
            </p>
          </div>

          {/* Questions + answer */}
          <div className="border-l-2 border-[var(--rose-light)] pl-6">
            <p className="text-ink font-medium text-[0.95rem] mb-2">
              {t('intercultural.question1')}
            </p>
            <p className="text-ink font-medium text-[0.95rem]">
              {t('intercultural.question2')}
            </p>
            <p
              className="mt-4 text-[0.9rem] italic leading-relaxed"
              style={{ color: 'var(--rose-deep)' }}
            >
              {t('intercultural.answer')}
            </p>
          </div>
        </div>

        {/* ── Challenges + quote ───────────────────────────────────── */}
        <div
          className="grid gap-12 lg:gap-20 mt-20 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}
        >
          {/* Challenges list — editorial numbered rows */}
          <div>
            <h3
              className="font-body font-semibold mb-2 text-[0.8rem] tracking-[0.16em] uppercase"
              style={{ color: 'var(--rose-mid)' }}
            >
              {t('intercultural.challengesTitle')}
            </h3>
            <div>
              {challenges.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="ed-item"
                >
                  <span className="ed-mark" aria-hidden="true" />
                  <span className="text-[0.92rem] text-ink-soft pt-2">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quote + closing paragraphs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <blockquote
              className="font-display font-light italic leading-relaxed pl-6 text-2xl border-l-2"
              style={{ color: 'var(--ink)', borderColor: 'var(--rose-mid)' }}
            >
              {t('intercultural.quote')}
              <footer
                className="font-body text-[0.75rem] font-normal not-italic mt-2 tracking-[0.1em] uppercase"
                style={{ color: 'var(--rose-mid)' }}
              >
                — {t('intercultural.quoteAuthor')}
              </footer>
            </blockquote>

            <p className="text-ink-soft text-[0.95rem] leading-relaxed">
              {t('intercultural.p2')}
            </p>

            <p className="text-ink-soft text-[0.95rem] leading-relaxed">
              {t('intercultural.p3')}
            </p>

            <p
              className="text-[0.9rem] italic"
              style={{ color: 'var(--rose-deep)' }}
            >
              {t('intercultural.ctaNote')}
            </p>

            <div>
              <Button href="#contact">{t('intercultural.cta')}</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
