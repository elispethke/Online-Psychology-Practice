import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface FAQItem {
  question: string
  answer: string
}

export function FAQ() {
  const { t, i18n } = useTranslation()
  const { ref } = useScrollReveal()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const items = useMemo(() => {
    const result = t('faq.items', { returnObjects: true })
    return Array.isArray(result) ? (result as FAQItem[]) : []
  }, [t, i18n.language])

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i))

  return (
    <section
      id="faq"
      className="bg-[var(--surface)]"
      style={{ padding: 'clamp(3.5rem, 7vw, 6rem) 0' }}
    >
      <div className="max-w-[880px] mx-auto px-6">
        <div ref={ref} className="reveal">
          <SectionTitle
            label={t('faq.label')}
            title={t('faq.title')}
            subtitle={t('faq.subtitle')}
            scale="compact"
          />
        </div>

        {/* Editorial index — numbered rows, no boxed accordion */}
        <div className="mt-12 border-t border-[var(--border-soft)]">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="border-b border-[var(--border-soft)]">
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full grid gap-4 items-baseline py-6 text-left group"
                  style={{ gridTemplateColumns: '1fr auto' }}
                >
                  <span
                    className="text-[1rem] font-medium leading-snug transition-colors"
                    style={{ color: isOpen ? 'var(--forest)' : 'var(--ink)' }}
                  >
                    {item.question}
                  </span>
                  <span
                    className="flex-shrink-0 font-display font-light leading-none transition-transform duration-300"
                    style={{
                      fontSize: '1.4rem',
                      color: 'var(--gold)',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        className="text-[0.92rem] text-ink-soft leading-relaxed pb-7"
                        style={{ maxWidth: '58ch' }}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
