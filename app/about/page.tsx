import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Target, Eye, Heart, CheckCircle, ArrowRight, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/faq-section"
import { EDITOR, editorLd } from "@/lib/editor"

export const metadata: Metadata = {
  title: "About Us | Pool Atlas",
  description: "Learn about Pool Atlas, our editors' ranking of the world's best hotel swimming pools.",
  alternates: { canonical: "/about" },
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

      {/* A note from the editor */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: "https://poolatlas.io/about",
            mainEntity: { "@type": "Organization", name: "Pool Atlas", url: "https://poolatlas.io", founder: editorLd },
          }),
        }}
      />
      <section id="editor" className="scroll-mt-24 py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary mb-4">A note from the editor</p>
          <div className="space-y-5 text-lg leading-relaxed text-foreground/90">
            <p className="font-[family-name:var(--font-display)] text-2xl sm:text-[1.7rem] leading-snug text-foreground">
              I was standing chest deep in a pool in Mexico, with the water at the exact temperature of the air and
              nothing between me and the horizon but a line of palms. I remember thinking two things at once. First,
              this is about as good as it gets. Second, is it, though?
            </p>
            <p>
              Somewhere out there was a pool carved into a desert cliff. Another hanging off a rooftop over Tokyo.
              Another sitting on a reef in the middle of the ocean. I wanted to see them all, or at least know where
              they were. So I started a list. That list became Pool Atlas!
            </p>
            <p>
              I&apos;ve spent my career as a designer, and I still look at a pool the way I&apos;d look at a building or a
              chair. Where it sits, how it was made, what it feels like to actually swim in it. Those are the things we
              rank on here. Nobody pays to be on the list, and we recheck seasons, closures and facts through the year
              so you aren&apos;t planning a trip around a pool that&apos;s drained for the winter.
            </p>
            <p>
              If you&apos;ve been chest deep in one that belongs here,{" "}
              <a href="mailto:hello@poolatlas.io" className="text-primary underline underline-offset-2">tell me</a>. Some of
              the best pools on this list came from readers who couldn&apos;t stop talking about one.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-border">
            <p className="font-[family-name:var(--font-display)] text-xl text-foreground">{EDITOR.name}</p>
            <p className="text-sm text-muted-foreground">
              {EDITOR.role}, Pool Atlas ·{" "}
              <a href={EDITOR.site} className="hover:text-primary underline-offset-2 hover:underline" rel="me">
                benvanderveen.com
              </a>
            </p>
          </div>
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
              <p className="text-muted-foreground text-sm">We show how we rank, right on this page.</p>
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
      <section id="how-we-rank" className="scroll-mt-20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground mb-4">How We Rank</h2>
            <div className="space-y-2 mb-6">
              {[
                { label: "Setting and view", weight: "Where the water meets the place" },
                { label: "Design and architecture", weight: "Shape, materials, how it was built" },
                { label: "The swim itself", weight: "Size, temperature, room to actually swim" },
                { label: "Service and atmosphere", weight: "Loungers, shade, crowds, staff" },
                { label: "Reputation over time", weight: "What guests and the travel press keep saying" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{item.label}</span>
                  </div>
                  <span className="text-muted-foreground pl-6 sm:pl-0 sm:text-right">{item.weight}</span>
                </div>
              ))}
            </div>
            <Link href="/blog/what-makes-world-class-hotel-pool">
              <Button size="sm" className="rounded-full">
                What makes a world-class pool <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sources - Inline */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-2">Every listing is checked against</p>
          <p className="text-sm font-medium text-foreground">
            The hotel&apos;s own site · Travel + Leisure · Condé Nast Traveler · Forbes Travel Guide · guest reviews
          </p>
        </div>
      </section>

      {/* Questions travelers ask most (moved here from the homepage) */}
      <FAQSection />

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
