// 08 · You're not overreacting — remove the "am I making a big deal?" embarrassment. (plan.md §10)
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { useJourney } from '../app/useJourney'
import { ScreenShell } from '../components/ScreenShell'
import { ProgressHint } from '../components/ProgressHint'
import { PrimaryButton } from '../components/PrimaryButton'
import { copy } from '../content/copy.en'

export function Reassure() {
  const { next, back } = useJourney()

  return (
    <ScreenShell
      onBack={back}
      progress={<ProgressHint />}
      center
      footer={<PrimaryButton onClick={next}>{copy.reassure.cta}</PrimaryButton>}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        <span className="mb-7 grid h-20 w-20 place-items-center rounded-full bg-sage/18 text-sage-d">
          <Users size={38} strokeWidth={1.9} aria-hidden="true" />
        </span>

        <h1 className="text-balance font-display text-display-sm text-ink">{copy.reassure.title}</h1>
        <p className="mt-4 max-w-[320px] text-pretty font-body text-body-lg text-ink-soft">
          {copy.reassure.body}
        </p>
        <p className="mt-5 max-w-[300px] text-pretty rounded-card bg-peach/40 px-5 py-3 font-body text-body font-bold text-terracotta-d">
          {copy.reassure.sub}
        </p>
      </motion.div>
    </ScreenShell>
  )
}
