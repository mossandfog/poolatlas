import Link from "next/link"
import Image from "next/image"
import { Award, Code2, Share2, Search, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { pools } from "@/lib/pool-data"

export const metadata = {
  title: "For Hotels | Pool Atlas",
  description: "Is your hotel pool ranked on Pool Atlas? Claim your badge, embed it on your website, and share the recognition with your guests.",
}

function getTierLabel(rank: number) {
  if (rank <= 10)  return { label: "Top 10",  className: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30" }
  if (rank <= 25)  return { label: "Top 25",  className: "bg-slate-300/15 text-slate-300 border-slate-300/30" }
  if (rank <= 50)  return { label: "Top 50",  className: "bg-orange-400/15 text-orange-400 border-orange-400/30" }
  return             { label: "Top 100", className: "bg-primary/15 text-primary border-primary/30" }
}

export default function ForHotelsPage() {
  const top25 = pools.filter(p => p.rank <= 25).sort((a, b) => a.rank - b.rank)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/15 rounded-full mb-5">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Hotel Resources</span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-foreground mb-5 text-balance">
            Is your pool on the list?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Pool Atlas ranks the world's finest hotel pools based on editorial reviews, guest ratings, and design excellence. If your property is featured, claim your badge and share the recognition.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#find-hotel">
              <Button className="rounded-full gap-2 px-6">
                <Search className="w-4 h-4" />
                Find your hotel
              </Button>
            </a>
            <a href="mailto:hello@poolatlas.io?subject=Pool%20Atlas%20Listing%20Enquiry">
              <Button variant="outline" className="rounded-full px-6">
                Submit your pool
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
            What a Pool Atlas ranking means for your property
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground mb-2">Embeddable badge</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">A professionally designed badge showing your world ranking — ready to embed on your website, booking pages, and press kit.</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center mb-4">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground mb-2">Dedicated pool page</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Every ranked pool gets its own page on Pool Atlas with your ranking, features, and a direct link to book at your property.</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground mb-2">Third-party credibility</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Pool Atlas rankings are editorial and independent — no payment for placement. That makes the recognition genuinely meaningful to guests.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Find your hotel */}
      <section id="find-hotel" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Find your property
            </h2>
            <p className="text-muted-foreground">Click your hotel to access your personalized badge and embed code.</p>
          </div>

          {/* Top 25 featured */}
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground mb-4">Top 25 — Featured</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {top25.map((pool) => {
              const tier = getTierLabel(pool.rank)
              return (
                <Link
                  key={pool.id}
                  href={`/for-hotels/${pool.slug}`}
                  className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors group"
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={pool.image} alt={pool.hotel} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-foreground">#{pool.rank}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${tier.className}`}>{tier.label}</span>
                    </div>
                    <p className="font-medium text-foreground text-sm truncate">{pool.hotel}</p>
                    <p className="text-xs text-muted-foreground truncate">{pool.location}, {pool.country}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </Link>
              )
            })}
          </div>

          {/* All other hotels — compact list */}
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground mb-4">All ranked hotels</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {pools
              .filter(p => p.rank > 25)
              .sort((a, b) => a.rank - b.rank)
              .map((pool) => {
                const tier = getTierLabel(pool.rank)
                return (
                  <Link
                    key={pool.id}
                    href={`/for-hotels/${pool.slug}`}
                    className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:border-primary/40 transition-colors group"
                  >
                    <span className="text-xs font-bold text-muted-foreground w-8 flex-shrink-0">#{pool.rank}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{pool.hotel}</p>
                      <p className="text-xs text-muted-foreground truncate">{pool.country}</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                )
              })}
          </div>
        </div>
      </section>

      {/* Not listed CTA */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground mb-3">
            Don't see your property?
          </h2>
          <p className="text-muted-foreground mb-6">
            We're constantly expanding the rankings. Submit your pool for editorial consideration — our team reviews every submission against our ranking criteria.
          </p>
          <a href="mailto:hello@poolatlas.io?subject=Pool%20Submission">
            <Button className="rounded-full px-8">Submit your pool</Button>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
