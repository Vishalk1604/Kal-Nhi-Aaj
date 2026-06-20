// 10 · If-then plan + reminder — convert intention into a cue-linked plan with
// a real .ics calendar event + an opt-in Notification ping. (plan.md §10, 10.4)
import { motion } from 'framer-motion'
import { useJourney } from '../app/useJourney'
import { ScreenShell } from '../components/ScreenShell'
import { ProgressHint } from '../components/ProgressHint'
import { PrimaryButton } from '../components/PrimaryButton'
import { IfThenPlanner } from '../components/IfThenPlanner'
import { ReminderControls } from '../components/ReminderControls'
import { copy } from '../content/copy.en'

export function PlanIfThen() {
  const { journey, patch, next, back } = useJourney()
  const plan = journey.plan ?? {}
  const ready = Boolean(plan.cue && plan.time)

  return (
    <ScreenShell
      onBack={back}
      progress={<ProgressHint />}
      footer={
        <PrimaryButton onClick={next} disabled={!ready}>
          {copy.plan.cta}
        </PrimaryButton>
      }
    >
      <div className="pt-2">
        <h1 className="font-display text-display-sm text-ink">{copy.plan.title}</h1>
        <p className="mt-2 font-body text-body text-ink-soft">{copy.plan.sub}</p>

        <div className="mt-6">
          <IfThenPlanner
            cue={plan.cue}
            time={plan.time}
            onCue={(cue) => patch({ plan: { cue } })}
            onTime={(time) => patch({ plan: { time } })}
          />
        </div>

        {/* the if-then line, once both are chosen */}
        {ready && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 rounded-card bg-peach/50 px-5 py-4 font-display text-[18px] font-bold leading-snug text-terracotta-d"
          >
            {copy.plan.line(plan.cue!, plan.time!)}
          </motion.div>
        )}

        {/* Real reminders: .ics calendar event + opt-in Notification ping */}
        {ready && (
          <div className="mt-6">
            <ReminderControls />
          </div>
        )}
      </div>
    </ScreenShell>
  )
}
