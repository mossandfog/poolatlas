import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Code2, Share2, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CopyButton } from "@/components/copy-button"
import { pools } from "@/lib/pool-data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return pools.map((pool) => ({ slug: pool.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const pool = pools.find(p => p.slug === slug)
  if (!pool) return { title: "Hotel Not Found | Pool Atlas" }
  return {
    title: `Claim Your Badge | ${pool.hotel} | Pool Atlas`,
    description: `${pool.hotel} is ranked #${pool.rank} in the world for hotel pools by Pool Atlas. Embed your badge and share the recognition.`,
  }
}

function getTier(rank: number) {
  if (rank <= 10)  return { label: "Top 10 in the World",  color: "text-yellow-500",  bg: "bg-yellow-500/10",  border: "border-yellow-500/30" }
  if (rank <= 25)  return { label: "Top 25 in the World",  color: "text-slate-300",   bg: "bg-slate-300/10",   border: "border-slate-300/30" }
  if (rank <= 50)  return { label: "Top 50 in the World",  color: "text-orange-400",  bg: "bg-orange-400/10",  border: "border-orange-400/30" }
  return             { label: "Top 100 in the World", color: "text-primary",     bg: "bg-primary/10",     border: "border-primary/30"  }
}

export default async function ForHotelsSlugPage({ params }: PageProps) {
  const { slug } = await params
  const pool = pools.find(p => p.slug === slug)
  if (!pool) notFound()

  const tier = getTier(pool.rank)
  const baseUrl = "https://poolatlas.io"
  const poolUrl = `${baseUrl}/pools/${pool.slug}`
  const badgeUrl = `${baseUrl}/api/badge/${pool.id}`

  const embedCode = `<!-- Pool Atlas Badge -->
<a href="${poolUrl}" target="_blank" rel="noopener" title="${pool.hotel} — Ranked #${pool.rank} by Pool Atlas">
  <img src="${badgeUrl}" alt="Ranked #${pool.rank} in the World · Pool Atlas 2026" width="280" height="180" style="display:block;"/>
</a>`

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {/* Back */}
          <Link href="/for-hotels" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            All hotel resources
          </Link>

          {/* Hero */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${tier.bg} ${tier.border} mb-4`}>
              <Award className={`w-4 h-4 ${tier.color}`} />
              <span className={`text-sm font-semibold ${tier.color}`}>{tier.label}</span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Congratulations, {pool.hotel}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              You've been ranked <strong className="text-foreground">#{pool.rank} in the world</strong> for hotel pools by Pool Atlas — the definitive ranking of the world's finest swimming experiences.
            </p>
          </div>

          {/* Badge + Embed side by side */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">

            {/* Badge preview */}
            <div className="bg-card rounded-2xl border border-border p-8 flex flex-col items-center gap-4">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground self-start">Your badge</h2>
              <div className="flex items-center justify-center p-6 bg-secondary/50 rounded-xl w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/badge/${pool.id}`}
                  alt={`Pool Atlas badge — Ranked #${pool.rank}`}
                  width={280}
                  height={180}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                This badge automatically reflects your current rank
              </p>
            </div>

            {/* Embed code */}
            <div className="bg-card rounded-2xl border border-border p-8 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">Embed on your website</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Copy this snippet and paste it into your hotel website — pool page, press kit, or booking widget.
              </p>
              <div className="relative">
                <pre className="bg-secondary/80 rounded-xl p-4 text-xs text-foreground overflow-x-auto leading-relaxed font-mono whitespace-pre-wrap break-all">
                  {embedCode}
                </pre>
              </div>
              <div className="flex flex-col gap-2">
                <CopyButton text={embedCode} />
                <a
                  href={`/api/badge/${pool.id}`}
                  download={`pool-atlas-badge-${pool.slug}.svg`}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full rounded-full gap-2">
                    Download badge (SVG)
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Pool page CTA */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <Image src={pool.image} alt={pool.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">{pool.location} · {pool.country}</p>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground mb-1">{pool.name}</h3>
              <p className="text-sm text-muted-foreground">{pool.hotel}</p>
            </div>
            <Link href={`/pools/${pool.slug}`} target="_blank">
              <Button className="rounded-full gap-2 whitespace-nowrap">
                View your pool page
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* How to share */}
          <div className="bg-card rounded-2xl border border-border p-8 mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Share2 className="w-5 h-5 text-primary" />
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">Share the recognition</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-secondary/50 rounded-xl">
                <p className="font-semibold text-foreground mb-1">Social media</p>
                <p className="text-muted-foreground">Share your pool page link with the caption: "We've been ranked #{pool.rank} in the world for hotel pools by @PoolAtlas."</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-xl">
                <p className="font-semibold text-foreground mb-1">Press kit</p>
                <p className="text-muted-foreground">Include the badge image and your Pool Atlas URL in your press materials and media kit.</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-xl">
                <p className="font-semibold text-foreground mb-1">Booking platforms</p>
                <p className="text-muted-foreground">Mention the Pool Atlas ranking in your hotel descriptions on Booking.com, Expedia, and direct booking pages.</p>
              </div>
            </div>
          </div>

          {/* Questions CTA */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-3">Questions about your ranking or want to update your listing?</p>
            <a href="mailto:hello@poolatlas.io">
              <Button variant="outline" className="rounded-full">Contact us at hello@poolatlas.io</Button>
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  )
}
