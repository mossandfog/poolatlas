"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section id="newsletter" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/10">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-4">
          <span className="text-primary text-sm font-medium">Stay Updated</span>
        </div>
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-foreground mb-4">
          Get the Latest Pool Discoveries
        </h2>
        <p className="text-muted-foreground mb-8">
          Subscribe to receive our monthly digest of newly discovered stunning pools, exclusive hotel insights, and curated travel recommendations.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-primary">
            <Check className="w-5 h-5" />
            <span className="font-medium">Thank you for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full px-6 h-12 bg-card border-border"
              required
            />
            <Button type="submit" size="lg" className="rounded-full h-12 px-6 shadow-md">
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
