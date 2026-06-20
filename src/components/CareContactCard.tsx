// ---------------------------------------------------------------------------
// CareContactCard — one loved one in the care circle: avatar, relation, a
// status chip, and an opt-in "Remind them" action. Status is local today; a
// future backend would sync real check-ins (plan: Deferred to backend).
// ---------------------------------------------------------------------------

import { motion } from 'framer-motion'
import { Send, CheckCircle2 } from 'lucide-react'
import type { CareContact } from '../app/types'
import { RELATION_ICON, careInkFor } from '../content/avatars'
import { copy } from '../content/copy.en'

const STATUS_STYLE: Record<NonNullable<CareContact['status']>, { bg: string; fg: string; label: string }> = {
  none: { bg: 'rgba(43,36,32,0.07)', fg: '#7A6F68', label: copy.careCircle.statusNone },
  nudged: { bg: 'rgba(224,121,90,0.14)', fg: '#B9512F', label: copy.careCircle.statusNudged },
  'checked-in': { bg: 'rgba(143,169,138,0.20)', fg: '#5E7A59', label: copy.careCircle.statusCheckedIn },
}

type Props = {
  contact: CareContact
  onRemind: () => void
  onMarkCheckedIn: () => void
}

export function CareContactCard({ contact, onRemind, onMarkCheckedIn }: Props) {
  const Icon = RELATION_ICON[contact.relation]
  const color = contact.avatarColor ?? '#F7DFCB'
  const status = contact.status ?? 'none'
  const s = STATUS_STYLE[status]
  const checkedIn = status === 'checked-in'

  return (
    <div className="rounded-card border border-line bg-surface p-4 shadow-soft">
      <div className="flex items-center gap-3">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full"
          style={{ backgroundColor: color, color: careInkFor(color) }}
        >
          <Icon size={22} strokeWidth={2.1} aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[17px] font-bold text-ink">{contact.name}</p>
          <p className="font-body text-caption text-ink-soft">{copy.careCircle.relations[contact.relation]}</p>
        </div>

        {!checkedIn && (
          <motion.button
            type="button"
            onClick={onRemind}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-chip border border-line bg-peach/40 px-3.5 font-body text-caption font-bold text-terracotta-d hover:bg-peach/70"
          >
            <Send size={15} strokeWidth={2.2} aria-hidden="true" />
            {copy.careCircle.remind}
          </motion.button>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span
          className="inline-flex items-center rounded-chip px-2.5 py-1 font-body text-[12px] font-bold"
          style={{ backgroundColor: s.bg, color: s.fg }}
        >
          {s.label}
        </span>

        {!checkedIn && (
          <button
            type="button"
            onClick={onMarkCheckedIn}
            className="inline-flex items-center gap-1 font-body text-caption font-bold text-sage-d underline-offset-2 hover:underline"
          >
            <CheckCircle2 size={14} strokeWidth={2.4} aria-hidden="true" />
            {copy.careCircle.markCheckedIn}
          </button>
        )}
      </div>
    </div>
  )
}
