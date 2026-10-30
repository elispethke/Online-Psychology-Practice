import { type ReactNode } from 'react'

interface SectionTitleProps {
  label?: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  /** Peso tipográfico do momento: 'compact' para seções de apoio, 'large' para as que carregam mais conteúdo/importância. */
  scale?: 'compact' | 'default' | 'large'
  className?: string
}

const SCALE_SIZES: Record<NonNullable<SectionTitleProps['scale']>, string> = {
  compact: 'var(--fs-h2-sm)',
  default: 'var(--fs-h2-lg)',
  large: 'var(--fs-h2-lg)',
}

export function SectionTitle({
  label,
  title,
  subtitle,
  align = 'left',
  scale = 'default',
  className = '',
}: SectionTitleProps) {
  const isCenter = align === 'center'

  return (
    <div className={[isCenter ? 'text-center' : '', className].join(' ')}>
      {/* Rótulo (eyebrow) */}
      {label && (
        <div
          className={[
            'eyebrow mb-4',
            isCenter ? 'justify-center' : '',
          ].join(' ')}
        >
          {label}
        </div>
      )}

      {/* Título */}
      <h2
        className="font-display font-light text-ink leading-[1.08] tracking-[0.01em]"
        style={{ fontSize: SCALE_SIZES[scale] }}
      >
        {title}
      </h2>

      {/* Subtítulo opcional */}
      {subtitle && (
        <p
          className={[
            'text-ink-soft max-w-xl mt-5 leading-relaxed',
            isCenter ? 'mx-auto' : '',
          ].join(' ')}
          style={{ fontSize: '0.975rem' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
