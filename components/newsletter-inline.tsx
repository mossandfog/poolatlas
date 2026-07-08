"use client"

import { useState } from "react"
import { ArrowRight, Check, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterInline() {
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
    <div className="border border-primary/20 bg-primary/5 rounded-2xl p-6 sm:p-8 my-10">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground mb-1">
            Get the best pools in your inbox
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Monthly discoveries, new rankings, and destination guides — no noise.
          </p>
          {submitted ? (
            <div className="flex items-center gap-2 text-primary text-sm font-medium">
              <Check className="w-4 h-4" />
              You're in. Watch your inbox.
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full px-5 h-10 bg-card border-border text-sm flex-1"
                  required
                />
                <Button type="submit" size="sm" className="rounded-full h-10 px-5 text-sm" disabled={loading}>
                  {loading ? "Subscribing…" : "Subscribe"}
                  {!loading && <ArrowRight className="w-3.5 h-3.5 ml-1.5" />}
                </Button>
              </form>
              {error && <p className="text-xs text-destructive mt-2">{error}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
