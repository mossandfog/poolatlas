/**
 * Affiliate link utilities for Pool Atlas
 *
 * SETUP:
 * 1. Sign up at https://www.booking.com/affiliate-program/index.html
 * 2. Get your AID (affiliate ID number, e.g. 1234567)
 * 3. Add NEXT_PUBLIC_BOOKING_AID=1234567 to Vercel Environment Variables
 *    (Settings → Environment Variables → add for Production + Preview)
 *
 * Commission: ~3–4% of booking value, 30-day cookie, paid by Booking.com
 */

// Read AID from environment — set this in Vercel dashboard once you have it
const AID = process.env.NEXT_PUBLIC_BOOKING_AID || ""

/**
 * Known Booking.com property slugs for direct deep-links.
 * Format: "country-code/property-slug"
 * Add more as you confirm each hotel's Booking.com URL.
 */
const BOOKING_SLUGS: Record<number, string> = {
  1:  "gr/grace-santorini-imerovigli",
  2:  "sg/marina-bay-sands",
  3:  "id/amankila-manggis",
  4:  "fr/hotel-du-cap-eden-roc-antibes",
  5:  "mv/st-regis-maldives-vommuli-resort",
  6:  "tz/four-seasons-ngorongoro-serengeti",
  7:  "cl/san-alfonso-del-mar-algarrobo",
  8:  "it/belmond-hotel-caruso-ravello",
  9:  "vn/intercontinental-danang",
  10: "jp/aman-tokyo",
  11: "au/hayman-island-by-intercontinental",
  12: "id/como-uma-ubud",
  13: "mw/pumulani-lodge",
  14: "mq/cap-jaluca",
  15: "mx/rosewood-mayakoba-playa-del-carmen",
  16: "es/w-barcelona",
  17: "th/amanpuri-resort",
  18: "us/four-seasons-biltmore-santa-barbara",
  19: "id/bulgari-resort-bali",
  20: "mx/las-ventanas-al-paraiso-san-jose-del-cabo",
  22: "ke/four-seasons-safari-lodge-serengeti",
  23: "cn/st-regis-lhasa",
  24: "cr/nayara-tented-camp",
  25: "au/longitude-131-ayers-rock",
  27: "gr/andronis-boutique-hotel-oia",
  28: "pr/dorado-beach-ritz-carlton-reserve",
  29: "us/amangiri-canyon-point",
  30: "th/137-pillars-suites-residences-bangkok",
  32: "mx/waldorf-astoria-riviera-maya",
  33: "dm/secret-bay",
  34: "ai/belmond-cap-juluca",
  35: "na/andbeyond-sossusvlei-desert-lodge",
  37: "it/hotel-de-russie-rome",
  38: "za/the-silo-hotel-cape-town",
  39: "gb/shangri-la-the-shard-london",
  40: "cn/w-hong-kong",
}

/**
 * Returns a Booking.com affiliate URL for a pool.
 * Uses a direct property deep-link if known, otherwise a name+location search.
 * Returns null if no AID is configured (fallback to direct hotel URL in the UI).
 */
export function getBookingUrl(pool: {
  id: number
  hotel: string
  location: string
  country: string
}): string | null {
  if (!AID) return null

  const slug = BOOKING_SLUGS[pool.id]

  if (slug) {
    return `https://www.booking.com/hotel/${slug}.html?aid=${AID}&label=poolatlas&lang=en-us&selected_currency=USD`
  }

  // Search-based fallback — works well, Booking.com finds the exact hotel
  const query = `${pool.hotel}, ${pool.location}, ${pool.country}`
  const params = new URLSearchParams({
    ss: query,
    aid: AID,
    label: "poolatlas",
    lang: "en-us",
    selected_currency: "USD",
  })
  return `https://www.booking.com/searchresults.html?${params.toString()}`
}

/**
 * Destination search affiliate link — use on region/country pages.
 */
export function getDestinationSearchUrl(destination: string): string {
  const params: Record<string, string> = { ss: destination, lang: "en-us" }
  if (AID) {
    params.aid = AID
    params.label = "poolatlas"
  }
  return `https://www.booking.com/searchresults.html?${new URLSearchParams(params).toString()}`
}
