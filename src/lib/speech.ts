// ---------------------------------------------------------------------------
// Thin wrapper around the Web Speech API (SpeechRecognition). Feature-detected
// so the UI can hide voice where it's unsupported. Honest note for the UI:
// browser speech recognition streams audio to the browser's speech service —
// it is NOT fully on-device. Everything else in the app stays local.
// ---------------------------------------------------------------------------

// Minimal typings — the DOM lib doesn't ship SpeechRecognition types.
type SpeechRecognitionResultLike = { transcript: string }
type SpeechRecognitionEventLike = {
  resultIndex: number
  results: ArrayLike<ArrayLike<SpeechRecognitionResultLike> & { isFinal: boolean }>
}
type SpeechRecognitionLike = {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((e: SpeechRecognitionEventLike) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
}

function getCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike
    webkitSpeechRecognition?: new () => SpeechRecognitionLike
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export function isSpeechSupported(): boolean {
  return getCtor() !== null
}

export type SpeechHandlers = {
  /** Live transcript (interim + final), suitable for streaming into a field. */
  onTranscript: (text: string, isFinal: boolean) => void
  onError?: (error: string) => void
  onEnd?: () => void
}

export type SpeechSession = { stop: () => void }

/** Start listening. Returns a session you can stop, or null if unsupported. */
export function startListening(handlers: SpeechHandlers, lang = 'en-IN'): SpeechSession | null {
  const Ctor = getCtor()
  if (!Ctor) return null

  const recognition = new Ctor()
  recognition.lang = lang
  recognition.continuous = true
  recognition.interimResults = true

  recognition.onresult = (e) => {
    let interim = ''
    let final = ''
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const result = e.results[i]
      const text = result[0]?.transcript ?? ''
      if (result.isFinal) final += text
      else interim += text
    }
    if (final) handlers.onTranscript(final, true)
    else if (interim) handlers.onTranscript(interim, false)
  }
  recognition.onerror = (e) => handlers.onError?.(e.error)
  recognition.onend = () => handlers.onEnd?.()

  try {
    recognition.start()
  } catch {
    // start() throws if already started — treat as a no-op.
  }

  return { stop: () => recognition.stop() }
}
