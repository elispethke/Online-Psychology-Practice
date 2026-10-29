import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  featured?: boolean
  /** data-badge attribute for featured ribbon */
  badge?: string
  onClick?: () => void
}

export function Card({
  children,
  className = '',
  featured = false,
  badge,
  onClick,
}: CardProps) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick()
          : undefined
      }
      data-badge={badge}
      className={[
        'relative rounded-sm border transition-all duration-300',
        'hover:-translate-y-0.5 hover:shadow-sm',
        featured
          ? 'border-[var(--gold)] bg-gradient-to-b from-[var(--surface)] to-[var(--paper)]'
          : 'border-[var(--border)] bg-[var(--surface)]',
        featured && badge ? 'price-ribbon overflow-hidden' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}

/**
 * Service / feature card variant with icon slot
 */
interface ServiceCardProps {
  icon: string
  title: string
  description: string
  className?: string
}

export function ServiceCard({ icon, title, description, className = '' }: ServiceCardProps) {
  return (
    <Card className={['p-7', className].join(' ')}>
      <div
        className="w-11 h-11 rounded-sm flex items-center justify-center text-xl mb-4"
        style={{
          background: 'var(--paper)',
          border: '1px solid var(--border)',
        }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <h4 className="font-display text-[1.05rem] font-medium text-ink mb-2">
        {title}
      </h4>
      <p className="text-ink-soft" style={{ fontSize: '0.88rem' }}>
        {description}
      </p>
    </Card>
  )
}
