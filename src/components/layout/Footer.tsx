import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { NAV_ITEMS } from '@/constants/navigation'
import { Mail, Linkedin, MapPin } from 'lucide-react'
import { Link } from '@/components/ui/Link'
import { CONTACT_EMAIL, LINKEDIN_URL } from '@/config/site'
import { useLang } from '@/hooks/useLang'
import { openPreferences } from '@/lib/consent'
import { hrefFor } from '@/lib/route'
import emblem from '@/assets/brand/logo-emblem-reverse.webp'

const STUDIO_URL = 'https://www.eproxstudio.com/de'
const LINK = 'text-[0.85rem] text-[var(--on-dark-soft)] transition-colors duration-200 hover:text-[var(--gold)]'
const HEADING = 'mb-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[var(--gold)]'

export function Footer() {
  const { t } = useTranslation()
  const lang = useLang()

  return (
    <footer className="bg-[var(--forest)] text-[var(--on-dark)]" style={{ paddingTop: 'clamp(4rem, 8vw, 6.5rem)', paddingBottom: '2rem' }}>
      <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--content-w)' }}>
        <div className="grid items-center gap-10 border-b border-[var(--border-soft)] pb-14 md:grid-cols-[auto_1fr] md:gap-16" style={{ borderColor: 'color-mix(in srgb, var(--on-dark) 16%, transparent)' }}>
          {/* Official reversed emblem — unmodified crop of the identity board; the wordmark beside it is live, translated text */}
          <img
            src={emblem}
            alt=""
            aria-hidden="true"
            width={350}
            height={230}
            loading="lazy"
            className="h-auto w-[min(100%,16rem)] [mix-blend-mode:lighten] [mask-image:radial-gradient(closest-side,#000_72%,transparent_100%)]"
          />
          <div>
            <p className="font-display font-light leading-[0.95]" style={{ fontSize: 'clamp(2.6rem, 6vw, 4.6rem)' }}>
              Elaine Teixeira
            </p>
            <p className="mt-5 text-[0.72rem] font-medium uppercase tracking-[0.26em] text-[var(--gold)]">{t('brand.title')} · {t('brand.tagline')}</p>
            <p className="mt-6 max-w-[34rem] text-[0.9rem] leading-relaxed text-[var(--on-dark-soft)]">{t('footer.description')}</p>
          </div>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr]">
          <div>
            <p className={HEADING}>{t('footer.navTitle')}</p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {NAV_ITEMS.map(item => (
                <li key={item.key}><a href={item.href} className={LINK}>{t(item.key)}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className={HEADING}>{t('footer.contactTitle')}</p>
            <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={`inline-flex items-center gap-2.5 ${LINK}`}>
                  <Mail className="size-[15px] shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 ${LINK}`}>
                  <Linkedin className="size-[15px] shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2.5 text-[0.85rem] text-[var(--on-dark-soft)]">
                  <MapPin className="size-[15px] shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  {t('contact.locationValue')}
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start gap-4">
            <p className={HEADING}>{t('footer.subtitle')}</p>
            <Button href="#contact" variant="light">{t('footer.cta')}</Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-[0.72rem] text-[var(--on-dark-soft)]" style={{ borderTop: '1px solid color-mix(in srgb, var(--on-dark) 16%, transparent)' }}>
          <p className="m-0">{t('footer.copyright')}</p>
          <p className="m-0">{t('footer.legal')}</p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href={hrefFor('privacy', lang)} className="hover:text-[var(--gold)]">{t('footer.privacy')}</Link>
            <Link href={hrefFor('imprint', lang)} className="hover:text-[var(--gold)]">{t('footer.imprint')}</Link>
            <button type="button" onClick={openPreferences} className="hover:text-[var(--gold)]">{t('footer.cookieSettings')}</button>
          </nav>
          <p className="m-0">
            {t('footer.devPrefix')}{' '}
            <a
              href={STUDIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-[1.02rem] font-medium italic tracking-[0.02em] text-[var(--gold)] underline decoration-[color-mix(in_srgb,var(--gold)_45%,transparent)] decoration-1 underline-offset-[5px] transition-[color,text-decoration-color] duration-300 hover:text-[var(--on-dark)] hover:decoration-[var(--on-dark)] focus-visible:rounded-sm focus-visible:text-[var(--on-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
            >
              Eprox Studio
              <span className="sr-only"> ({t('footer.newTab')})</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
