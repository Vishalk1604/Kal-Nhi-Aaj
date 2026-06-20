// 13 · Later: gentle nudge + check-in — one soft re-engagement, no nagging. (plan.md §10)
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BellRing, Heart } from 'lucide-react'
import { useJourney } from '../app/useJourney'
import { ScreenShell } from '../components/ScreenShell'
import { ProgressHint } from '../components/ProgressHint'
import { PrimaryButton } from '../components/PrimaryButton'
import { SecondaryButton } from '../components/SecondaryButton'
import { ChipSelect } from '../components/ChipSelect'
import { copy } from '../content/copy.en'

type Phase = 'intro' | 'reminder' | 'done'

export function FollowUpLater() {
  const { patch, back, goTo, reset } = useJourney()
  const [phase, setPhase] = useState<Phase>('intro')
  const [choice, setChoice] = useState<string>()

  const rescheduling = Boolean(choice && !choice.startsWith('I went'))

  function choose(opt: string) {
    setChoice(opt)
    patch({ status: opt.startsWith('I went') ? 'completed' : 'rescheduling' })
    setPhase('done')
  }

  return (
    <ScreenShell
      onBack={phase === 'intro' ? back : () => setPhase('intro')}
      progress={<ProgressHint />}
      footer={
        phase === 'intro' ? (
          <PrimaryButton onClick={() => setPhase('reminder')}>
            {copy.followuplater.previewCta}
          </PrimaryButton>
        ) : phase === 'done' ? (
          <div className="space-y-2">
            {rescheduling && (
              <SecondaryButton onClick={() => goTo('plan')}>Pick a new time</SecondaryButton>
            )}
            <PrimaryButton onClick={reset}>{copy.followuplater.restart}</PrimaryButton>
          </div>
        ) : undefined
      }
    >
      <div className="pt-2">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <h1 className="font-display text-display-sm text-ink">{copy.followuplater.title}</h1>
              <p className="mt-2 font-body text-body text-ink-soft">{copy.followuplater.sub}</p>
            </motion.div>
          )}

          {phase === 'reminder' && (
            <motion.div
              key="reminder"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              {/* mock push notification */}
              <motion.div
                initial={{ opacity: 0, y: -14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                className="flex items-start gap-3 rounded-card border border-line bg-surface/95 p-4 shadow-soft-lg backdrop-blur"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-terracotta text-surface">
                  <BellRing size={22} strokeWidth={2.2} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[14px] font-bold text-ink">{copy.appName}</span>
                    <span className="font-body text-[12px] text-ink-soft">now</span>
                  </div>
                  <p className="mt-0.5 font-body text-[15px] font-bold text-ink">
                    {copy.followuplater.reminderTitle}
                  </p>
                  <p className="font-body text-body text-ink-soft">{copy.followuplater.reminderBody}</p>
                </div>
              </motion.div>

              <h2 className="mb-3 mt-8 font-display text-h2 text-ink">{copy.followuplater.howDidItGo}</h2>
              <ChipSelect stacked options={copy.followuplater.options} value={choice} onChange={choose} />
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center pt-8 text-center"
            >
              <span className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-peach/60 text-terracotta-d">
                <Heart size={38} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <h1 className="text-balance font-display text-display-sm text-ink">
                {copy.followuplater.doneTitle}
              </h1>
              <p className="mt-3 max-w-[320px] text-pretty font-body text-body-lg text-ink-soft">
                {copy.followuplater.doneBody}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScreenShell>
  )
}
