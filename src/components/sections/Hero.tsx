import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import imgHero from '@/assets/img/elaine-hero.webp'
import { fadeUp } from '@/lib/motionVariants'
import { Brain, Globe, Shield, MapPin, Languages } from 'lucide-react'

const PILLARS = [
  { icon: Brain, key: 'hero.pillar1' },
  { icon: Globe, key: 'hero.pillar2' },
  { icon: Shield, key: 'hero.pillar3' }
]

// ── Sub-components ────────────────────────────────────────────────────────────

interface HeroStatProps {
  labelKey: string
  value: string
  subKey: string
  delayMs: number
}

function HeroStat ({ labelKey, value, subKey, delayMs }: HeroStatProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delayMs / 1000, duration: 0.5 }}
      className='flex flex-col gap-0.5'
    >
      <p className='font-display font-light leading-none text-white' style={{ fontSize: '2.2rem' }}>
        {value}
      </p>
      <p className='text-2xs font-medium tracking-[0.14em] uppercase text-white/70'>
        {t(labelKey)}
      </p>
      <p className='text-[0.7rem] text-white/50'>{t(subKey)}</p>
    </motion.div>
  )
}

function HeroTextColumn () {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col gap-7 max-w-xl'>
      {/* Badge */}
      <motion.span
        {...fadeUp(0)}
        className='eyebrow'
      >
        {t('hero.badge')}
      </motion.span>

      {/* Name */}
      <motion.div {...fadeUp(0.1)}>
        <p
          className='font-body font-medium tracking-[0.18em] uppercase mb-2 text-rose-mid'
          style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)' }}
        >
          {t('hero.tagline')}
        </p>
        <h1
          className='font-display font-light leading-[0.95] tracking-[0.01em] text-ink'
          style={{ fontSize: 'clamp(3rem, 6vw, 5.2rem)' }}
        >
          Elaine
          <br />
          Teixeira
        </h1>
      </motion.div>

      {/* Headline */}
      <motion.div {...fadeUp(0.2)} className='border-l-2 border-[var(--rose-light)] pl-5'>
        <h2
          className='font-display font-normal leading-tight text-ink'
          style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)' }}
        >
          {t('hero.headline')}
        </h2>
        <p
          className='font-display italic mt-2 text-rose-deep'
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
        >
          {t('hero.subheadline')}
        </p>
      </motion.div>

      {/* Description */}
      <motion.p
        {...fadeUp(0.3)}
        className='text-ink-soft text-[0.95rem] leading-relaxed'
      >
        {t('hero.description')}
      </motion.p>

      {/* Pillars — thin editorial rows, not boxed cards */}
      <motion.div {...fadeUp(0.4)} className='flex flex-col'>
        {PILLARS.map(p => {
          const Icon = p.icon

          return (
            <div
              key={p.key}
              className='flex items-center gap-3 py-3 text-[0.85rem] text-ink-soft border-t border-[var(--border-soft)] last:border-b'
            >
              <Icon
                className='w-4 h-4 text-rose-mid shrink-0'
                aria-hidden='true'
              />
              {t(p.key)}
            </div>
          )
        })}
      </motion.div>

      {/* Location + langs */}
      <motion.div {...fadeUp(0.5)} className='flex flex-wrap gap-x-6 gap-y-1.5'>
        <span className='flex items-center gap-2 text-[0.83rem] text-ink-soft'>
          <MapPin className='w-[15px] h-[15px] text-rose-mid shrink-0' aria-hidden='true' strokeWidth={1.5} />
          {t('hero.location')}
        </span>
        <span className='flex items-center gap-2 text-[0.83rem] text-ink-soft'>
          <Languages className='w-[15px] h-[15px] text-rose-mid shrink-0' aria-hidden='true' strokeWidth={1.5} />
          {t('hero.languages')}
        </span>
      </motion.div>

      {/* CTA buttons */}
      <motion.div {...fadeUp(0.6)} className='flex gap-3 flex-wrap pt-1'>
        <Button href='#contact'>{t('hero.cta')}</Button>
        <Button href='#about' variant='outline'>
          {t('hero.cta2')}
        </Button>
      </motion.div>
    </div>
  )
}

function HeroImageColumn () {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      className='relative h-full min-h-[420px] lg:min-h-0'
    >
      {/* Decorative offset frame */}
      <div
        className='hidden lg:block absolute z-0 border border-rose-light'
        style={{ top: 24, right: -24, bottom: -24, left: 24 }}
        aria-hidden='true'
      />

      {/* Portrait */}
      <div className='img-zoom relative z-10 w-full h-full overflow-hidden'>
        <img
          src={imgHero}
          alt='Elaine Teixeira'
          width={1306}
          height={1600}
          className='w-full h-full object-cover'
          style={{ objectPosition: '50% 18%' }}
          fetchPriority='high'
        />

        {/* Editorial caption bar */}
        <div
          className='absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-6 py-6 lg:px-8 lg:py-8'
          style={{ background: 'linear-gradient(0deg, rgba(20,14,13,0.55) 0%, transparent 65%)' }}
        >
          <HeroStat labelKey='hero.card1Label' value='20+' subKey='hero.card1Sub' delayMs={900} />
          <div className='w-px self-stretch bg-white/25' aria-hidden='true' />
          <HeroStat labelKey='hero.card2Label' value='3' subKey='hero.card2Sub' delayMs={1000} />
        </div>
      </div>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export function Hero () {
  return (
    <section
      id='hero'
      className='relative overflow-hidden min-h-screen flex items-center bg-surface pb-16 lg:pb-0'
      style={{ paddingTop: 'calc(var(--header-h) + 2.5rem)' }}
    >
      {/* Decorative radial gradients */}
      <div
        className='pointer-events-none absolute'
        style={{
          top: '-30%',
          right: '-10%',
          width: '60vw',
          height: '80vh',
          background:
            'radial-gradient(ellipse, rgba(192,122,134,0.06) 0%, transparent 70%)'
        }}
        aria-hidden='true'
      />
      <div
        className='pointer-events-none absolute'
        style={{
          bottom: '-20%',
          left: '-5%',
          width: '40vw',
          height: '60vh',
          background:
            'radial-gradient(ellipse, rgba(159,74,90,0.04) 0%, transparent 70%)'
        }}
        aria-hidden='true'
      />

      <div className='max-w-[1440px] mx-auto px-6 lg:px-10 w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center gap-14 lg:gap-4'>
          <div className='order-2 lg:order-1'>
            <HeroTextColumn />
          </div>
          <div className='order-1 lg:order-2 aspect-[3/4] lg:aspect-auto lg:h-[calc(100vh-var(--header-h)-2.5rem)] lg:max-h-[760px]'>
            <HeroImageColumn />
          </div>
        </div>
      </div>
    </section>
  )
}
