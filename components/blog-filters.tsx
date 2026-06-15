"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { blogPosts, categories, type BlogPost } from "@/lib/blog-data"

export function BlogFilters() {
  const [activeCategory, setActiveCategory] = useState<string>("All")

  // Sort posts by date, newest first
  const sortedPosts = [...blogPosts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  // Filter posts by category
  const filteredPosts = activeCategory === "All" 
    ? sortedPosts.slice(1) // Skip featured post
    : sortedPosts.filter(p => p.category === activeCategory)

  const featuredPost = sortedPosts[0]

  // Get unique categories from posts
  const usedCategories = ["All", ...new Set(blogPosts.map(p => p.category))]

  return (
    <>
      {/* Featured Post */}
      {activeCategory === "All" && featuredPost && (
        <Link href={`/blog/${featuredPost.slug}`} className="block mb-12">
          <article className="group relative rounded-3xl overflow-hidden">
            <div className="relative aspect-[21/9]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <Badge className="mb-3 bg-primary text-primary-foreground">{featuredPost.category}</Badge>
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl font-bold text-white mb-3 drop-shadow-lg group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-white/90 mb-4 max-w-2xl line-clamp-2 drop-shadow">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>{featuredPost.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{featuredPost.readTime}</span>
                </div>
                <span>{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </article>
        </Link>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {usedCategories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Post Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="group h-full flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-colors">
              <div className="relative aspect-[16/10]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 p-6 flex flex-col">
                <Badge variant="secondary" className="w-fit mb-3">{post.category}</Badge>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <User className="w-3.5 h-3.5" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found in this category yet.</p>
        </div>
      )}
    </>
  )
}
