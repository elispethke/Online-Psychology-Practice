import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { NAV_ITEMS } from '@/constants/navigation'
import { Mail, Linkedin, MapPin } from 'lucide-react'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-ink text-white/70" style={{ paddingTop: 'clamp(4rem, 8vw, 6.5rem)', paddingBottom: '2rem' }}>
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Closing wordmark — the last authorial moment on the page */}
        <p
          className="font-display font-light text-white leading-[0.95] mb-3"
          style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)', letterSpacing: '0.005em' }}
        >
          Elaine Teixeira
        </p>
        <p className="text-2xs font-medium tracking-[0.22em] uppercase mb-16" style={{ color: 'var(--rose-mid)' }}>
          {t('footer.subtitle')}
        </p>

        {/* Grid */}
        <div
          className="grid gap-10 pb-10 border-b border-white/[0.08]"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
        >
          {/* Description */}
          <div>
            <p className="text-[0.82rem] leading-relaxed text-white/50 max-w-[32ch]">
              {t('footer.description')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-2xs font-medium tracking-[0.16em] uppercase mb-5 text-white/40">
              {t('footer.navTitle')}
            </p>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-[0.83rem] text-white/60 transition-colors duration-200 hover:text-[var(--rose-light)]"
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-2xs font-medium tracking-[0.16em] uppercase mb-5 text-white/40">
              {t('footer.contactTitle')}
            </p>
            <ul className="flex flex-col gap-3 list-none p-0 m-0 mb-6">
              <li>
                <a
                  href="mailto:elaine.teixeira.psy@gmail.com"
                  className="inline-flex items-center gap-2 text-[0.83rem] text-white/60 transition-colors hover:text-[var(--rose-light)]"
                >
                  <Mail className="w-[14px] h-[14px] shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  elaine.teixeira.psy@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/elaine-teixeira-20a90459/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.83rem] text-white/60 transition-colors hover:text-[var(--rose-light)]"
                >
                  <Linkedin className="w-[14px] h-[14px] shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2 text-[0.83rem] text-white/40">
                  <MapPin className="w-[14px] h-[14px] shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  Berlim, Alemanha
                </span>
              </li>
            </ul>

            <Button
              href="#contact"
              variant="outline"
              className="!border-white/20 !text-white/70 hover:!bg-white/10 hover:!text-white text-[0.72rem]"
            >
              {t('footer.cta')}
            </Button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap justify-between items-center gap-3 pt-6">
          <p
            className="text-[0.75rem]"
            style={{ color: 'rgba(248, 242, 242, 0.59)' }}
          >
            {t('footer.copyright')}
          </p>
          <p
            className="text-[0.7rem]"
            style={{ color: 'rgba(248, 242, 242, 0.59)' }}
          >
            {t('footer.legal')}
          </p>
          <p
            className="text-[0.7rem]"
            style={{ color: 'rgba(248, 242, 242, 0.59)' }}
          >
            {t('footer.dev')}
          </p>
        </div>
      </div>
    </footer>
  )
}
