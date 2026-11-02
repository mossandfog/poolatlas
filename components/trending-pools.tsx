import Link from "next/link"
import { pools } from "@/lib/pool-data"
import { PoolCard } from "@/components/pool-card"
import { bookingNow, type Edition } from "@/lib/editorial-calendar"
import { swimmableNow } from "@/lib/seasons"

// Picks rotate monthly from lib/editorial-calendar.ts
export function TrendingPools({ edition }: { edition: Edition }) {
  const inSeason = swimmableNow(pools, edition.month + 1).length
  const booking = bookingNow[edition.month] ?? []
  const picks = edition.pickIds
    .map(id => pools.find(p => p.id === id))
    .filter((p): p is (typeof pools)[number] => Boolean(p))

  return (
    <section id="picks" className="scroll-mt-20 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-foreground">
            Where to swim in {edition.monthName}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl">{edition.picksWhy}. Chosen by our editors for this month.</p>
        </div>
        <Link href="/explore#seasonal" className="text-sm font-medium text-primary hover:underline underline-offset-4">
          All {inSeason} pools in season this month
        </Link>
      </div>

      {/* Swipe row on phones, five across on desktop */}
      <div className="mt-8 max-w-7xl mx-auto">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 px-4 pb-2 sm:px-6 lg:px-8 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {picks.map((pool) => (
            <div key={pool.id} className="w-[72%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
              <PoolCard pool={pool} />
            </div>
          ))}
        </div>
      </div>

      {/* Booking now: the trips worth booking this month, from guides we already have */}
      {booking.length > 0 ? (
        <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Booking now"
            className="flex flex-col gap-3 border-y border-border py-5 sm:flex-row sm:items-center sm:gap-6"
          >
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Booking now for later
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {booking.map((b) => (
                <li key={b.href}>
                  <Link
                    href={b.href}
                    className="font-[family-name:var(--font-display)] text-base font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-[6px] hover:text-primary transition-colors"
                  >
                    {b.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </section>
  )
}
