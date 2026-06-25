import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const apiKey = process.env.LOOPS_API_KEY
    if (!apiKey) {
      console.error("LOOPS_API_KEY not set")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const response = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        source: "poolatlas-website",
        userGroup: "Newsletter",
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      // Loops returns 409 if contact already exists — treat as success
      if (response.status === 409) {
        return NextResponse.json({ success: true })
      }
      console.error("Loops error:", data)
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Subscribe error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
