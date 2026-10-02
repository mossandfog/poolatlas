import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedPool } from "@/components/featured-pool"
import { TrendingPools } from "@/components/trending-pools"
import { Top100List } from "@/components/top-100-list"
import { TravelGuides } from "@/components/travel-guides"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { AdBanner } from "@/components/ad-unit"
import { getCurrentEdition } from "@/lib/editorial-calendar"

// Re-render hourly so the monthly cover and picks flip on their own without a deploy
export const revalidate = 3600

// The homepage does six things: the cover, its story, this month's picks,
// the rankings, The Deep End and the newsletter. Everything else lives on /explore.
export default function Home() {
  const edition = getCurrentEdition()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-16">
        <Hero edition={edition} />
      </div>

      <FeaturedPool edition={edition} />

      <TrendingPools edition={edition} />

      <Top100List />

      <AdBanner className="py-10" />

      <TravelGuides />

      <Newsletter />

      <Footer />

      <CookieConsent />
    </main>
  )
}
