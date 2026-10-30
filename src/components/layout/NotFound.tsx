import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { hrefFor, type Lang } from '@/lib/paths'

/** Página 404 de verdade (client-side). O `applySeo` marca como noindex; ver também `parseRoute`. */
export function NotFound({ lang }: { lang: Lang }) {
  const { t } = useTranslation()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--surface)] px-6 text-center text-[var(--forest)]">
      <p className="eyebrow">404</p>
      <h1 className="font-display text-4xl font-light sm:text-5xl">{t('notFound.title')}</h1>
      <p className="max-w-md text-[0.95rem] text-ink-soft">{t('notFound.text')}</p>
      <Button href={hrefFor('home', lang === 'en' ? 'en' : 'pt')}>{t('notFound.back')}</Button>
    </main>
  )
}
