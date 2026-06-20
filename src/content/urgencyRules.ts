// ---------------------------------------------------------------------------
// ILLUSTRATIVE, CONSERVATIVE heuristic — NOT a clinical triage engine.
// Produces a calm *urgency nudge*, never a diagnosis. For any real deployment
// these rules must be reviewed by a qualified clinician. (plan.md §14)
// ---------------------------------------------------------------------------

import type { Journey, UrgencyBand } from '../app/types'

const SEVERITY_ORDER = ['Barely', 'A little', 'Quite a bit', "It's hard to ignore"]

export function deriveUrgency(journey: Journey): UrgencyBand {
  const f = journey.followups ?? {}
  let score = 0

  const sev = SEVERITY_ORDER.indexOf(f.severity ?? '')
  if (sev >= 0) score += sev // 0..3

  if (f.change === 'Getting worse') score += 2
  else if (f.change === 'About the same') score += 1

  if (f.duration === 'A month or more') score += 1

  if (score >= 5) return 'today'
  if (score >= 3) return 'soon'
  return 'when-you-can'
}
