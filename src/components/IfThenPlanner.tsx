// ---------------------------------------------------------------------------
// IfThenPlanner — pick a cue you already do, then a time. This is the
// implementation-intention mechanic (Gollwitzer): cue-linked plans convert
// intention into action. (plan.md §9 · 10.4)
// ---------------------------------------------------------------------------

import { copy } from '../content/copy.en'
import { ChipSelect } from './ChipSelect'

const TIMES = ['7:00 AM', '9:15 AM', '12:30 PM', '6:00 PM', '8:30 PM']

type Props = {
  cue?: string
  time?: string
  onCue: (cue: string) => void
  onTime: (time: string) => void
}

export function IfThenPlanner({ cue, time, onCue, onTime }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-display text-[17px] font-bold text-ink">{copy.plan.cueHeading}</h3>
        <ChipSelect stacked options={copy.plan.cues} value={cue} onChange={onCue} />
      </div>

      <div>
        <h3 className="mb-3 font-display text-[17px] font-bold text-ink">{copy.plan.timeHeading}</h3>
        <ChipSelect options={TIMES} value={time} onChange={onTime} />
      </div>
    </div>
  )
}
