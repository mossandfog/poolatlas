import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, ArrowLeft, ArrowRight, User, Share2, Twitter, Linkedin, Link2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { blogPosts, getBlogPost } from "@/lib/blog-data"
import { ShareButtons } from "@/components/share-buttons"
import { AdBanner } from "@/components/ad-unit"
import { NewsletterInline } from "@/components/newsletter-inline"
import { BookPoolsBox } from "@/components/book-pools-box"
import { DealCard } from "@/components/deal-card"
import { BOOKING_REL } from "@/lib/affiliate"
import { pools as allPools } from "@/lib/pool-data"
import { swimmableNow } from "@/lib/seasons"

// The in-season fallback box changes with the month, so rebuild posts daily (like pool pages)
export const revalidate = 86400

// Link the first plain-text mention of every ranked hotel to its pool page. Readers get the
// pool page one tap away, search gets the internal link, and the booking box below picks the
// pool up automatically. Headings and text already inside a link are left alone.
const linkTargets = [...allPools]
  .filter((p) => p.hotel.length > 7)
  .sort((a, b) => b.hotel.length - a.hotel.length)
function linkHotelMentions(content: string) {
  const lines = content.split("\n")
  for (const pool of linkTargets) {
    if (content.includes(`(/pools/${pool.slug})`)) continue
    const name = pool.hotel
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (/^\s*(#|\||>|!\[)/.test(line)) continue
      const linked = [...line.matchAll(/\[[^\]]*\]\([^)]*\)/g)].map((m) => [m.index!, m.index! + m[0].length])
      let at = line.indexOf(name)
      while (at !== -1) {
        const end = at + name.length
        const inLink = linked.some(([a, b]) => at >= a && at < b)
        const wordEdge = !/[A-Za-z0-9]/.test(line[end] ?? "") && !/[A-Za-z0-9]/.test(line[at - 1] ?? "")
        if (!inLink && wordEdge) break
        at = line.indexOf(name, at + 1)
      }
      if (at === -1) continue
      lines[i] = `${line.slice(0, at)}[${name}](/pools/${pool.slug})${line.slice(at + name.length)}`
      content = lines.join("\n")
      break
    }
  }
  return lines.join("\n")
}

// Posts that mention no ranked pools still offer a few to book: the best pools in season this month.
// Home pool-care posts are about the reader's own pool, so they get none.
function inSeasonPicks(category: string, exclude: Set<number>, n: number) {
  if (category === "Pool Care") return []
  return swimmableNow(allPools).filter((p) => !exclude.has(p.id)).slice(0, n)
}

// Pools a post links to (/pools/slug), in reading order, for the booking box
function poolsInPost(content: string) {
  const seen = new Set<string>()
  const found: typeof allPools = []
  for (const m of content.matchAll(/\(\/pools\/([a-z0-9-]+)\)/g)) {
    if (seen.has(m[1])) continue
    seen.add(m[1])
    const pool = allPools.find((p) => p.slug === m[1])
    if (pool) found.push(pool)
  }
  // Roundups that name hotels in their headings ("### Grand Wailea, Maui") instead of linking them
  for (const m of content.matchAll(/^###\s+(.+)$/gm)) {
    const heading = m[1].trim().toLowerCase()
    const pool = allPools.find((p) => p.hotel.length > 5 && heading.startsWith(p.hotel.toLowerCase()))
    if (pool && !seen.has(pool.slug)) {
      seen.add(pool.slug)
      found.push(pool)
    }
  }
  return found.slice(0, 12)
}

// Posts mention ranks by hand ("Ranked #22", "(#74)") next to a pool link. Rankings move,
// so swap in each linked pool's live rank at render time instead of trusting the text.
function withLiveRanks(content: string) {
  const rankOf = (slug: string) => allPools.find((p) => p.slug === slug)?.rank
  return content
    .replace(/Ranked #\d+ on Pool Atlas\]\(\/pools\/([a-z0-9-]+)\)/g, (m, slug) => {
      const r = rankOf(slug)
      return r ? `Ranked #${r} on Pool Atlas](/pools/${slug})` : m
    })
    .replace(/\]\(\/pools\/([a-z0-9-]+)\) \(#\d+\)/g, (m, slug) => {
      const r = rankOf(slug)
      return r ? `](/pools/${slug}) (#${r})` : m
    })
}

// Parse inline markdown: **bold**, *italic*, [text](url)
function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g
  let last = 0
  let m: RegExpExecArray | null
  let key = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1] && m[2]) {
      // Link
      const cls = "text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
      if (/^https?:\/\//.test(m[2])) {
        // Outbound: new tab; booking links carry the booking rel
        const rel = /stay22\.com/.test(m[2]) ? BOOKING_REL : "noopener"
        parts.push(<a key={key++} href={m[2]} target="_blank" rel={rel} className={cls}>{m[1]}</a>)
      } else {
        parts.push(<Link key={key++} href={m[2]} className={cls}>{m[1]}</Link>)
      }
    } else if (m[3]) {
      // Bold
      parts.push(<strong key={key++} className="text-foreground font-semibold">{parseInline(m[3])}</strong>)
    } else if (m[4]) {
      // Italic
      parts.push(<em key={key++}>{m[4]}</em>)
    }
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    return {
      title: "Post Not Found | The Deep End",
    }
  }

  const imageUrl = post.image.startsWith("/images/pools/")
    ? `https://poolatlas.io${post.image}`
    : `https://poolatlas.io${post.image}`

  return {
    title: post.seoTitle ?? `${post.title} | The Deep End`,
    description: post.seoDescription ?? post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `https://poolatlas.io/blog/${post.slug}`, types: { "application/rss+xml": [{ url: "/feed.xml", title: "The Deep End by Pool Atlas" }] } },
    openGraph: {
      type: "article",
      url: `https://poolatlas.io/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      siteName: "Pool Atlas",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const content = linkHotelMentions(post.content)

  // Get related posts (prefer same category, excluding current)
  const sameCategoryPosts = blogPosts.filter(p => p.slug !== slug && p.category === post.category)
  const otherPosts = blogPosts.filter(p => p.slug !== slug && p.category !== post.category)
  const relatedPosts = [...sameCategoryPosts, ...otherPosts].slice(0, 2)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `https://poolatlas.io${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    url: `https://poolatlas.io/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: "https://poolatlas.io/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Pool Atlas",
      url: "https://poolatlas.io",
      logo: {
        "@type": "ImageObject",
        url: "https://poolatlas.io/images/poolatlas-logotype.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://poolatlas.io/blog/${post.slug}`,
    },
  }

  const faqJsonLd = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }
    : null

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}
      <Header />

      <article className="pt-24 pb-16">
        {/* Hero Image */}
        <div className="relative h-[40vh] sm:h-[50vh] mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to The Deep End
            </Link>

            {/* Header */}
            <header className="mb-10">
              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span className="font-medium text-foreground">{post.author.name}</span>
                  <span className="text-muted-foreground">- {post.author.role}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                {post.updatedAt && post.updatedAt !== post.publishedAt ? (
                  <span>Updated {new Date(post.updatedAt).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric' })}</span>
                ) : null}
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
              {withLiveRanks(content).split('\n').map((paragraph, index) => {
                const trimmed = paragraph.trim()
                if (!trimmed) return null
                
                // Handle headers
                if (trimmed.startsWith('# ')) {
                  // The page header already carries the headline as the one h1; most posts
                  // repeat it as their first line, so skip that and demote any other "# " to h2
                  const text = trimmed.slice(2).trim()
                  if (post.title.startsWith(text)) return null
                  return <h2 key={index} className="font-[family-name:var(--font-display)] text-3xl font-bold mt-10 mb-4">{text}</h2>
                }
                // Deal card: {{deal:id}}
                const dealMatch = trimmed.match(/^\{\{deal:([a-z0-9-]+)\}\}$/)
                if (dealMatch) {
                  return <DealCard key={index} id={dealMatch[1]} tag={post.slug} />
                }
                if (trimmed.startsWith('## ')) {
                  const text = trimmed.slice(3)
                  const anchor = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                  return <h2 key={index} id={anchor} className="scroll-mt-28 font-[family-name:var(--font-display)] text-2xl font-bold mt-8 mb-3">{text}</h2>
                }
                if (trimmed.startsWith('### ')) {
                  return <h3 key={index} className="font-[family-name:var(--font-display)] text-xl font-semibold mt-6 mb-2">{trimmed.slice(4)}</h3>
                }
                
                // Handle lists
                if (trimmed.startsWith('- ')) {
                  return (
                    <div key={index} className="flex gap-2 my-2">
                      <span className="text-primary">•</span>
                      <p>{parseInline(trimmed.slice(2))}</p>
                    </div>
                  )
                }

                // Handle numbered lists
                if (/^\d+\. /.test(trimmed)) {
                  const num = trimmed.match(/^(\d+)\. /)?.[1]
                  const text = trimmed.replace(/^\d+\. /, '')
                  return (
                    <div key={index} className="flex gap-3 my-2">
                      <span className="text-primary font-semibold">{num}.</span>
                      <p>{parseInline(text)}</p>
                    </div>
                  )
                }

                // Handle horizontal rules
                if (trimmed === '---') {
                  return <hr key={index} className="my-8 border-border" />
                }

                // Handle italic blocks (tips/notes)
                if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
                  return <p key={index} className="italic text-muted-foreground border-l-4 border-primary/30 pl-4 my-6">{parseInline(trimmed.slice(1, -1))}</p>
                }

                // Regular paragraphs (parseInline handles **bold**, *italic*, [links](url))
                return <p key={index} className="my-4 text-foreground/90 leading-relaxed">{parseInline(trimmed)}</p>
              })}
            </div>

            {/* Questions (also published as FAQPage structured data) */}
            {post.faq?.length ? (
              <section aria-labelledby="faq" className="mb-16">
                <h2 id="faq" className="font-[family-name:var(--font-display)] text-2xl font-bold mb-4">Questions, answered</h2>
                <div className="divide-y divide-border border-y border-border">
                  {post.faq.map((f) => (
                    <details key={f.q} className="group py-4">
                      <summary className="cursor-pointer list-none font-semibold text-foreground flex justify-between gap-4">
                        {f.q}
                        <span aria-hidden="true" className="text-primary transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-2 text-foreground/80 leading-relaxed">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Book the pools this post talks about */}
            {post.hideBookingBox ? null : (() => {
              const inPost = poolsInPost(content)
              if (inPost.length >= 3) {
                return <BookPoolsBox pools={inPost} adults={post.bookingAdults} dates={post.bookingDates} />
              }
              const picks = inSeasonPicks(post.category, new Set(inPost.map((p) => p.id)), 5 - inPost.length)
              return (
                <BookPoolsBox
                  pools={[...inPost, ...picks]}
                  title={inPost.length ? "Stay at the pools in this story" : "Pools in season right now"}
                  adults={post.bookingAdults}
                  dates={post.bookingDates}
                />
              )
            })()}

            {/* Newsletter CTA */}
            <NewsletterInline />

            {/* Share / CTA */}
            <div className="border-t border-border pt-8 mb-16">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Share this article</p>
                  <ShareButtons title={post.title} slug={post.slug} />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-muted-foreground">Enjoyed this guide?</p>
                  <Link href="/blog">
                    <Button variant="outline" className="rounded-full">
                      Read More Articles
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Ad Placement */}
            <div className="mb-12">
              <AdBanner />
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground mb-6">
                  Continue Reading
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {relatedPosts.map((related) => (
                    <Link key={related.slug} href={`/blog/${related.slug}`}>
                      <article className="group flex gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors">
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Badge variant="secondary" className="mb-2">{related.category}</Badge>
                          <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{related.readTime}</p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
