// 09 · One easy next step — a real, low-friction path to a human; never a dead end. (plan.md §10)
import { useJourney } from '../app/useJourney'
import { ScreenShell } from '../components/ScreenShell'
import { ProgressHint } from '../components/ProgressHint'
import { PrimaryButton } from '../components/PrimaryButton'
import { TextButton } from '../components/TextButton'
import { NextStepCard } from '../components/NextStepCard'
import { NEXT_STEPS } from '../content/nextSteps'
import { copy } from '../content/copy.en'

export function NextStep() {
  const { journey, patch, next, back, goTo } = useJourney()
  const chosen = journey.chosenStep
  const type = journey.motivation?.type ?? 'self'

  return (
    <ScreenShell
      onBack={back}
      progress={<ProgressHint />}
      footer={
        <div className="space-y-2">
          <PrimaryButton onClick={next} disabled={!chosen}>
            {copy.nextStep.cta}
          </PrimaryButton>
          <div className="flex justify-center">
            <TextButton onClick={() => goTo('notready')}>{copy.nextStep.notReady}</TextButton>
          </div>
        </div>
      }
    >
      <div className="pt-2">
        <h1 className="font-display text-display-sm text-ink">{copy.nextStep.title}</h1>
        <p className="mt-2 font-body text-body text-ink-soft">{copy.nextStep.sub}</p>

        {/* Masculinity-aware reframe (10.3) — taking the step is the strong move */}
        <p className="mt-4 rounded-card bg-peach/40 px-4 py-3 font-body text-body font-bold text-terracotta-d">
          {copy.strength.act(type)}
        </p>

        <div className="mt-5 space-y-3">
          {NEXT_STEPS.map((option) => (
            <NextStepCard
              key={option.id}
              option={option}
              selected={chosen === option.id}
              onSelect={() => patch({ chosenStep: option.id })}
            />
          ))}
        </div>
      </div>
    </ScreenShell>
  )
}
