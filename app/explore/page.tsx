import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WorldMap } from "@/components/world-map"
import { NearbyPools } from "@/components/nearby-pools"
import { SeasonalPicks } from "@/components/seasonal-picks"
import { PoolCategories } from "@/components/pool-categories"
import { PopularDestinations } from "@/components/popular-destinations"
import { PoolSuperlatives } from "@/components/pool-superlatives"
import { AwardsBadges } from "@/components/awards-badges"
import { ComparePools } from "@/components/compare-pools"
import { PoolHistory } from "@/components/pool-history"
import { CookieConsent } from "@/components/cookie-consent"
import { getCurrentEdition, siteStats } from "@/lib/editorial-calendar"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Explore the World's Best Hotel Pools | Pool Atlas",
  description:
    "Browse the world's best hotel pools by map, season, style and destination. Compare pools side by side and find the record holders.",
  alternates: { canonical: "/explore" },
}

const sections = [
  { id: "map", label: "Map" },
  { id: "seasonal", label: "By season" },
  { id: "categories", label: "By style" },
  { id: "destinations", label: "By destination" },
  { id: "superlatives", label: "Record holders" },
  { id: "awards", label: "Awards" },
  { id: "compare", label: "Compare two pools" },
  { id: "history", label: "History" },
]

export default function ExplorePage() {
  const edition = getCurrentEdition()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-16">
        <section className="pt-14 pb-10 md:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.02] text-foreground">
              Explore
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              All {siteStats.poolCount} pools, by map, season, style and destination. Or put two side by side and decide.
            </p>
            <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-foreground/40 hover:bg-secondary transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <WorldMap />
        <NearbyPools />
        <SeasonalPicks initialSeason={edition.season} year={edition.year} />
        <PoolCategories />
        <PopularDestinations />
        <PoolSuperlatives />
        <AwardsBadges />
        <ComparePools />
        <PoolHistory />
      </div>

      <Footer />
      <CookieConsent />
    </main>
  )
}
