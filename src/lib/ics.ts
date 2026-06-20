// ---------------------------------------------------------------------------
// Build + download a .ics calendar event for the if-then plan. This is the
// RELIABLE reminder path (works even when the app is closed; cross-device).
// All client-side — nothing is uploaded. (plan.md §10.4)
// ---------------------------------------------------------------------------

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

/** Floating local time stamp: YYYYMMDDTHHMMSS (no TZ → the user's calendar
 *  treats it as local, which is what we want for "Saturday 9:15"). */
function fmtLocal(d: Date): string {
  return (
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
    `T${pad(d.getHours())}${pad(d.getMinutes())}00`
  )
}

function fmtUtc(d: Date): string {
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  )
}

function parseTime(time?: string): { h: number; m: number } | null {
  if (!time) return null
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i)
  if (!match) return null
  let h = parseInt(match[1], 10)
  const m = parseInt(match[2], 10)
  const ap = match[3]?.toUpperCase()
  if (ap === 'PM' && h < 12) h += 12
  if (ap === 'AM' && h === 12) h = 0
  return { h, m }
}

/** Turn the chosen cue + time into a concrete Date. Conservative: never in the
 *  past — nudges forward to the next sensible occurrence. */
export function planToDate(cue?: string, time?: string, now: Date = new Date()): Date {
  const base = new Date(now)
  base.setSeconds(0, 0)
  const target = new Date(base)
  const c = (cue ?? '').toLowerCase()

  if (c.includes('saturday')) {
    const add = ((6 - target.getDay()) + 7) % 7 || 7 // next Saturday (not today)
    target.setDate(target.getDate() + add)
  } else if (c.includes('tomorrow')) {
    target.setDate(target.getDate() + 1)
  } // "tonight" / "lunch break" / default → today

  const t = parseTime(time)
  target.setHours(t ? t.h : 9, t ? t.m : 0, 0, 0)

  // If that moment has already passed today, push to tomorrow.
  if (target.getTime() <= base.getTime()) target.setDate(target.getDate() + 1)
  return target
}

function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

export type IcsEvent = {
  start: Date
  durationMinutes?: number
  summary: string
  description?: string
  alarmMinutesBefore?: number
}

export function buildIcs(ev: IcsEvent): string {
  const end = new Date(ev.start.getTime() + (ev.durationMinutes ?? 30) * 60_000)
  const uid = `${fmtUtc(new Date())}-${Math.random().toString(36).slice(2, 8)}@kal-nahi-aaj`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kal Nahi Aaj//Health check-in//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${fmtUtc(new Date())}`,
    `DTSTART:${fmtLocal(ev.start)}`,
    `DTEND:${fmtLocal(end)}`,
    `SUMMARY:${escapeText(ev.summary)}`,
  ]
  if (ev.description) lines.push(`DESCRIPTION:${escapeText(ev.description)}`)
  if (ev.alarmMinutesBefore != null) {
    lines.push(
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeText(ev.summary)}`,
      `TRIGGER:-PT${ev.alarmMinutesBefore}M`,
      'END:VALARM',
    )
  }
  lines.push('END:VEVENT', 'END:VCALENDAR')
  return lines.join('\r\n')
}

/** Trigger a browser download of the .ics file. Returns false if blocked. */
export function downloadIcs(filename: string, content: string): boolean {
  try {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    return true
  } catch {
    return false
  }
}
