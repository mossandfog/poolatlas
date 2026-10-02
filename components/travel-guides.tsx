import Image from "next/image"
import Link from "next/link"
import { blogPosts } from "@/lib/blog-data"

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { timeZone: "UTC", month: "long", day: "numeric", year: "numeric" })

export function TravelGuides() {
  // Newest post leads; the next three follow, so the homepage always shows fresh writing
  const newest = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  const lead = newest[0]
  const rest = newest.slice(1, 4)

  return (
    <section id="blog" className="scroll-mt-20 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-foreground">
              The Deep End
            </h2>
            <p className="mt-2 text-muted-foreground">Guides, design stories and the occasional strong opinion about pools.</p>
          </div>
          <Link href="/blog" className="text-sm font-medium text-primary hover:underline underline-offset-4">
            All stories
          </Link>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {lead && (
            <Link href={`/blog/${lead.slug}`} className="group lg:col-span-7 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-xl">
              <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-muted">
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <p className="mt-5 text-sm text-primary font-medium">{lead.category}</p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-tight text-foreground group-hover:text-primary transition-colors text-balance">
                {lead.title}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed max-w-[60ch]">{lead.excerpt}</p>
              <p className="mt-3 text-sm text-muted-foreground">{fmt(lead.publishedAt)}, {lead.readTime}</p>
            </Link>
          )}

          <ul className="lg:col-span-5 divide-y divide-border border-y border-border self-start">
            {rest.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group flex gap-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image src={post.image} alt="" fill sizes="112px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-primary font-medium">{post.category}</p>
                    <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-3">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{post.readTime}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
