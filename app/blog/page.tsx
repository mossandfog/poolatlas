import Image from "next/image"
import Link from "next/link"
import { Clock, ArrowRight, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { blogPosts, categories } from "@/lib/blog-data"
import { BlogFilters } from "@/components/blog-filters"

export const metadata = {
  title: "The Deep End | Pool Atlas Blog",
  description: "Stories, secrets, and science behind the world's most remarkable hotel pools. Expert guides and destination features for pool lovers."
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Pool Atlas Blog</Badge>
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-foreground mb-4">
              The Deep End
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              We believe a great pool can transform a trip from good to unforgettable. That perfect moment when you slip into crystal-clear water with an impossible view stretching to the horizon - that's what we live for.
            </p>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              No fluff. No filler. Just deep dives into destinations worth your next vacation.
            </p>
          </div>

          {/* Blog Content with Filters */}
          <BlogFilters />

          {/* Newsletter CTA */}
          <div className="mt-16 text-center p-8 sm:p-12 bg-primary/5 rounded-3xl border border-primary/20">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground mb-3">
              Never Miss a Post
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get the latest pool guides and destination features delivered to your inbox.
            </p>
            <Link href="/#newsletter">
              <Button className="rounded-full">
                Subscribe to Newsletter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
