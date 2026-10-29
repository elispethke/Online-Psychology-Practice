import { useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@/components/ui/Link'
import { closePreferences, setConsent, useConsent, usePreferencesOpen } from '@/lib/consent'
import { hrefFor } from '@/lib/route'

/**
 * Consent UI. Findings of the audit: the site itself sets no cookies; the only optional processing is
 * Plausible audience measurement (loaded only after opt-in, see lib/analytics.ts). So there are exactly two
 * categories — Necessary (always on, not selectable) and Statistics (off until the visitor chooses).
 * "Accept" and "Decline" are identical in size, weight and position (DSK "OH Digitale Dienste", Rn. 134–136).
 */
export function CookieBanner() {
  const { t, i18n } = useTranslation()
  const consent = useConsent()
  const reopened = usePreferencesOpen()
  const [detail, setDetail] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  const open = consent === null || reopened

  useEffect(() => { if (open) { setAnalytics(consent?.analytics ?? false); setDetail(reopened) } }, [open, reopened, consent])
  useEffect(() => { if (open) panelRef.current?.focus() }, [open])
  useEffect(() => {
    if (!open || consent === null) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closePreferences()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, consent])

  if (!open) return null

  const btn = 'min-h-11 flex-1 rounded-sm border border-[var(--surface)] px-5 py-3 text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors sm:flex-none'
  const privacyHref = hrefFor('privacy', i18n.language === 'en' ? 'en' : 'pt')

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 z-[60] px-4 py-5 outline-none md:px-8"
      style={{ background: 'var(--forest)', color: 'var(--on-dark)', boxShadow: '0 -8px 32px color-mix(in srgb, var(--forest) 30%, transparent)' }}
    >
      <div className="mx-auto max-w-[1200px]">
        <h2 id={titleId} className="font-display text-[1.35rem] font-normal">{t('cookie.title')}</h2>
        <p className="mt-2 max-w-3xl text-[0.82rem] leading-relaxed text-[var(--on-dark-soft)]">
          {t('cookie.text')}{' '}
          <Link href={privacyHref} className="underline underline-offset-4 hover:text-[var(--gold)]">{t('cookie.privacyLink')}</Link>
        </p>

        {detail && (
          <div className="mt-4 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="rounded-sm border border-[var(--on-dark-soft)] p-4">
              <p className="text-[0.82rem] font-medium">{t('cookie.necessaryTitle')} <span className="text-[var(--gold)]">· {t('cookie.alwaysOn')}</span></p>
              <p className="mt-1 text-[0.78rem] leading-relaxed text-[var(--on-dark-soft)]">{t('cookie.necessaryDesc')}</p>
            </div>
            <label className="flex cursor-pointer gap-3 rounded-sm border border-[var(--on-dark-soft)] p-4">
              <input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} className="mt-1 size-4 shrink-0 accent-[var(--gold)]" />
              <span>
                <span className="block text-[0.82rem] font-medium">{t('cookie.analyticsTitle')}</span>
                <span className="mt-1 block text-[0.78rem] leading-relaxed text-[var(--on-dark-soft)]">{t('cookie.analyticsDesc')}</span>
              </span>
            </label>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={() => setConsent(false)} className={`${btn} bg-[var(--surface)] text-[var(--forest)] hover:bg-[var(--sand)]`}>{t('cookie.rejectAll')}</button>
          <button type="button" onClick={() => setConsent(true)} className={`${btn} bg-[var(--surface)] text-[var(--forest)] hover:bg-[var(--sand)]`}>{t('cookie.acceptAll')}</button>
          {detail ? (
            <button type="button" onClick={() => setConsent(analytics)} className={`${btn} bg-transparent text-[var(--on-dark)] hover:bg-[var(--surface)] hover:text-[var(--forest)]`}>{t('cookie.save')}</button>
          ) : (
            <button type="button" onClick={() => setDetail(true)} aria-expanded={detail} className={`${btn} bg-transparent text-[var(--on-dark)] hover:bg-[var(--surface)] hover:text-[var(--forest)]`}>{t('cookie.settings')}</button>
          )}
        </div>
      </div>
    </div>
  )
}
