import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import imgHero from '@/assets/img/elaine-hero.png'
import { fadeUp } from '@/lib/motionVariants'
import { Brain, Globe, Shield } from 'lucide-react'

/*
const PILLARS = [
  { icon: '🧠', key: 'hero.pillar1' },
  { icon: '🌍', key: 'hero.pillar2' },
  { icon: '🛡️', key: 'hero.pillar3' },
]
  */

const PILLARS = [
  { icon: Brain, key: 'hero.pillar1' },
  { icon: Globe, key: 'hero.pillar2' },
  { icon: Shield, key: 'hero.pillar3' }
]

// ── Sub-components ────────────────────────────────────────────────────────────

interface HeroStatCardProps {
  side: 'left' | 'right'
  labelKey: string
  value: string
  subKey: string
  delayMs: number
}

function HeroStatCard ({
  side,
  labelKey,
  value,
  subKey,
  delayMs
}: HeroStatCardProps) {
  const { t } = useTranslation()

  const positionClass =
    side === 'left'
      ? 'left-[-1.5rem] bottom-[20%]'
      : 'right-[-1rem] bottom-[8%]'

  const initialX = side === 'left' ? -12 : 12

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delayMs / 1000, duration: 0.5 }}
      className={[
        'absolute z-20 bg-white rounded-md shadow-md px-4 py-3',
        'border border-[var(--border)]',
        positionClass
      ].join(' ')}
    >
      <p className='text-2xs font-medium tracking-[0.12em] uppercase text-ink-faint'>
        {t(labelKey)}
      </p>
      <p className='font-display text-[1.3rem] font-medium leading-none text-rose-deep'>
        {value}
      </p>
      <p className='text-[0.7rem] text-ink-faint'>{t(subKey)}</p>
    </motion.div>
  )
}

function HeroTextColumn () {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col gap-6'>
      {/* Badge */}
      <motion.span
        {...fadeUp(0)}
        className='inline-flex items-center gap-2 w-fit rounded-full text-2xs font-medium tracking-widest uppercase px-3.5 py-1.5 bg-rose-wash border border-[var(--border)] text-rose-deep'
      >
        <span
          className='w-1.5 h-1.5 rounded-full bg-rose-mid'
          aria-hidden='true'
        />
        {t('hero.badge')}
      </motion.span>
      {/* Name */}
      <motion.div {...fadeUp(0.1)}>
        <p
          className='font-body font-medium tracking-[0.18em] uppercase mb-1 text-rose-mid'
          style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)' }}
        >
          {t('hero.tagline')}
        </p>
        <h1
          className='font-display font-light leading-none tracking-[0.04em]'
          style={{ fontSize: 'clamp(2.8rem, 5vw, 4.8rem)' }}
        >
          Elaine Teixeira
        </h1>
      </motion.div>
      {/* Headline */}
      <motion.div {...fadeUp(0.2)}>
        <h2
          className='font-display font-normal leading-tight'
          style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)' }}
        >
          {t('hero.headline')}
        </h2>
        <p
          className='font-display italic mt-1 text-rose-deep'
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
        >
          {t('hero.subheadline')}
        </p>
      </motion.div>
      {/* Description */}
      <motion.p
        {...fadeUp(0.3)}
        className='text-ink-soft max-w-lg text-[0.95rem]'
      >
        {t('hero.description')}
      </motion.p>
      {/* Pillars */};
      <motion.div {...fadeUp(0.4)} className='flex flex-col gap-2'>
        {PILLARS.map(p => {
          const Icon = p.icon

          return (
            <div
              key={p.key}
              className='flex items-center gap-3 px-3.5 py-2.5 rounded-sm bg-white border border-[var(--border)] border-l-[3px] border-l-rose-mid text-[0.85rem] text-ink-soft'
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
      <motion.div {...fadeUp(0.5)} className='flex flex-col gap-1.5'>
        <span className='flex items-center gap-2 text-[0.85rem] text-ink-soft'>
          📍 {t('hero.location')}
        </span>
        <span className='flex items-center gap-2 text-[0.85rem] text-ink-soft'>
          🌍 {t('hero.languages')}
        </span>
      </motion.div>
      {/* CTA buttons */}
      <motion.div {...fadeUp(0.6)} className='flex gap-3 flex-wrap'>
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
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
      className='flex justify-center'
    >
      <div className='relative w-full max-w-[440px]'>
        {/* Decorative border offset */}
        <div
          className='absolute top-[-16px] right-[-16px] w-full h-full rounded-lg z-0 border-[1.5px] border-rose-light'
          aria-hidden='true'
        />

        {/* Portrait */}
        <div
          className='relative z-10 w-full rounded-lg overflow-hidden shadow-lg'
          style={{ borderRadius: 20 }}
        >
          <img
            src={imgHero}
            alt='Elaine Teixeira'
            className='w-full h-full object-cover aspect-[3/4]'
          />
        </div>

        <HeroStatCard
          side='left'
          labelKey='hero.card1Label'
          value='20+'
          subKey='hero.card1Sub'
          delayMs={900}
        />
        <HeroStatCard
          side='right'
          labelKey='hero.card2Label'
          value='4'
          subKey='hero.card2Sub'
          delayMs={1000}
        />
      </div>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export function Hero () {
  return (
    <section
      id='hero'
      className='relative overflow-hidden min-h-screen flex items-center bg-surface pb-20'
      style={{ paddingTop: 'calc(var(--header-h) + 3rem)' }}
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

      <div className='max-w-[1200px] mx-auto px-6 w-full'>
        <div
          className='grid items-center gap-16'
          style={{
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 400px), 1fr))'
          }}
        >
          <HeroTextColumn />
          <HeroImageColumn />
        </div>
      </div>
    </section>
  )
}
