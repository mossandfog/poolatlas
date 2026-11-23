/**
 * Which dates a booking link should open on, and what its button should say.
 *
 * A blank search makes the reader do the hardest part (pick dates) on someone else's site.
 * We already know each pool's best months and closures (lib/seasons.ts), so:
 *   - in season now, or year-round: no dates, "Check dates" (they're likely planning soon)
 *   - open but out of season: dates in the next best month, "Check June dates"
 *   - closed for the season: dates on reopening, "Book for May"
 *   - closed with no reopening date: no link at all
 * Stays are Friday to Monday on the second weekend of the month: a long weekend is the most
 * common pool trip, and the reader can change it in one tap on the next page.
 */
import type { Pool } from "@/lib/pool-data"
import { getBookingUrl, type Placement } from "@/lib/affiliate"
import { currentMonth, isClosed, isInSeason, monthName, reopeningStay, seasonFor } from "@/lib/seasons"

type PoolLike = Pick<Pool, "id" | "slug" | "hotel" | "location" | "country">

export interface Stay {
  checkin: string
  checkout: string
  month: number
  year: number
}

export interface BookingLink {
  href: string
  /** Button text, e.g. "Check dates", "Check June dates", "Book for May" */
  label: string
  /** Short form for tight spots, e.g. "Dates", "June", "May" */
  short: string
  kind: "open" | "season" | "reopen" | "month" | "weekend"
  stay?: Stay
}

const pad = (n: number) => String(n).padStart(2, "0")
const iso = (d: Date) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`

/** Today's date in Pacific time, as a UTC-midnight Date so day math stays simple */
function today(now = new Date()): Date {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles" }).format(now).split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000)

/** First Friday on or after `d` */
function fridayFrom(d: Date): Date {
  return addDays(d, (5 - d.getUTCDay() + 7) % 7)
}

/** A Friday to Monday stay in the next `month` that's still bookable (at least 3 days out) */
export function stayInMonth(month: number, now = new Date()): Stay {
  const t = today(now)
  const soonest = addDays(t, 3)
  let year = t.getUTCFullYear()
  if (month < t.getUTCMonth() + 1) year += 1
  for (let i = 0; i < 2; i++) {
    const secondFriday = addDays(fridayFrom(new Date(Date.UTC(year, month - 1, 1))), 7)
    let checkin = secondFriday >= soonest ? secondFriday : fridayFrom(soonest)
    if (checkin.getUTCMonth() + 1 === month && checkin.getUTCFullYear() === year) {
      return { checkin: iso(checkin), checkout: iso(addDays(checkin, 3)), month, year }
    }
    year += 1
  }
  // Unreachable in practice; fall back to next year's second Friday
  const f = addDays(fridayFrom(new Date(Date.UTC(year, month - 1, 1))), 7)
  return { checkin: iso(f), checkout: iso(addDays(f, 3)), month, year }
}

/** The coming weekend, Friday to Sunday (next week's if Friday is less than a day away) */
export function thisWeekend(now = new Date()): Stay {
  const f = fridayFrom(addDays(today(now), 1))
  return { checkin: iso(f), checkout: iso(addDays(f, 2)), month: f.getUTCMonth() + 1, year: f.getUTCFullYear() }
}

/** The next best month for a pool that isn't in season now, skipping months it's closed */
export function nextBestMonth(pool: Pick<Pool, "id">, now = new Date()): number | null {
  const s = seasonFor(pool)
  if (!s || s.best.length === 0 || s.best.length === 12) return null
  let m = currentMonth(now)
  for (let i = 0; i < 12; i++) {
    m = m === 12 ? 1 : m + 1
    if (s.best.includes(m) && !isClosed(pool, m, now)) return m
  }
  return null
}

/** True when a pool is shut with no reopening date (a renovation): show no booking link at all */
export function bookingClosed(pool: Pick<Pool, "id">, now = new Date()): boolean {
  return isClosed(pool, currentMonth(now), now) && !reopeningStay(pool, now)
}

/** The right booking link for a pool today. Null when the hotel is closed with no reopening date. */
export function bookingFor(
  pool: PoolLike,
  placement: Placement,
  opts: { adults?: number; tag?: string; now?: Date } = {},
): BookingLink | null {
  const now = opts.now ?? new Date()
  const base = { adults: opts.adults, tag: opts.tag }
  const reopening = reopeningStay(pool, now)
  if (reopening) {
    const name = monthName(reopening.month)
    return {
      href: getBookingUrl(pool, placement, { ...base, checkin: reopening.checkin, checkout: reopening.checkout }),
      label: `Book for ${name}`,
      short: name,
      kind: "reopen",
      stay: { checkin: reopening.checkin, checkout: reopening.checkout, month: reopening.month, year: reopening.year },
    }
  }
  if (bookingClosed(pool, now)) return null
  const best = isInSeason(pool, currentMonth(now)) ? null : nextBestMonth(pool, now)
  if (best) {
    const stay = stayInMonth(best, now)
    const name = monthName(best)
    return {
      href: getBookingUrl(pool, placement, { ...base, checkin: stay.checkin, checkout: stay.checkout }),
      label: `Check ${name} dates`,
      short: name,
      kind: "season",
      stay,
    }
  }
  return { href: getBookingUrl(pool, placement, base), label: "Check dates", short: "Dates", kind: "open" }
}

/** A link for a stay in a chosen month (the month picker, the pool page calendar) */
export function bookingForMonth(
  pool: PoolLike,
  month: number,
  placement: Placement,
  opts: { adults?: number; now?: Date } = {},
): BookingLink | null {
  const now = opts.now ?? new Date()
  if (bookingClosed(pool, now)) return null
  const stay = stayInMonth(month, now)
  if (isClosed(pool, month, now)) return null
  const name = monthName(month)
  return {
    href: getBookingUrl(pool, placement, { adults: opts.adults, checkin: stay.checkin, checkout: stay.checkout }),
    label: `Check ${name} dates`,
    short: name,
    kind: "month",
    stay,
  }
}

/** This weekend, for pools that are in season right now */
export function bookingThisWeekend(pool: PoolLike, placement: Placement, now = new Date()): BookingLink | null {
  if (!isInSeason(pool, currentMonth(now))) return null
  const stay = thisWeekend(now)
  if (isClosed(pool, stay.month, now)) return null
  return {
    href: getBookingUrl(pool, placement, { checkin: stay.checkin, checkout: stay.checkout }),
    label: "This weekend",
    short: "Weekend",
    kind: "weekend",
    stay,
  }
}

/** "Fri, Dec 12" style label for a check-in date */
export function shortDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number)
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  )
}
