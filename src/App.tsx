import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MotionConfig } from 'motion/react'
import { LegalPage } from '@/components/layout/LegalPage'
import { useAnalyticsLoader } from '@/lib/analytics'
import { applySeo } from '@/lib/seo'
import { useRoute } from '@/lib/route'
import { ArrowUp } from 'lucide-react'
import { Home } from './pages/Home'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'

function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      setWidth(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      id="scroll-progress"
      style={{ width: `${width}%` }}
      aria-hidden="true"
    />
  )
}

function BackToTop() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('common.backToTop')}
      className={[
        'fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full',
        'bg-[var(--forest)] text-[var(--surface)] flex items-center justify-center',
        'shadow-md transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-lg',
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >
      <ArrowUp size={18} strokeWidth={1.75} />
    </button>
  )
}

export default function App() {
  const { t, i18n } = useTranslation()
  const route = useRoute()
  useAnalyticsLoader()

  // The URL is the single source of truth for the language ("/" = pt, "/en" = en, "/de/..." = legal pages in German).
  useEffect(() => { if (i18n.language !== route.lang) void i18n.changeLanguage(route.lang) }, [route.lang, i18n])
  useEffect(() => { applySeo(route, t) }, [route, t, i18n.language])

  return (
    <MotionConfig reducedMotion="user">
      {route.page === 'home' ? (
        <>
          <ScrollProgress />
          <Home />
          <BackToTop />
          <WhatsAppButton />
        </>
      ) : (
        <LegalPage page={route.page} lang={route.lang} />
      )}
      <CookieBanner />
    </MotionConfig>
  )
}
