import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
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
      className="bg-white"
      style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }}
    >
      <div className="max-w-[800px] mx-auto px-6">
        <div ref={ref} className="reveal">
          <SectionTitle
            label={t('faq.label')}
            title={t('faq.title')}
            subtitle={t('faq.subtitle')}
          />
        </div>

        <div className="mt-10 flex flex-col gap-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="border rounded-md overflow-hidden transition-all"
              style={{ borderColor: openIndex === i ? 'var(--rose-mid)' : 'var(--border)' }}
            >
              <button
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition-colors"
                style={{
                  background: openIndex === i ? 'var(--rose-wash)' : 'white',
                }}
              >
                <span className="text-[0.92rem] font-medium text-ink">
                  {item.question}
                </span>
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200"
                  style={{
                    background: openIndex === i ? 'var(--rose-deep)' : 'var(--rose-wash)',
                    color: openIndex === i ? 'white' : 'var(--rose-deep)',
                    transform: openIndex === i ? 'rotate(45deg)' : 'none',
                  }}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="px-6 py-4 text-[0.88rem] text-ink-soft leading-relaxed border-t" style={{ borderColor: 'var(--border)' }}>
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
