import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Target, Eye, Heart, CheckCircle, ArrowRight, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About Us | Pool Atlas",
  description: "Learn about Pool Atlas - the definitive guide to the world's best hotel swimming pools.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">About Pool Atlas</Badge>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-foreground mb-4">
            The World&apos;s Best Pools, <span className="text-primary">Ranked</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            We research, rank, and review hotel pools so you can find the perfect one for your next trip.
          </p>
        </div>
      </section>

      {/* Full-width hero image */}
      <div className="relative w-full h-[50vh] min-h-[320px] overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="Guest relaxing in an infinity pool overlooking the ocean"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      </div>

      {/* Story - Condensed */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground mb-4">Why We Built This</h2>
          <p className="text-muted-foreground mb-4">
            Every hotel claims a &quot;stunning pool.&quot; We got tired of the marketing fluff. Pool Atlas ranks the world's best pools across 50+ countries using data from millions of reviews and top travel publications. No pay-to-play. Just honest rankings.
          </p>
        </div>
      </section>

      {/* Values - Compact */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground mb-6 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-5">
              <Target className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Unbiased</h3>
              <p className="text-muted-foreground text-sm">We never accept payment for rankings.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <Eye className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Transparent</h3>
              <p className="text-muted-foreground text-sm">Our methodology is published openly.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <Heart className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Traveler-First</h3>
              <p className="text-muted-foreground text-sm">Every decision helps you find better pools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology - Compact */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground mb-4">How We Rank</h2>
            <div className="space-y-2 mb-6">
              {[
                { label: "Setting & Integration", weight: "25%" },
                { label: "Design & Architecture", weight: "20%" },
                { label: "Water Quality", weight: "20%" },
                { label: "Amenities & Service", weight: "20%" },
                { label: "Atmosphere", weight: "15%" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{item.label}</span>
                  </div>
                  <span className="text-muted-foreground">{item.weight}</span>
                </div>
              ))}
            </div>
            <Link href="/blog/what-makes-world-class-hotel-pool">
              <Button size="sm" className="rounded-full">
                Full Methodology <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sources - Inline */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-2">Data aggregated from</p>
          <p className="text-sm font-medium text-foreground">
            Travel + Leisure · Condé Nast Traveler · TripAdvisor · Google Reviews · Forbes Travel Guide
          </p>
        </div>
      </section>

      {/* Contact - Compact */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground mb-2">Get in Touch</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Pool recommendations, press inquiries, or partnership opportunities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:hello@poolatlas.io">
              <Button size="sm" className="rounded-full">
                <Mail className="w-4 h-4 mr-2" />
                hello@poolatlas.io
              </Button>
            </a>
            <Link href="/media-kit">
              <Button variant="outline" size="sm" className="rounded-full">
                Media Kit
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
