// ↪ branch · Not ready yet — don't lose hesitant users. Hold the door open, no guilt. (plan.md §10)
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bookmark, BookOpen, PhoneCall, ChevronRight } from 'lucide-react'
import { useJourney } from '../app/useJourney'
import { ScreenShell } from '../components/ScreenShell'
import { TextButton } from '../components/TextButton'
import { copy } from '../content/copy.en'

const ICONS = { save: Bookmark, expect: BookOpen, callback: PhoneCall }

export function NotReady() {
  const { patch, back, goTo } = useJourney()
  const [showExpect, setShowExpect] = useState(false)

  function choose(id: string) {
    if (id === 'save') {
      goTo('followuplater')
    } else if (id === 'callback') {
      patch({ chosenStep: 'callback' })
      goTo('plan')
    } else {
      setShowExpect((v) => !v)
    }
  }

  return (
    <ScreenShell
      onBack={back}
      footer={
        <div className="flex justify-center">
          <TextButton onClick={back}>{copy.notReady.back}</TextButton>
        </div>
      }
    >
      <div className="pt-4">
        <h1 className="text-balance font-display text-display-sm text-ink">{copy.notReady.title}</h1>
        <p className="mt-2 font-body text-body text-ink-soft">{copy.notReady.sub}</p>

        <div className="mt-6 space-y-3">
          {copy.notReady.options.map((opt) => {
            const Icon = ICONS[opt.id as keyof typeof ICONS]
            return (
              <div key={opt.id}>
                <button
                  type="button"
                  onClick={() => choose(opt.id)}
                  className="flex w-full items-center gap-4 rounded-card border border-line bg-surface p-4 text-left shadow-soft transition-colors hover:bg-peach/20"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sage/15 text-sage-d">
                    <Icon size={22} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[17px] font-bold text-ink">{opt.title}</span>
                    <span className="block font-body text-caption text-ink-soft">{opt.body}</span>
                  </span>
                  <ChevronRight size={20} className="shrink-0 text-ink-soft" aria-hidden="true" />
                </button>

                {opt.id === 'expect' && (
                  <AnimatePresence>
                    {showExpect && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <span className="mt-2 block rounded-card bg-peach/40 px-5 py-4 font-body text-body text-ink-soft">
                          A check-up is usually short and calm: a few questions, maybe a basic test,
                          and clear next steps. No commitment beyond showing up — and you can stop
                          anytime.
                        </span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </ScreenShell>
  )
}
