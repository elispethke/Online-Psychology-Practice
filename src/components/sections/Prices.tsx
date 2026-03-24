import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useMemo } from 'react'
import { staggerContainer, cardVariant } from '@/lib/motionVariants'

interface PricePlan {
  category: string
  title: string
  amount: string
  unit: string
  duration: string
  featured: boolean
  badge: string
  features: string[]
}

export function Prices () {
  const { t, i18n } = useTranslation()
  const { ref } = useScrollReveal()

  const plans = useMemo(() => {
    const result = t('prices.plans', { returnObjects: true })
    return Array.isArray(result) ? (result as PricePlan[]) : []
  }, [t, i18n.language])

  return (
    <section
      id='prices'
      className='bg-white'
      style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }}
    >
      <div className='max-w-[1200px] mx-auto px-6'>
        <div ref={ref} className='reveal'>
          <SectionTitle
            label={t('prices.label')}
            title={t('prices.title')}
            subtitle={t('prices.subtitle')}
          />
        </div>
        ;
        <motion.div
          key={i18n.language}
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.1 }}
          className='grid gap-6 mt-10'
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
          }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={`${i18n.language}-${plan.title}-${index}`}
              variants={cardVariant}
              data-badge={plan.badge}
              className={[
                'relative rounded-md border text-center p-8 transition-all duration-300',
                'hover:-translate-y-1 hover:scale-[1.02] hover:shadow-md',
                plan.featured
                  ? 'border-2 bg-gradient-to-b from-white to-[var(--rose-wash)] overflow-hidden price-ribbon'
                  : 'bg-white overflow-hidden'
              ].join(' ')}
              style={{
                borderColor: plan.featured ? 'var(--rose-mid)' : 'var(--border)'
              }}
            >
              <p
                className='text-2xs font-medium tracking-[0.18em] uppercase mb-1'
                style={{ color: 'var(--rose-mid)' }}
              >
                {plan.category}
              </p>

              <h3
                className='font-display font-medium text-ink mb-5'
                style={{ fontSize: '1.25rem' }}
              >
                {plan.title}
              </h3>

              <div className='mb-1'>
                {plan.unit ? (
                  <>
                    <span
                      className='font-display font-light leading-none'
                      style={{
                        fontSize: '3rem',
                        color: 'var(--rose-deep)'
                      }}
                    >
                      {plan.amount}
                    </span>

                    <span
                      className='block text-base'
                      style={{ color: 'var(--ink-faint)' }}
                    >
                      {plan.unit}
                    </span>
                  </>
                ) : (
                  <span
                    className='font-display font-light leading-tight block'
                    style={{
                      fontSize: '1.8rem',
                      color: 'var(--rose-deep)'
                    }}
                  >
                    {plan.amount}
                  </span>
                )}
              </div>

              <p
                className='mb-6 text-[0.78rem]'
                style={{ color: 'var(--ink-faint)' }}
              >
                {plan.duration}
              </p>

              <ul className='text-left flex flex-col gap-2 mb-6 list-none p-0 m-0'>
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className='flex items-start gap-2 text-[0.83rem] text-ink-soft'
                  >
                    <span
                      className='font-medium mt-px flex-shrink-0'
                      style={{ color: 'var(--rose-deep)' }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                href='#contact'
                variant={plan.featured ? 'primary' : 'outline'}
                fullWidth
              >
                {plan.unit ? t('prices.cta') : t('prices.ctaInstitutional')}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
