// ---------------------------------------------------------------------------
// Flow logic: next()/back() + branch routing. Pure functions over (step, journey)
// so navigation stays testable and the provider stays thin.
// ---------------------------------------------------------------------------

import type { Journey } from './types'
import { LINEAR_FLOW, type StepId } from './steps'

/** Where does this step return to when the user taps "back"? */
const BACK_OVERRIDES: Partial<Record<StepId, StepId>> = {
  // Branches return to the screen that launched them.
  redflag: 'followups',
  notready: 'nextstep',
}

/** Advance along the happy path, honouring branch conditions. */
export function nextStep(current: StepId, journey: Journey): StepId {
  // Red-flag fires out of the follow-ups (illustrative, conservative).
  if (current === 'followups' && journey.redFlag) {
    return 'redflag'
  }

  const i = LINEAR_FLOW.indexOf(current)
  if (i === -1) {
    // On a branch — rejoin the spine sensibly.
    if (current === 'redflag') return 'nextstep'
    if (current === 'notready') return 'followuplater'
    return current
  }
  if (i >= LINEAR_FLOW.length - 1) return current // end of flow
  return LINEAR_FLOW[i + 1]
}

/** Step back along the happy path, honouring branch origins. */
export function prevStep(current: StepId): StepId {
  if (BACK_OVERRIDES[current]) return BACK_OVERRIDES[current] as StepId

  const i = LINEAR_FLOW.indexOf(current)
  if (i <= 0) return current // at the start, or unknown
  return LINEAR_FLOW[i - 1]
}

/** Can the user go back from here? (Welcome is the floor.) */
export function canGoBack(current: StepId): boolean {
  return current !== 'welcome'
}
