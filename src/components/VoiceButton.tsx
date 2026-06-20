// ---------------------------------------------------------------------------
// VoiceButton — tap to dictate. Streams the transcript up to the parent field.
// Renders nothing where the Web Speech API is unsupported (typing stays the
// default). A gentle pulsing ring shows it's listening (off under reduced-motion).
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mic, Square } from 'lucide-react'
import { isSpeechSupported, startListening, type SpeechSession } from '../lib/speech'

type Props = {
  onTranscript: (text: string, isFinal: boolean) => void
  onListeningChange?: (listening: boolean) => void
  className?: string
}

export function VoiceButton({ onTranscript, onListeningChange, className = '' }: Props) {
  const [supported] = useState(() => isSpeechSupported())
  const [listening, setListening] = useState(false)
  const sessionRef = useRef<SpeechSession | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => () => sessionRef.current?.stop(), [])

  if (!supported) return null

  const setOff = () => {
    setListening(false)
    onListeningChange?.(false)
  }

  const toggle = () => {
    if (listening) {
      sessionRef.current?.stop()
      return
    }
    const session = startListening({
      onTranscript,
      onError: setOff,
      onEnd: setOff,
    })
    if (session) {
      sessionRef.current = session
      setListening(true)
      onListeningChange?.(true)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={listening}
      aria-label={listening ? 'Stop voice input' : 'Speak instead of typing'}
      className={[
        'relative grid h-12 w-12 shrink-0 place-items-center rounded-full transition-colors',
        listening ? 'bg-terracotta text-surface' : 'border border-line bg-surface text-terracotta-d hover:bg-peach/40',
        className,
      ].join(' ')}
    >
      {listening && !reduce && (
        <motion.span
          className="absolute inset-0 rounded-full bg-terracotta/40"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <span className="relative">{listening ? <Square size={18} strokeWidth={2.5} /> : <Mic size={22} strokeWidth={2} />}</span>
    </button>
  )
}
