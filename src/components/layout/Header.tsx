import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { LANGUAGES, type LanguageCode } from '@/i18n/i18n'
import logo from '../../assets/img/logo.webp'
import { NAV_ITEMS } from '@/constants/navigation'

export function Header () {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const changeLang = (code: LanguageCode) => {
    i18n.changeLanguage(code)
    setMobileOpen(false)
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[var(--surface)]/92 backdrop-blur-md border-b border-[var(--border-soft)]'
            : 'bg-transparent border-b border-transparent'
        ].join(' ')}
        style={{ height: 'var(--header-h)' }}
      >
        <div className='w-full max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between h-full'>
          {/* Logo + Title */}
          <a
            href='#hero'
            className='flex items-center gap-5 no-underline group'
          >
            <img
              src={logo}
              alt='Logo site Elaine Teixeira'
              className='h-16 w-auto object-contain'
            />

            <div className='flex flex-col gap-1.5'>
              <span className='font-display text-[1.35rem] font-medium tracking-[0.03em] text-ink leading-none transition-colors group-hover:text-[var(--rose-deep)]'>
                Elaine Teixeira
              </span>

              <span className='text-2xs font-medium tracking-[0.16em] uppercase text-[var(--rose-mid)]'>
                {t('header.subtitle')}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav
            className='hidden lg:flex items-center gap-7'
            aria-label={t('footer.navTitle')}
          >
            {NAV_ITEMS.map(item => (
              <a
                key={item.key}
                href={item.href}
                className='nav-link text-[0.78rem] font-normal tracking-[0.04em] text-ink-soft hover:text-[var(--rose-deep)]'
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          {/* Lang switcher + hamburger */}
          <div className='flex items-center gap-4'>
            <div
              className='hidden md:flex items-center gap-1 rounded-sm px-1.5 py-1 border bg-rose-wash border-[var(--border)]'
            >
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => changeLang(lang.code)}
                  aria-label={lang.name}
                  className={[
                    'flex items-center gap-1 text-[0.72rem] font-medium px-2 py-1 rounded-full transition-all duration-200',
                    i18n.language === lang.code
                      ? 'bg-[var(--rose-deep)] text-white'
                      : 'text-ink-soft hover:text-[var(--rose-deep)]'
                  ].join(' ')}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <button
              className='lg:hidden p-2 text-ink'
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className='fixed z-40 left-0 right-0 bg-white/97 backdrop-blur-xl shadow-md border-t border-[var(--border)]'
          style={{ top: 'var(--header-h)' }}
          role='dialog'
          aria-modal='true'
          aria-label='Navigation menu'
        >
          <nav className='max-w-[1600px] mx-auto px-6 py-4 flex flex-col'>
            {NAV_ITEMS.map(item => (
              <a
                key={item.key}
                href={item.href}
                onClick={closeMobile}
                className='py-3.5 text-[0.95rem] text-ink border-b border-[var(--border)] hover:text-[var(--rose-deep)] transition-colors'
              >
                {t(item.key)}
              </a>
            ))}

            {/* Mobile lang switcher */}
            <div className='flex gap-2 pt-4'>
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => changeLang(lang.code)}
                  aria-label={lang.name}
                  className={[
                    'flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border transition-all',
                    i18n.language === lang.code
                      ? 'bg-[var(--rose-deep)] text-white border-[var(--rose-deep)]'
                      : 'text-ink-soft border-[var(--border)] hover:border-[var(--rose-mid)]'
                  ].join(' ')}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
