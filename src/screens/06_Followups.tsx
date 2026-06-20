// 06 · Gentle follow-ups — soft questions one at a time; quietly check red flags. (plan.md §10)
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useJourney } from '../app/useJourney'
import { ScreenShell } from '../components/ScreenShell'
import { ProgressHint } from '../components/ProgressHint'
import { QuestionCard } from '../components/QuestionCard'
import { copy } from '../content/copy.en'
import { evaluateRedFlag } from '../content/redFlagRules'
import { deriveUrgency } from '../content/urgencyRules'

export function Followups() {
  const { journey, patch, next, back } = useJourney()
  const questions = copy.followups.questions
  const [index, setIndex] = useState(0)
  const [beat, setBeat] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const q = questions[index]
  const current = journey.followups?.[q.id]
  const progressLabel = copy.followups.progress[Math.min(index, copy.followups.progress.length - 1)]

  function answer(option: string) {
    const merged = { ...(journey.followups ?? {}), [q.id]: option }
    patch({ followups: { [q.id]: option } })
    setBeat(true)
    timer.current = window.setTimeout(() => {
      setBeat(false)
      if (index < questions.length - 1) {
        setIndex(index + 1)
      } else {
        // Last answer — evaluate illustrative rules, then route (red flag branches).
        const synthetic = { ...journey, followups: merged }
        patch({ redFlag: evaluateRedFlag(synthetic), urgencyBand: deriveUrgency(synthetic) })
        next()
      }
    }, 650)
  }

  return (
    <ScreenShell
      onBack={index > 0 ? () => setIndex(index - 1) : back}
      progress={<ProgressHint />}
    >
      <div className="flex h-full flex-col pt-4">
        <p className="mb-4 font-body text-body font-bold text-terracotta-d">{progressLabel}</p>

        <div className="relative flex-1">
          <AnimatePresence mode="wait" initial={false}>
            {beat ? (
              <motion.div
                key="beat"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center pt-16 text-center"
              >
                <span className="mb-3 grid h-14 w-14 place-items-center rounded-full bg-sage/20 text-sage-d">
                  <Sparkles size={26} strokeWidth={2} aria-hidden="true" />
                </span>
                <p className="font-display text-h2 text-ink">{copy.followups.interstitial}</p>
              </motion.div>
            ) : (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              >
                <QuestionCard prompt={q.prompt} options={q.options} value={current} onAnswer={answer} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ScreenShell>
  )
}
