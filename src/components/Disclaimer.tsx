// Reusable quiet footer line — privacy or "not a diagnosis". (plan.md §11)
import { Lock, Info } from 'lucide-react'

type Props = {
  variant?: 'privacy' | 'diagnosis'
  children?: React.ReactNode
  className?: string
}

export function Disclaimer({ variant = 'privacy', children, className = '' }: Props) {
  const Icon = variant === 'privacy' ? Lock : Info
  return (
    <p
      className={`flex items-start justify-center gap-1.5 text-center font-body text-caption text-ink-soft ${className}`}
    >
      <Icon size={14} strokeWidth={2.5} className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
