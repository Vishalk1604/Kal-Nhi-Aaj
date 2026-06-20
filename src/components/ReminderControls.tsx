// ---------------------------------------------------------------------------
// ReminderControls — make the plan's reminder real.
//   • "Add to calendar" → downloads a .ics (reliable, works when app is closed)
//   • "Remind me here"  → opt-in Notification ping (demo flourish; tab-only)
// Honest about the difference. All client-side. (plan.md §10.4)
// ---------------------------------------------------------------------------

import { useState } from 'react'
import { CalendarPlus, BellRing, Check } from 'lucide-react'
import { useJourney } from '../app/useJourney'
import { planToDate, buildIcs, downloadIcs } from '../lib/ics'
import { requestNotificationPermission, scheduleDemoPing } from '../lib/notify'
import { appUrl } from '../lib/share'
import { nextStepById } from '../content/nextSteps'
import { copy } from '../content/copy.en'

type NotifState = 'idle' | 'set' | 'blocked' | 'unsupported'

export function ReminderControls() {
  const { journey, patch } = useJourney()
  const plan = journey.plan ?? {}
  const [added, setAdded] = useState(false)
  const [notif, setNotif] = useState<NotifState>('idle')

  function addToCalendar() {
    const start = planToDate(plan.cue, plan.time)
    const stepTitle = nextStepById(journey.chosenStep)?.title ?? 'A health check-in'
    const ics = buildIcs({
      start,
      summary: copy.plan.icsSummary,
      description: `${stepTitle}. Two minutes — that's all. From Kal Nahi, Aaj: ${appUrl()}`,
      alarmMinutesBefore: 10,
    })
    const ok = downloadIcs('health-check-in.ics', ics)
    if (ok) {
      setAdded(true)
      patch({ plan: { ...plan, reminderSet: true } })
    }
  }

  async function remindHere() {
    const perm = await requestNotificationPermission()
    if (perm === 'unsupported') {
      setNotif('unsupported')
      return
    }
    if (perm === 'granted') {
      scheduleDemoPing(5000, copy.plan.pingTitle, copy.plan.pingBody(plan.time ?? 'now'))
      setNotif('set')
      patch({ plan: { ...plan, reminderSet: true } })
    } else {
      setNotif('blocked')
    }
  }

  return (
    <div>
      <h3 className="mb-3 font-display text-[17px] font-bold text-ink">{copy.plan.reminderHeading}</h3>

      <div className="flex flex-col gap-2.5">
        {/* Primary, reliable: calendar */}
        <button
          type="button"
          onClick={addToCalendar}
          className={[
            'flex min-h-[52px] items-center gap-3 rounded-button border px-5 font-body text-body font-bold transition-colors',
            added
              ? 'border-sage bg-sage/15 text-sage-d'
              : 'border-terracotta bg-peach/40 text-terracotta-d hover:bg-peach/60',
          ].join(' ')}
        >
          {added ? <Check size={20} strokeWidth={2.6} aria-hidden="true" /> : <CalendarPlus size={20} strokeWidth={2} aria-hidden="true" />}
          {added ? copy.plan.addedToCalendar : copy.plan.addToCalendar}
        </button>

        {/* Bonus: in-tab notification */}
        <button
          type="button"
          onClick={remindHere}
          className={[
            'flex min-h-[52px] items-center gap-3 rounded-button border px-5 font-body text-body font-bold transition-colors',
            notif === 'set'
              ? 'border-sage bg-sage/15 text-sage-d'
              : 'border-line bg-surface text-ink hover:bg-peach/30',
          ].join(' ')}
        >
          {notif === 'set' ? <Check size={20} strokeWidth={2.6} aria-hidden="true" /> : <BellRing size={20} strokeWidth={2} aria-hidden="true" />}
          {notif === 'set' ? copy.plan.remindHereSet : copy.plan.remindHere}
        </button>
      </div>

      <p className="mt-2 font-body text-caption text-ink-soft">
        {notif === 'blocked'
          ? copy.plan.notifBlocked
          : notif === 'unsupported'
            ? copy.plan.notifUnsupported
            : copy.plan.reminderHonest}
      </p>
    </div>
  )
}
