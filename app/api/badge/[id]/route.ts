import { NextRequest, NextResponse } from "next/server"
import { pools } from "@/lib/pool-data"

function getTier(rank: number): { label: string; color: string; glow: string } {
  if (rank <= 10)  return { label: "TOP 10",   color: "#D4AF37", glow: "rgba(212,175,55,0.25)" }
  if (rank <= 25)  return { label: "TOP 25",   color: "#C0C0C0", glow: "rgba(192,192,192,0.20)" }
  if (rank <= 50)  return { label: "TOP 50",   color: "#CD7F32", glow: "rgba(205,127,50,0.20)" }
  return             { label: "TOP 100",  color: "#5BB8C8", glow: "rgba(91,184,200,0.20)" }
}

function generateBadgeSVG(rank: number, hotelName: string): string {
  const { label, color, glow } = getTier(rank)
  const rankText = `#${rank}`
  // Condense long hotel names
  const display = hotelName.length > 28 ? hotelName.slice(0, 26) + "…" : hotelName

  return `<svg width="280" height="180" viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a1628"/>
      <stop offset="100%" stop-color="#0d1f3c"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="280" height="180" rx="14" fill="url(#bg)"/>

  <!-- Subtle border -->
  <rect width="278" height="178" x="1" y="1" rx="13" fill="none" stroke="${color}" stroke-width="0.8" stroke-opacity="0.35"/>

  <!-- Tier glow band at top -->
  <rect width="280" height="4" rx="2" fill="${color}" opacity="0.7"/>

  <!-- Wave/water motif lines -->
  <path d="M 20 155 Q 50 148 80 155 Q 110 162 140 155 Q 170 148 200 155 Q 230 162 260 155" stroke="${color}" stroke-width="1" fill="none" opacity="0.15"/>
  <path d="M 20 163 Q 50 156 80 163 Q 110 170 140 163 Q 170 156 200 163 Q 230 170 260 163" stroke="${color}" stroke-width="1" fill="none" opacity="0.10"/>

  <!-- POOL ATLAS wordmark -->
  <text x="140" y="28" text-anchor="middle" fill="${color}" font-family="Space Grotesk, system-ui, sans-serif" font-size="10" font-weight="700" letter-spacing="4" opacity="0.9">POOL ATLAS</text>

  <!-- Subtitle -->
  <text x="140" y="46" text-anchor="middle" fill="white" font-family="Space Grotesk, system-ui, sans-serif" font-size="8.5" letter-spacing="2.5" opacity="0.45">WORLD RANKINGS 2026</text>

  <!-- Divider -->
  <line x1="60" y1="56" x2="220" y2="56" stroke="white" stroke-width="0.5" opacity="0.12"/>

  <!-- Rank number (large, center) -->
  <text x="140" y="112" text-anchor="middle" fill="white" font-family="Space Grotesk, system-ui, sans-serif" font-size="58" font-weight="700" filter="url(#glow)" opacity="0.95">${rankText}</text>

  <!-- "IN THE WORLD" -->
  <text x="140" y="131" text-anchor="middle" fill="white" font-family="Space Grotesk, system-ui, sans-serif" font-size="9" letter-spacing="3" opacity="0.5">IN THE WORLD</text>

  <!-- Tier pill -->
  <rect x="96" y="140" width="88" height="20" rx="10" fill="${glow}"/>
  <rect x="96" y="140" width="88" height="20" rx="10" fill="none" stroke="${color}" stroke-width="0.8" stroke-opacity="0.5"/>
  <text x="140" y="154" text-anchor="middle" fill="${color}" font-family="Space Grotesk, system-ui, sans-serif" font-size="9" font-weight="700" letter-spacing="2">${label}</text>

  <!-- Hotel name (small, bottom) -->
  <text x="140" y="172" text-anchor="middle" fill="white" font-family="Space Grotesk, system-ui, sans-serif" font-size="7.5" opacity="0.35" letter-spacing="0.5">${display}</text>
</svg>`
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Accept numeric id or slug
  const pool = pools.find(p =>
    p.id === parseInt(id) || p.slug === id
  )

  if (!pool) {
    return new NextResponse("Pool not found", { status: 404 })
  }

  const svg = generateBadgeSVG(pool.rank, pool.hotel)

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  })
}
