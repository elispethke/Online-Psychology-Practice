import { type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'light' | 'ghost'

interface ButtonProps {
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  fullWidth?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  'aria-label'?: string
}

const BASE =
  'inline-flex items-center gap-2.5 font-body text-[0.72rem] font-medium tracking-[0.16em] uppercase cursor-pointer rounded-sm transition-all duration-300 no-underline'

const VARIANTS: Record<ButtonVariant, string> = {
  /** Verde sólido — chamada para ação padrão em fundos claros */
  primary:
    'bg-[var(--forest)] text-[var(--surface)] px-7 py-3.5 border border-[var(--forest)] hover:bg-[var(--sage)] hover:border-[var(--sage)]',
  /** Linha fina — ação secundária em fundos claros */
  outline:
    'bg-transparent text-[var(--forest)] px-7 py-3.5 border border-[var(--forest)] hover:bg-[var(--forest)] hover:text-[var(--surface)]',
  /** Linha fina para fundos escuros / fotográficos */
  light:
    'bg-[color-mix(in_srgb,var(--forest)_28%,transparent)] backdrop-blur-sm text-[var(--surface)] px-7 py-3.5 border border-[var(--surface)] hover:bg-[var(--surface)] hover:text-[var(--forest)]',
  ghost:
    'bg-transparent text-[var(--forest)] px-0 py-1 hover:text-[var(--sage)]',
}

function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  )
}

export function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  fullWidth = false,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = [
    BASE,
    VARIANTS[variant],
    fullWidth ? 'w-full justify-center' : '',
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    'group',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
        {variant !== 'ghost' && <Arrow />}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={ariaLabel}>
      {children}
      {variant !== 'ghost' && <Arrow />}
    </button>
  )
}
