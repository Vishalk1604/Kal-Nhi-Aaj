// ---------------------------------------------------------------------------
// MotivationAvatar — the chosen motivation as a warm circle: their photo if
// they picked one, otherwise the illustrated avatar. Used (un-blurred) on the
// Reflection and Confirmation screens. (plan.md §10.2)
// ---------------------------------------------------------------------------

import { useJourney } from '../app/useJourney'
import { avatarById } from '../content/avatars'

export function MotivationAvatar({ size = 96, className = '' }: { size?: number; className?: string }) {
  const { journey } = useJourney()
  const m = journey.motivation
  const av = avatarById(m?.avatarId)

  if (m?.photoDataUrl) {
    return (
      <img
        src={m.photoDataUrl}
        alt="Who you're staying well for"
        className={`rounded-full object-cover shadow-soft ${className}`}
        style={{ width: size, height: size }}
      />
    )
  }

  const Icon = av?.Icon
  return (
    <span
      className={`grid place-items-center rounded-full shadow-soft ${className}`}
      style={{ width: size, height: size, backgroundColor: av?.bg ?? '#F7DFCB', color: av?.fg ?? '#B9512F' }}
    >
      {Icon && <Icon size={Math.round(size * 0.46)} strokeWidth={1.9} aria-hidden="true" />}
    </span>
  )
}
