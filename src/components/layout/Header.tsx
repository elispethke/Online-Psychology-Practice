import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { LANGUAGES, type LanguageCode } from '@/i18n/i18n'
import { NAV_ITEMS } from '@/constants/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'
import { hrefFor, navigate } from '@/lib/route'
import { BrandLogo } from '@/components/ui/BrandLogo'

const SECTION_IDS = NAV_ITEMS.map(item => item.href.slice(1))

function LanguageSwitch({ onChange, className = '' }: { onChange: (code: LanguageCode) => void; className?: string }) {
  const { t, i18n } = useTranslation()

  return (
    <div role="group" aria-label={t('header.langLabel')} className={['flex items-center', className].join(' ')}>
      {LANGUAGES.map((lang, i) => {
        const current = i18n.language === lang.code
        return (
          <span key={lang.code} className="flex items-center">
            {i > 0 && <span aria-hidden="true" className="mx-1.5 h-3 w-px bg-[var(--border-soft)]" />}
            <button
              type="button"
              onClick={() => onChange(lang.code)}
              aria-label={lang.name}
              aria-pressed={current}
              lang={lang.code}
              className={[
                'px-1 py-1 text-[0.72rem] font-medium tracking-[0.16em] transition-colors duration-300',
                current ? 'text-[var(--forest)] underline decoration-[var(--gold)] decoration-2 underline-offset-[7px]' : 'text-ink-faint hover:text-[var(--forest)]',
              ].join(' ')}
            >
              {lang.label}
            </button>
          </span>
        )
      })}
    </div>
  )
}

export function Header() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  // Language lives in the URL ("/" = pt, "/en" = en); App syncs i18n from the route.
  const changeLang = (code: LanguageCode) => {
    navigate(hrefFor('home', code) + window.location.hash)
    setMobileOpen(false)
  }

  return (
    <header
      className={[
        'sticky top-0 z-50 bg-[var(--surface)] border-b transition-[border-color,box-shadow] duration-300',
        scrolled ? 'border-[var(--border)] shadow-sm' : 'border-transparent',
      ].join(' ')}
    >
      <div
        className="mx-auto flex w-full items-center justify-between px-[var(--gutter)] transition-[height] duration-300"
        style={{ maxWidth: 'var(--content-w)', height: scrolled ? '72px' : 'var(--header-h)' }}
      >
        {/* Official logo — name, emblem and ornament are the original artwork; the subtitle lines follow the active language */}
        <a href="#hero" className="flex shrink-0 items-center" aria-label={t('header.logoAlt')}>
          <BrandLogo
            subtitleTop={t('brand.line1')}
            subtitleBottom={t('brand.line2')}
            className={scrolled ? '[--u:0.2708px]' : '[--u:0.3229px] sm:[--u:0.3542px]'}
          />
        </a>

        <nav className="hidden items-center gap-7 2xl:gap-10 xl:flex" aria-label={t('footer.navTitle')}>
          {NAV_ITEMS.map(item => {
            const isActive = active === item.href.slice(1)
            return (
              <a
                key={item.key}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={[
                  'nav-link whitespace-nowrap text-[0.68rem] font-medium uppercase tracking-[0.14em] hover:text-[var(--forest)]',
                  isActive ? 'active text-[var(--forest)]' : 'text-ink-soft',
                ].join(' ')}
              >
                {t(item.key)}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitch onChange={changeLang} className="hidden xl:flex" />
          <button
            type="button"
            className="p-2 text-[var(--forest)] xl:hidden"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? t('header.menuClose') : t('header.menuOpen')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--surface)] xl:hidden"
          >
            <nav className="mx-auto flex flex-col px-[var(--gutter)] pb-6 pt-2" aria-label={t('footer.navTitle')}>
              {NAV_ITEMS.map(item => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-[var(--border-soft)] py-4 font-display text-[1.45rem] font-light text-[var(--forest)]"
                >
                  {t(item.key)}
                </a>
              ))}
              <LanguageSwitch onChange={changeLang} className="pt-5" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
