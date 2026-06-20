// ---------------------------------------------------------------------------
// Share helpers — connection happens through the user's OWN apps (WhatsApp /
// the native share sheet / clipboard). No backend, nothing auto-sent. Every
// call must originate from a user gesture (tap). (plan: care circle, 10.5)
// ---------------------------------------------------------------------------

/** The app's own URL, so a nudged friend can open the same flow. */
export function appUrl(): string {
  if (typeof window === 'undefined') return ''
  return window.location.origin + window.location.pathname
}

export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export type ShareResult = 'shared' | 'whatsapp' | 'copied' | 'failed'

/**
 * Prefer the native share sheet (gives WhatsApp, SMS, etc.); otherwise open
 * WhatsApp web; otherwise copy to clipboard. Returns which path was taken.
 */
export async function shareOrFallback(opts: { title?: string; text: string }): Promise<ShareResult> {
  const { title, text } = opts

  const nav = navigator as Navigator & { share?: (data: ShareData) => Promise<void> }
  if (typeof nav.share === 'function') {
    try {
      await nav.share({ title, text })
      return 'shared'
    } catch {
      // user cancelled or share failed — fall through to other options
    }
  }

  try {
    window.open(buildWhatsAppUrl(text), '_blank', 'noopener,noreferrer')
    return 'whatsapp'
  } catch {
    // popup blocked — fall through
  }

  try {
    await navigator.clipboard.writeText(text)
    return 'copied'
  } catch {
    return 'failed'
  }
}
