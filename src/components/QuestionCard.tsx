// One gentle follow-up question at a time, with chip answers. (plan.md §11)
import { ChipSelect } from './ChipSelect'

type Props = {
  prompt: string
  options: readonly string[]
  value?: string
  onAnswer: (option: string) => void
}

export function QuestionCard({ prompt, options, value, onAnswer }: Props) {
  return (
    <div className="rounded-card border border-line bg-surface p-6 shadow-soft">
      <h2 className="mb-5 font-display text-h2 text-ink">{prompt}</h2>
      <ChipSelect stacked options={options} value={value} onChange={onAnswer} />
    </div>
  )
}
