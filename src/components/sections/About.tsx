import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import imgAboutMain from '@/assets/img/elaine1.webp'
import imgAboutSecondary from '@/assets/img/elaine2.webp'
import { Globe2, Dna, HeartPulse, Plane, GraduationCap, type LucideIcon } from 'lucide-react'

const TIMELINE_KEYS = ['t1', 't2', 't3', 't4', 't5'] as const

const TAGS: { icon: LucideIcon; text: string }[] = [
  { icon: Globe2, text: 'Brasil · África · Europa' },
  { icon: Dna, text: 'HIV/AIDS' },
  { icon: HeartPulse, text: 'MHPSS' },
  { icon: Plane, text: 'Migração · Berlim' },
  { icon: GraduationCap, text: 'PUC Minas · CRP 06/55288' },
]

export function About() {
  const { t } = useTranslation()
  const { ref } = useScrollReveal()

  return (
    <section id="about" className="bg-white" style={{ padding: 'clamp(5rem, 9vw, 8.5rem) 0 clamp(4rem, 8vw, 7rem)' }}>
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Full-width editorial masthead — deliberately larger than the standard section opener */}
        <div ref={ref} className="reveal max-w-3xl">
          <p className="eyebrow mb-5">{t('about.label')}</p>
          <h2
            className="font-display font-light text-ink leading-[0.98] tracking-[0.005em]"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 4.4rem)' }}
          >
            {t('about.title')}
          </h2>
        </div>

        <div
          className="grid gap-16 lg:gap-20 items-start mt-14"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))' }}
        >
          {/* Left — photo diptych */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative pb-10 lg:pb-16 pr-6 lg:pr-10"
          >
            <div className="img-zoom w-[80%]">
              <img
                src={imgAboutMain}
                alt="Elaine Teixeira"
                width={1066}
                height={1600}
                loading="lazy"
                className="w-full h-auto object-cover aspect-[3/4]"
                style={{ objectPosition: '50% 15%' }}
              />
            </div>
            <div
              className="img-zoom absolute z-10 w-[52%] border-4 border-white shadow-md"
              style={{ bottom: 0, right: 0 }}
            >
              <img
                src={imgAboutSecondary}
                alt="Elaine Teixeira em seu ambiente de trabalho"
                width={1066}
                height={1600}
                loading="lazy"
                className="w-full h-auto object-cover aspect-[3/4]"
                style={{ objectPosition: '50% 15%' }}
              />
            </div>
          </motion.div>

          {/* Right — intro */}
          <div>
            <p className="text-ink-soft text-[0.975rem] leading-relaxed">
              {t('about.desc1')}
            </p>
            <p className="text-ink-soft mt-3 text-[0.975rem] leading-relaxed">
              {t('about.desc2')}
            </p>

            <blockquote className="font-display font-light italic mt-6 leading-relaxed pl-6 text-2xl border-l-2 border-l-rose-mid text-ink">
              {t('about.quote')}
            </blockquote>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {TAGS.map((tag) => {
                const Icon = tag.icon
                return (
                  <span
                    key={tag.text}
                    className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium tracking-[0.08em] px-2.5 py-1 rounded-full border border-[var(--border)] bg-rose-wash text-rose-deep"
                  >
                    <Icon className="w-3 h-3 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    {tag.text}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        {/* Timeline — full width */}
        <div className="mt-20 pt-12 border-t border-[var(--border-soft)]">
          <div
            className="grid gap-x-12"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))' }}
          >
            {TIMELINE_KEYS.map((key, i) => (
              <TimelineItem
                key={key}
                period={t(`about.timeline.${key}.period`)}
                title={t(`about.timeline.${key}.title`)}
                desc={t(`about.timeline.${key}.desc`)}
                delay={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineItemProps {
  period: string
  title: string
  desc: string
  delay: number
}

function TimelineItem({ period, title, desc, delay }: TimelineItemProps) {
  const { ref } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`timeline-item reveal reveal-delay-${delay + 1}`}
    >
      <p className="text-[0.7rem] font-medium tracking-[0.12em] uppercase mb-1 text-rose-deep">
        {period}
      </p>
      <h3 className="font-display font-medium mb-2 text-[1.1rem] text-ink">
        {title}
      </h3>
      <p className="text-ink-soft text-[0.88rem]">
        {desc}
      </p>
    </div>
  )
}
