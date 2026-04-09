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
  'inline-flex items-center gap-2 font-body text-xs font-medium tracking-widest uppercase cursor-pointer rounded-full transition-all duration-300 no-underline'

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--rose-deep)] text-white px-8 py-3.5 shadow-rose hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#8a3a49]',
  outline:
    'bg-transparent text-[var(--rose-deep)] px-8 py-3.5 border border-[var(--rose-deep)] hover:bg-[var(--rose-deep)] hover:text-white hover:-translate-y-0.5',
  ghost:
    'bg-transparent text-[var(--rose-deep)] px-8 py-3.5 hover:text-[#8a3a49]',
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
        {variant === 'primary' && <Arrow />}
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
      {variant === 'primary' && <Arrow />}
    </button>
  )
}
