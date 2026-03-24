import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const TIMELINE_KEYS = ['t1', 't2', 't3', 't4', 't5'] as const

const TAGS = [
  { icon: '🌍', text: 'Brasil · África · Europa' },
  { icon: '🧬', text: 'HIV/AIDS' },
  { icon: '🏥', text: 'MHPSS' },
  { icon: '✈️', text: 'Migração' },
]

export function About() {
  const { t } = useTranslation()
  const { ref } = useScrollReveal()

  return (
    <section id="about" className="bg-white" style={{ padding: 'clamp(4rem, 8vw, 7rem) 0' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          className="grid gap-20 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' }}
        >
          {/* Left — sticky intro */}
          <div ref={ref} className="reveal lg:sticky" style={{ top: 'calc(var(--header-h) + 2rem)' }}>
            <SectionTitle label={t('about.label')} title={t('about.title')} />

            <p className="text-ink-soft mt-4 text-[0.975rem]">
              {t('about.desc1')}
            </p>
            <p className="text-ink-soft mt-3 text-[0.975rem]">
              {t('about.desc2')}
            </p>

            <blockquote className="font-display font-light italic mt-6 leading-relaxed pl-6 text-2xl border-l-2 border-l-rose-mid text-ink">
              {t('about.quote')}
            </blockquote>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {TAGS.map((tag) => (
                <span
                  key={tag.text}
                  className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium tracking-[0.08em] px-2.5 py-1 rounded-full border border-[var(--border)] bg-rose-wash text-rose-deep"
                >
                  {tag.icon} {tag.text}
                </span>
              ))}
            </div>
          </div>

          {/* Right — timeline */}
          <div className="flex flex-col">
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
