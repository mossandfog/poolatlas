// The Window Seat (pickthewindowseat.com), our sister travel magazine.
// Pool Atlas covers the arriving; The Window Seat covers the getting there.
// This table decides which Window Seat guides show in the "Getting there" panel
// on pool pages and destination guides. Only link a guide that really covers the place.

import type { Pool } from "@/lib/pool-data"

export const WINDOW_SEAT_URL = "https://pickthewindowseat.com"

export interface WindowSeatGuide {
  title: string
  url: string
  /** One line on what the reader gets from it */
  note: string
}

const PLANE_SIDE: WindowSeatGuide = {
  title: "Which side of the plane should you sit on?",
  url: `${WINDOW_SEAT_URL}/2026/09/17/which-side-of-the-plane-should-you-sit-on/`,
  note: "Pick the side with the view on the way in.",
}

const FLYING_WITH_KIDS: WindowSeatGuide = {
  title: "Flying with kids: what actually helps",
  url: `${WINDOW_SEAT_URL}/2026/10/10/flying-with-kids-what-actually-helps/`,
  note: "So the family arrives ready for the pool, not the nap.",
}

/** Destination guides, matched against a pool's location and country */
const PLACES: { match: (location: string, country: string) => boolean; guide: WindowSeatGuide }[] = [
  {
    match: (l) => /bali|ubud|uluwatu/i.test(l),
    guide: {
      title: "How to experience Bali beyond the resorts",
      url: `${WINDOW_SEAT_URL}/2026/02/22/social-architecture-of-bali-modern-development-ancestral-identity/`,
      note: "The island past the pool deck: villages, temples and rice terraces.",
    },
  },
  {
    match: (l) => /tuscany|\brome\b/i.test(l),
    guide: {
      title: "How to do Tuscany from Rome",
      url: `${WINDOW_SEAT_URL}/2026/01/06/ultimate-tuscany-tours-from-rome-wine-culture/`,
      note: "Day trips, wine tours and overnights worth the drive.",
    },
  },
  {
    match: (l, c) => c === "France" && /antibes|beaulieu|riviera|cannes|nice|monaco/i.test(l),
    guide: {
      title: "Travel tips for a French Riviera vacation",
      url: `${WINDOW_SEAT_URL}/2025/05/14/travel-tips-for-a-luxurious-french-riviera-vacation/`,
      note: "Getting around the coast, and when to go.",
    },
  },
  {
    match: (_l, c) => c === "Iceland",
    guide: {
      title: "Planning your Iceland trip",
      url: `${WINDOW_SEAT_URL}/2026/02/08/icelands-stunning-textures-from-the-air/`,
      note: "The landscapes to build the rest of the trip around.",
    },
  },
  {
    match: (_l, c) => c === "Japan",
    guide: {
      title: "The best time to visit Japan, season by season",
      url: `${WINDOW_SEAT_URL}/2025/09/23/plan-your-perfect-japan-trip-by-season/`,
      note: "Cherry blossoms, autumn color and when to avoid the crowds.",
    },
  },
  {
    match: (_l, c) => c === "Tanzania",
    guide: {
      title: "Tanzania's most breathtaking destinations",
      url: `${WINDOW_SEAT_URL}/2026/01/20/tanzanias-most-breathtaking-destinations/`,
      note: "The Serengeti and the rest of the trip around it.",
    },
  },
]

export function windowSeatPlaceGuide(location: string, country: string): WindowSeatGuide | undefined {
  return PLACES.find((p) => p.match(location, country))?.guide
}

/** Up to three guides for a pool: the place, then flying with kids, then the seat. */
export function windowSeatGuidesForPool(pool: Pool): WindowSeatGuide[] {
  const out: WindowSeatGuide[] = []
  const place = windowSeatPlaceGuide(pool.location, pool.country)
  if (place) out.push(place)
  if (pool.kidFriendly) out.push(FLYING_WITH_KIDS)
  out.push(PLANE_SIDE)
  return out
}

/** Guides for a destination guide page, from the pools it contains. */
export function windowSeatGuidesForPools(list: Pool[], hasFamilies = false): WindowSeatGuide[] {
  const seen = new Set<string>()
  const out: WindowSeatGuide[] = []
  for (const p of list) {
    const g = windowSeatPlaceGuide(p.location, p.country)
    if (g && !seen.has(g.url)) { seen.add(g.url); out.push(g) }
  }
  if (hasFamilies) out.push(FLYING_WITH_KIDS)
  out.push(PLANE_SIDE)
  return out.slice(0, 3)
}

/** Adds our attribution so The Window Seat can see the visits in its stats. */
export function windowSeatLink(url: string, placement: string) {
  const u = new URL(url)
  u.searchParams.set("utm_source", "poolatlas")
  u.searchParams.set("utm_medium", "referral")
  u.searchParams.set("utm_campaign", placement)
  return u.toString()
}
