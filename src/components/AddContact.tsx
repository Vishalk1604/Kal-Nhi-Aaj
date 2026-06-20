// ---------------------------------------------------------------------------
// AddContact — inline form to add a loved one to the care circle (name +
// relation). Stays entirely on-device. (plan: care circle)
// ---------------------------------------------------------------------------

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { CareRelation } from '../app/types'
import { RELATION_ICON } from '../content/avatars'
import { copy } from '../content/copy.en'
import { PrimaryButton } from './PrimaryButton'
import { TextButton } from './TextButton'

const RELATIONS = Object.keys(copy.careCircle.relations) as CareRelation[]

type Props = {
  onAdd: (name: string, relation: CareRelation) => void
  onCancel: () => void
}

export function AddContact({ onAdd, onCancel }: Props) {
  const [name, setName] = useState('')
  const [relation, setRelation] = useState<CareRelation | undefined>()
  const canSave = name.trim().length > 0 && relation

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-card border border-line bg-surface p-4 shadow-soft"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={copy.careCircle.namePlaceholder}
        className="w-full rounded-button border border-line bg-bg px-4 py-3 font-body text-body text-ink placeholder:text-ink-soft/60 focus:border-terracotta focus:outline-none"
      />

      <h3 className="mb-2 mt-4 font-body text-caption font-bold uppercase tracking-wider text-ink-soft">
        {copy.careCircle.relationHeading}
      </h3>
      <div className="flex flex-wrap gap-2">
        {RELATIONS.map((r) => {
          const Icon = RELATION_ICON[r]
          const selected = relation === r
          return (
            <motion.button
              key={r}
              type="button"
              aria-pressed={selected}
              onClick={() => setRelation(r)}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className={[
                'inline-flex min-h-[44px] items-center gap-1.5 rounded-chip px-4 font-body text-caption font-bold transition-colors',
                selected ? 'bg-terracotta text-surface' : 'border border-line bg-bg text-ink hover:bg-peach/40',
              ].join(' ')}
            >
              <Icon size={15} strokeWidth={2.2} aria-hidden="true" />
              {copy.careCircle.relations[r]}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <PrimaryButton disabled={!canSave} onClick={() => canSave && onAdd(name.trim(), relation!)}>
          {copy.careCircle.save}
        </PrimaryButton>
        <TextButton onClick={onCancel}>{copy.careCircle.cancel}</TextButton>
      </div>
    </motion.div>
  )
}
