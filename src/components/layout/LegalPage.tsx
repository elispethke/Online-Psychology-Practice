import { Fragment } from 'react'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { Link } from '@/components/ui/Link'
import { LEGAL } from '@/config/legal'
import { DOCS, UI } from '@/legal/content'
import { openPreferences } from '@/lib/consent'
import { hrefFor, PATHS, type Lang, type Page } from '@/lib/route'

const LANG_NAMES: Record<Lang, string> = { pt: 'Português', en: 'English', de: 'Deutsch' }
const LOGO_LINES: Record<Lang, [string, string]> = { pt: ['Psicologia', 'entre Culturas'], en: ['Psychology', 'Across Cultures'], de: ['Psychology', 'Across Cultures'] }

/** Preenche os {{placeholders}} com src/config/legal.ts; o que estiver faltando vira um marcador visível de "pendente". */
function fill(text: string, lang: Lang): (string | JSX.Element)[] {
  const pending = UI[lang].pending
  const values: Record<string, string | null> = {
    name: LEGAL.name, email: LEGAL.email, address: LEGAL.address, title: LEGAL.professionalTitle,
    chamber: LEGAL.chamber, supervisory: LEGAL.supervisoryAuthority, vat: LEGAL.vatId,
    hosting: LEGAL.hostingProvider, mailbox: LEGAL.mailboxProvider,
    authority: `${LEGAL.authority.name}, ${LEGAL.authority.address}, ${LEGAL.authority.email}`,
  }
  return text.split(/(\{\{\w+\}\})/).map((part, i) => {
    const m = part.match(/^\{\{(\w+)\}\}$/)
    if (!m) return part
    const v = values[m[1]]
    if (v) return m[1] === 'email' ? <a key={i} href={`mailto:${v}`} className="underline underline-offset-4">{v}</a> : v
    return <mark key={i} data-pending={m[1]} className="rounded-sm bg-[var(--sand)] px-1.5 py-0.5 text-[var(--forest)]">{pending}</mark>
  })
}

export function LegalPage({ page, lang }: { page: Exclude<Page, 'home'>; lang: Lang }) {
  const doc = DOCS[page][lang]
  const ui = UI[lang]
  const [line1, line2] = LOGO_LINES[lang]

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--forest)]">
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto flex items-center justify-between gap-6 px-[var(--gutter)] py-4" style={{ maxWidth: 'var(--content-w)' }}>
          <Link href={hrefFor('home', lang === 'en' ? 'en' : 'pt')} aria-label={ui.back} className="shrink-0">
            <BrandLogo subtitleTop={line1} subtitleBottom={line2} className="[--u:0.27px] sm:[--u:0.3229px]" />
          </Link>
          <nav aria-label={ui.other} className="flex items-center gap-1 text-[0.72rem] font-medium tracking-[0.16em]">
            {(Object.keys(PATHS[page]) as Lang[]).map((l, i) => (
              <Fragment key={l}>
                {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-[var(--border-soft)]" />}
                <Link
                  href={hrefFor(page, l)}
                  lang={l}
                  hrefLang={l}
                  aria-current={l === lang ? 'true' : undefined}
                  className={['px-2 py-1 uppercase', l === lang ? 'underline decoration-[var(--gold)] decoration-2 underline-offset-[7px]' : 'text-ink-faint hover:text-[var(--forest)]'].join(' ')}
                  aria-label={LANG_NAMES[l]}
                >
                  {l}
                </Link>
              </Fragment>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto px-[var(--gutter)] py-14 sm:py-20" style={{ maxWidth: '52rem' }}>
        <Link href={hrefFor('home', lang === 'en' ? 'en' : 'pt')} className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-soft hover:text-[var(--forest)]">
          ← {ui.back}
        </Link>
        <h1 className="mt-8 font-display font-light leading-[1.05]" style={{ fontSize: 'clamp(2.3rem, 5vw, 3.6rem)' }}>{doc.title}</h1>
        <p className="mt-5 text-[1rem] leading-relaxed text-ink-soft">{doc.lead}</p>
        <p className="mt-2 text-[0.8rem] text-ink-faint">{ui.updated}: {LEGAL.updated} · {ui.reviewNote}</p>

        {doc.sections.map(s => (
          <section key={s.h} className="mt-12">
            <h2 className="font-display text-[1.6rem] font-normal leading-tight">{s.h}</h2>
            {s.p?.map((para, i) => <p key={i} className="mt-4 text-[0.97rem] leading-[1.8] text-ink-soft">{fill(para, lang)}</p>)}
            {s.list && (
              <ul className="mt-4 list-disc space-y-2 pl-6 text-[0.97rem] leading-[1.8] text-ink-soft">
                {s.list.map(item => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}

        {page === 'privacy' && (
          <p className="mt-12">
            <button type="button" onClick={openPreferences} className="text-[0.78rem] font-medium uppercase tracking-[0.16em] underline decoration-[var(--gold)] underline-offset-[6px] hover:text-[var(--sage)]">
              {ui.cookieSettings}
            </button>
          </p>
        )}
      </main>
    </div>
  )
}
