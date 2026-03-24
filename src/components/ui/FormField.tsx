import { type ReactNode } from 'react'

interface FormFieldProps {
  label: string
  children: ReactNode
}

export function FormField({ label, children }: FormFieldProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-[0.73rem] font-medium tracking-[0.1em] uppercase text-ink-soft'>
        {label}
      </label>
      {children}
    </div>
  )
}
