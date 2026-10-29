import { useEffect } from 'react'
import { useConsent } from '@/lib/consent'
import { PLAUSIBLE_DOMAIN } from '@/config/site'

const SCRIPT_ID = 'plausible-analytics'

/**
 * Plausible is only requested after the visitor opted in to "Statistics". Before that no request
 * leaves the browser for this tool. Withdrawing consent removes the script; the visitor is
 * told in the preferences dialog that already-loaded code stops with the next page load.
 */
export function useAnalyticsLoader() {
  const consent = useConsent()
  const allowed = !!consent?.analytics

  useEffect(() => {
    const existing = document.getElementById(SCRIPT_ID)
    if (!allowed) { existing?.remove(); return }
    if (existing) return
    const s = document.createElement('script')
    s.id = SCRIPT_ID
    s.defer = true
    s.dataset.domain = PLAUSIBLE_DOMAIN
    s.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(s)
  }, [allowed])
}
