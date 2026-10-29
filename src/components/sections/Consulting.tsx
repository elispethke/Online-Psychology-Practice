import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import imgCorporate from '@/assets/img/elaine4.webp'

function ListBlock({ title, intro, items }: { title: string; intro?: string; items: string[] }) {
  return (
    <div>
      <Reveal>
        <h4 className="font-display text-[1.7rem] font-normal leading-tight text-[var(--forest)]">{title}</h4>
        {intro && <p className="mt-2 text-[0.9rem] text-ink-faint">{intro}</p>}
      </Reveal>
      <ul className="m-0 mt-6 list-none p-0">
        {items.map((item, i) => (
          <Reveal key={item} as="li" delay={(i % 4) * 0.05} className="border-t border-[var(--border-soft)] py-4 text-[0.95rem] leading-snug text-[var(--forest)] last:border-b">
            {item}
          </Reveal>
        ))}
      </ul>
    </div>
  )
}

/** Consulting — two audiences, two compositions: the third sector first, corporate teams second. */
export function Consulting() {
  const { t } = useTranslation()
  const areas = t('consulting.thirdSector.areas', { returnObjects: true }) as string[]
  const topics = t('consulting.corporate.topics', { returnObjects: true }) as string[]
  const impact = t('consulting.corporate.impact', { returnObjects: true }) as string[]

  return (
    <section id="consulting" aria-labelledby="consulting-title">
      {/* Third sector */}
      <div className="bg-[var(--surface)]" style={{ padding: 'var(--section-y) 0' }}>
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--content-w)' }}>
          <div className="grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-24">
            <div className="lg:sticky lg:self-start" style={{ top: 'calc(var(--header-h) + 2.5rem)' }}>
              <Reveal><p className="eyebrow mb-6">{t('consulting.label')} · {t('consulting.thirdSector.label')}</p></Reveal>
              <Reveal delay={0.08}>
                <h2 id="consulting-title" className="font-display font-light leading-[1.02] text-[var(--forest)]" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', textWrap: 'balance' }}>
                  {t('consulting.thirdSector.title')}
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 font-display text-[clamp(1.25rem,2vw,1.55rem)] font-light italic leading-snug text-[var(--sage)]">
                  {t('consulting.thirdSector.description')}
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col gap-6 text-[0.98rem] leading-[1.85] text-ink-soft">
              {(['p1', 'p2', 'p3'] as const).map(key => (
                <Reveal key={key}><p className="max-w-[36rem]">{t(`consulting.thirdSector.${key}`)}</p></Reveal>
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-[5fr_6fr] lg:gap-24">
            <Reveal>
              <div className="bg-[var(--forest)] p-8 text-[var(--on-dark)] sm:p-12">
                <p className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-[var(--gold)]">{t('consulting.thirdSector.audienceTitle')}</p>
                <p className="m-0 font-display text-[clamp(1.3rem,2.1vw,1.7rem)] font-light leading-snug">{t('consulting.thirdSector.audience')}</p>
              </div>
            </Reveal>
            <ListBlock title={t('consulting.thirdSector.areasTitle')} items={areas} />
          </div>

          <Reveal className="mt-14 max-w-[40rem]">
            <p className="text-[0.98rem] leading-[1.85] text-ink-soft">{t('consulting.thirdSector.contactDesc')}</p>
            <div className="mt-8"><Button href="#contact">{t('consulting.thirdSector.cta')}</Button></div>
          </Reveal>
        </div>
      </div>

      {/* Corporate */}
      <div className="bg-[var(--paper)]" style={{ padding: 'var(--section-y) 0' }}>
        <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--content-w)' }}>
          <ParallaxImage
            src={imgCorporate}
            alt={t('consulting.corporate.imageAlt')}
            width={1306}
            height={1600}
            position="50% 38%"
            travel={9}
            className="aspect-[16/8] w-full"
          />

          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[5fr_6fr] lg:gap-24">
            <div>
              <Reveal><p className="eyebrow mb-6">{t('consulting.corporate.label')}</p></Reveal>
              <Reveal delay={0.08}>
                <h3 className="font-display font-light leading-[1.02] text-[var(--forest)]" style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.6rem)', textWrap: 'balance' }}>
                  {t('consulting.corporate.title')}
                </h3>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 font-display text-[clamp(1.2rem,1.9vw,1.45rem)] font-light italic leading-snug text-[var(--sage)]">
                  {t('consulting.corporate.description')}
                </p>
              </Reveal>
            </div>
            <div className="flex flex-col gap-6 text-[0.98rem] leading-[1.85] text-ink-soft">
              <Reveal><p className="max-w-[36rem]">{t('consulting.corporate.p1')}</p></Reveal>
              <Reveal><p className="max-w-[36rem]">{t('consulting.corporate.p2')}</p></Reveal>
            </div>
          </div>

          <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-2 lg:gap-24">
            <ListBlock title={t('consulting.corporate.topicsTitle')} intro={t('consulting.corporate.topicsIntro')} items={topics} />
            <ListBlock title={t('consulting.corporate.impactTitle')} items={impact} />
          </div>

          <div className="mt-20 grid gap-12 border-t border-[var(--border)] pt-12 lg:grid-cols-[5fr_6fr] lg:gap-24">
            <Reveal>
              <h4 className="font-display text-[1.7rem] font-normal text-[var(--forest)]">{t('consulting.corporate.methodologyTitle')}</h4>
            </Reveal>
            <div className="flex flex-col gap-8">
              <Reveal><p className="max-w-[38rem] text-[0.98rem] leading-[1.85] text-ink-soft">{t('consulting.corporate.methodology')}</p></Reveal>
              <Reveal>
                <h4 className="mb-2 font-display text-[1.4rem] font-normal text-[var(--forest)]">{t('consulting.corporate.formatTitle')}</h4>
                <p className="max-w-[38rem] text-[0.98rem] leading-[1.85] text-ink-soft">{t('consulting.corporate.format')}</p>
              </Reveal>
              <Reveal><div><Button href="#contact">{t('consulting.corporate.cta')}</Button></div></Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
