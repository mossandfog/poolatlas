import { Suspense } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PressMentions } from "@/components/press-mentions"
import { StatsSection } from "@/components/stats-section"
import { NearbyPools } from "@/components/nearby-pools"
import { IntroCard } from "@/components/intro-card"
import { FeaturedPool } from "@/components/featured-pool"
import { TrendingPools } from "@/components/trending-pools"
import { Methodology } from "@/components/methodology"

import { SeasonalPicks } from "@/components/seasonal-picks"
import { PoolCategories } from "@/components/pool-categories"
import { ComparePools } from "@/components/compare-pools"
import { Top100List } from "@/components/top-100-list"
import { PopularDestinations } from "@/components/popular-destinations"
import { TravelGuides } from "@/components/travel-guides"
import { AwardsBadges } from "@/components/awards-badges"

import { ExploreSection } from "@/components/explore-section"
import { Partners } from "@/components/partners"
import { FAQSection } from "@/components/faq-section"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { WorldMap } from "@/components/world-map"
import { PoolSuperlatives } from "@/components/pool-superlatives"

import { SocialProofBar } from "@/components/social-proof"
import { CookieConsent } from "@/components/cookie-consent"
import { LifestyleGallery } from "@/components/lifestyle-gallery"
import { PoolHistory } from "@/components/pool-history"
import { SponsorCTA } from "@/components/sponsor-cta"
import { JumpNav } from "@/components/jump-nav"
import { AdBanner } from "@/components/ad-unit"

function SectionLoader() {
  return (
    <div className="py-16 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Sticky Header */}
      <Header />
      
      {/* Hero with Search */}
      <div className="pt-16">
        <Hero />
      </div>
      
      {/* Social Proof Bar */}
      <SocialProofBar />
      
      {/* Find Pools Near You */}
      <NearbyPools />
      
      {/* Trust Indicators */}
      <PressMentions />
      
      {/* Stats */}
      <StatsSection />
      
      {/* Intro Card */}
      <IntroCard />
      
      {/* Featured Pool of the Month */}
      <FeaturedPool />
      
      {/* Interactive World Map - Pool Locations */}
      <Suspense fallback={<SectionLoader />}>
        <WorldMap />
      </Suspense>
      
      {/* Pool Superlatives - World Records */}
      <Suspense fallback={<SectionLoader />}>
        <PoolSuperlatives />
      </Suspense>
      
      {/* Below the fold content wrapped in Suspense */}
      <Suspense fallback={<SectionLoader />}>
        <TrendingPools />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Methodology />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <SeasonalPicks />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <PoolCategories />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ComparePools />
      </Suspense>
      
      {/* Full Top 100 List */}
      <Suspense fallback={<SectionLoader />}>
        <Top100List />
      </Suspense>
      
      {/* Ad Placement */}
      <AdBanner />
      
      <Suspense fallback={<SectionLoader />}>
        <PopularDestinations />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <TravelGuides />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <AwardsBadges />
      </Suspense>
      
      {/* Lifestyle Gallery - Human Element */}
      <Suspense fallback={<SectionLoader />}>
        <LifestyleGallery />
      </Suspense>
      
      {/* Pool History Section */}
      <Suspense fallback={<SectionLoader />}>
        <PoolHistory />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ExploreSection />
      </Suspense>
      
      {/* Ad Placement */}
      <AdBanner />
      
      <Suspense fallback={<SectionLoader />}>
        <Partners />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <FAQSection />
      </Suspense>
      
      {/* Sponsor CTA */}
      <SponsorCTA />
      
      <Suspense fallback={<SectionLoader />}>
        <Newsletter />
      </Suspense>
      
      {/* Footer */}
      <Footer />
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
      
      {/* Floating Jump Navigation */}
      <JumpNav />
    </main>
  )
}
