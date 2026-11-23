import type { Pool } from "@/lib/pool-data"
import { BOOKING_REL } from "@/lib/affiliate"
import { bookingClosed, bookingForMonth } from "@/lib/booking"
import { currentMonth, isClosed, monthName, seasonFor } from "@/lib/seasons"

// "When to swim": the next twelve months as tiles. Best months are filled, closed months are
// struck through, and every open month links to rooms for a long weekend that month.
// The reader picks a month here instead of a date range on a booking site. The quick
// "this weekend" offer lives on the Pool Pass just above, so it isn't repeated here.
export function SwimCalendar({ pool }: { pool: Pool }) {
  const season = seasonFor(pool)
  if (!season || bookingClosed(pool)) return null
  const now = currentMonth()
  const months = Array.from({ length: 12 }, (_, i) => ((now - 1 + i) % 12) + 1)
  const yearRound = season.best.length === 12
  const thisYear = Number(new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", year: "numeric" }).format(new Date()))

  return (
    <section aria-labelledby="swim-calendar" className="rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 id="swim-calendar" className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground">
            When to swim
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {yearRound ? "Good all year. " : null}Pick a month to see rooms for a long weekend then.
          </p>
        </div>
      </div>

      <ol className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-6">
        {months.map((m, i) => {
          const best = season.best.includes(m)
          const closed = isClosed(pool, m)
          const monthLink = closed ? null : bookingForMonth(pool, m, "pool_month")
          // This month with no bookable weekend left would roll to next year; leave it unlinked
          const link = i === 0 && monthLink?.stay && monthLink.stay.year !== thisYear ? null : monthLink
          const name = monthName(m)
          const short = name.slice(0, 3)
          const yearMark = m === 1 && i > 0 ? link?.stay?.year : null
          const tone = closed
            ? "border-dashed border-border bg-muted/40 text-muted-foreground line-through decoration-muted-foreground/60"
            : best
              ? "border-primary/30 bg-primary/12 text-foreground hover:bg-primary hover:text-primary-foreground"
              : "border-border text-foreground/80 hover:border-primary/50 hover:text-primary"
          const inner = (
            <>
              <span className="block text-sm font-semibold">{short}</span>
              <span className="mt-1 block text-[11px] leading-none opacity-80">
                {closed ? "Closed" : i === 0 ? "Now" : best ? "Best" : yearMark ?? " "}
              </span>
              {best && !closed ? <span aria-hidden="true" className="absolute inset-x-3 bottom-1.5 h-0.5 rounded-full bg-primary/50" /> : null}
            </>
          )
          return (
            <li key={m}>
              {link ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel={BOOKING_REL}
                  aria-label={`${best ? "Best month. " : ""}See rooms at ${pool.hotel} in ${name}`}
                  className={`relative block rounded-xl border px-2 py-2.5 text-center transition-colors ${tone} ${i === 0 ? "ring-2 ring-primary/40 ring-offset-2 ring-offset-card" : ""}`}
                >
                  {inner}
                </a>
              ) : (
                <span className={`relative block rounded-xl border px-2 py-2.5 text-center ${tone}`} aria-label={`${name}: closed`}>
                  {inner}
                </span>
              )}
            </li>
          )
        })}
      </ol>

      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-primary/30" aria-hidden="true" /> Best months
        </span>
        {months.some((m) => isClosed(pool, m)) ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm border border-dashed border-muted-foreground/60" aria-hidden="true" /> Closed
          </span>
        ) : null}
        <span>Rates come from our booking partner. We may earn a commission, at no cost to you.</span>
      </p>
    </section>
  )
}
