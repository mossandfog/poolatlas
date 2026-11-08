"use client"

import { useRef, useState } from "react"
import { ArrowRight, Check, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { sendAdvertiseInquiry } from "@/app/actions/advertise-inquiry"
import { OFFERINGS } from "@/lib/advertise"

const KINDS = ["Hotel or resort", "Hotel group", "Tourism board", "Travel or lifestyle brand", "Agency", "Something else"]
const TIMING = ["As soon as possible", "In the next three months", "Later this year", "Just exploring"]

const field =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
const label = "block text-sm font-medium text-foreground mb-1.5"

export function AdvertiseForm() {
  const opened = useRef(Date.now())
  const [state, setState] = useState<"idle" | "sending" | "sent" | "fallback" | "invalid">("idle")
  const [mailto, setMailto] = useState("mailto:hello@poolatlas.io?subject=Advertising%20inquiry")
  const [firstName, setFirstName] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const data = {
      name: String(f.get("name") || ""),
      email: String(f.get("email") || ""),
      company: String(f.get("company") || ""),
      website: String(f.get("website") || ""),
      kind: String(f.get("kind") || ""),
      interests: f.getAll("interests").map(String),
      timing: String(f.get("timing") || ""),
      message: String(f.get("message") || ""),
      fax: String(f.get("fax") || ""),
      elapsed: Date.now() - opened.current,
    }
    setFirstName(data.name.trim().split(/\s+/)[0] || "")
    setState("sending")
    const body = [
      `Name: ${data.name}`,
      `Company: ${data.company}`,
      `Website: ${data.website}`,
      `We are: ${data.kind}`,
      `Interested in: ${data.interests.join(", ")}`,
      `Timing: ${data.timing}`,
      "",
      data.message,
    ].join("\n")
    setMailto(
      `mailto:hello@poolatlas.io?subject=${encodeURIComponent(`Advertising inquiry: ${data.company}`)}&body=${encodeURIComponent(body)}`,
    )
    try {
      const res = await sendAdvertiseInquiry(data)
      setState(res.ok ? "sent" : res.reason === "invalid" ? "invalid" : "fallback")
    } catch {
      setState("fallback")
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-3xl border border-primary/30 bg-primary/5 p-8 sm:p-10 text-center" role="status">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground">
          Thank you{firstName ? `, ${firstName}` : ""}!
        </h3>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          Your note is with our editors. We read every inquiry and will write back to you personally with ideas and pricing.
        </p>
      </div>
    )
  }

  if (state === "fallback") {
    return (
      <div className="rounded-3xl border border-border bg-secondary/40 p-8 sm:p-10 text-center" role="alert">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground">One more step</h3>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          Our form couldn&apos;t send just now. Your details are ready in an email to us, so nothing you wrote is lost.
        </p>
        <Button asChild size="lg" className="mt-6 rounded-full px-6">
          <a href={mailto}>
            <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
            Send it by email
          </a>
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">or write to hello@poolatlas.io</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      <div>
        <label htmlFor="ad-name" className={label}>Your name</label>
        <input id="ad-name" name="name" required autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="ad-email" className={label}>Work email</label>
        <input id="ad-email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="ad-company" className={label}>Hotel, brand or company</label>
        <input id="ad-company" name="company" required autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor="ad-website" className={label}>
          Website <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input id="ad-website" name="website" type="url" inputMode="url" placeholder="https://" className={field} />
      </div>
      <div>
        <label htmlFor="ad-kind" className={label}>You are</label>
        <select id="ad-kind" name="kind" required defaultValue="" className={field}>
          <option value="" disabled>Choose one</option>
          {KINDS.map((k) => <option key={k}>{k}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="ad-timing" className={label}>Timing</label>
        <select id="ad-timing" name="timing" required defaultValue="" className={field}>
          <option value="" disabled>Choose one</option>
          {TIMING.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <fieldset className="sm:col-span-2">
        <legend className={label}>
          What interests you? <span className="font-normal text-muted-foreground">(choose any)</span>
        </legend>
        <div className="mt-1 flex flex-wrap gap-2">
          {OFFERINGS.map((o) => (
            <label key={o.id} className="cursor-pointer">
              <input type="checkbox" name="interests" value={o.title} className="peer sr-only" />
              <span className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/60 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50">
                {o.title}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="sm:col-span-2">
        <label htmlFor="ad-message" className={label}>Tell us about your goals</label>
        <textarea
          id="ad-message"
          name="message"
          required
          rows={5}
          placeholder="Who you'd like to reach, any dates or seasons that matter, and anything you already have in mind."
          className={`${field} resize-y`}
        />
      </div>

      {/* Honeypot, hidden from people and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="ad-fax">Fax</label>
        <input id="ad-fax" name="fax" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={state === "sending"} className="rounded-full px-7">
          {state === "sending" ? "Sending..." : "Send inquiry"}
          {state !== "sending" && <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />}
        </Button>
        <p className="text-sm text-muted-foreground">
          {state === "invalid" ? (
            <span className="text-destructive">Please add your name, a valid email, your company and a short note.</span>
          ) : (
            <>Prefer email? Write to <a href="mailto:hello@poolatlas.io?subject=Advertising%20inquiry" className="text-primary hover:underline underline-offset-4">hello@poolatlas.io</a></>
          )}
        </p>
      </div>
    </form>
  )
}
