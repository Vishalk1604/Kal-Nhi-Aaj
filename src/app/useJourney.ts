import { useContext } from 'react'
import { JourneyContext, type JourneyContextValue } from './JourneyProvider'

/** Access the journey state + navigation. Must be used inside <JourneyProvider>. */
export function useJourney(): JourneyContextValue {
  const ctx = useContext(JourneyContext)
  if (!ctx) {
    throw new Error('useJourney must be used within a <JourneyProvider>')
  }
  return ctx
}
