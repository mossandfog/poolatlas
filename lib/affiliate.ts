// Affiliate Configuration
// Update these values once you receive your affiliate IDs from booking partners

export const affiliateConfig = {
  // Booking.com Partner ID - Get yours at: https://partners.booking.com
  bookingComId: "", // e.g., "1234567"
  
  // Hotels.com Affiliate ID - Get yours at: https://hotels.com/affiliate
  hotelsComId: "",
  
  // Enable affiliate links (set to true once you have your IDs)
  enabled: false,
}

// Hotel slugs for Booking.com deep linking
// Format: country/hotel-name-city
const hotelSlugs: Record<number, string> = {
  1: "gr/grace-santorini-imerovigli",
  2: "sg/marina-bay-sands",
  3: "id/amankila-manggis",
  4: "fr/hotel-du-cap-eden-roc-antibes",
  5: "mv/st-regis-maldives-vommuli-resort",
  6: "tz/four-seasons-serengeti",
  7: "us/san-alfonso-del-mar-algarrobo", // Chile but example
  8: "it/belmond-hotel-caruso-ravello",
  9: "vn/intercontinental-danang",
  10: "jp/aman-tokyo",
  // Add more as needed
}

/**
 * Generate an affiliate booking URL for a hotel
 * @param poolId - The pool/hotel ID from your database
 * @param fallbackUrl - The direct hotel booking URL to use if affiliate isn't configured
 */
export function getAffiliateBookingUrl(poolId: number, fallbackUrl?: string): string {
  // If affiliate is not enabled or no Booking.com ID, return fallback
  if (!affiliateConfig.enabled || !affiliateConfig.bookingComId) {
    return fallbackUrl || "#"
  }

  const hotelSlug = hotelSlugs[poolId]
  
  if (hotelSlug) {
    // Deep link to specific hotel on Booking.com with affiliate tracking
    return `https://www.booking.com/hotel/${hotelSlug}.html?aid=${affiliateConfig.bookingComId}&label=poolatlas`
  }
  
  // Fallback to Booking.com search with affiliate tracking
  return `https://www.booking.com/searchresults.html?aid=${affiliateConfig.bookingComId}&label=poolatlas`
}

/**
 * Generate a search URL for a destination
 * @param destination - City or region name
 */
export function getDestinationSearchUrl(destination: string): string {
  if (!affiliateConfig.enabled || !affiliateConfig.bookingComId) {
    return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}`
  }
  
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&aid=${affiliateConfig.bookingComId}&label=poolatlas`
}
