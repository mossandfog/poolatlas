import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, CalendarCheck } from "lucide-react"
import { deals } from "@/lib/deals"
import { pools } from "@/lib/pool-data"
import { BOOKING_REL, getBookingUrl, getHotelBookingUrl } from "@/lib/affiliate"

// A sale at one hotel: the offer, its fine print, the hotel's own deal page, and a Stay22
// "Compare rates" link. Once the booking deadline passes it says so and drops the deal button,
// so an old post never sends readers to an expired sale.

const pad = (n: number) => String(n).padStart(2, "0")
function todayPacific(): string {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles" }).format(new Date()).split("-").map(Number)
  return `${y}-${pad(m)}-${pad(d)}`
}
const daysBetween = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000)
const longDate = (iso: string) =>
  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`))

export function DealCard({ id, tag }: { id: string; tag?: string }) {
  const deal = deals[id]
  if (!deal) return null
  const pool = deal.poolId ? pools.find((p) => p.id === deal.poolId) : undefined
  const name = pool?.hotel ?? deal.hotel?.name
  if (!name) return null

  const ratesUrl = pool
    ? getBookingUrl(pool, "blog_deal", { tag: tag ?? id })
    : getHotelBookingUrl(deal.hotel!, "blog_deal", { tag: tag ?? id })

  const today = todayPacific()
  const left = deal.bookBy ? daysBetween(today, deal.bookBy) : null
  const ended = left !== null && left < 0
  const status = ended
    ? `Sale ended ${longDate(deal.bookBy!)}`
    : left === 0
      ? "Last day to book"
      : left !== null && left <= 7
        ? `Ends in ${left} day${left === 1 ? "" : "s"}`
        : deal.bookBy
          ? `Book by ${longDate(deal.bookBy)}`
          : "Limited time"

  return (
    <section className="not-prose my-8 overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-sm">
      <div className={pool ? "grid sm:grid-cols-[200px_minmax(0,1fr)]" : undefined}>
        {pool ? (
          <Link href={`/pools/${pool.slug}`} className="relative block aspect-[16/9] sm:aspect-auto sm:min-h-full" data-pool-card>
            <Image src={pool.image} alt={`${pool.name} at ${pool.hotel}`} fill sizes="(min-width: 640px) 200px, 100vw" className="object-cover" data-pool-photo />
            <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold tabular-nums text-foreground">
              No. {pool.rank}
            </span>
          </Link>
        ) : null}

        <div className="min-w-0 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.12em]">
            <span className="text-muted-foreground">{deal.place}</span>
            <span className={ended ? "text-muted-foreground" : "text-accent"}>{status}</span>
          </div>
          <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug">
            {pool ? (
              <Link href={`/pools/${pool.slug}`} className="hover:text-primary transition-colors">
                {name}
              </Link>
            ) : (
              name
            )}
          </h3>
          <p className={`mt-2 text-lg font-semibold ${ended ? "text-muted-foreground line-through decoration-1" : "text-primary"}`}>{deal.offer}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">{deal.why}</p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {deal.terms.map((t) => (
              <li key={t} className="flex gap-2">
                <span aria-hidden="true" className="text-primary">·</span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {!ended ? (
              <a
                href={deal.dealUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get the deal
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
            <a
              href={ratesUrl}
              target="_blank"
              rel={BOOKING_REL}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                ended ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-primary/30 text-primary hover:bg-primary/10"
              }`}
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Compare rates
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Checked {longDate(deal.checked)} against {deal.source}. Sale prices change, so confirm the terms before you book.
          </p>
        </div>
      </div>
    </section>
  )
}
