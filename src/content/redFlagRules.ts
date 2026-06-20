// ---------------------------------------------------------------------------
// ILLUSTRATIVE, CONSERVATIVE heuristic — NOT clinical triage.
// When uncertain, the product escalates to "see someone" rather than reassures.
// These placeholder rules MUST be reviewed by a clinician before real use.
// (plan.md §10 branch · Red flag, §14)
// ---------------------------------------------------------------------------

import type { Journey } from '../app/types'

export function evaluateRedFlag(journey: Journey): boolean {
  const f = journey.followups ?? {}

  const sudden = f.duration === 'Just today'
  const severe = f.severity === "It's hard to ignore"
  const worsening = f.change === 'Getting worse'

  // Illustrative trigger: something sudden, severe AND getting worse warrants
  // prompt, in-person attention — not an in-app guess.
  return Boolean(sudden && severe && worsening)
}
