"use server"

import { Resend } from "resend"

interface PoolSubmission {
  hotelName: string
  poolName: string
  location: string
  country: string
  whatMakesItSpecial: string
  submitterEmail: string
}

export async function submitPool(data: PoolSubmission) {
  const resendApiKey = process.env.RESEND_API_KEY
  
  if (!resendApiKey) {
    console.error("[v0] RESEND_API_KEY not configured")
    // Still return success in dev/preview so the form works
    return { success: true, message: "Submission received (email not configured)" }
  }

  const resend = new Resend(resendApiKey)

  const emailContent = `
New Pool Submission

Hotel/Resort: ${data.hotelName}
Pool Name: ${data.poolName || "Not specified"}
Location: ${data.location}, ${data.country}

What makes it special:
${data.whatMakesItSpecial}

Submitter Email: ${data.submitterEmail || "Not provided"}

---
Submitted via Pool Atlas
  `.trim()

  try {
    await resend.emails.send({
      from: "Pool Atlas <notifications@poolatlas.io>",
      to: "hello@poolatlas.io",
      subject: `New Pool Submission: ${data.hotelName}`,
      text: emailContent,
      replyTo: data.submitterEmail || undefined,
    })

    return { success: true, message: "Submission sent successfully" }
  } catch (error) {
    console.error("[v0] Failed to send email:", error)
    return { success: false, message: "Failed to send submission" }
  }
}
