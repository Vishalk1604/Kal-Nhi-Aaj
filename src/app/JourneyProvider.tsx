// ---------------------------------------------------------------------------
// JourneyProvider — context + reducer + localStorage sync.
//
// State has two parts:
//   • journey — the persisted data model (saved to localStorage on change)
//   • step    — runtime navigation; resets to "welcome" each load (Phase 1)
// `direction` (+1 forward / -1 back) drives the AnimatePresence slide.
// ---------------------------------------------------------------------------

import {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import type { Journey } from './types'
import { LINEAR_FLOW, type StepId } from './steps'
import { nextStep, prevStep } from './screenMachine'
import { loadJourney, saveJourney } from '../lib/storage'

type State = {
  journey: Journey
  step: StepId
  direction: number
}

type Action =
  | { type: 'patch'; payload: Partial<Journey> }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'goTo'; payload: StepId }
  | { type: 'reset' }

/** Shallow-merge, but merge one level deep for plain-object fields
 *  (motivation, concern, followups, plan) so partial updates accumulate. */
function mergeJourney(prev: Journey, patch: Partial<Journey>): Journey {
  const out: Record<string, unknown> = { ...prev }
  for (const key of Object.keys(patch) as Array<keyof Journey>) {
    const val = patch[key]
    const existing = prev[key]
    const bothPlainObjects =
      val && typeof val === 'object' && !Array.isArray(val) &&
      existing && typeof existing === 'object' && !Array.isArray(existing)
    out[key] = bothPlainObjects ? { ...(existing as object), ...(val as object) } : val
  }
  return out as Journey
}

function directionBetween(from: StepId, to: StepId): number {
  const a = LINEAR_FLOW.indexOf(from)
  const b = LINEAR_FLOW.indexOf(to)
  if (a === -1 || b === -1) return 1
  return b >= a ? 1 : -1
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'patch':
      return { ...state, journey: mergeJourney(state.journey, action.payload) }
    case 'next': {
      const step = nextStep(state.step, state.journey)
      return { ...state, step, direction: 1 }
    }
    case 'back': {
      const step = prevStep(state.step)
      return { ...state, step, direction: -1 }
    }
    case 'goTo':
      return {
        ...state,
        step: action.payload,
        direction: directionBetween(state.step, action.payload),
      }
    case 'reset':
      return { journey: loadFresh(), step: 'welcome', direction: -1 }
    default:
      return state
  }
}

function loadFresh(): Journey {
  return { version: 1, visitedBefore: false }
}

export type JourneyContextValue = {
  journey: Journey
  step: StepId
  direction: number
  patch: (p: Partial<Journey>) => void
  next: () => void
  back: () => void
  goTo: (s: StepId) => void
  reset: () => void
}

export const JourneyContext = createContext<JourneyContextValue | null>(null)

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    reducer,
    undefined,
    (): State => ({ journey: loadJourney(), step: 'welcome', direction: 1 }),
  )

  // Persist the journey whenever it changes. Stays entirely on-device.
  useEffect(() => {
    saveJourney(state.journey)
  }, [state.journey])

  const value = useMemo<JourneyContextValue>(
    () => ({
      journey: state.journey,
      step: state.step,
      direction: state.direction,
      patch: (p) => dispatch({ type: 'patch', payload: p }),
      next: () => dispatch({ type: 'next' }),
      back: () => dispatch({ type: 'back' }),
      goTo: (s) => dispatch({ type: 'goTo', payload: s }),
      reset: () => dispatch({ type: 'reset' }),
    }),
    [state.journey, state.step, state.direction],
  )

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
}
