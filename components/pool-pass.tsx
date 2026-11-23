import { ArrowUpRight } from "lucide-react"
import type { Pool } from "@/lib/pool-data"
import { BOOKING_REL, type Placement } from "@/lib/affiliate"
import { bookingFor, bookingThisWeekend, shortDate, type BookingLink } from "@/lib/booking"

// A booking callout drawn as a ticket: the dates are already filled in, so the reader
// only has to say yes. In season it offers this weekend; otherwise the pool's best month,
// or its reopening. Prices and availability always come from the booking site, never from us.
export function PoolPass({ pool, placement, className = "" }: { pool: Pool; placement: Placement; className?: string }) {
  const link: BookingLink | null = bookingThisWeekend(pool, placement) ?? bookingFor(pool, placement)
  if (!link) return null
  const stay = link.stay
  const kicker =
    link.kind === "weekend" ? "Swim here this weekend" : link.kind === "reopen" ? "First swims of the season" : link.kind === "season" ? `At its best in ${link.short}` : "Swim here"

  return (
    <a
      href={link.href}
      target="_blank"
      rel={BOOKING_REL}
      className={`group relative flex items-stretch overflow-hidden rounded-2xl border border-primary/25 bg-card text-foreground shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      <span className="flex w-12 sm:w-20 shrink-0 items-center justify-center bg-primary text-primary-foreground">
        <span className="-rotate-90 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.22em]">Pool pass</span>
      </span>
      {/* Perforation, with notches cut from the ticket edge */}
      <span aria-hidden="true" className="relative w-0 border-l-2 border-dashed border-primary/30">
        <span className="absolute -top-2.5 -left-2.5 h-5 w-5 rounded-full border border-primary/25 bg-background" />
        <span className="absolute -bottom-2.5 -left-2.5 h-5 w-5 rounded-full border border-primary/25 bg-background" />
      </span>
      <span className="min-w-0 flex-1 px-4 py-4 sm:px-5">
        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-primary">{kicker}</span>
        <span className="mt-1 block font-[family-name:var(--font-display)] text-lg font-semibold leading-snug line-clamp-2">{pool.hotel}</span>
        {stay ? (
          <span className="mt-1 block text-sm text-muted-foreground">
            {shortDate(stay.checkin)} to {shortDate(stay.checkout)}
          </span>
        ) : (
          <span className="mt-1 block text-sm text-muted-foreground">Pick your dates on the next page</span>
        )}
      </span>
      <span className="flex shrink-0 items-center pr-4 sm:pr-5">
        <span className="inline-flex h-10 w-10 sm:h-auto sm:w-auto items-center justify-center gap-1 rounded-full bg-primary sm:px-3.5 sm:py-2 text-sm font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90">
          <span className="sr-only sm:not-sr-only">See rates</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </span>
    </a>
  )
}
