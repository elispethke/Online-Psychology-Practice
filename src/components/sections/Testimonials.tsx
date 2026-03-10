import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface TestimonialItem {
  text: string
  name: string
  role: string
  initials: string
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
}

export function Testimonials() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true }) as TestimonialItem[]
  const { ref } = useScrollReveal()

  return (
    <section
      id="testimonials"
      style={{
        background: 'var(--rose-wash)',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={ref} className="reveal">
          <SectionTitle label={t('testimonials.label')} title={t('testimonials.title')} />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 mt-10"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))' }}
        >
          {items.map((item) => (
            <motion.div
              key={item.name}
              variants={cardVariant}
              className="relative bg-white rounded-md border p-8 testimonial-quote-mark transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-md"
              style={{ border: '1px solid var(--border)' }}
            >
              {/* Stars */}
              <div
                className="text-xs tracking-widest mb-3"
                style={{ color: 'var(--rose-mid)' }}
                aria-label="5 stars"
              >
                ★★★★★
              </div>

              {/* Quote text */}
              <p
                className="font-display font-normal italic leading-relaxed mb-5 pt-2"
                style={{ fontSize: '1.08rem', color: 'var(--ink)' }}
              >
                {item.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[0.8rem] font-medium text-white flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, var(--rose-light), var(--rose-mid))',
                  }}
                  aria-hidden="true"
                >
                  {item.initials}
                </div>
                <div>
                  <p className="text-[0.82rem] font-medium text-ink">{item.name}</p>
                  <p className="text-[0.72rem]" style={{ color: 'var(--ink-faint)' }}>
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
