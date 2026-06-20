// ↪ branch · Red flag — safety first: get a human involved fast. Never try to
// "handle" an emergency in-app. Rules are conservative & illustrative. (plan.md §10, §14)
import { motion } from 'framer-motion'
import { ShieldAlert, Phone, MapPin, Video, ChevronRight } from 'lucide-react'
import { useJourney } from '../app/useJourney'
import { ScreenShell } from '../components/ScreenShell'
import { TextButton } from '../components/TextButton'
import { Disclaimer } from '../components/Disclaimer'
import { copy } from '../content/copy.en'

const ACTION_META: Record<string, { Icon: typeof Phone; href?: string }> = {
  emergency: { Icon: Phone, href: 'tel:112' },
  hospital: { Icon: MapPin, href: 'https://www.google.com/maps/search/hospital+near+me' },
  doctor: { Icon: Video },
}

export function RedFlag() {
  const { back } = useJourney()

  return (
    <ScreenShell
      onBack={back}
      footer={
        <div className="flex justify-center">
          <TextButton onClick={back}>{copy.redFlag.back}</TextButton>
        </div>
      }
    >
      <div className="pt-4">
        <motion.span
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="grid h-16 w-16 place-items-center rounded-2xl bg-urgent/12 text-urgent"
        >
          <ShieldAlert size={32} strokeWidth={2} aria-hidden="true" />
        </motion.span>

        <h1 className="mt-5 text-balance font-display text-display-sm text-ink">{copy.redFlag.title}</h1>
        <p className="mt-3 font-body text-body text-ink-soft">{copy.redFlag.body}</p>

        <div className="mt-6 space-y-3">
          {copy.redFlag.actions.map((action) => {
            const meta = ACTION_META[action.id]
            const Icon = meta.Icon
            const inner = (
              <>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-urgent/12 text-urgent">
                  <Icon size={22} strokeWidth={2.2} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[17px] font-bold text-ink">{action.label}</span>
                  <span className="block font-body text-caption text-ink-soft">{action.note}</span>
                </span>
                <ChevronRight size={20} className="shrink-0 text-ink-soft" aria-hidden="true" />
              </>
            )
            const className =
              'flex w-full items-center gap-4 rounded-card border border-line bg-surface p-4 text-left shadow-soft transition-colors hover:bg-peach/20'
            return meta.href ? (
              <a key={action.id} href={meta.href} target="_blank" rel="noreferrer" className={className}>
                {inner}
              </a>
            ) : (
              <button key={action.id} type="button" className={className}>
                {inner}
              </button>
            )
          })}
        </div>

        <div className="mt-6">
          <Disclaimer variant="diagnosis">{copy.redFlag.disclaimer}</Disclaimer>
        </div>
      </div>
    </ScreenShell>
  )
}
