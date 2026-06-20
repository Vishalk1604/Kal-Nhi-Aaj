// 07 · What this might mean — the signature screen. A calm urgency read (NOT a
// diagnosis) over the motivation, softly present behind it. (plan.md §10, 10.2)
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { useJourney } from '../app/useJourney'
import { ScreenShell } from '../components/ScreenShell'
import { ProgressHint } from '../components/ProgressHint'
import { PrimaryButton } from '../components/PrimaryButton'
import { BlurredMotivationBg } from '../components/BlurredMotivationBg'
import { UrgencyResult } from '../components/UrgencyResult'
import { copy } from '../content/copy.en'

export function Understand() {
  const { journey, next, back } = useJourney()
  const band = journey.urgencyBand ?? 'when-you-can'
  const type = journey.motivation?.type ?? 'self'
  const isSelf = type === 'self'
  const overlay = isSelf
    ? "You're doing this for you. Let's take the next step."
    : copy.understand.overlay

  return (
    <ScreenShell
      onBack={back}
      progress={<ProgressHint />}
      footer={<PrimaryButton onClick={next}>{copy.understand.cta}</PrimaryButton>}
    >
      <div className="relative -mx-screen min-h-full px-screen pt-2">
        <BlurredMotivationBg />

        <div className="relative">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mb-6 max-w-[300px] text-balance text-center font-display text-[19px] font-bold leading-snug text-terracotta-d"
          >
            {overlay}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <UrgencyResult band={band} />
          </motion.div>

          {/* Masculinity-aware reframe (10.3) — strength, not sickness */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mx-auto mt-5 flex max-w-[320px] items-start justify-center gap-2 text-center font-body text-body font-bold text-sage-d"
          >
            <ShieldCheck size={18} strokeWidth={2.2} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>{copy.strength.understand(type)}</span>
          </motion.p>
        </div>
      </div>
    </ScreenShell>
  )
}
