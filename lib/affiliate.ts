/**
 * Booking links for Pool Atlas, all through Stay22 (affiliate id "mossandfog").
 *
 * Why Stay22 and not the hotel's own site: a click to a hotel website can never
 * earn, while a Stay22 link sends the reader to the best-converting booking site
 * for where they are (Booking.com, Expedia, Hotels.com, Vrbo...) and credits us.
 *
 * Every link carries campaign labels so the Stay22 hub shows which placement
 * and which pool earned: "poolatlas", the placement (pa_pool_cta, pa_blog_box...)
 * and the pool (pool_<slug>). Stay22 splits campaigns on "-", so use "_".
 *
 * Replaces the old Booking.com deep-link table, whose ids had drifted out of
 * step with lib/pool-data.ts (Oct 2026).
 */
import { poolCoordinates } from "@/lib/pool-coordinates"

export const STAY22_AID = "mossandfog"

/** Where on the site a link lives. Shows up as a campaign in the Stay22 hub. */
export type Placement =
  | "pool_cta"
  | "pool_mobile_bar"
  | "pool_nearby_map"
  | "blog_box"
  | "dest_chapter"
  | "dest_map"
  | "dream_list"
  | "dream_share"
  | "honeymoon_card"
  | "honeymoon_area"
  | "honeymoon_map"
  | "season_month"
  | "booking_now"

const label = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "")

type PoolLike = { id: number; slug: string; hotel: string; location: string; country: string }

/** A link that opens booking for this exact hotel. */
export function getBookingUrl(
  pool: PoolLike,
  placement: Placement = "pool_cta",
  opts: { adults?: number; checkin?: string; checkout?: string } = {},
): string {
  const p = new URLSearchParams()
  p.set("aid", STAY22_AID)
  p.set("hotelname", pool.hotel)
  p.set("address", `${pool.hotel}, ${pool.location}, ${pool.country}`)
  const c = poolCoordinates[pool.id]
  if (c) {
    p.set("lat", String(c.lat))
    p.set("lng", String(c.lng))
  }
  if (opts.adults) p.set("adults", String(opts.adults))
  if (opts.checkin) p.set("checkin", opts.checkin)
  if (opts.checkout) p.set("checkout", opts.checkout)
  p.append("campaign", "poolatlas")
  p.append("campaign", `pa_${placement}`)
  p.append("campaign", `pool_${label(pool.slug)}`)
  return `https://www.stay22.com/allez/roam?${p.toString()}`
}

/** A link that opens a stays search for a whole place, e.g. "Maui, Hawaii". */
export function getDestinationSearchUrl(place: string, placement: Placement = "dest_chapter", opts: { adults?: number } = {}): string {
  const p = new URLSearchParams()
  p.set("aid", STAY22_AID)
  p.set("address", place)
  if (opts.adults) p.set("adults", String(opts.adults))
  p.append("campaign", "poolatlas")
  p.append("campaign", `pa_${placement}`)
  p.append("campaign", `place_${label(place)}`)
  return `https://www.stay22.com/allez/roam?${p.toString()}`
}

/** iframe src for a Stay22 map of places to stay around a point or a place. */
export function getStaysMapSrc(
  where: { lat: number; lng: number } | { address: string },
  opts: { placement: Placement; tag: string; venue?: string; adults?: number },
): string {
  const p = new URLSearchParams()
  p.set("aid", STAY22_AID)
  if ("lat" in where) {
    p.set("lat", String(where.lat))
    p.set("lng", String(where.lng))
  } else {
    p.set("address", where.address)
  }
  if (opts.venue) p.set("venue", opts.venue)
  p.set("unitsystem", "imperial")
  if (opts.adults) p.set("adults", String(opts.adults))
  p.append("campaign", "poolatlas")
  p.append("campaign", `pa_${opts.placement}`)
  p.append("campaign", label(opts.tag))
  return `https://www.stay22.com/embed/gm?${p.toString()}`
}

/** rel for outbound booking links (matches the house rule: nofollow, no "sponsored"). */
export const BOOKING_REL = "nofollow noopener"
