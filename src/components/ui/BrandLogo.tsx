import mark from '@/assets/brand/logo-mark.webp'
import name from '@/assets/brand/logo-name.webp'
import ornament from '@/assets/brand/logo-ornament.webp'

interface BrandLogoProps {
  /** First subtitle line, under the name (gold) — follows the active language */
  subtitleTop: string
  /** Second subtitle line (green) — follows the active language */
  subtitleBottom: string
  className?: string
}

/**
 * The official horizontal logo, assembled from the unmodified pixels of the identity
 * board: emblem + divider, "Elaine Teixeira" and the closing ornament are the original
 * artwork. The two subtitle lines are the only live text so they can follow the site
 * language — the board ships a single (English) version of the logo.
 *
 * Everything is laid out in the logo's own 510 × 192 coordinate space and scaled by
 * the `--u` custom property (CSS px per logo unit), so the proportions never drift.
 * Set `--u` on the element or an ancestor, e.g. `[--u:0.3229px]` for a 62px-tall logo.
 */
export function BrandLogo({ subtitleTop, subtitleBottom, className = '' }: BrandLogoProps) {
  const u = (n: number) => `calc(var(--u) * ${n})`

  return (
    <span
      className={['relative block shrink-0', className].join(' ')}
      style={{ width: u(510), height: u(192) }}
    >
      <img src={mark} alt="" aria-hidden="true" draggable={false} className="logo-piece" style={{ left: 0, top: 0, width: u(170), height: u(192) }} />
      <img src={name} alt="" aria-hidden="true" draggable={false} className="logo-piece" style={{ left: u(180), top: u(30), width: u(315), height: u(62) }} />

      <span
        className="absolute flex items-center whitespace-nowrap font-body uppercase text-[var(--gold)]"
        style={{ left: u(184), top: u(100), width: u(305), height: u(23), gap: u(14), fontSize: u(17), fontWeight: 300, letterSpacing: '0.36em' }}
      >
        <span aria-hidden="true" className="h-px flex-1 bg-[var(--gold)]" />
        <span className="-mr-[0.36em]">{subtitleTop}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-[var(--gold)]" />
      </span>

      <span
        className="absolute flex items-center justify-center whitespace-nowrap font-body uppercase text-[var(--forest)]"
        style={{ left: u(184), top: u(132), width: u(305), height: u(22), fontSize: u(14), fontWeight: 400, letterSpacing: '0.38em' }}
      >
        <span className="-mr-[0.38em]">{subtitleBottom}</span>
      </span>

      <img src={ornament} alt="" aria-hidden="true" draggable={false} className="logo-piece" style={{ left: u(180), top: u(156), width: u(315), height: u(32) }} />
    </span>
  )
}
