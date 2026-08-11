import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import imgTestimonials from '@/assets/img/elaine5.webp'

interface TestimonialItem {
  text: string
  name: string
  role: string
  initials: string
}

function Stars() {
  return (
    <div className="text-xs tracking-widest mb-3" style={{ color: 'var(--rose-mid)' }} aria-label="5 stars">
      ★★★★★
    </div>
  )
}

function Author({ item }: { item: TestimonialItem }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-[0.8rem] font-medium text-white flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, var(--rose-light), var(--rose-mid))' }}
        aria-hidden="true"
      >
        {item.initials}
      </div>
      <div>
        <p className="text-[0.82rem] font-medium text-ink">{item.name}</p>
        <p className="text-[0.72rem]" style={{ color: 'var(--ink-faint)' }}>{item.role}</p>
      </div>
    </div>
  )
}

export function Testimonials() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true }) as TestimonialItem[]
  const { ref } = useScrollReveal()
  const [featured, ...rest] = items

  return (
    <section
      id="testimonials"
      style={{
        background: 'var(--rose-wash)',
        padding: 'clamp(4rem, 7vw, 6.5rem) 0',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={ref} className="reveal">
          <SectionTitle label={t('testimonials.label')} title={t('testimonials.title')} align="center" scale="compact" />
        </div>

        {/* Editorial composition: tall portrait + one featured quote spanning two columns + two supporting quotes */}
        <div className="testimonials-grid mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="img-zoom relative rounded-sm overflow-hidden testimonials-photo"
          >
            <img
              src={imgTestimonials}
              alt="Elaine Teixeira"
              width={1066}
              height={1600}
              loading="lazy"
              className="w-full h-full object-cover aspect-[3/4]"
              style={{ objectPosition: '50% 12%' }}
            />
          </motion.div>

          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-white p-9 lg:p-10 testimonial-quote-mark testimonials-featured flex flex-col justify-center"
              style={{ border: '1px solid var(--border)' }}
            >
              <Stars />
              <p
                className="font-display font-normal italic leading-relaxed mb-6 pt-2"
                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: 'var(--ink)' }}
              >
                {featured.text}
              </p>
              <Author item={featured} />
            </motion.div>
          )}

          {rest.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * (i + 1) }}
              className={[
                'relative bg-white rounded-sm border p-7 testimonial-quote-mark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm',
                i === 0 ? 'testimonials-q2' : 'testimonials-q3'
              ].join(' ')}
              style={{ border: '1px solid var(--border)' }}
            >
              <Stars />
              <p
                className="font-display font-normal italic leading-relaxed mb-5 pt-2"
                style={{ fontSize: '1.02rem', color: 'var(--ink)' }}
              >
                {item.text}
              </p>
              <Author item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
