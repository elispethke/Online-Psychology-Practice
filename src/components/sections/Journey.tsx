import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'motion/react'
import { Reveal } from '@/components/ui/Reveal'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import { EASE, VIEWPORT_ONCE } from '@/lib/motionVariants'
import imgPortrait from '@/assets/img/elaine3.webp'

const TIMELINE_KEYS = ['t1', 't2', 't3', 't4', 't5'] as const

interface CvRow { period: string; role: string; org: string; context: string }

/** Sobre + experiência profissional, juntos: quem ela é, o caminho em ordem e, por fim, o CV detalhado. */
export function Journey() {
  const { t } = useTranslation()
  // returnObjects devolve a própria chave (string) se a tradução faltar: sem esta guarda, `rows.map` quebraria a página inteira.
  const rowsRaw = t('cv.rows', { returnObjects: true })
  const rows = Array.isArray(rowsRaw) ? (rowsRaw as CvRow[]) : []
  const timelineRef = useRef<HTMLDivElement>(null)

  // A linha dourada se preenche conforme a pessoa desce pela linha do tempo
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 70%', 'end 55%'] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="about" aria-labelledby="about-title" className="bg-[var(--surface)]" style={{ padding: 'var(--section-y) 0' }}>
      <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--content-w)' }}>
        {/* Introduction */}
        <div className="grid items-center gap-14 lg:grid-cols-[5fr_6fr] lg:gap-24">
          <ParallaxImage
            src={imgPortrait}
            alt={t('about.portraitAlt')}
            width={1066}
            height={1600}
            position="50% 18%"
            travel={8}
            className="aspect-[4/5] w-full"
          />

          <div className="flex flex-col gap-7">
            <Reveal delay={0.08}>
              <h2
                id="about-title"
                className="font-display font-light leading-[0.98] text-[var(--forest)]"
                style={{ fontSize: 'var(--fs-h2-xl)' }}
              >
                {t('about.title')}
              </h2>
            </Reveal>
            <Reveal><p className="max-w-[34rem] text-[1rem] leading-[1.85] text-ink-soft">{t('about.desc1')}</p></Reveal>
            <Reveal><p className="max-w-[34rem] text-[1rem] leading-[1.85] text-ink-soft">{t('about.desc2')}</p></Reveal>

            <Reveal>
              <dl className="mt-4 flex gap-12 border-t border-[var(--border-soft)] pt-8">
                <div>
                  <dt className="order-2 eyebrow-sm text-ink-faint">{t('about.figures.years')}</dt>
                  <dd className="m-0 font-display text-[3.4rem] font-light leading-none text-[var(--forest)]">{t('about.figures.yearsValue')}</dd>
                </div>
                <div>
                  <dt className="eyebrow-sm text-ink-faint">{t('about.figures.languages')}</dt>
                  <dd className="m-0 font-display text-[3.4rem] font-light leading-none text-[var(--forest)]">
                    {t('about.figures.languagesValue')}
                    <span className="ml-3 align-middle text-[0.75rem] font-body tracking-[0.2em] text-[var(--gold)]">{t('about.figures.langList')}</span>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        {/* Pull quote */}
        <Reveal className="mx-auto mt-24 max-w-[56rem] text-center lg:mt-36">
          <blockquote className="m-0 font-display font-light italic leading-[1.25] text-[var(--forest)]" style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.9rem)' }}>
            {t('about.quote')}
          </blockquote>
        </Reveal>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mx-auto mt-24 max-w-[56rem] lg:mt-36">
          <span aria-hidden="true" className="absolute bottom-0 left-[0.5rem] top-0 w-px bg-[var(--border)] sm:left-[9.5rem]" />
          <motion.span
            aria-hidden="true"
            className="absolute left-[0.5rem] top-0 h-full w-px origin-top bg-[var(--gold)] sm:left-[9.5rem]"
            style={{ scaleY: fill }}
          />
          <ol className="m-0 flex list-none flex-col gap-14 p-0">
            {TIMELINE_KEYS.map(key => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.9, ease: EASE }}
                className="relative grid gap-3 pl-9 sm:grid-cols-[9rem_1fr] sm:gap-12 sm:pl-0"
              >
                <span aria-hidden="true" className="absolute left-0 top-[0.55rem] size-[1.1rem] rounded-full border border-[var(--gold)] bg-[var(--surface)] sm:left-[9rem]" />
                <p className="eyebrow-sm m-0 pt-1 leading-relaxed text-[var(--gold)] sm:text-right">
                  {t(`about.timeline.${key}.period`)}
                </p>
                <div className="sm:pl-6">
                  <h3 className="mb-3 font-display text-[length:var(--fs-h3-sm)] font-normal leading-tight text-[var(--forest)]">
                    {t(`about.timeline.${key}.title`)}
                  </h3>
                  <p className="m-0 text-[0.95rem] leading-[1.8] text-ink-soft">{t(`about.timeline.${key}.desc`)}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* CV detalhado — lista completa mantida, recolhida para a história acima continuar legível */}
        <Reveal className="mx-auto mt-20 max-w-[56rem]">
          <details className="group border-y border-[var(--border)]">
            <summary className="flex cursor-pointer list-none items-center justify-between py-6 font-display text-[1.5rem] font-normal text-[var(--forest)] [&::-webkit-details-marker]:hidden">
              {t('about.figures.detailTitle')}
              <span aria-hidden="true" className="text-[1.6rem] text-[var(--gold)] transition-transform duration-300 group-open:rotate-45">+</span>
            </summary>
            <table className="cv-table mb-8">
              <caption className="sr-only">{t('cv.title')}</caption>
              <thead>
                <tr>
                  <th scope="col">{t('cv.colPeriod')}</th>
                  <th scope="col">{t('cv.colRole')}</th>
                  <th scope="col" className="hidden sm:table-cell">{t('cv.colContext')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => (
                  <tr key={`${row.period}-${row.org}`}>
                    <td className="whitespace-nowrap text-[0.78rem] tracking-[0.06em] text-ink-faint">{row.period}</td>
                    <td>
                      <span className="text-[var(--forest)]">{row.role}</span>
                      <span className="block text-ink-soft">{row.org}</span>
                    </td>
                    <td className="hidden text-ink-soft sm:table-cell">{row.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </Reveal>
      </div>
    </section>
  )
}
