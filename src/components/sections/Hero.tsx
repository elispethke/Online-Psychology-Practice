import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import imgHero from '@/assets/img/elaine-hero.png'



const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay },
})

const PILLARS = [
  { icon: '🧠', key: 'hero.pillar1' },
  { icon: '🌍', key: 'hero.pillar2' },
  { icon: '🛡️', key: 'hero.pillar3' },
]

export function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{
        paddingTop: 'calc(var(--header-h) + 3rem)',
        paddingBottom: '5rem',
        background: 'var(--surface)',
      }}
    >
      {/* Decorative radial gradients */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '-30%', right: '-10%',
          width: '60vw', height: '80vh',
          background: 'radial-gradient(ellipse, rgba(192,122,134,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: '-20%', left: '-5%',
          width: '40vw', height: '60vh',
          background: 'radial-gradient(ellipse, rgba(159,74,90,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div
          className="grid items-center gap-16"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))' }}
        >
          {/* ── Text Column ── */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <motion.span
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 w-fit rounded-full text-2xs font-medium tracking-widest uppercase px-3.5 py-1.5"
              style={{
                background: 'var(--rose-wash)',
                border: '1px solid var(--border)',
                color: 'var(--rose-deep)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--rose-mid)' }}
                aria-hidden="true"
              />
              {t('hero.badge')}
            </motion.span>

            {/* Name */}
            <motion.div {...fadeUp(0.1)}>
              <p
                className="font-body font-medium tracking-[0.18em] uppercase mb-1"
                style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)', color: 'var(--rose-mid)' }}
              >
                {t('hero.tagline')}
              </p>
              <h1
                className="font-display font-light leading-none tracking-[0.04em]"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 4.8rem)' }}
              >
                Elaine Teixeira
              </h1>
            </motion.div>

            {/* Headline */}
            <motion.div {...fadeUp(0.2)}>
              <h2
                className="font-display font-normal leading-tight"
                style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3rem)' }}
              >
                {t('hero.headline')}
              </h2>
              <p
                className="font-display italic mt-1"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--rose-deep)' }}
              >
                {t('hero.subheadline')}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-ink-soft max-w-lg"
              style={{ fontSize: '0.95rem' }}
            >
              {t('hero.description')}
            </motion.p>

            {/* Pillars */}
            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-col gap-2"
            >
              {PILLARS.map((p) => (
                <div
                  key={p.key}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-sm bg-white border-l-[3px] text-[0.85rem] text-ink-soft"
                  style={{
                    border: '1px solid var(--border)',
                    borderLeftColor: 'var(--rose-mid)',
                    borderLeftWidth: 3,
                  }}
                >
                  <span aria-hidden="true">{p.icon}</span>
                  {t(p.key)}
                </div>
              ))}
            </motion.div>

            {/* Location + langs */}
            <motion.div {...fadeUp(0.5)} className="flex flex-col gap-1.5">
              <span className="flex items-center gap-2 text-[0.85rem] text-ink-soft">
                📍 {t('hero.location')}
              </span>
              <span className="flex items-center gap-2 text-[0.85rem] text-ink-soft">
                🌍 {t('hero.languages')}
              </span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              {...fadeUp(0.6)}
              className="flex gap-3 flex-wrap"
            >
              <Button href="#contact">{t('hero.cta')}</Button>
              <Button href="#about" variant="outline">{t('hero.cta2')}</Button>
            </motion.div>
          </div>

          {/* ── Image Column ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-[440px]">
              {/* Decorative border offset */}
              <div
                className="absolute rounded-lg"
                style={{
                  top: -16, right: -16,
                  width: '100%', height: '100%',
                  border: '1.5px solid var(--rose-light)',
                  borderRadius: 20,
                  zIndex: 0,
                }}
                aria-hidden="true"
              />

              {/* Portrait */}
              <div className="relative z-10 w-full rounded-lg overflow-hidden shadow-lg" style={{ borderRadius: 20 }}>
                <img 
                src={imgHero}
                alt="Elaine Teixeira"
                className="w-full h-full object-cover"
                style={{ aspectRatio: "3/4"}}
                />
              </div>

              {/* Float card — Experience */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute z-20 bg-white rounded-md shadow-md px-4 py-3 border"
                style={{
                  left: '-1.5rem',
                  bottom: '20%',
                  border: '1px solid var(--border)',
                }}
              >
                <p className="text-2xs font-medium tracking-[0.12em] uppercase" style={{ color: 'var(--ink-faint)' }}>
                  {t('hero.card1Label')}
                </p>
                <p className="font-display text-[1.3rem] font-medium leading-none" style={{ color: 'var(--rose-deep)' }}>
                  20+
                </p>
                <p className="text-[0.7rem]" style={{ color: 'var(--ink-faint)' }}>
                  {t('hero.card1Sub')}
                </p>
              </motion.div>

              {/* Float card — Languages */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="absolute z-20 bg-white rounded-md shadow-md px-4 py-3 border"
                style={{
                  right: '-1rem',
                  bottom: '8%',
                  border: '1px solid var(--border)',
                }}
              >
                <p className="text-2xs font-medium tracking-[0.12em] uppercase" style={{ color: 'var(--ink-faint)' }}>
                  {t('hero.card2Label')}
                </p>
                <p className="font-display text-[1.3rem] font-medium leading-none" style={{ color: 'var(--rose-deep)' }}>
                  4
                </p>
                <p className="text-[0.7rem]" style={{ color: 'var(--ink-faint)' }}>
                  {t('hero.card2Sub')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
