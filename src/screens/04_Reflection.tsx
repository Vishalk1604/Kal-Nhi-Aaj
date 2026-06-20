// 04 · Reflection — reframe care as strength, personalised to their choice. (plan.md §10, 10.3)
import { motion } from 'framer-motion'
import { useJourney } from '../app/useJourney'
import { ScreenShell } from '../components/ScreenShell'
import { ProgressHint } from '../components/ProgressHint'
import { PrimaryButton } from '../components/PrimaryButton'
import { MotivationAvatar } from '../components/MotivationAvatar'
import { copy } from '../content/copy.en'

export function Reflection() {
  const { journey, next, back } = useJourney()
  const type = journey.motivation?.type ?? 'self'
  const line = copy.reflection.lines[type]

  return (
    <ScreenShell
      onBack={back}
      progress={<ProgressHint />}
      center
      bgClass="bg-peach/30"
      footer={<PrimaryButton onClick={next}>{copy.reflection.cta}</PrimaryButton>}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        <MotivationAvatar size={96} className="mb-7" />

        <h1 className="text-balance font-display text-[27px] font-bold leading-snug text-ink">
          {line}
        </h1>

        <p className="mt-6 max-w-[320px] text-pretty rounded-card bg-surface/70 px-5 py-4 font-body text-body text-ink-soft shadow-soft">
          {copy.strength.reflection(type)}
        </p>
      </motion.div>
    </ScreenShell>
  )
}
