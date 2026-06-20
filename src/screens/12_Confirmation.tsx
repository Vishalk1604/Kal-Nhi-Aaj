// 12 · You took the first step — close the loop; reuse their motivation as payoff. (plan.md §10)
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Footprints, CheckCircle2, Share2 } from 'lucide-react'
import { useJourney } from '../app/useJourney'
import type { Journey } from '../app/types'
import { ScreenShell } from '../components/ScreenShell'
import { PrimaryButton } from '../components/PrimaryButton'
import { SecondaryButton } from '../components/SecondaryButton'
import { MotivationAvatar } from '../components/MotivationAvatar'
import { copy } from '../content/copy.en'
import { nextStepById } from '../content/nextSteps'
import { shareOrFallback, appUrl } from '../lib/share'

function summarize(journey: Journey): string {
  const c = journey.concern
  if (c?.area) return `your ${c.area.toLowerCase()}`
  if (c?.text?.trim()) return c.text.trim().slice(0, 40)
  if (c?.mood) return 'how you’ve been feeling'
  return 'your health'
}

export function Confirmation() {
  const { journey, patch, next } = useJourney()
  const wrote = useRef(false)

  // Persist the outcome once: status, returning-greeting fields, history entry.
  useEffect(() => {
    if (wrote.current) return
    wrote.current = true
    const now = new Date().toISOString()
    const concernSummary = summarize(journey)
    patch({
      status: 'planned',
      visitedBefore: true,
      lastVisit: now,
      lastConcernSummary: concernSummary,
      history: [...(journey.history ?? []), { date: now, concernSummary, status: 'planned' }],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasMotivation = Boolean(journey.motivation?.avatarId || journey.motivation?.photoDataUrl)
  const forWhom = journey.motivation?.label
  const step = nextStepById(journey.chosenStep)
  const plan = journey.plan

  return (
    <ScreenShell
      center
      footer={<PrimaryButton onClick={next}>{copy.confirmation.cta}</PrimaryButton>}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        {/* the motivation returns, un-blurred */}
        {hasMotivation ? (
          <span className="relative mb-6 inline-block">
            <MotivationAvatar size={96} />
            <span className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full bg-sage text-surface shadow-soft">
              <CheckCircle2 size={20} strokeWidth={2.4} aria-hidden="true" />
            </span>
          </span>
        ) : (
          <span className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-sage/20 text-sage-d">
            <CheckCircle2 size={40} strokeWidth={2} aria-hidden="true" />
          </span>
        )}

        <h1 className="text-balance font-display text-display-sm text-ink">{copy.confirmation.title}</h1>
        <p className="mt-3 max-w-[320px] text-pretty font-body text-body-lg text-ink-soft">
          {forWhom ? copy.confirmation.body(forWhom) : copy.confirmation.bodyNoMotivation}
        </p>

        {/* restate the plan */}
        {(step || plan?.cue) && (
          <div className="mt-6 w-full max-w-[330px] rounded-card border border-line bg-surface p-4 text-left shadow-soft">
            {step && (
              <p className="font-display text-[16px] font-bold text-ink">{step.title}</p>
            )}
            {plan?.cue && plan?.time && (
              <p className="mt-1 font-body text-body text-ink-soft">
                {plan.cue}, around {plan.time}.
              </p>
            )}
          </div>
        )}

        <p className="mt-6 inline-flex items-center gap-2 font-body text-caption font-bold text-sage-d">
          <Footprints size={16} strokeWidth={2.2} aria-hidden="true" />
          {copy.confirmation.progressNote}
        </p>

        {/* Opt-in share-your-win — user-initiated, never automatic */}
        <div className="mt-7 w-full max-w-[330px] border-t border-line pt-6">
          <p className="font-display text-[16px] font-bold text-ink">{copy.confirmation.shareHeading}</p>
          <p className="mt-1 font-body text-caption text-ink-soft">{copy.confirmation.shareSub}</p>
          <SecondaryButton
            className="mt-3"
            onClick={() => {
              patch({ buddyShared: true })
              shareOrFallback({ title: copy.appName, text: copy.confirmation.shareMessage(appUrl()) })
            }}
          >
            <Share2 size={18} strokeWidth={2.2} aria-hidden="true" />
            {copy.confirmation.shareCta}
          </SecondaryButton>
        </div>
      </motion.div>
    </ScreenShell>
  )
}
