"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"

export function Newsletter() {
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
        setError("That didn\u2019t go through. Check the address and try again.")
      }
    } catch {
      setError("That didn\u2019t go through. Check the address and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="newsletter" className="scroll-mt-20 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-[oklch(0.24_0.045_230)] text-white px-6 py-12 sm:px-10 md:px-14 md:py-16 grid gap-8 lg:grid-cols-2 lg:items-end">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-balance">
            The Pool of the Month, in your inbox.
          </h2>
          <p className="mt-3 text-white/75 leading-relaxed max-w-[46ch]">
            One email a month: the new pick, the pools we&apos;ve added, and the best of The Deep End.
          </p>
        </div>

        {submitted ? (
          <p className="flex items-center gap-2 text-lg font-medium" role="status">
            <Check className="w-5 h-5 text-[oklch(0.8_0.14_195)]" />
            You&apos;re subscribed. See you next month!
          </p>
        ) : (
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <Input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:max-w-xs sm:flex-1 rounded-full px-5 h-12 bg-white/10 border-white/25 text-white placeholder:text-white/50 focus-visible:ring-white/60"
                required
              />
              <Button type="submit" size="lg" className="rounded-full h-12 px-6" disabled={loading}>
                {loading ? "Subscribing…" : "Subscribe"}
              </Button>
            </form>
            {error && <p className="text-sm text-[oklch(0.82_0.12_30)] mt-3 lg:text-right">{error}</p>}
          </div>
        )}
      </div>
      </div>
    </section>
  )
}
