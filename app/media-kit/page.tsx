"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Mail, Users, Globe, Award, TrendingUp, Waves, Check, Star, Sparkles } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function MediaKitPage() {
  const stats = [
    { label: "Pools Ranked", value: "150+", sub: "Updated quarterly" },
    { label: "Countries", value: "50+", sub: "6 continents" },
    { label: "Reviews Analyzed", value: "2.4M", sub: "From trusted sources" },
    { label: "Fastest Growing", value: "#1", sub: "Pool guide of its kind" },
  ]

  const sources = [
    "Condé Nast Traveler",
    "Travel + Leisure", 
    "The New York Times",
    "Forbes",
    "Bloomberg",
    "Departures"
  ]

  const audienceProfile = [
    "28-55, design-conscious, well-travelled — overlapping closely with the Moss and Fog readership",
    "Household income skewing $150K+; regularly books 5-star stays internationally",
    "Average session over 4 minutes — readers move through multiple listings per visit",
    "Solo travellers, couples, small groups — nearly all in the high-value booking tier",
    "Reads Condé Nast Traveler, T+L, Robb Report, and Monocle",
    "Active on Instagram; responds well to visual, place-driven content"
  ]

  const pricingTiers = [
    {
      tier: "Newsletter",
      name: "Newsletter Feature",
      price: "$280",
      period: "per send · monthly",
      features: [
        "Dedicated sponsor section in monthly newsletter",
        "Your brand, headline, image, and link",
        "100% share of voice in that send",
        "Audience: engaged luxury travel readers",
        "Performance report included"
      ],
      variant: "standard" as const
    },
    {
      tier: "Site + Editorial",
      name: "Site Spotlight",
      price: "$360",
      period: "per month",
      badge: "Most Popular",
      features: [
        "Featured placement on homepage and rankings pages",
        "Brand visible to every Pool Atlas visitor",
        "Monthly impressions report",
        "Cancel anytime"
      ],
      variant: "featured" as const
    },
    {
      tier: "Editorial",
      name: "Editorial Sponsorship",
      price: "$960",
      period: "per feature",
      badge: "Founding Rate",
      features: [
        "Pool of the Month or Seasonal Feature",
        "Full editorial treatment — story, photography, context",
        "Newsletter + site feature included",
        "Social amplification on Bluesky + Instagram",
        "Content lives on Pool Atlas permanently"
      ],
      variant: "premium" as const
    }
  ]

  const bundles = [
    {
      tier: "For Hotels",
      name: "Verified Hotel Partner",
      price: "$480",
      period: "per year",
      description: "Upgrade your Pool Atlas listing with your own photography, description, and a direct booking link. Includes the Verified Partner badge and first consideration when we're commissioning editorial features.",
      includes: ["Official listing", "Booking link", "Verified badge", "Editorial priority", "Annual renewal"],
      variant: "standard" as const
    },
    {
      tier: "Best Value",
      name: "Founding Partner Bundle",
      price: "$2,000",
      period: "per year · limited availability",
      description: "The full package at founding rates, locked for a year. For hotels and brands who want to be part of Pool Atlas from the beginning — before rates reflect where the audience ends up.",
      includes: ["12× Newsletter features", "12mo Site Spotlight", "2× Editorial features", "Verified listing", "Founding recognition"],
      variant: "founding" as const
    }
  ]

  const steps = [
    { title: "Get in touch", description: "Drop us a line at hello@poolatlas.io — tell us about your property or brand." },
    { title: "Choose a package", description: "We'll suggest what makes sense for your goals. No pressure to go bigger than you want." },
    { title: "Submit assets", description: "Send over your logo, headline, image, and link. We handle the rest." },
    { title: "Go live & report", description: "Your campaign runs, you get a performance report, and we check in." }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Cover / Hero */}
      <div className="pt-24 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.18)_0%,transparent_50%),radial-gradient(circle_at_20%_80%,rgba(20,184,166,0.10)_0%,transparent_40%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Pool Atlas</span>
            </div>
            <Badge variant="outline" className="border-teal-500/40 text-teal-400 text-xs tracking-widest uppercase">
              Media Kit · 2026
            </Badge>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Reach the travelers<br/>who choose hotels<br/>for their <span className="text-teal-400">pools.</span>
          </h1>
          <p className="text-white/65 max-w-xl mb-8 leading-relaxed">
            Pool Atlas is the first site dedicated entirely to hotel pool rankings — built for the traveler who knows that the pool makes the trip. Our readers arrive with a destination in mind and a decision to make.
          </p>
          
          <div className="flex items-center justify-between pt-5 border-t border-white/10">
            <div className="text-xs text-white/50">
              Advertising & Partnership enquiries<br/>
              <a href="mailto:hello@poolatlas.io" className="text-teal-400 font-semibold hover:underline">hello@poolatlas.io</a>
              {" · "}
              <a href="https://poolatlas.io" className="text-teal-400 font-semibold hover:underline">poolatlas.io</a>
            </div>
            <div className="text-xs text-white/35 text-right hidden sm:block">
              <strong className="text-white/60">Built by the team behind</strong><br/>
              Moss and Fog — one of the world's<br/>largest design & travel publications
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <section className="bg-[#0f172a] py-9 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`text-center ${i < 3 ? 'md:border-r md:border-white/10' : ''}`}>
                <div className="text-3xl sm:text-4xl font-bold text-teal-400 tracking-tight">{stat.value}</div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-white/55 mt-1">{stat.label}</div>
                <div className="text-[10px] text-white/30">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sources Strip */}
      <section className="bg-teal-50 dark:bg-teal-950/30 py-4 border-y border-teal-200 dark:border-teal-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-[9px] font-bold tracking-widest uppercase text-teal-700 dark:text-teal-400">Rankings Powered By</span>
            {sources.map((source, i) => (
              <span key={source} className={`text-xs font-bold text-slate-700 dark:text-slate-300 ${i > 0 ? 'border-l border-teal-200 dark:border-teal-800 pl-4' : ''}`}>
                {source}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2">Our Mission</div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold mb-4">
            Every great pool deserves to be found.
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">
            Pool Atlas started from a pretty simple observation: for a lot of travelers, the pool is the whole point. Not a bonus — the reason to book. But there was no good place to find the world's best ones. So we built it. We research, rank, and write about the most extraordinary hotel pools on earth, updated every quarter.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "🏆", title: "Honest rankings", desc: "We pull from the publications people actually trust — Condé Nast Traveler, Travel + Leisure, Forbes — weight them carefully, and update every quarter." },
              { icon: "🌍", title: "Genuine global scope", desc: "150+ pools across 50+ countries and 6 continents — from Iceland's geothermal lagoons to Bali's three-tier infinity pools." },
              { icon: "🎯", title: "Readers with a trip in mind", desc: "People don't stumble onto Pool Atlas. They come here when they're figuring out where to go next — and the pool is already a factor in the decision." },
              { icon: "✍️", title: "Original editorial", desc: "\"The Deep End\" features, Pool of the Month, Superlatives, and Seasonal Picks go beyond rankings to tell the stories behind the world's most remarkable pools." }
            ].map((item) => (
              <Card key={item.title} className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="py-14 bg-muted/30 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2">Our Audience</div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold mb-4">
            People who book trips around the pool.
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">
            Pool Atlas readers are the guests who request the swim-up suite, follow hotel pools on Instagram months before they travel, and will genuinely reconsider their destination for a better pool. They're not looking for deals — they're looking for the right place.
          </p>
          
          <div className="grid lg:grid-cols-5 gap-6">
            <Card className="lg:col-span-3 bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-900">
              <CardContent className="pt-6">
                <h4 className="text-xs font-bold tracking-widest uppercase text-teal-700 dark:text-teal-400 mb-4">Audience Profile</h4>
                <div className="space-y-3">
                  {audienceProfile.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 pb-3 border-b border-teal-200 dark:border-teal-900 last:border-0 last:pb-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary">4 min+</div>
                  <p className="text-sm text-muted-foreground">Average time on site — readers explore multiple pools per session</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary">$150K+</div>
                  <p className="text-sm text-muted-foreground">Estimated average household income — a premium travel-spending audience</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary">Newsletter</div>
                  <p className="text-sm text-muted-foreground">Monthly digest of new pool discoveries, seasonal picks, and editorial features — growing each month</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-14 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2">Sponsorship Packages</div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold mb-4">
            Straightforward pricing. No minimums.
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-8">
            We're in our first year, so rates are set to make it easy to get started. <strong className="text-foreground">Anyone who comes on board now locks in these prices for 12 months</strong> — as our audience grows, so will the rates. No hidden fees, no long-term contracts.
          </p>
          
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {pricingTiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={`relative overflow-hidden ${
                  tier.variant === 'featured' ? 'bg-teal-50 dark:bg-teal-950/30 border-2 border-teal-500' : 
                  tier.variant === 'premium' ? 'bg-[#0f172a] border-slate-700' : ''
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2 min-h-[22px]">
                    <span className={`text-[9px] font-bold tracking-widest uppercase ${
                      tier.variant === 'premium' ? 'text-white/40' : 
                      tier.variant === 'featured' ? 'text-teal-700 dark:text-teal-400' : 'text-muted-foreground'
                    }`}>{tier.tier}</span>
                    {tier.badge && (
                      <Badge className={`text-[8px] ${tier.badge === 'Most Popular' ? 'bg-teal-500' : 'bg-amber-500'}`}>
                        {tier.badge}
                      </Badge>
                    )}
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${tier.variant === 'premium' ? 'text-white' : ''}`}>{tier.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-0.5">{tier.price}</div>
                  <div className={`text-xs mb-4 ${tier.variant === 'premium' ? 'text-white/35' : 'text-muted-foreground'}`}>{tier.period}</div>
                  <div className={`h-px mb-4 ${
                    tier.variant === 'featured' ? 'bg-teal-200 dark:bg-teal-800' : 
                    tier.variant === 'premium' ? 'bg-slate-700' : 'bg-border'
                  }`} />
                  <ul className="space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className={`flex items-start gap-2 text-xs ${tier.variant === 'premium' ? 'text-white/55' : 'text-muted-foreground'}`}>
                        <Check className="w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Bundle Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {bundles.map((bundle) => (
              <Card 
                key={bundle.name}
                className={bundle.variant === 'founding' ? 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border-2 border-amber-400' : ''}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className={`text-[9px] font-bold tracking-widest uppercase ${bundle.variant === 'founding' ? 'text-amber-700 dark:text-amber-400' : 'text-muted-foreground'}`}>{bundle.tier}</span>
                      <h4 className="font-bold text-lg">{bundle.name}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{bundle.price}</div>
                      <div className="text-[10px] text-muted-foreground">{bundle.period}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{bundle.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {bundle.includes.map((item) => (
                      <Badge key={item} variant="outline" className={`text-xs font-medium ${bundle.variant === 'founding' ? 'border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 bg-white dark:bg-amber-950/50' : ''}`}>
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Note */}
          <Card className="border-l-4 border-l-primary rounded-l-none">
            <CardContent className="pt-4 pb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">A note on being new:</strong> Our audience is growing and we won't pretend otherwise. What we can offer right now is a focused, genuinely engaged readership and pricing that's honest about where we are. Every package includes a simple performance report. If you want the numbers before committing, just ask.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 bg-muted/30 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2">How It Works</div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold mb-8">
            Easy to get started.
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold mx-auto mb-3">
                  {i + 1}
                </div>
                <h4 className="font-semibold mb-1">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-14 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2">Brand Assets</div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold mb-8">
            Logos & Colors
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-background">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Logo - Light Background</h3>
                <div className="bg-white rounded-lg p-8 flex items-center justify-center border">
                  <Image
                    src="/images/poolatlas-logotype.png"
                    alt="Pool Atlas Logo"
                    width={200}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Logo - Dark Background</h3>
                <div className="bg-slate-900 rounded-lg p-8 flex items-center justify-center">
                  <Image
                    src="/images/poolatlas-logotype-white.png"
                    alt="Pool Atlas Logo White"
                    width={200}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="bg-background">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Brand Colors</h3>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#14B8A6]" />
                  <div>
                    <div className="font-medium">Primary Teal</div>
                    <div className="text-sm text-muted-foreground">#14B8A6</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#0D9488]" />
                  <div>
                    <div className="font-medium">Teal Deep</div>
                    <div className="text-sm text-muted-foreground">#0D9488</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#0f172a]" />
                  <div>
                    <div className="font-medium">Navy</div>
                    <div className="text-sm text-muted-foreground">#0F172A</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white border" />
                  <div>
                    <div className="font-medium">White</div>
                    <div className="text-sm text-muted-foreground">#FFFFFF</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-[#0f172a] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">Pool Atlas</span>
              </div>
              <div className="text-xs text-white/50">
                <a href="mailto:hello@poolatlas.io" className="text-teal-400 font-semibold hover:underline">hello@poolatlas.io</a><br/>
                <a href="https://poolatlas.io" className="text-teal-400 hover:underline">poolatlas.io</a> · Portland, Oregon<br/>
                © 2024-2026 Pool Atlas. All rights reserved.
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[11px] text-white/30 mb-3">
                Built by the team behind Moss and Fog<br/>
                Rates valid through December 2026<br/>
                All prices in USD
              </p>
              <Button asChild className="rounded-full">
                <a href="mailto:hello@poolatlas.io?subject=Partnership Inquiry">
                  Start a conversation
                  <Mail className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
