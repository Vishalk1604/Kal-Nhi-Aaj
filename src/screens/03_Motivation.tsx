// 03 · Motivation — self-affirmation BEFORE any health content. (plan.md §10, 10.2)
import { useJourney } from '../app/useJourney'
import { ScreenShell } from '../components/ScreenShell'
import { ProgressHint } from '../components/ProgressHint'
import { PrimaryButton } from '../components/PrimaryButton'
import { MotivationPicker } from '../components/MotivationPicker'
import { copy } from '../content/copy.en'

export function Motivation() {
  const { journey, patch, next, back } = useJourney()
  const motivation = journey.motivation
  const canContinue = Boolean(motivation?.avatarId || motivation?.photoDataUrl)

  return (
    <ScreenShell
      onBack={back}
      progress={<ProgressHint />}
      footer={
        <PrimaryButton onClick={next} disabled={!canContinue}>
          {copy.motivation.cta}
        </PrimaryButton>
      }
    >
      <div className="pt-2">
        <p className="font-body text-body font-bold text-terracotta-d">{copy.motivation.title}</p>
        <h1 className="mt-1 text-balance font-display text-display-sm text-ink">
          {copy.motivation.question}
        </h1>
        <p className="mt-2 font-body text-body text-ink-soft">{copy.motivation.helper}</p>

        <div className="mt-7">
          <MotivationPicker
            value={motivation?.avatarId}
            photoDataUrl={motivation?.photoDataUrl}
            onSelect={(opt) =>
              patch({ motivation: { type: opt.type, label: opt.label, avatarId: opt.id } })
            }
            onPhoto={(dataUrl) =>
              patch({
                motivation: motivation
                  ? { ...motivation, photoDataUrl: dataUrl }
                  : { type: 'other', label: copy.motivation.photoFallbackLabel, photoDataUrl: dataUrl },
              })
            }
            onRemovePhoto={() =>
              motivation && patch({ motivation: { ...motivation, photoDataUrl: undefined } })
            }
          />
        </div>
      </div>
    </ScreenShell>
  )
}
