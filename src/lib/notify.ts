// ---------------------------------------------------------------------------
// Notification API helpers — the BONUS reminder path (a demo flourish).
// Honest limitation: browser notifications only reliably fire while the tab is
// open; true scheduled push needs a service worker + backend (out of scope).
// So .ics (lib/ics.ts) is the dependable path. (plan.md §10.4)
// ---------------------------------------------------------------------------

export type Permission = NotificationPermission | 'unsupported'

export function notificationsSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window
}

export function currentPermission(): Permission {
  return notificationsSupported() ? Notification.permission : 'unsupported'
}

export async function requestNotificationPermission(): Promise<Permission> {
  if (!notificationsSupported()) return 'unsupported'
  try {
    return await Notification.requestPermission()
  } catch {
    return 'denied'
  }
}

export function fireNotification(title: string, body: string): boolean {
  if (!notificationsSupported() || Notification.permission !== 'granted') return false
  try {
    new Notification(title, { body })
    return true
  } catch {
    return false
  }
}

/** Demo: fire a sample ping shortly, so the user sees what it looks like.
 *  (Real plan-time scheduling can't fire when the tab is closed.) */
export function scheduleDemoPing(delayMs: number, title: string, body: string): number {
  return window.setTimeout(() => fireNotification(title, body), delayMs)
}
