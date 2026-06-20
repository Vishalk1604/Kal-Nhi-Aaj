// ---------------------------------------------------------------------------
// Data model — a single `journey` object, persisted to localStorage.
// See plan.md §7. Keep this the single source of truth for shapes.
// ---------------------------------------------------------------------------

export type MotivationType = 'kids' | 'parents' | 'partner' | 'work' | 'self' | 'other'

export type Motivation = {
  type: MotivationType
  label: string // e.g. "my kids"
  avatarId?: string // if they chose an illustrated avatar
  photoDataUrl?: string // if they uploaded a photo (downscaled) — Phase 2
}

export type Concern = {
  area?: string
  text?: string
  mood?: string
}

export type Followups = {
  duration?: string
  severity?: string
  [k: string]: string | undefined
}

export type UrgencyBand = 'when-you-can' | 'soon' | 'today'

export type ChosenStep = 'teleconsult' | 'nearest' | 'callback' | null

export type Plan = {
  cue?: string
  time?: string
  reminderSet?: boolean
}

export type JourneyStatus = 'planned' | 'completed' | 'rescheduling' | null

export type HistoryEntry = {
  date: string
  concernSummary: string
  status: string
}

// Care circle — loved ones you're staying well for, stored ON-DEVICE only.
// Connection happens via opt-in share links; nothing is uploaded. `status` is
// a local/demo value today — a future backend would sync real check-in status
// (see plan: "Deferred to backend").
export type CareRelation = 'parent' | 'partner' | 'friend' | 'sibling' | 'child' | 'other'

export type CareContactStatus = 'none' | 'nudged' | 'checked-in'

export type CareContact = {
  id: string
  name: string
  relation: CareRelation
  avatarColor?: string // hex, reused from the avatar palette
  lastNudged?: string // ISO
  status?: CareContactStatus
  lastCheckIn?: string // ISO — populated by a future backend sync
}

export type Journey = {
  version: 1
  visitedBefore: boolean
  lastVisit?: string // ISO date
  lastConcernSummary?: string // e.g. "your sleep"
  motivation?: Motivation
  concern?: Concern
  followups?: Followups
  urgencyBand?: UrgencyBand
  redFlag?: boolean
  chosenStep?: ChosenStep
  plan?: Plan
  buddyShared?: boolean
  careCircle?: CareContact[]
  status?: JourneyStatus
  history?: HistoryEntry[]
}

export const emptyJourney: Journey = {
  version: 1,
  visitedBefore: false,
}
