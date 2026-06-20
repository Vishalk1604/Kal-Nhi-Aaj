// ---------------------------------------------------------------------------
// NextStepCard — one handoff option: icon, what it is, and the cost up front
// (so money is never the hidden barrier). Selectable; never a dead end.
// ---------------------------------------------------------------------------

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { NextStepOption } from '../content/nextSteps'

const COST_TONE: Record<NextStepOption['costTone'], { bg: string; fg: string }> = {
  free: { bg: 'rgba(143,169,138,0.18)', fg: '#5E7A59' },
  low: { bg: 'rgba(224,121,90,0.16)', fg: '#B9512F' },
  scheme: { bg: 'rgba(247,223,203,0.7)', fg: '#B9512F' },
}

type Props = {
  option: NextStepOption
  selected: boolean
  onSelect: () => void
}

export function NextStepCard({ option, selected, onSelect }: Props) {
  const { Icon } = option
  const tone = COST_TONE[option.costTone]

  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className={[
        'flex w-full items-center gap-4 rounded-card border p-4 text-left transition-colors',
        selected ? 'border-terracotta bg-peach/40 shadow-soft' : 'border-line bg-surface hover:bg-peach/20',
      ].join(' ')}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-terracotta/12 text-terracotta-d">
        <Icon size={24} strokeWidth={2.2} aria-hidden="true" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="font-display text-[17px] font-bold text-ink">{option.title}</span>
        </span>
        <span className="mt-0.5 block font-body text-caption text-ink-soft">{option.detail}</span>
        <span
          className="mt-2 inline-block rounded-chip px-2.5 py-1 font-body text-[12px] font-bold"
          style={{ backgroundColor: tone.bg, color: tone.fg }}
        >
          {option.cost}
        </span>
      </span>

      <span
        className={[
          'grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors',
          selected ? 'border-terracotta bg-terracotta text-surface' : 'border-line',
        ].join(' ')}
        aria-hidden="true"
      >
        {selected && <Check size={14} strokeWidth={3} />}
      </span>
    </motion.button>
  )
}
