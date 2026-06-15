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

  return {
    title: `${post.title} | The Deep End`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Get related posts (prefer same category, excluding current)
  const sameCategoryPosts = blogPosts.filter(p => p.slug !== slug && p.category === post.category)
  const otherPosts = blogPosts.filter(p => p.slug !== slug && p.category !== post.category)
  const relatedPosts = [...sameCategoryPosts, ...otherPosts].slice(0, 2)

  return (
    <main className="min-h-screen bg-background">
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
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
              {post.content.split('\n').map((paragraph, index) => {
                const trimmed = paragraph.trim()
                if (!trimmed) return null
                
                // Handle headers
                if (trimmed.startsWith('# ')) {
                  return <h1 key={index} className="font-[family-name:var(--font-display)] text-3xl font-bold mt-10 mb-4">{trimmed.slice(2)}</h1>
                }
                if (trimmed.startsWith('## ')) {
                  return <h2 key={index} className="font-[family-name:var(--font-display)] text-2xl font-bold mt-8 mb-3">{trimmed.slice(3)}</h2>
                }
                if (trimmed.startsWith('### ')) {
                  return <h3 key={index} className="font-[family-name:var(--font-display)] text-xl font-semibold mt-6 mb-2">{trimmed.slice(4)}</h3>
                }
                
                // Handle lists
                if (trimmed.startsWith('- **')) {
                  const match = trimmed.match(/- \*\*(.+?)\*\*: (.+)/)
                  if (match) {
                    return (
                      <div key={index} className="flex gap-2 my-2">
                        <span className="text-primary">•</span>
                        <p><strong className="text-foreground">{match[1]}</strong>: {match[2]}</p>
                      </div>
                    )
                  }
                }
                if (trimmed.startsWith('- ')) {
                  return (
                    <div key={index} className="flex gap-2 my-2">
                      <span className="text-primary">•</span>
                      <p>{trimmed.slice(2)}</p>
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
                      <p>{text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>
                    </div>
                  )
                }
                
                // Handle horizontal rules
                if (trimmed === '---') {
                  return <hr key={index} className="my-8 border-border" />
                }
                
                // Handle italic blocks (tips/notes)
                if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
                  return <p key={index} className="italic text-muted-foreground border-l-4 border-primary/30 pl-4 my-6">{trimmed.slice(1, -1)}</p>
                }
                
                // Handle bold text within paragraphs
                if (trimmed.startsWith('**') && trimmed.includes('**:')) {
                  const match = trimmed.match(/\*\*(.+?)\*\*:?\s*(.*)/)
                  if (match) {
                    return <p key={index} className="my-4"><strong className="text-foreground">{match[1]}</strong>{match[2] ? `: ${match[2]}` : ''}</p>
                  }
                }
                
                // Regular paragraphs
                return <p key={index} className="my-4 text-foreground/90 leading-relaxed">{trimmed}</p>
              })}
            </div>

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
