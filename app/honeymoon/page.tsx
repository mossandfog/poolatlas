import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CalendarHeart } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PoolCard } from "@/components/pool-card"
import { StaysMap } from "@/components/stays-map"
import { Newsletter } from "@/components/newsletter"
import { CookieConsent } from "@/components/cookie-consent"
import { honeymoonChapters, chapterPools, honeymoonCount, HONEYMOON_ADULTS } from "@/lib/honeymoon"
import { blogPosts } from "@/lib/blog-data"
import { getDestinationSearchUrl, getStaysMapSrc, BOOKING_REL } from "@/lib/affiliate"
import { RANKINGS_REVIEWED } from "@/lib/editorial-calendar"

const COVER = "/images/pools/pool-huvafen-fushi-salt-pool.jpg"
const TITLE = "Honeymoon Pools: Hotel Pools Made for Two | Pool Atlas"
const DESCRIPTION =
  "The hotel pools we would book for a honeymoon, from the Santorini caldera and the Amalfi Coast to private plunge pools and a Serengeti waterhole, with the best months for each."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/honeymoon" },
  openGraph: {
    title: "Honeymoon Pools: Hotel Pools Made for Two",
    description: DESCRIPTION,
    images: [{ url: `https://poolatlas.io${COVER}` }],
  },
}

const RELATED = ["best-hotel-pools-for-honeymoons", "best-hotel-pools-greece", "best-hotel-pools-italy", "best-hotel-pools-maldives"]

const tips = [
  {
    title: "Say it's your honeymoon",
    text: "Mention it when you book, and again at check-in. It costs nothing, and hotels like this tend to notice.",
  },
  {
    title: "Read the pool rules",
    text: "Some resorts keep one pool for grown-ups, a few set age limits only at certain hours, and the 21-and-over pools mean it. Check before you count on a quiet deck.",
  },
  {
    title: "Villa pool or the famous one?",
    text: "A plunge pool on your terrace is private. The main pool is usually where the view is. If you can't choose, split the stay: a few nights in each.",
  },
  {
    title: "Book the flexible rate",
    text: "Wedding plans move. A refundable rate costs a little more and buys a lot of calm while the big day comes together.",
  },
]

export default function HoneymoonPage() {
  const chapters = honeymoonChapters.map((c) => ({ ...c, pools: chapterPools(c) })).filter((c) => c.pools.length > 0)
  const related = RELATED.map((s) => blogPosts.find((p) => p.slug === s)).filter(
    (p): p is (typeof blogPosts)[number] => Boolean(p),
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Honeymoon Pools",
    description: DESCRIPTION,
    itemListElement: chapters
      .flatMap((c) => c.pools)
      .map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://poolatlas.io/pools/${p.slug}`,
        name: `${p.name}, ${p.hotel}`,
      })),
  }

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      {/* Cover */}
      <section className="relative pt-16">
        <div className="relative h-[58vh] min-h-[380px] max-h-[640px] overflow-hidden bg-muted">
          <Image
            src={COVER}
            alt="A round infinity pool on a stone platform above the Indian Ocean at Huvafen Fushi in the Maldives"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
        <div className="relative -mt-36 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-primary">
            <Link href="/explore#categories" className="hover:underline underline-offset-4">Explore</Link>
            <span className="text-muted-foreground"> / Honeymoons</span>
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.02] text-foreground text-balance">
            Honeymoon pools
          </h1>
          <p className="mt-4 text-sm text-muted-foreground tabular-nums">
            {honeymoonCount} pools for two · Rankings reviewed {RANKINGS_REVIEWED}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <div className="space-y-5 text-lg leading-relaxed text-foreground/85 max-w-3xl text-pretty">
          <p>
            On a honeymoon the pool stops being an amenity and becomes the plan. Long mornings, a late swim, a drink at the edge
            while the light goes. So we went back through our rankings and pulled the pools we would book for two.
          </p>
          <p>
            They're sorted by the kind of trip you have in mind, each with the months that work best. Every booking link is set
            for two travelers, so the prices you see are the ones you'd pay.
          </p>
        </div>
        <nav aria-label="Kinds of honeymoon" className="mt-8 flex flex-wrap gap-2">
          {chapters.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-foreground/40 hover:bg-secondary transition-colors"
            >
              {c.name}
            </a>
          ))}
        </nav>
      </section>

      {/* Chapters */}
      {chapters.map((c) => (
        <section key={c.id} id={c.id} className="scroll-mt-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
            <div className="mb-8 lg:mb-0">
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-foreground text-balance">
                {c.name}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed max-w-md">{c.intro}</p>
              <p className="mt-5 flex gap-2 text-sm leading-relaxed text-foreground max-w-md">
                <CalendarHeart className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="font-semibold">When to go: </span>
                  {c.when}
                </span>
              </p>
              {c.area ? (
                <a
                  href={getDestinationSearchUrl(c.area, "honeymoon_area", { adults: HONEYMOON_ADULTS })}
                  target="_blank"
                  rel={BOOKING_REL}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
                >
                  Compare stays {c.inPlace ?? `in ${c.area.split(",")[0]}`}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
            <div>
              <div className="pa-surface grid grid-cols-2 gap-4 sm:gap-6">
                {c.pools.map((p) => (
                  <div key={p.id}>
                    <PoolCard
                      pool={p}
                      sizes="(min-width: 1024px) 28vw, 45vw"
                      booking="honeymoon_card"
                      adults={HONEYMOON_ADULTS}
                    />
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-4">{p.description}</p>
                  </div>
                ))}
              </div>
              {c.map ? (
                <div className="mt-12">
                  <StaysMap
                    level={3}
                    src={getStaysMapSrc(
                      { lat: c.map.lat, lng: c.map.lng },
                      { placement: "honeymoon_map", tag: `honeymoon_${c.id}`, venue: c.map.venue, adults: HONEYMOON_ADULTS },
                    )}
                    title={`More places to stay ${c.inPlace ?? "nearby"}`}
                    intro="If the hotels above are full for your dates, the map shows what's open nearby, priced for two."
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      {/* How to book it */}
      <section className="bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-foreground">
            Booking a honeymoon pool
          </h2>
          <dl className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tips.map((t) => (
              <div key={t.title} className="rounded-2xl border border-border bg-card p-5">
                <dt className="font-[family-name:var(--font-display)] font-semibold text-foreground">{t.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs text-muted-foreground">
            We may earn a commission when you book through the links on this page, at no cost to you. It never decides what we pick.
          </p>
        </div>
      </section>

      {/* Related reading */}
      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-foreground">
              From The Deep End
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                    <Image src={post.image} alt="" fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wide text-primary">{post.category}</p>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
      <Footer />
      <CookieConsent />
    </main>
  )
}
