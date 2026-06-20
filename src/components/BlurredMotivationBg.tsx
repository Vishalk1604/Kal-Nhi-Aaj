// ---------------------------------------------------------------------------
// BlurredMotivationBg — THE signature. The person's photo (or avatar), softly
// blurred behind the Understand step, with a slow, calming focus-pull and a
// warm scrim so the overlay text stays readable. (plan.md §8 "Signature
// element", §10.2). Respects prefers-reduced-motion.
// ---------------------------------------------------------------------------

import { motion, useReducedMotion } from 'framer-motion'
import { useJourney } from '../app/useJourney'
import { avatarById } from '../content/avatars'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function BlurredMotivationBg() {
  const { journey } = useJourney()
  const reduce = useReducedMotion()
  const m = journey.motivation
  const av = avatarById(m?.avatarId)
  const Icon = av?.Icon

  // The slow focus-pull: start soft + slightly zoomed, settle to a calm blur.
  const focusPull = reduce
    ? { initial: false as const, animate: { filter: 'blur(16px)', scale: 1.06, opacity: 1 } }
    : {
        initial: { filter: 'blur(30px)', scale: 1.14, opacity: 0 },
        animate: { filter: 'blur(16px)', scale: 1.06, opacity: 1 },
        transition: { duration: 1.6, ease: EASE },
      }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* warm dawn wash always present underneath */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 70% at 50% 0%, #F7DFCB 0%, rgba(247,223,203,0.35) 45%, rgba(251,246,240,0) 75%), var(--bg)',
        }}
      />

      {m?.photoDataUrl ? (
        <motion.img
          src={m.photoDataUrl}
          alt=""
          {...focusPull}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        Icon && (
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
            animate={{ opacity: 0.18, scale: 1, filter: 'blur(2px)' }}
            transition={{ duration: 1.3, ease: EASE }}
            className="absolute left-1/2 top-[12%] -translate-x-1/2"
            style={{ color: av?.fg }}
          >
            <Icon size={184} strokeWidth={1.3} />
          </motion.div>
        )
      )}

      {/* warm scrim: darker-tinted at the edges, fading to readable at the card */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/45 via-[var(--bg)]/35 to-[var(--bg)]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/90 to-transparent" />
    </div>
  )
}
