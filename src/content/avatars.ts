// ---------------------------------------------------------------------------
// Motivation avatar options. Phase 1: warm lucide icons on soft color fields
// (richer custom illustrations can come in polish). Each maps to a Motivation.
// ---------------------------------------------------------------------------

import {
  Baby,
  HeartHandshake,
  Heart,
  User,
  Sprout,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { MotivationType, CareRelation } from '../app/types'

export type AvatarOption = {
  id: string
  type: MotivationType
  label: string // stored on motivation.label, e.g. "my kids"
  caption: string // shown under the avatar in the picker
  Icon: LucideIcon
  // Soft background + accent ink for the avatar tile.
  bg: string
  fg: string
}

export const AVATARS: AvatarOption[] = [
  { id: 'kids', type: 'kids', label: 'my kids', caption: 'My kids', Icon: Baby, bg: '#F7DFCB', fg: '#B9512F' },
  { id: 'parents', type: 'parents', label: 'my parents', caption: 'My parents', Icon: HeartHandshake, bg: '#E7EBE2', fg: '#5E7A59' },
  { id: 'partner', type: 'partner', label: 'my partner', caption: 'My partner', Icon: Heart, bg: '#F7DFCB', fg: '#B9512F' },
  { id: 'self', type: 'self', label: 'myself', caption: 'Myself', Icon: User, bg: '#E7EBE2', fg: '#5E7A59' },
  { id: 'work', type: 'work', label: 'my work & dreams', caption: 'My work / dream', Icon: Sprout, bg: '#F7DFCB', fg: '#B9512F' },
  { id: 'other', type: 'other', label: 'someone I love', caption: 'Someone else', Icon: Sparkles, bg: '#E7EBE2', fg: '#5E7A59' },
]

export function avatarById(id?: string): AvatarOption | undefined {
  return AVATARS.find((a) => a.id === id)
}

// ---- Care circle: relation icons + a warm color palette for contact avatars ----

export const RELATION_ICON: Record<CareRelation, LucideIcon> = {
  parent: HeartHandshake,
  partner: Heart,
  friend: Users,
  sibling: User,
  child: Baby,
  other: Sparkles,
}

// Soft fills cycled for contact avatars (warm + sage, alternating).
export const CARE_COLORS = ['#F7DFCB', '#E7EBE2', '#F4D9C4', '#E0E7DC']

export function careColorFor(index: number): string {
  return CARE_COLORS[index % CARE_COLORS.length]
}

/** Readable accent ink for a given soft fill (warm fills → terracotta; sage → sage). */
export function careInkFor(color: string): string {
  return color.startsWith('#E') ? '#5E7A59' : '#B9512F'
}
