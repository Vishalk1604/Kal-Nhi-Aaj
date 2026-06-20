// ---------------------------------------------------------------------------
// ChipSelect — pill chips, single or multi-select, with a smooth fill.
// ---------------------------------------------------------------------------

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

type Props = {
  options: readonly string[]
  value?: string | string[]
  onChange: (option: string) => void
  multi?: boolean
  /** Stack as full-width rows (nicer for one-question-at-a-time answers). */
  stacked?: boolean
  className?: string
}

export function ChipSelect({ options, value, onChange, multi = false, stacked = false, className = '' }: Props) {
  const isSelected = (opt: string) =>
    multi ? Array.isArray(value) && value.includes(opt) : value === opt

  return (
    <div
      role={multi ? 'group' : 'radiogroup'}
      className={[stacked ? 'flex flex-col gap-2.5' : 'flex flex-wrap gap-2.5', className].join(' ')}
    >
      {options.map((opt) => {
        const selected = isSelected(opt)
        return (
          <motion.button
            key={opt}
            type="button"
            role={multi ? 'checkbox' : 'radio'}
            aria-checked={selected}
            onClick={() => onChange(opt)}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className={[
              'inline-flex min-h-[48px] items-center gap-2 rounded-chip px-5 py-2.5',
              'font-body text-body font-bold transition-colors',
              stacked ? 'w-full justify-between text-left' : 'justify-center',
              selected
                ? 'bg-terracotta text-surface shadow-chip'
                : 'border border-line bg-surface text-ink hover:bg-peach/40',
            ].join(' ')}
          >
            <span>{opt}</span>
            {selected && <Check size={18} strokeWidth={3} className="shrink-0" />}
          </motion.button>
        )
      })}
    </div>
  )
}
