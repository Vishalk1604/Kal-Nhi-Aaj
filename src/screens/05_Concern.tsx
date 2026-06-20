// 05 · Concern — capture the worry gently; accept vague/emotional input. (plan.md §10)
import { useRef, useState } from 'react'
import { Brain, HeartPulse, Soup, Bone, Moon, Thermometer, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useJourney } from '../app/useJourney'
import { ScreenShell } from '../components/ScreenShell'
import { ProgressHint } from '../components/ProgressHint'
import { PrimaryButton } from '../components/PrimaryButton'
import { VoiceButton } from '../components/VoiceButton'
import { isSpeechSupported } from '../lib/speech'
import { copy } from '../content/copy.en'

const AREAS = [
  { id: 'head', label: 'Head', Icon: Brain },
  { id: 'chest', label: 'Chest / breath', Icon: HeartPulse },
  { id: 'stomach', label: 'Stomach', Icon: Soup },
  { id: 'back', label: 'Back / joints', Icon: Bone },
  { id: 'sleep', label: 'Sleep / energy', Icon: Moon },
  { id: 'skin', label: 'Skin / fever', Icon: Thermometer },
]

export function Concern() {
  const { journey, patch, next, back } = useJourney()
  const concern = journey.concern ?? {}
  const canContinue = Boolean(concern.area || concern.text?.trim() || concern.mood)

  // Voice dictation streams into the same text field. `baseText` is the text
  // present when listening began, so dictated phrases append cleanly.
  const baseTextRef = useRef('')
  const [listening, setListening] = useState(false)
  const voiceSupported = isSpeechSupported()

  function handleTranscript(text: string, isFinal: boolean) {
    const base = baseTextRef.current
    const merged = base ? `${base} ${text}`.trim() : text
    patch({ concern: { text: merged } })
    if (isFinal) baseTextRef.current = merged
  }

  function handleListeningChange(isListening: boolean) {
    setListening(isListening)
    if (isListening) baseTextRef.current = concern.text?.trim() ?? ''
  }

  return (
    <ScreenShell
      onBack={back}
      progress={<ProgressHint />}
      footer={
        <PrimaryButton onClick={next} disabled={!canContinue}>
          {copy.concern.cta}
        </PrimaryButton>
      }
    >
      <div className="pt-2">
        <h1 className="font-display text-display-sm text-ink">{copy.concern.title}</h1>
        <p className="mt-2 font-body text-body text-ink-soft">{copy.concern.sub}</p>

        {/* Where is it — icon grid (BodyMap fallback) */}
        <h2 className="mb-3 mt-6 font-body text-caption font-bold uppercase tracking-wider text-ink-soft">
          {copy.concern.bodyHeading}
        </h2>
        <div className="grid grid-cols-3 gap-2.5">
          {AREAS.map(({ id, label, Icon }) => {
            const selected = concern.area === label
            return (
              <motion.button
                key={id}
                type="button"
                aria-pressed={selected}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                onClick={() => patch({ concern: { area: selected ? undefined : label } })}
                className={[
                  'flex flex-col items-center gap-1.5 rounded-2xl border p-3 transition-colors',
                  selected ? 'border-terracotta bg-peach/50 text-terracotta-d' : 'border-line bg-surface text-ink hover:bg-peach/25',
                ].join(' ')}
              >
                <Icon size={24} strokeWidth={2} aria-hidden="true" />
                <span className="font-body text-[12px] font-bold leading-tight">{label}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Mood tile */}
        <motion.button
          type="button"
          aria-pressed={Boolean(concern.mood)}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          onClick={() => patch({ concern: { mood: concern.mood ? undefined : 'off-low-tired' } })}
          className={[
            'mt-3 flex min-h-[52px] w-full items-center gap-3 rounded-2xl border px-4 transition-colors',
            concern.mood ? 'border-terracotta bg-peach/50 text-terracotta-d' : 'border-line bg-surface text-ink hover:bg-peach/25',
          ].join(' ')}
        >
          <Heart size={20} strokeWidth={2} aria-hidden="true" />
          <span className="font-body text-body font-bold">{copy.concern.moodTile}</span>
        </motion.button>

        {/* Own words — type or speak */}
        <div className="mb-2 mt-6 flex items-center justify-between gap-3">
          <h2 className="font-body text-caption font-bold uppercase tracking-wider text-ink-soft">
            {copy.concern.textHeading}
          </h2>
          <VoiceButton onTranscript={handleTranscript} onListeningChange={handleListeningChange} />
        </div>
        <textarea
          value={concern.text ?? ''}
          onChange={(e) => patch({ concern: { text: e.target.value } })}
          placeholder={listening ? copy.concern.listening : copy.concern.textPlaceholder}
          rows={3}
          className="w-full resize-none rounded-card border border-line bg-surface p-4 font-body text-body text-ink shadow-soft placeholder:text-ink-soft/60 focus:border-terracotta focus:outline-none"
        />
        {voiceSupported && (
          <p className="mt-2 font-body text-caption text-ink-soft">
            {listening ? copy.concern.listeningHint : copy.concern.voiceNote}
          </p>
        )}
      </div>
    </ScreenShell>
  )
}
