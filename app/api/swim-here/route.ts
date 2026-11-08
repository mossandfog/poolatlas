// Ranked pools for the "Swim here" card that sister sites embed (public/embed/swim-here.js).
// GET /api/swim-here?pools=54,83,37         a hand-picked set, shown in rank order
// GET /api/swim-here?near=43.3,11.3&km=250  the ranked pools nearest a point
// GET /api/swim-here?country=Indonesia      the ranked pools in a country
// Optional: n (1 to 6, default 3), campaign (added to the links as utm_campaign).
import { NextRequest, NextResponse } from "next/server"
import { pools, type Pool } from "@/lib/pool-data"
import { poolCoordinates } from "@/lib/pool-coordinates"
import { isClosed, reopeningStay, monthName } from "@/lib/seasons"
import { getBookingUrl } from "@/lib/affiliate"
import sizes from "@/lib/image-sizes.json"

export const revalidate = 86400

const SITE = "https://poolatlas.io"
const SIZES = sizes as Record<string, number>
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
}

function photo(src: string) {
  const m = src.match(/^\/images\/pools\/([^/]+)\.(?:jpe?g|png|webp)$/i)
  if (m && SIZES[m[1]]) return `${SITE}/images/pools/w640/${m[1]}.jpg`
  return src.startsWith("http") ? src : `${SITE}${src}`
}

function km(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const r = Math.PI / 180
  const h =
    Math.sin(((b.lat - a.lat) * r) / 2) ** 2 +
    Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lng - a.lng) * r) / 2) ** 2
  return 12742 * Math.asin(Math.sqrt(h))
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS })
}

export function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams
  const n = Math.min(6, Math.max(1, Number(q.get("n")) || 3))
  const campaign = (q.get("campaign") || "swim_here").replace(/[^a-z0-9_]/gi, "").slice(0, 60)

  let list: Pool[] = []
  const ids = q.get("pools")
  const near = q.get("near")
  const country = q.get("country")

  if (ids) {
    const want = new Set(ids.split(",").map((x) => Number(x.trim())).filter(Boolean))
    list = pools.filter((p) => want.has(p.id))
  } else if (near) {
    const [lat, lng] = near.split(",").map(Number)
    const radius = Math.min(3000, Number(q.get("km")) || 400)
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      list = pools
        .map((p) => ({ p, c: poolCoordinates[p.id] }))
        .filter((x) => x.c && km({ lat, lng }, x.c) <= radius)
        .map((x) => x.p)
    }
  } else if (country) {
    list = pools.filter((p) => p.country.toLowerCase() === country.toLowerCase())
  }

  const out = list
    .sort((a, b) => a.rank - b.rank)
    .slice(0, n)
    .map((p) => {
      const url = new URL(`${SITE}/pools/${p.slug}`)
      url.searchParams.set("utm_source", "windowseat")
      url.searchParams.set("utm_medium", "embed")
      url.searchParams.set("utm_campaign", campaign)
      // Stay22 booking link. Closed for the season: pre-fill the reopening dates.
      // Closed with no reopening date (renovation): no booking link at all.
      const closed = isClosed(p)
      const reopen = closed ? reopeningStay(p) : null
      const book =
        closed && !reopen
          ? null
          : getBookingUrl(p, "tws_swim", { tag: campaign, checkin: reopen?.checkin, checkout: reopen?.checkout })
      return {
        id: p.id,
        rank: p.rank,
        name: p.name,
        hotel: p.hotel,
        location: `${p.location}, ${p.country}`,
        image: photo(p.image),
        closedNow: closed,
        url: url.toString(),
        book,
        bookLabel: reopen ? `Book for ${monthName(reopen.month)}` : "Check dates",
      }
    })

  return NextResponse.json({ pools: out, more: `${SITE}/?utm_source=windowseat&utm_medium=embed&utm_campaign=${campaign}` }, { headers: CORS })
}
