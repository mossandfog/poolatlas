import Image from "next/image"
import Link from "next/link"
import { CalendarCheck, MapPin } from "lucide-react"
import type { Pool } from "@/lib/pool-data"
import { getBookingUrl, BOOKING_REL } from "@/lib/affiliate"

// "Book the pools in this story": every pool a post links to, with a way to check dates.
// Built from the post's own /pools/ links, so it never needs hand upkeep.
export function BookPoolsBox({
  pools,
  title = "Stay at the pools in this story",
  adults,
  dates,
}: {
  pools: Pool[]
  title?: string
  adults?: number
  /** Pre-filled stay for event posts, e.g. Art Basel week. Ignored once the checkout date has passed. */
  dates?: { checkin: string; checkout: string; label: string }
}) {
  if (pools.length === 0) return null
  const stay = dates && new Date(`${dates.checkout}T23:59:59`) > new Date() ? dates : undefined
  return (
    <aside className="my-14 rounded-3xl bg-secondary/50 p-5 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Plan the swim</p>
      <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">{title}</h2>
      {stay && <p className="mt-1.5 text-sm text-muted-foreground">Dates are set for {stay.label}. Change them on the next page.</p>}
      <ul className="mt-5 divide-y divide-border/70">
        {pools.map((pool) => (
          <li key={pool.id} className="flex items-center gap-3 sm:gap-4 py-3.5">
            <Link href={`/pools/${pool.slug}`} className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
              <Image src={pool.image} alt={`${pool.name} at ${pool.hotel}`} fill sizes="64px" className="object-cover" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link href={`/pools/${pool.slug}`} className="block font-semibold leading-snug text-foreground hover:text-primary transition-colors">
                {pool.hotel}
              </Link>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground truncate">
                <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                {pool.location}, {pool.country}
              </p>
            </div>
            <a
              href={getBookingUrl(pool, "blog_box", { adults, checkin: stay?.checkin, checkout: stay?.checkout })}
              target="_blank"
              rel={BOOKING_REL}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <CalendarCheck className="hidden sm:block h-4 w-4" aria-hidden="true" />
              <span>Check dates</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">We may earn a commission when you book through these links, at no cost to you.</p>
    </aside>
  )
}
