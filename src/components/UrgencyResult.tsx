// ---------------------------------------------------------------------------
// UrgencyResult — a calm, calibrated read of *urgency* (never a diagnosis).
// Three gentle bands shown as a soft gauge; the derived band glows. Threat is
// deliberately moderate — high fear backfires. (plan.md §10 · 07 Understand)
// ---------------------------------------------------------------------------

import { motion } from 'framer-motion'
import type { UrgencyBand } from '../app/types'
import { copy } from '../content/copy.en'
import { Disclaimer } from './Disclaimer'

const ORDER: UrgencyBand[] = ['when-you-can', 'soon', 'today']

const META: Record<UrgencyBand, { tint: string; ink: string; bar: string }> = {
  'when-you-can': { tint: 'rgba(143,169,138,0.16)', ink: '#5E7A59', bar: '#8FA98A' },
  soon: { tint: 'rgba(224,121,90,0.14)', ink: '#B9512F', bar: '#E0795A' },
  today: { tint: 'rgba(185,81,47,0.14)', ink: '#B9512F', bar: '#B9512F' },
}

export function UrgencyResult({ band }: { band: UrgencyBand }) {
  const bands = copy.understand.bands
  const active = bands[band]
  const meta = META[band]
  const activeIndex = ORDER.indexOf(band)

  return (
    <div className="rounded-card border border-line bg-surface/90 p-6 shadow-soft backdrop-blur-sm">
      {/* soft 3-segment gauge */}
      <div className="mb-5 flex gap-1.5" aria-hidden="true">
        {ORDER.map((b, i) => (
          <motion.span
            key={b}
            className="h-2 flex-1 rounded-full"
            initial={{ opacity: 0.4 }}
            animate={{
              opacity: 1,
              backgroundColor: i <= activeIndex ? META[b].bar : 'rgba(43,36,32,0.10)',
            }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
          />
        ))}
      </div>

      <span
        className="inline-block rounded-chip px-3 py-1 font-body text-caption font-bold"
        style={{ backgroundColor: meta.tint, color: meta.ink }}
      >
        Your read
      </span>

      <h2 className="mt-3 font-display text-h2" style={{ color: meta.ink }}>
        {active.label}
      </h2>
      <p className="mt-2 font-body text-body text-ink-soft">{active.why}</p>

      <div className="mt-5 border-t border-line pt-4">
        <Disclaimer variant="diagnosis">{copy.understand.disclaimer}</Disclaimer>
      </div>
    </div>
  )
}
