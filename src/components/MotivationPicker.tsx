// ---------------------------------------------------------------------------
// MotivationPicker — warm illustrated avatars (kids, parents, partner, self,
// work/dream, other) OR "Use a photo" from the gallery (downscaled + stored
// on-device). Writes journey.motivation. The photo reappears, blurred, behind
// the Understand step (the signature). (plan.md §10.2)
// ---------------------------------------------------------------------------

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, RefreshCw, ImageOff, Loader2 } from 'lucide-react'
import { AVATARS, type AvatarOption } from '../content/avatars'
import { fileToDownscaledDataUrl } from '../lib/image'
import { copy } from '../content/copy.en'

type Props = {
  value?: string // selected avatar id
  photoDataUrl?: string
  onSelect: (option: AvatarOption) => void
  onPhoto: (dataUrl: string) => void
  onRemovePhoto: () => void
}

export function MotivationPicker({ value, photoDataUrl, onSelect, onPhoto, onRemovePhoto }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = '' // allow re-picking the same file
    if (!file) return
    setBusy(true)
    try {
      const url = await fileToDownscaledDataUrl(file)
      onPhoto(url)
    } catch {
      // ignore — the user can simply pick an avatar instead
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {AVATARS.map((opt) => {
          const selected = value === opt.id
          const showPhoto = selected && photoDataUrl
          return (
            <motion.button
              key={opt.id}
              type="button"
              aria-pressed={selected}
              aria-label={opt.caption}
              onClick={() => onSelect(opt)}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className={[
                'flex flex-col items-center gap-2 rounded-card border p-3 transition-colors',
                selected ? 'border-terracotta bg-peach/50 shadow-soft' : 'border-line bg-surface hover:bg-peach/30',
              ].join(' ')}
            >
              {showPhoto ? (
                <img
                  src={photoDataUrl}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-terracotta/40"
                />
              ) : (
                <span
                  className="grid h-14 w-14 place-items-center rounded-full"
                  style={{ backgroundColor: opt.bg, color: opt.fg }}
                >
                  <opt.Icon size={26} strokeWidth={2.2} aria-hidden="true" />
                </span>
              )}
              <span className="text-center font-body text-caption font-bold leading-tight text-ink">
                {opt.caption}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Use a photo */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />

      {photoDataUrl ? (
        <div className="mt-4 flex items-center gap-3 rounded-card border border-line bg-surface p-3 shadow-soft">
          <img src={photoDataUrl} alt="Your chosen photo" className="h-12 w-12 rounded-full object-cover" />
          <div className="flex flex-1 flex-wrap gap-x-4 gap-y-1">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 font-body text-caption font-bold text-terracotta-d hover:underline"
            >
              <RefreshCw size={14} strokeWidth={2.4} aria-hidden="true" />
              {copy.motivation.photoChange}
            </button>
            <button
              type="button"
              onClick={onRemovePhoto}
              className="inline-flex items-center gap-1.5 font-body text-caption font-bold text-ink-soft hover:underline"
            >
              <ImageOff size={14} strokeWidth={2.4} aria-hidden="true" />
              {copy.motivation.photoRemove}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="mt-4 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-card border-2 border-dashed border-line font-body text-body font-bold text-terracotta-d transition-colors hover:bg-peach/30 disabled:opacity-60"
        >
          {busy ? (
            <Loader2 size={20} strokeWidth={2.2} className="animate-spin" aria-hidden="true" />
          ) : (
            <Camera size={20} strokeWidth={2.2} aria-hidden="true" />
          )}
          {copy.motivation.photoCta}
        </button>
      )}

      <p className="mt-2 flex items-center justify-center gap-1.5 font-body text-caption text-ink-soft">
        {copy.motivation.photoNote}
      </p>
    </div>
  )
}
