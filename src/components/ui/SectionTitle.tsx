import { type ReactNode } from 'react'

interface SectionTitleProps {
  label: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({
  label,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionTitleProps) {
  const isCenter = align === 'center'

  return (
    <div className={[isCenter ? 'text-center' : '', className].join(' ')}>
      {/* Label with line */}
      <div
        className={[
          'flex items-center gap-2 text-2xs font-medium tracking-[0.22em] uppercase text-[var(--rose-mid)] mb-3',
          isCenter ? 'justify-center' : '',
        ].join(' ')}
      >
        {label}
        <span
          className="inline-block h-px bg-[var(--rose-mid)]"
          style={{ width: 32 }}
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h2
        className="font-display font-light text-ink leading-tight"
        style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)' }}
      >
        {title}
      </h2>

      {/* Divider */}
      <div
        className={[
          'my-5 h-[1.5px] rounded-full',
          'bg-gradient-to-r from-[var(--rose-deep)] to-[var(--rose-light)]',
          isCenter ? 'mx-auto' : '',
        ].join(' ')}
        style={{ width: 60 }}
        aria-hidden="true"
      />

      {/* Optional subtitle */}
      {subtitle && (
        <p
          className="text-ink-soft max-w-xl"
          style={{ fontSize: '0.975rem' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
