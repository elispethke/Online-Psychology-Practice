import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { CONTACT_EMAIL } from '@/config/site'
import { useMemo } from 'react'
import type { TFunction } from 'i18next'

function getBookingHref(t: TFunction, category: string, hasUnit: boolean): string {
  const subject = hasUnit ? t('prices.mailBooking', { category }) : t('prices.mailProposal')
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}

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

  const plans = useMemo(() => {
    const result = t('prices.plans', { returnObjects: true })
    return Array.isArray(result) ? (result as PricePlan[]) : []
  }, [t])

  return (
    <section
      id='prices'
      className='bg-[var(--surface)]'
      style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }}
    >
      <div className='mx-auto px-[var(--gutter)]' style={{ maxWidth: 'var(--content-w)' }}>
        <Reveal>
          <SectionTitle
            scale="large"
            label={t('prices.label')}
            title={t('prices.title')}
            subtitle={t('prices.subtitle')}
          />
        </Reveal>

        {/* Tabela de valores editorial — cada plano é uma linha de largura total, não um cartão com caixa */}
        <div key={i18n.language} className='mt-12 border-t border-[var(--border-soft)]'>
          {plans.map((plan, index) => (
            <motion.div
              key={`${i18n.language}-${plan.title}-${index}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className='grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr_auto] gap-6 lg:gap-12 items-start lg:items-center py-10 border-b border-[var(--border-soft)]'
              style={plan.featured ? { background: 'var(--paper)', marginInline: 'calc(var(--gutter) * -1)', paddingInline: 'var(--gutter)' } : undefined}
            >
              {/* Identity */}
              <div>
                <p
                  className='text-2xs font-medium tracking-[0.18em] uppercase mb-2'
                  style={{ color: 'var(--gold)' }}
                >
                  {plan.category}
                </p>
                <h3 className='font-display font-medium text-ink leading-snug' style={{ fontSize: '1.5rem' }}>
                  {plan.title}
                </h3>
                {plan.badge && (
                  <p className='text-[0.72rem] font-medium italic mt-1' style={{ color: 'var(--forest)' }}>
                    {plan.badge}
                  </p>
                )}
                <p className='mt-2 text-[0.8rem]' style={{ color: 'var(--ink-faint)' }}>
                  {plan.duration}
                </p>
              </div>

              {/* Features */}
              <ul className='flex flex-col gap-2 list-none p-0 m-0'>
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className='flex items-start gap-2.5 text-[0.87rem] text-ink-soft leading-snug'
                  >
                    <span
                      className='font-medium mt-px flex-shrink-0'
                      style={{ color: 'var(--forest)' }}
                      aria-hidden='true'
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Price + CTA */}
              <div className='flex flex-col items-start lg:items-end gap-4 lg:text-right'>
                <div>
                  {plan.unit ? (
                    <>
                      <span
                        className='font-display font-light leading-none'
                        style={{ fontSize: '2.75rem', color: 'var(--forest)' }}
                      >
                        {plan.amount}
                      </span>
                      <span className='ml-1 text-base' style={{ color: 'var(--ink-faint)' }}>
                        {plan.unit}
                      </span>
                    </>
                  ) : (
                    <span
                      className='font-display font-light leading-tight block'
                      style={{ fontSize: '1.7rem', color: 'var(--forest)' }}
                    >
                      {plan.amount}
                    </span>
                  )}
                </div>
                <Button
                  href={getBookingHref(t, plan.category, !!plan.unit)}
                  variant={plan.featured ? 'primary' : 'outline'}
                >
                  {plan.unit ? t('prices.cta') : t('prices.ctaInstitutional')}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
