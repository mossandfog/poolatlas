import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import {
  MapPin, Star, Award, Users, Baby, ExternalLink,
  ArrowLeft, CheckCircle2, Waves, ChevronRight
} from "lucide-react"
import { pools } from "@/lib/pool-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return pools.map((pool) => ({ slug: pool.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const pool = pools.find((p) => p.slug === slug)
  if (!pool) return {}
  return {
    title: `${pool.name} at ${pool.hotel} | Pool Atlas`,
    description: pool.description,
    openGraph: {
      title: `${pool.name} at ${pool.hotel}`,
      description: pool.description,
      images: [{ url: pool.image }],
    },
  }
}

export default async function PoolPage({ params }: Props) {
  const { slug } = await params
  const pool = pools.find((p) => p.slug === slug)
  if (!pool) notFound()

  const nearbyPools = pools
    .filter((p) => p.region === pool.region && p.id !== pool.id)
    .slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: pool.hotel,
    description: pool.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: pool.location,
      addressCountry: pool.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: pool.rating,
      ratingCount: pool.reviewCount,
      bestRating: 10,
    },
    url: pool.websiteUrl,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="min-h-screen bg-background pt-16">
        {/* Hero */}
        <div className="relative h-[55vh] min-h-[400px] w-full overflow-hidden">
          <Image
            src={pool.image}
            alt={`${pool.name} at ${pool.hotel}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

          {/* Back link */}
          <div className="absolute top-6 left-4 sm:left-8">
            <Link
              href="/#top-100"
              className="inline-flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full text-sm font-medium text-foreground hover:bg-background transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Rankings
            </Link>
          </div>

          {/* Rank badge */}
          <div className="absolute top-6 right-4 sm:right-8">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-xl">#{pool.rank}</span>
            </div>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8">
            <div className="max-w-5xl mx-auto">
              {pool.awards && pool.awards.length > 0 && (
                <div className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground rounded-full px-3 py-1.5 text-sm font-semibold mb-3 shadow">
                  <Award className="w-4 h-4" />
                  {pool.awards[0]}
                </div>
              )}
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-1">
                {pool.name}
              </h1>
              <p className="text-lg text-primary font-semibold">{pool.hotel}</p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left: editorial content */}
            <div className="lg:col-span-2 space-y-10">

              {/* Location + quick stats */}
              <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-border">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{pool.location}, {pool.country}</span>
                  <span className="mx-1 text-border">·</span>
                  <span className="px-2 py-0.5 bg-secondary rounded-full text-xs font-medium">{pool.region}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-bold text-foreground">{pool.rating}</span>
                  <span className="text-muted-foreground text-sm">/ 10</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{pool.reviewCount.toLocaleString()} reviews</span>
                </div>
                {pool.kidFriendly ? (
                  <div className="flex items-center gap-1.5 text-sm font-medium text-chart-3">
                    <Baby className="w-4 h-4" />
                    Family friendly
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    Adults preferred
                  </div>
                )}
              </div>

              {/* About */}
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground mb-4">
                  About This Pool
                </h2>
                <p className="text-foreground/80 leading-relaxed text-base">
                  {pool.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground mb-4">
                  Pool Features
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {pool.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 px-3 py-2.5 bg-primary/10 rounded-xl text-sm font-medium text-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards */}
              {pool.awards && pool.awards.length > 0 && (
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground mb-4">
                    Awards & Recognition
                  </h2>
                  <div className="space-y-2.5">
                    {pool.awards.map((award) => (
                      <div
                        key={award}
                        className="flex items-center gap-3 px-4 py-3 bg-accent/10 rounded-xl border border-accent/20"
                      >
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                          <Award className="w-4 h-4 text-accent-foreground" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sources */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  As featured in
                </p>
                <div className="flex flex-wrap gap-2">
                  {pool.sources.map((source) => (
                    <Badge key={source} variant="secondary" className="rounded-full text-xs px-3 py-1">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: sticky sidebar */}
            <div className="space-y-5">
              <div className="sticky top-24 space-y-5">

                {/* Rating card */}
                <div className="bg-card rounded-2xl border border-border p-6 text-center shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 shadow">
                    <span className="text-primary-foreground font-bold text-2xl">#{pool.rank}</span>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Global Ranking</p>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="text-3xl font-bold text-foreground">{pool.rating}</span>
                    <span className="text-muted-foreground">/ 10</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on {pool.reviewCount.toLocaleString()} expert &amp; traveler reviews
                  </p>
                </div>

                {/* Quick facts */}
                <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
                  <h3 className="font-semibold text-foreground text-sm">Quick Facts</h3>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Hotel</span>
                      <span className="font-medium text-foreground text-right max-w-[160px]">{pool.hotel}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium text-foreground">{pool.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Country</span>
                      <span className="font-medium text-foreground">{pool.country}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Region</span>
                      <span className="font-medium text-foreground">{pool.region}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Family friendly</span>
                      <span className="font-medium text-foreground">{pool.kidFriendly ? "Yes" : "Adults preferred"}</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <a href={pool.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full rounded-full gap-2" size="lg">
                      <ExternalLink className="w-4 h-4" />
                      Visit Official Website
                    </Button>
                  </a>
                  {pool.bookingUrl && (
                    <a href={pool.bookingUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full rounded-full gap-2" size="lg">
                        Check Availability
                      </Button>
                    </a>
                  )}
                </div>

                {/* Back link */}
                <Link
                  href="/#top-100"
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  View all {pools.length} ranked pools
                </Link>
              </div>
            </div>
          </div>

          {/* Nearby pools */}
          {nearbyPools.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-3">
                    <Waves className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">More from {pool.region}</span>
                  </div>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
                    You Might Also Love
                  </h2>
                </div>
                <Link
                  href="/#top-100"
                  className="hidden sm:flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium"
                >
                  See all rankings <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                {nearbyPools.map((nearby) => (
                  <Link key={nearby.id} href={`/pools/${nearby.slug}`}>
                    <div className="group bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={nearby.image}
                          alt={nearby.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow">
                          <span className="text-primary-foreground font-bold text-sm">#{nearby.rank}</span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="font-semibold text-foreground text-sm truncate">{nearby.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{nearby.hotel}</p>
                        </div>
                      </div>
                      <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {nearby.country}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-accent text-accent" />
                          <span className="text-xs font-semibold">{nearby.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
