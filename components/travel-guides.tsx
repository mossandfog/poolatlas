import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { blogPosts, getFeaturedPost } from "@/lib/blog-data"

export function TravelGuides() {
  const featuredPost = getFeaturedPost()
  const otherPosts = blogPosts.filter(post => !post.featured).slice(0, 3)

  return (
    <section id="blog" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Badge variant="secondary" className="mb-2">The Deep End</Badge>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Pool Travel Guides
            </h2>
            <p className="text-muted-foreground">Expert advice for planning your perfect pool getaway</p>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="hidden sm:flex rounded-full">
              View All Guides
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Guide */}
          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`} className="group">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="mb-2">{featuredPost.category}</Badge>
                  <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-foreground">
                    {featuredPost.title}
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground mb-3">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{featuredPost.readTime}</span>
                </div>
                <span>{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </Link>
          )}

          {/* Other Guides */}
          <div className="space-y-4">
            {otherPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 hidden sm:block">{post.excerpt}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:hidden">
          <Link href="/blog">
            <Button variant="outline" className="w-full rounded-full">
              View All Guides
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
