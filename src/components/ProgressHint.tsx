// ---------------------------------------------------------------------------
// ProgressHint — a calm sense of progress across the six phases, not a hard
// percentage bar. Six soft segments; the current phase glows terracotta.
// ---------------------------------------------------------------------------

import { motion } from 'framer-motion'
import { useJourney } from '../app/useJourney'
import { PHASE_OF, PHASE_LABELS } from '../app/steps'

export function ProgressHint({ showLabel = true }: { showLabel?: boolean }) {
  const { step } = useJourney()
  const phase = PHASE_OF[step] // 1..6

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {PHASE_LABELS.map((_, i) => {
          const n = i + 1
          const done = n < phase
          const active = n === phase
          return (
            <motion.span
              key={i}
              className="block h-1.5 rounded-full"
              animate={{
                width: active ? 22 : 8,
                backgroundColor: done
                  ? 'rgba(143,169,138,0.9)' // sage — behind you
                  : active
                    ? '#E0795A' // terracotta — here
                    : 'rgba(43,36,32,0.14)', // ahead
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            />
          )
        })}
      </div>
      {showLabel && (
        <span className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft">
          {PHASE_LABELS[phase - 1]}
        </span>
      )}
    </div>
  )
}
