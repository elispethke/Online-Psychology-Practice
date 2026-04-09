import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const CONSENT_KEY = 'cookie_consent'

export function CookieBanner() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label={t('cookie.label')}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 md:px-8 md:py-5"
      style={{ background: 'rgba(46, 46, 46, 0.97)', backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[0.8rem] text-white/70 leading-relaxed max-w-2xl">
          {t('cookie.text')}{' '}
          <a
            href="mailto:elaine.teixeira.psy@gmail.com"
            className="underline text-white/90 hover:text-white transition-colors"
          >
            {t('cookie.learnMore')}
          </a>
        </p>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={reject}
            className="text-[0.75rem] font-medium tracking-[0.08em] uppercase px-4 py-2 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
          >
            {t('cookie.reject')}
          </button>
          <button
            onClick={accept}
            className="text-[0.75rem] font-medium tracking-[0.08em] uppercase px-4 py-2 rounded-full transition-all"
            style={{ background: 'var(--rose-deep)', color: 'white' }}
          >
            {t('cookie.accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
