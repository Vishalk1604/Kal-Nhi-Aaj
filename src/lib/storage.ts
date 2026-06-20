// ---------------------------------------------------------------------------
// Safe localStorage read/write. Everything stays on-device — nothing is
// uploaded, ever. Guards against private-mode / quota / parse failures so a
// storage hiccup never breaks the flow.
// ---------------------------------------------------------------------------

import { emptyJourney, type Journey } from '../app/types'

export const STORAGE_KEY = 'kna.journey.v1'

export function loadJourney(): Journey {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...emptyJourney }
    const parsed = JSON.parse(raw) as Journey
    if (!parsed || parsed.version !== 1) return { ...emptyJourney }
    return { ...emptyJourney, ...parsed }
  } catch {
    return { ...emptyJourney }
  }
}

export function saveJourney(journey: Journey): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(journey))
  } catch {
    // Quota or private mode — fail quietly; the in-memory flow keeps working.
  }
}

export function clearJourney(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
