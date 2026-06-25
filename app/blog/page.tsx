"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogFilters } from "@/components/blog-filters"

export default function BlogPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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
            {submitted ? (
              <div className="flex items-center justify-center gap-2 text-primary">
                <Check className="w-5 h-5" />
                <span className="font-medium">You're in! Watch your inbox.</span>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-full px-6 h-12 bg-card border-border"
                    required
                  />
                  <Button type="submit" size="lg" className="rounded-full h-12 px-6" disabled={loading}>
                    {loading ? "Subscribing…" : "Subscribe"}
                    {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </form>
                {error && <p className="text-sm text-destructive mt-3">{error}</p>}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
