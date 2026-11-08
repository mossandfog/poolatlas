import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Mail, ShieldCheck, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdvertiseForm } from "@/components/advertise-form"
import { OFFERINGS } from "@/lib/advertise"
import { pools } from "@/lib/pool-data"

export const metadata: Metadata = {
  title: "Advertise with Pool Atlas | Sponsorships for Hotels and Travel Brands",
  description:
    "Reach travelers who choose hotels by their pools. Hotel spotlights, partner stories, newsletter sponsorship and destination partnerships on Pool Atlas. Our rankings are never for sale.",
  alternates: { canonical: "https://poolatlas.io/advertise" },
  openGraph: {
    title: "Advertise with Pool Atlas",
    description: "Sponsorships for hotels, tourism boards and travel brands. Our rankings are never for sale.",
    url: "https://poolatlas.io/advertise",
  },
}

const STEPS = [
  { title: "Tell us what you have in mind", text: "A few lines in the form below is plenty. A season, a launch, a new pool, or just a hunch." },
  { title: "We come back with ideas", text: "Our editors suggest the placements that fit, with dates and pricing, usually within a few days." },
  { title: "We make it, you approve it", text: "We write, design and build everything to the same standard as the rest of the site, and share results after." },
]

const FAQ = [
  {
    q: "Can we pay to be ranked, or to move up?",
    a: "No. Rankings are decided by our editors and never sold. A sponsorship never changes where a pool ranks, and a hotel doesn't need to be ranked to work with us.",
  },
  {
    q: "How is sponsored work labeled?",
    a: "Clearly. Partner stories, sponsored spots and presented guides all carry a visible partnership label, and links follow search engine guidelines for paid placements.",
  },
  {
    q: "What does it cost?",
    a: "It depends on the placement, the season and how long it runs. Send us a note and we'll share options and pricing for what you have in mind.",
  },
  {
    q: "Do you work with agencies?",
    a: "Yes. Agencies are welcome to write in for one client or several.",
  },
]

export default function AdvertisePage() {
  const hero = pools.find((p) => p.id === 136) ?? pools[0]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-foreground/80">
              <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-accent" />
              Advertise with Pool Atlas
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground text-balance">
              Meet travelers while they&apos;re choosing where to swim.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">
              People come to Pool Atlas with a trip in mind and a pool high on the list. We work with a small number of hotels,
              tourism boards and travel brands each season to reach them with work that looks and reads like the rest of the site.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <a href="#inquire">
                  Start a conversation
                  <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <a href="#ways">See the options</a>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
            <Image
              src={hero.image}
              alt={`${hero.name} at ${hero.hotel}, ${hero.location}`}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-4 sm:grid-cols-2 rounded-3xl bg-foreground text-background p-6 sm:p-8">
          <div className="flex gap-4">
            <ShieldCheck className="h-6 w-6 shrink-0 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold">Our rankings are never for sale</p>
              <p className="mt-1 text-sm text-background/70 leading-relaxed">
                Sponsors can&apos;t buy a rank or move up one. That independence is what makes a place on Pool Atlas worth something.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Tag className="h-6 w-6 shrink-0 text-primary mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold">Everything paid is labeled</p>
              <p className="mt-1 text-sm text-background/70 leading-relaxed">
                Readers always know what&apos;s a partnership. It keeps their trust, and it keeps your message credible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to work with us */}
      <section id="ways" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-foreground">
            Ways to work with us
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Start with one or combine a few. Pricing is shared on request and depends on the season and how long a placement runs.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERINGS.map((o) => (
              <article key={o.id} className="flex flex-col rounded-3xl border border-border bg-card p-6 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{o.forWho}</p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">{o.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{o.summary}</p>
                <ul className="mt-5 space-y-2.5 text-sm text-foreground/90">
                  {o.includes.map((i) => (
                    <li key={i} className="flex gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" aria-hidden="true" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-foreground">How it works</h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="min-w-0">
                <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-primary tabular-nums">{i + 1}</span>
                <p className="mt-2 font-semibold text-foreground">{s.title}</p>
                <p className="mt-1 text-muted-foreground leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Inquiry */}
      <section id="inquire" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-foreground">
            Start a conversation
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Tell us a little about you and what you&apos;d like to do. We&apos;ll reply personally with ideas and pricing.
          </p>
          <div className="relative mt-10">
            <AdvertiseForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto border-t border-border pt-14">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground">Good to know</h2>
          <dl className="mt-8 space-y-7">
            {FAQ.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold text-foreground">{f.q}</dt>
                <dd className="mt-1.5 text-muted-foreground leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-12 text-sm text-muted-foreground">
            Is your pool already ranked? Your free badge is on{" "}
            <Link href="/for-hotels" className="text-primary hover:underline underline-offset-4">For Hotels</Link>.{" "}
            <a href="mailto:hello@poolatlas.io?subject=Advertising%20inquiry" className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              hello@poolatlas.io
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
