import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PoolCard } from "@/components/pool-card"
import { Newsletter } from "@/components/newsletter"
import { CookieConsent } from "@/components/cookie-consent"
import { destinations, getDestination, poolsFor, coverImage } from "@/lib/destinations"
import { pools } from "@/lib/pool-data"
import { blogPosts } from "@/lib/blog-data"
import { RANKINGS_REVIEWED } from "@/lib/editorial-calendar"

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const d = getDestination(slug)
  if (!d) return { title: "Destination not found | Pool Atlas" }
  return {
    title: d.title,
    description: d.description,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: {
      title: d.title,
      description: d.description,
      images: [{ url: `https://poolatlas.io${coverImage(d)}` }],
    },
  }
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params
  const d = getDestination(slug)
  if (!d) notFound()

  const ranked = poolsFor(d)
  const byId = (id: number) => pools.find((p) => p.id === id)
  const related = (d.relatedPosts ?? [])
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter((p): p is (typeof blogPosts)[number] => Boolean(p))
  const others = destinations.filter((x) => x.slug !== d.slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: d.title.replace(" | Pool Atlas", ""),
    itemListElement: ranked.map((p, i) => ({
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
          <Image src={coverImage(d)} alt={`A hotel pool in ${d.name}`} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
        <div className="relative -mt-36 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-primary">
            <Link href="/explore#destinations" className="hover:underline underline-offset-4">Destinations</Link>
            <span className="text-muted-foreground"> / {d.name}</span>
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.02] text-foreground text-balance">
            The best hotel pools in {d.name}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground tabular-nums">
            {ranked.length} ranked {ranked.length === 1 ? "pool" : "pools"} · Rankings reviewed {RANKINGS_REVIEWED}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="space-y-5 text-lg leading-relaxed text-foreground/85 max-w-3xl text-pretty">
          {d.intro.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
      </section>

      {/* When to go */}
      {d.whenToGo && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-foreground">
            When to go
          </h2>
          <dl className="mt-6 grid gap-4 md:grid-cols-3">
            {d.whenToGo.map((w) => (
              <div key={w.label} className="rounded-2xl border border-border bg-card p-5">
                <dt className="font-[family-name:var(--font-display)] font-semibold text-foreground">{w.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Chapters, or one ranked grid */}
      {d.chapters ? (
        d.chapters.map((c) => {
          const chapterPools = c.poolIds.map(byId).filter((p): p is (typeof pools)[number] => Boolean(p))
          if (chapterPools.length === 0) return null
          return (
            <section key={c.name} id={c.name.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-20 border-t border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
                <div className="mb-8 lg:mb-0">
                  <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-foreground">
                    {c.name}
                  </h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed max-w-md">{c.intro}</p>
                </div>
                <div className="pa-surface grid grid-cols-2 gap-4 sm:gap-6">
                  {chapterPools.map((p) => (
                    <div key={p.id}>
                      <PoolCard pool={p} sizes="(min-width: 1024px) 28vw, 45vw" />
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-4">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        })
      ) : (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="pa-surface grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {ranked.map((p) => (
              <PoolCard key={p.id} pool={p} sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw" />
            ))}
          </div>
        </section>
      )}

      {/* Related reading */}
      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-foreground">
              From The Deep End
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                    <Image src={post.image} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
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

      {/* More destinations */}
      <section className="bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.02em] text-foreground">
            More destinations
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/destinations/${o.slug}`}
                  className="inline-flex rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground hover:border-foreground/40 transition-colors"
                >
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#rankings" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4">
            See every pool in the rankings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Newsletter />
      <Footer />
      <CookieConsent />
    </main>
  )
}
