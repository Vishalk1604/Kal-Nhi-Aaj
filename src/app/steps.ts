// ---------------------------------------------------------------------------
// Ordered step ids + the linear happy-path flow.
// Navigation is state-driven (no router): a `step` value chooses the screen.
// ---------------------------------------------------------------------------

export type StepId =
  | 'welcome'
  | 'motivation'
  | 'reflection'
  | 'concern'
  | 'followups'
  | 'understand'
  | 'reassure'
  | 'nextstep'
  | 'plan'
  | 'buddy'
  | 'confirmation'
  | 'followuplater'
  // branches (off the linear spine)
  | 'redflag'
  | 'notready'

// The core linear flow — Welcome → Follow-up later. The privacy promise now
// lives on the Welcome landing page (folded in), so it's no longer a step.
export const LINEAR_FLOW: StepId[] = [
  'welcome',
  'motivation',
  'reflection',
  'concern',
  'followups',
  'understand',
  'reassure',
  'nextstep',
  'plan',
  'buddy',
  'confirmation',
  'followuplater',
]

// Six emotional phases, used for the quiet progress cue.
export const PHASE_OF: Record<StepId, number> = {
  welcome: 1,
  motivation: 2,
  reflection: 2,
  concern: 3,
  followups: 3,
  understand: 4,
  reassure: 4,
  nextstep: 5,
  plan: 5,
  buddy: 5,
  confirmation: 6,
  followuplater: 6,
  redflag: 3,
  notready: 5,
}

export const PHASE_LABELS = ['Enter', 'Affirm', 'Share', 'Understand', 'Act', 'Follow up']
