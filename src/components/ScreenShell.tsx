// ---------------------------------------------------------------------------
// ScreenShell — the layout every screen shares:
//   • optional top bar (back button · center progress · right slot)
//   • scrollable content area (with room to scroll clear of the CTA)
//   • a CTA region that the content softly dissolves into (blur + masked wash)
//   • an optional ambient warm glow behind focal screens, for quiet life
// Generous padding, one focal element per screen (plan.md §8).
// ---------------------------------------------------------------------------

import { type ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'

type ScreenShellProps = {
  children: ReactNode
  footer?: ReactNode
  onBack?: () => void
  progress?: ReactNode
  headerRight?: ReactNode
  /** Vertically centre the content (focal screens). Default top-aligned. */
  center?: boolean
  /** Optional background override (e.g. the warm peach affirmation field). */
  bgClass?: string
  /** Soft drifting glow behind the content. Defaults on for centred (focal) screens. */
  ambient?: boolean
  contentClassName?: string
}

export function ScreenShell({
  children,
  footer,
  onBack,
  progress,
  headerRight,
  center = false,
  bgClass = 'bg-bg',
  ambient,
  contentClassName = '',
}: ScreenShellProps) {
  const hasHeader = Boolean(onBack || progress || headerRight)
  const showAmbient = ambient ?? center

  return (
    <div className={`relative flex h-full flex-col overflow-hidden ${bgClass}`}>
      {/* Ambient comfort — barely-there warmth that drifts behind focal screens. */}
      {showAmbient && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <span className="absolute -left-20 top-8 h-56 w-56 rounded-full bg-peach/30 blur-3xl animate-drift-a" />
          <span className="absolute -right-24 bottom-16 h-64 w-64 rounded-full bg-sage/15 blur-3xl animate-drift-b" />
        </div>
      )}

      {hasHeader && (
        <header className="relative z-10 flex min-h-[52px] shrink-0 items-center justify-between gap-2 px-screen pt-1">
          <div className="flex w-10 justify-start">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                aria-label="Go back"
                className="grid h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 active:bg-ink/10"
              >
                <ChevronLeft size={24} strokeWidth={2.5} />
              </button>
            )}
          </div>
          <div className="flex min-w-0 flex-1 justify-center">{progress}</div>
          <div className="flex w-10 justify-end">{headerRight}</div>
        </header>
      )}

      <div
        className={[
          'scroll-area relative z-10 min-h-0 flex-1 overflow-y-auto px-screen',
          hasHeader ? 'pt-2' : 'pt-4',
          center ? 'flex flex-col justify-center' : '',
          // leave room so the last line can scroll up clear of the dissolving CTA
          footer ? 'pb-36' : center ? 'pb-2' : 'pb-5',
          contentClassName,
        ].join(' ')}
      >
        {children}
      </div>

      {/* CTA region: the content dissolves into it (a masked backdrop blur + a
          masked wash of the screen's own bg) instead of meeting a hard line. */}
      {footer && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
          <div className="footer-fade-blur absolute inset-0" aria-hidden="true" />
          <div className={`footer-fade-wash absolute inset-0 ${bgClass}`} aria-hidden="true" />
          <div className="pointer-events-auto relative px-screen pb-7 pt-12">{footer}</div>
        </div>
      )}
    </div>
  )
}
