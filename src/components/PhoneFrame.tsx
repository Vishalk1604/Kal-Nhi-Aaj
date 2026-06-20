// ---------------------------------------------------------------------------
// PhoneFrame — device bezel wrapper. Centres the app at phone width (390px)
// on larger screens; goes full-bleed on a real phone. Used for the demo too.
// ---------------------------------------------------------------------------

import { type ReactNode } from 'react'
import { Signal, Wifi, BatteryFull } from 'lucide-react'

function StatusBar() {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between px-7 pt-1 text-ink">
      <span className="font-body text-[15px] font-bold tracking-tight">9:41</span>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <Signal size={16} strokeWidth={2.5} />
        <Wifi size={16} strokeWidth={2.5} />
        <BatteryFull size={20} strokeWidth={2} />
      </div>
    </div>
  )
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="app-canvas flex min-h-[100dvh] w-full items-center justify-center sm:p-6">
      <div
        className={[
          'phone relative flex w-full max-w-[390px] flex-col overflow-hidden bg-bg',
          'h-[100dvh] sm:h-[844px] sm:max-h-[94vh]',
          'sm:rounded-[46px] sm:border-[11px] sm:border-ink sm:shadow-soft-lg',
        ].join(' ')}
      >
        <StatusBar />
        <div className="relative min-h-0 flex-1">{children}</div>
      </div>
    </div>
  )
}
