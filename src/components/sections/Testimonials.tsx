import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/ui/Reveal'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import imgTestimonials from '@/assets/img/elaine5.webp'

interface TestimonialItem {
  text: string
  name: string
  role: string
  initials: string
}

function Attribution({ item }: { item: TestimonialItem }) {
  return (
    <p className="m-0 flex flex-wrap items-baseline gap-x-3 text-[0.8rem]">
      <span className="font-medium uppercase tracking-[0.18em] text-[var(--forest)]">{item.name}</span>
      <span className="text-ink-faint">{item.role}</span>
    </p>
  )
}

/** Depoimentos — uma citação grande e duas de apoio ao lado de um retrato. Sem cartões com caixa. */
export function Testimonials() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true }) as TestimonialItem[]
  const [featured, ...rest] = items

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-[var(--paper)]"
      style={{ padding: 'var(--section-y) 0' }}
    >
      <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--content-w)' }}>
        <Reveal><p className="eyebrow mb-6">{t('testimonials.label')}</p></Reveal>
        <h2 id="testimonials-title" className="sr-only font-display">{t('testimonials.title')}</h2>

        {featured && (
          <Reveal delay={0.08}>
            <figure className="m-0 max-w-[60rem]">
              <blockquote className="m-0 font-display font-light italic leading-[1.15] text-[var(--forest)]" style={{ fontSize: 'clamp(2rem, 4.8vw, 3.9rem)', textWrap: 'balance' }}>
                {featured.text}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-10 bg-[var(--gold)]" />
                <Attribution item={featured} />
              </figcaption>
            </figure>
          </Reveal>
        )}

        <div className="mt-16 grid items-center gap-14 lg:mt-24 lg:grid-cols-[4fr_7fr] lg:gap-24">
          <ParallaxImage
            src={imgTestimonials}
            alt={t('testimonials.imageAlt')}
            width={1066}
            height={1600}
            position="50% 20%"
            travel={7}
            className="aspect-[4/5] w-full max-w-[26rem]"
          />
          <div className="flex flex-col gap-12">
            {rest.map((item, i) => (
              <Reveal key={item.name} delay={0.06 * i}>
                <figure className="m-0 border-t border-[var(--gold)] pt-8">
                  <blockquote className="m-0 font-display text-[clamp(1.4rem,2.3vw,1.9rem)] font-light italic leading-snug text-[var(--forest)]">
                    {item.text}
                  </blockquote>
                  <figcaption className="mt-6"><Attribution item={item} /></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
