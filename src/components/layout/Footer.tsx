import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { NAV_ITEMS } from '@/constants/navigation'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-ink text-white/70 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Grid */}
        <div
          className="grid gap-10 pb-10 border-b border-white/[0.08]"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
        >
          {/* Brand */}
          <div>
            <p className="font-display text-[1.4rem] font-normal text-white tracking-[0.04em] mb-1">
              Elaine Teixeira
            </p>
            <p className="text-2xs font-medium tracking-[0.14em] uppercase mb-4 text-rose-mid">
              {t('footer.subtitle')}
            </p>
            <p className="text-[0.82rem] leading-relaxed text-white/50">
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
                  className="text-[0.83rem] text-white/60 transition-colors hover:text-[var(--rose-light)]"
                >
                  ✉ elaine.teixeira.psy@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/elaine-teixeira-psy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.83rem] text-white/60 transition-colors hover:text-[var(--rose-light)]"
                >
                  🔗 LinkedIn
                </a>
              </li>
              <li>
                <span className="text-[0.83rem] text-white/40">
                  📍 Berlim, Alemanha
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
