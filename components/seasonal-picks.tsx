"use client"

import { useMemo, useState } from "react"
import { pools } from "@/lib/pool-data"
import { PoolCard } from "@/components/pool-card"
import { swimmableNow, monthName } from "@/lib/seasons"

const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const FIRST = 8

// Where to swim, month by month. Built from lib/seasons.ts, so every pool is covered
// and the list follows each pool's best months and any seasonal closures.
export function SeasonalPicks({ initialMonth, year }: { initialMonth: number; year: number }) {
  const [month, setMonth] = useState(initialMonth)
  const [showAll, setShowAll] = useState(false)

  const inSeason = useMemo(() => swimmableNow(pools, month), [month])
  const shown = showAll ? inSeason : inSeason.slice(0, FIRST)
  const yearFor = month < initialMonth ? year + 1 : year

  return (
    <section id="seasonal" className="scroll-mt-20 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-foreground">
            Where to swim, month by month
          </h2>
          <p className="mt-2 text-muted-foreground" aria-live="polite">
            {inSeason.length} pools are at their best in {monthName(month)} {yearFor}, ranked. Outdoor pools only, and never a hotel
            that&apos;s closed for the season.
          </p>
        </div>

        {/* Month chips */}
        <div
          role="group"
          aria-label="Choose a month"
          className="flex gap-2 mb-8 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SHORT.map((label, i) => {
            const m = i + 1
            const active = m === month
            return (
              <button
                key={label}
                onClick={() => {
                  setMonth(m)
                  setShowAll(false)
                }}
                aria-pressed={active}
                aria-label={m === initialMonth ? `${monthName(m)}, this month` : monthName(m)}
                className={`relative shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
                {m === initialMonth ? (
                  <span
                    aria-hidden="true"
                    className={`absolute top-1 right-1.5 h-1.5 w-1.5 rounded-full ${active ? "bg-background" : "bg-primary"}`}
                  />
                ) : null}
              </button>
            )
          })}
        </div>

        <div className="pa-surface grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {shown.map((pool) => (
            <PoolCard
              key={pool.id}
              pool={pool}
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
              booking="season_month"
            />
          ))}
        </div>

        {inSeason.length > FIRST && !showAll ? (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-foreground/40 hover:bg-secondary transition-colors"
            >
              Show all {inSeason.length} for {monthName(month)}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
