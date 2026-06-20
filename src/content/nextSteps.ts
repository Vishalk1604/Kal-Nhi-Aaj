// ---------------------------------------------------------------------------
// Static handoff options for the Act step. Cost is shown up front (free /
// low-cost / scheme) so money is never the hidden barrier. Every option ends
// with a real person — never a dead end. (plan.md §9 / 10.4)
// ---------------------------------------------------------------------------

import { Video, MapPin, PhoneCall, type LucideIcon } from 'lucide-react'
import type { ChosenStep } from '../app/types'

export type NextStepOption = {
  id: Exclude<ChosenStep, null>
  Icon: LucideIcon
  title: string
  detail: string // distance / time / what happens
  cost: string // framed up front
  costTone: 'free' | 'low' | 'scheme'
  cta: string
}

export const NEXT_STEPS: NextStepOption[] = [
  {
    id: 'teleconsult',
    Icon: Video,
    title: 'Talk to a doctor now',
    detail: 'A 2-minute video or phone consult, from wherever you are.',
    cost: 'Free first call',
    costTone: 'free',
    cta: 'Start a teleconsult',
  },
  {
    id: 'nearest',
    Icon: MapPin,
    title: 'Find the nearest centre',
    detail: 'Clinics and free health camps close to you.',
    cost: 'Govt. centres are free',
    costTone: 'scheme',
    cta: 'Open the map',
  },
  {
    id: 'callback',
    Icon: PhoneCall,
    title: 'Get a callback',
    detail: 'A health worker calls you — you don’t make the first move.',
    cost: 'No charge',
    costTone: 'free',
    cta: 'Request a callback',
  },
]

export function nextStepById(id?: ChosenStep): NextStepOption | undefined {
  return NEXT_STEPS.find((s) => s.id === id)
}
