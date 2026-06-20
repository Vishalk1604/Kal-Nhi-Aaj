// 01 · Welcome — first-timers get the scroll-animated landing page; returning
// visitors get a warm, compact greeting + a quiet "start fresh" (10.1 / Phase 3).
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useJourney } from '../app/useJourney'
import { ScreenShell } from '../components/ScreenShell'
import { PrimaryButton } from '../components/PrimaryButton'
import { SecondaryButton } from '../components/SecondaryButton'
import { TextButton } from '../components/TextButton'
import { Disclaimer } from '../components/Disclaimer'
import { MotivationAvatar } from '../components/MotivationAvatar'
import { Landing } from '../components/Landing'
import { copy } from '../content/copy.en'
import { relativeWhen } from '../lib/time'

export function Welcome() {
  const { journey, next, patch, reset } = useJourney()
  const [confirming, setConfirming] = useState(false)

  const returning = Boolean(journey.visitedBefore && journey.lastConcernSummary)

  // First-timers see the full landing experience.
  if (!returning) return <Landing onStart={next} />

  const when = relativeWhen(journey.lastVisit)

  // Start a NEW check-in: keep who they are (motivation, care circle, history)
  // but clear last time's concern so they begin fresh.
  function startCheckin() {
    patch({
      concern: undefined,
      followups: undefined,
      urgencyBand: undefined,
      redFlag: undefined,
      chosenStep: undefined,
      plan: undefined,
      status: undefined,
      buddyShared: undefined,
    })
    next()
  }

  const footer = confirming ? (
    <div className="rounded-card border border-line bg-surface p-4 shadow-soft">
      <p className="text-center font-display text-[17px] font-bold text-ink">{copy.welcome.clearConfirmQ}</p>
      <p className="mt-1 text-center font-body text-caption text-ink-soft">{copy.welcome.clearNote}</p>
      <div className="mt-4 flex items-center gap-3">
        <SecondaryButton
          onClick={() => {
            reset()
            setConfirming(false)
          }}
        >
          {copy.welcome.clearConfirmYes}
        </SecondaryButton>
        <TextButton onClick={() => setConfirming(false)}>{copy.welcome.clearConfirmNo}</TextButton>
      </div>
    </div>
  ) : (
    <div className="space-y-2">
      <PrimaryButton onClick={startCheckin}>{copy.welcome.returningCta}</PrimaryButton>
      <Disclaimer variant="privacy">{copy.welcome.finePrint}</Disclaimer>
      <div className="flex justify-center">
        <TextButton onClick={() => setConfirming(true)}>{copy.welcome.clearData}</TextButton>
      </div>
    </div>
  )

  return (
    <ScreenShell center footer={footer}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        <p className="font-display text-[15px] font-bold tracking-tight text-terracotta-d">{copy.appName}</p>
        <p className="mb-9 font-body text-caption text-ink-soft">{copy.tagline}</p>

        {journey.motivation ? (
          <div className="mb-9">
            <MotivationAvatar size={104} />
          </div>
        ) : null}

        <h1 className="text-balance font-display text-[26px] font-bold leading-snug text-ink">
          {copy.welcome.returning(journey.lastConcernSummary!, when)}
        </h1>
        <p className="mt-3 max-w-[300px] text-pretty font-body text-body text-ink-soft">
          {copy.welcome.returningSub}
        </p>
      </motion.div>
    </ScreenShell>
  )
}
