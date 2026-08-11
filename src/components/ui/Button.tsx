import { type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'ghost'

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
  'inline-flex items-center gap-2.5 font-body text-[0.72rem] font-medium tracking-[0.14em] uppercase cursor-pointer rounded-sm transition-all duration-300 no-underline'

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--rose-deep)] text-white px-7 py-3 hover:bg-[#8a3a49]',
  outline:
    'bg-transparent text-[var(--ink)] px-7 py-3 border border-[var(--ink)]/25 hover:border-[var(--rose-deep)] hover:text-[var(--rose-deep)]',
  ghost:
    'bg-transparent text-[var(--rose-deep)] px-0 py-1 hover:text-[#8a3a49]',
}

function Arrow() {
  return (
    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
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
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
      {variant !== 'ghost' && <Arrow />}
    </button>
  )
}
