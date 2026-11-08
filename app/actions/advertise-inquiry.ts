"use server"

import { Resend } from "resend"

export interface AdvertiseInquiry {
  name: string
  email: string
  company: string
  website?: string
  kind: string
  interests: string[]
  timing: string
  message: string
  /** Honeypot: real people never fill this in */
  fax?: string
  /** Milliseconds the form was open before sending */
  elapsed?: number
}

export type InquiryResult = { ok: true } | { ok: false; reason: "invalid" | "unavailable" }

const clean = (s: unknown, max: number) => String(s ?? "").replace(/\s+\n/g, "\n").trim().slice(0, max)

// Sends a sponsorship inquiry to hello@poolatlas.io. If email isn't set up on the
// server, it says so honestly and the form falls back to a prefilled email,
// so a lead is never silently lost.
export async function sendAdvertiseInquiry(input: AdvertiseInquiry): Promise<InquiryResult> {
  // Bots fill hidden fields and submit instantly; pretend it worked and drop it
  if (input.fax || (typeof input.elapsed === "number" && input.elapsed < 2500)) return { ok: true }

  const name = clean(input.name, 120)
  const email = clean(input.email, 200)
  const company = clean(input.company, 160)
  const message = clean(input.message, 4000)
  if (!name || !company || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, reason: "invalid" }

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error("Advertise inquiry not sent: RESEND_API_KEY is not set")
    return { ok: false, reason: "unavailable" }
  }

  const interests = (input.interests || []).map((i) => clean(i, 80)).filter(Boolean)
  const text = [
    "New advertising inquiry from poolatlas.io/advertise",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Website: ${clean(input.website, 200) || "Not given"}`,
    `They are: ${clean(input.kind, 80) || "Not given"}`,
    `Interested in: ${interests.length ? interests.join(", ") : "Not sure yet"}`,
    `Timing: ${clean(input.timing, 80) || "Not given"}`,
    "",
    message,
  ].join("\n")

  try {
    const resend = new Resend(key)
    const { error } = await resend.emails.send({
      from: "Pool Atlas <notifications@poolatlas.io>",
      to: "hello@poolatlas.io",
      replyTo: email,
      subject: `Advertising inquiry: ${company}`,
      text,
    })
    if (error) {
      console.error("Advertise inquiry failed:", error)
      return { ok: false, reason: "unavailable" }
    }
    return { ok: true }
  } catch (err) {
    console.error("Advertise inquiry failed:", err)
    return { ok: false, reason: "unavailable" }
  }
}
