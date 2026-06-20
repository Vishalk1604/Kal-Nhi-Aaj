// ---------------------------------------------------------------------------
// App — state-driven screen switching (no router). A `step` value chooses the
// screen; AnimatePresence gives a gentle fade + small slide between them.
// Direction (+1/-1) tilts the slide; reduced-motion keeps an instant fade.
// ---------------------------------------------------------------------------

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useJourney } from './app/useJourney'
import type { StepId } from './app/steps'
import { PhoneFrame } from './components/PhoneFrame'

// Screens (added incrementally; missing ones fall back to a calm placeholder).
import { Welcome } from './screens/01_Welcome'
import { Motivation } from './screens/03_Motivation'
import { Reflection } from './screens/04_Reflection'
import { Concern } from './screens/05_Concern'
import { Followups } from './screens/06_Followups'
import { Understand } from './screens/07_Understand'
import { Reassure } from './screens/08_Reassure'
import { NextStep } from './screens/09_NextStep'
import { PlanIfThen } from './screens/10_PlanIfThen'
import { CareCircle } from './screens/11_CareCircle'
import { Confirmation } from './screens/12_Confirmation'
import { FollowUpLater } from './screens/13_FollowUpLater'
import { RedFlag } from './screens/branch_RedFlag'
import { NotReady } from './screens/branch_NotReady'

const SCREENS: Record<StepId, React.ComponentType> = {
  welcome: Welcome,
  motivation: Motivation,
  reflection: Reflection,
  concern: Concern,
  followups: Followups,
  understand: Understand,
  reassure: Reassure,
  nextstep: NextStep,
  plan: PlanIfThen,
  buddy: CareCircle,
  confirmation: Confirmation,
  followuplater: FollowUpLater,
  redflag: RedFlag,
  notready: NotReady,
}

export function App() {
  const { step, direction } = useJourney()
  const reduce = useReducedMotion()
  const Screen = SCREENS[step] ?? Welcome

  const slide = reduce ? 0 : 14
  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir >= 0 ? slide : -slide }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir >= 0 ? -slide : slide }),
  }

  return (
    <PhoneFrame>
      <div className="relative h-full w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 120, damping: 20, opacity: { duration: 0.25 } }}
            className="absolute inset-0"
          >
            <Screen />
          </motion.div>
        </AnimatePresence>
      </div>
    </PhoneFrame>
  )
}
