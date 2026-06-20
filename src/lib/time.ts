// ---------------------------------------------------------------------------
// Gentle relative-time phrasing for the returning-user greeting (10.1).
// Deliberately soft and approximate — never a hard timestamp.
// ---------------------------------------------------------------------------

export function relativeWhen(iso?: string): string | undefined {
  if (!iso) return undefined
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return undefined

  const days = Math.floor((Date.now() - then) / 86_400_000)
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return 'a few days ago'
  if (days < 14) return 'last week'
  if (days < 31) return 'a couple of weeks ago'
  return 'a while back'
}
