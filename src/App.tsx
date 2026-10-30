import { lazy, Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MotionConfig, motion, useScroll } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { Home } from '@/pages/Home'
import { NotFound } from '@/components/layout/NotFound'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { useScrolledPast } from '@/hooks/useScrolledPast'
import { useAnalyticsLoader } from '@/lib/analytics'
import { applySeo } from '@/lib/seo'
import { useRoute } from '@/lib/route'

// Code splitting: as páginas legais (~21 kB de texto) só são baixadas por quem as abre.
// A home NÃO é lazy: é a página de entrada, e adiar o que o visitante vai ver primeiro só pioraria o LCP.
const LegalPage = lazy(() => import('@/components/layout/LegalPage').then(m => ({ default: m.LegalPage })))

function ScrollProgress() {
  // useScroll devolve um MotionValue: a barra se atualiza FORA do ciclo do React (sem setState a cada
  // evento de scroll, portanto sem re-render). Antes era um useState + listener próprio.
  const { scrollYProgress } = useScroll()
  return <motion.div id="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
}

function BackToTop() {
  const { t } = useTranslation()
  const visible = useScrolledPast(400)

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('common.backToTop')}
      className={[
        'fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-8 sm:right-8 z-50 w-11 h-11 rounded-full',
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

/**
 * Decisão: o App é a "raiz de composição" e cuida só do que é transversal — sincronizar rota → idioma,
 * SEO, carregamento condicional do analytics e a política de movimento reduzido. A URL é a ÚNICA fonte
 * da verdade do idioma (compartilhável, indexável, funciona com o botão "voltar"); o estado do i18next
 * é derivado dela, nunca o contrário.
 */
export default function App() {
  const { t, i18n } = useTranslation()
  const route = useRoute()
  useAnalyticsLoader()

  useEffect(() => { if (i18n.language !== route.lang) void i18n.changeLanguage(route.lang) }, [route.lang, i18n])
  useEffect(() => { applySeo(route, t) }, [route, t, i18n.language])

  return (
    <MotionConfig reducedMotion="user">
      {route.page === 'home' && (
        <>
          <ScrollProgress />
          <Home />
          <BackToTop />
          <WhatsAppButton />
        </>
      )}
      {route.page === 'notfound' && <NotFound lang={route.lang} />}
      {(route.page === 'privacy' || route.page === 'imprint') && (
        // fallback null: o chunk é minúsculo e carrega em milissegundos; um spinner só piscaria.
        <ErrorBoundary>
          <Suspense fallback={null}>
            <LegalPage page={route.page} lang={route.lang} />
          </Suspense>
        </ErrorBoundary>
      )}
      <CookieBanner />
    </MotionConfig>
  )
}
