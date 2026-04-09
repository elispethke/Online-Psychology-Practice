import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { staggerContainer, cardVariant } from '@/lib/motionVariants'

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
        <div ref={ref} className="reveal">
          <SectionTitle
            label={t('intercultural.label')}
            title={t('intercultural.title')}
          />
        </div>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-ink text-[1rem] font-medium max-w-3xl"
        >
          {t('intercultural.intro')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-ink-soft text-[0.95rem] max-w-3xl leading-relaxed"
        >
          {t('intercultural.p1')}
        </motion.p>

        {/* Questions + answer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 p-6 rounded-md border"
          style={{ background: 'var(--rose-wash)', borderColor: 'var(--border)' }}
        >
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
        </motion.div>

        {/* Challenges grid + quote side by side */}
        <div
          className="grid gap-12 mt-10 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}
        >
          {/* Challenges list */}
          <div>
            <h3
              className="font-body font-semibold mb-4 text-[0.8rem] tracking-[0.16em] uppercase"
              style={{ color: 'var(--rose-mid)' }}
            >
              {t('intercultural.challengesTitle')}
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-2"
            >
              {challenges.map((item) => (
                <motion.div
                  key={item}
                  variants={cardVariant}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-sm bg-white border transition-all hover:border-[var(--rose-mid)]"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <span
                    className="text-[0.7rem] flex-shrink-0"
                    style={{ color: 'var(--rose-deep)' }}
                    aria-hidden="true"
                  >
                    ✦
                  </span>
                  <span className="text-[0.88rem] text-ink-soft">{item}</span>
                </motion.div>
              ))}
            </motion.div>
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
