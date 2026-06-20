// 11 · Care circle (optional) — the people you're staying well for. Add them
// locally, and optionally nudge them to look after themselves too. No accounts,
// no backend: connection happens only through share links you tap. (plan: care circle)
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { UserPlus, Lock } from 'lucide-react'
import { useJourney } from '../app/useJourney'
import type { CareContact, CareRelation } from '../app/types'
import { ScreenShell } from '../components/ScreenShell'
import { ProgressHint } from '../components/ProgressHint'
import { PrimaryButton } from '../components/PrimaryButton'
import { TextButton } from '../components/TextButton'
import { CareContactCard } from '../components/CareContactCard'
import { AddContact } from '../components/AddContact'
import { copy } from '../content/copy.en'
import { careColorFor } from '../content/avatars'
import { shareOrFallback, appUrl } from '../lib/share'

function newId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `c_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export function CareCircle() {
  const { journey, patch, next, back } = useJourney()
  const circle = journey.careCircle ?? []
  const [adding, setAdding] = useState(false)

  // careCircle is an array — the reducer replaces arrays, so always patch the
  // whole next array.
  const setCircle = (nextCircle: CareContact[]) => patch({ careCircle: nextCircle })
  const updateContact = (id: string, fields: Partial<CareContact>) =>
    setCircle(circle.map((c) => (c.id === id ? { ...c, ...fields } : c)))

  function addContact(name: string, relation: CareRelation) {
    setCircle([
      ...circle,
      { id: newId(), name, relation, avatarColor: careColorFor(circle.length), status: 'none' },
    ])
    setAdding(false)
  }

  async function remind(contact: CareContact) {
    updateContact(contact.id, { status: 'nudged', lastNudged: new Date().toISOString() })
    patch({ buddyShared: true })
    await shareOrFallback({
      title: copy.appName,
      text: copy.careCircle.nudgeMessage(contact.name, appUrl()),
    })
  }

  return (
    <ScreenShell
      onBack={back}
      progress={<ProgressHint />}
      footer={
        <div className="space-y-2">
          <PrimaryButton onClick={next}>{copy.careCircle.continueCta}</PrimaryButton>
          {circle.length === 0 && (
            <div className="flex justify-center">
              <TextButton onClick={next}>{copy.careCircle.skip}</TextButton>
            </div>
          )}
        </div>
      }
    >
      <div className="pt-2">
        <h1 className="text-balance font-display text-display-sm text-ink">{copy.careCircle.title}</h1>
        <p className="mt-2 font-body text-body text-ink-soft">{copy.careCircle.sub}</p>

        <p className="mt-3 flex items-start gap-1.5 font-body text-caption text-ink-soft">
          <Lock size={13} strokeWidth={2.4} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{copy.careCircle.privacyNote}</span>
        </p>

        <div className="mt-6 space-y-3">
          <AnimatePresence initial={false}>
            {circle.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              >
                <CareContactCard
                  contact={c}
                  onRemind={() => remind(c)}
                  onMarkCheckedIn={() => updateContact(c.id, { status: 'checked-in', lastCheckIn: new Date().toISOString() })}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {adding ? (
            <AddContact onAdd={addContact} onCancel={() => setAdding(false)} />
          ) : (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-card border-2 border-dashed border-line font-body text-body font-bold text-terracotta-d transition-colors hover:bg-peach/30"
            >
              <UserPlus size={20} strokeWidth={2.2} aria-hidden="true" />
              {copy.careCircle.addCta}
            </button>
          )}
        </div>

        {circle.length > 0 && (
          <p className="mt-4 font-body text-caption text-ink-soft">{copy.careCircle.syncNote}</p>
        )}
      </div>
    </ScreenShell>
  )
}
