/**
 * Hotel sales shown as deal cards in posts. Place a card with a line like {{deal:palmilla-bf26}}.
 *
 * Every entry was checked against the hotel or brand's own offer page, or current trade press
 * when the brand page wasn't live yet, on the `checked` date. Cards stop offering "Get the deal"
 * once `bookBy` has passed (Pacific time) and say the sale has ended, but keep the Stay22
 * "Compare rates" link so the page keeps working after the sale.
 */
export interface Deal {
  id: string
  /** Ranked pool id: the card links to its pool page and books it through Stay22 */
  poolId?: number
  /** For hotels we don't rank */
  hotel?: { name: string; address: string; lat?: number; lng?: number }
  /** Shown above the hotel name, e.g. "Los Cabos, Mexico" */
  place: string
  /** The sale, in a line: "Up to 30% off, plus a daily resort credit" */
  offer: string
  /** One or two sentences on the pool and why it's worth it */
  why: string
  /** Fine print as short lines */
  terms: string[]
  /** Last day to book, YYYY-MM-DD; null when the brand hasn't published one */
  bookBy: string | null
  /** The hotel or brand's own offer page */
  dealUrl: string
  /** Where the terms were confirmed */
  source: string
  checked: string
}

export const deals: Record<string, Deal> = {
  "palmilla-bf26": {
    id: "palmilla-bf26",
    poolId: 130,
    place: "Los Cabos, Mexico",
    offer: "Up to 30% off, plus a resort credit every night",
    why: "Two oceanfront infinity pools where the Baja desert meets the sea, one for families and one for adults only, with Agua's terrace looking over them at sunset. Winter is whale season here!",
    terms: ["Book by December 3, 2026", "Two-night minimum", "Promo code GRATITUDE on the resort's site"],
    bookBy: "2026-12-03",
    dealUrl: "https://www.oneandonlyresorts.com/palmilla/offers",
    source: "One&Only Palmilla offers page; TravelSort",
    checked: "2026-11-24",
  },
  "hayman-bf26": {
    id: "hayman-bf26",
    poolId: 132,
    place: "Whitsundays, Australia",
    offer: "IHG sale: up to 30% off",
    why: "Hayman Pool holds about seven Olympic pools' worth of water and is billed as the largest in Australia, with the Great Barrier Reef a short boat ride away. The southern summer lines up with our winter.",
    terms: ["Book by December 3, 2026", "Stays through April 2027", "Participating hotels only: check that Hayman shows the sale rate"],
    bookBy: "2026-12-03",
    dealUrl: "https://www.ihg.com/",
    source: "TravelPulse, November 2026",
    checked: "2026-11-24",
  },
  "fairmont-mayakoba-bf26": {
    id: "fairmont-mayakoba-bf26",
    hotel: {
      name: "Fairmont Mayakoba",
      address: "Fairmont Mayakoba, Carretera Federal Cancun-Playa del Carmen Km 298, Playa del Carmen, Quintana Roo, Mexico",
      lat: 20.6905,
      lng: -87.0352,
    },
    place: "Riviera Maya, Mexico",
    offer: "30% off your stay",
    why: "A big, easy resort on the Caribbean coast, set among mangrove lagoons and canals between Cancún and Playa del Carmen. The stay window runs a full year, so it works for spring break and next winter too.",
    terms: ["Book November 13 to December 2, 2026", "Stays November 28, 2026 to December 19, 2027"],
    bookBy: "2026-12-02",
    dealUrl: "https://www.fairmont.com/en/hotels/riviera-maya/fairmont-mayakoba/offers/black-friday.html",
    source: "Fairmont Mayakoba offer page",
    checked: "2026-11-24",
  },
  "hamilton-princess-bf26": {
    id: "hamilton-princess-bf26",
    hotel: {
      name: "Hamilton Princess & Beach Club",
      address: "Hamilton Princess & Beach Club, 76 Pitts Bay Road, Hamilton, Bermuda",
      lat: 32.2918,
      lng: -64.7906,
    },
    place: "Hamilton, Bermuda",
    offer: "Fairmont Black Friday: 30% off",
    why: "A pink grand hotel on Hamilton Harbour, open since 1885, with a harborfront pool and its own beach club on the South Shore. About two hours' flight from New York.",
    terms: ["Book November 25 to December 1, 2026", "Stays November 28, 2026 to May 31, 2027", "Full deposit at booking"],
    bookBy: "2026-12-01",
    dealUrl: "https://www.fairmont.com/en/hotels/bermuda/hamilton-princess-beach-club/offers/Fairmont-Black-Friday-Sale-2026.html",
    source: "Fairmont Hamilton Princess offer page",
    checked: "2026-11-24",
  },
  "hyatt-uluwatu-bf26": {
    id: "hyatt-uluwatu-bf26",
    poolId: 74,
    place: "Bali, Indonesia",
    offer: "Hyatt Cyber Sale: members save up to 25%",
    why: "Alila Villas Uluwatu's infinity pool sits on a cliff 50 meters above the Indian Ocean at Bali's southern tip. The same sale covers Park Hyatt Tokyo's glass-walled pool on the 47th floor.",
    terms: ["Book by December 8, 2026", "Stays through April 30, 2027", "Non-members save up to 20%; sale rates are usually prepaid"],
    bookBy: "2026-12-08",
    dealUrl: "https://www.hyatt.com/promo/save-more",
    source: "Hyatt offer page",
    checked: "2026-11-24",
  },
  "marriott-dorado-bf26": {
    id: "marriott-dorado-bf26",
    poolId: 28,
    place: "Dorado, Puerto Rico",
    offer: "Marriott Cyber Week: 25% off in the Bonvoy app",
    why: "A former Rockefeller plantation west of San Juan with private plunge pools, where JFK and Elizabeth Taylor once stayed. No passport needed from the US. The same sale covers Mandapa in Bali.",
    terms: ["Book November 24 to December 1, 2026", "Stays November 29, 2026 to May 2, 2027", "15% off on Marriott.com; resorts honor the sale any day, city hotels on weekends"],
    bookBy: "2026-12-01",
    dealUrl: "https://www.marriott.com/",
    source: "Marriott Bonvoy announcement; sale live November 24",
    checked: "2026-11-24",
  },
  "hilton-grand-wailea-bf26": {
    id: "hilton-grand-wailea-bf26",
    poolId: 133,
    place: "Maui, Hawaii",
    offer: "The Hilton Sale: members save up to 20%",
    why: "Nine pools stepping down six levels, with seven waterslides, a rope swing and a water elevator: the most ambitious family pool in Hawaii. The same sale covers Waldorf Astoria Riviera Maya.",
    terms: ["Book November 18 to December 22, 2026", "Stays through April 2, 2027", "Hilton Honors members; participating hotels only"],
    bookBy: "2026-12-22",
    dealUrl: "https://www.hilton.com/",
    source: "TravelPulse, November 2026",
    checked: "2026-11-24",
  },
  "mgm-mandalay-bf26": {
    id: "mgm-mandalay-bf26",
    hotel: {
      name: "Mandalay Bay Resort and Casino",
      address: "Mandalay Bay, 3950 S Las Vegas Blvd, Las Vegas, NV 89119, USA",
      lat: 36.0919,
      lng: -115.1761,
    },
    place: "Las Vegas, Nevada",
    offer: "MGM Resorts: up to 30% off, plus up to $150 to spend on food and drinks",
    why: "Mandalay Bay Beach is eleven acres of pools, a lazy river and a wave pool with real sand. The sale also covers Bellagio and Aria.",
    terms: ["Book November 24 to December 3, 2026", "Stays through October 31, 2027", "The beach pools are seasonal, so aim for spring or later"],
    bookBy: "2026-12-03",
    dealUrl: "https://www.mgmresorts.com/",
    source: "TravelPulse; The Points Guy, November 2026",
    checked: "2026-11-24",
  },
  "domes-bf26": {
    id: "domes-bf26",
    hotel: {
      name: "Domes of Elounda",
      address: "Domes of Elounda, Elounda, Crete, Greece",
      lat: 35.2477,
      lng: 25.7369,
    },
    place: "Crete, Greece",
    offer: "Domes Resorts: up to 30% off in Greece, up to 45% in Spain and Portugal",
    why: "Domes of Elounda looks over the Mirabello Bay in eastern Crete, with suites that come with their own pools. A good way to lock in next summer in Greece at this year's prices.",
    terms: ["Book November 19 to December 2, 2026", "Three-night minimum", "€120 resort credit per stay"],
    bookBy: "2026-12-02",
    dealUrl: "https://domesresorts.com/",
    source: "Travel Market Report; Upgraded Points, November 2026",
    checked: "2026-11-24",
  },
  "hard-rock-cabo-bf26": {
    id: "hard-rock-cabo-bf26",
    hotel: {
      name: "Hard Rock Hotel Los Cabos",
      address: "Hard Rock Hotel Los Cabos, Diamante, Cabo San Lucas, Baja California Sur, Mexico",
      lat: 22.9419,
      lng: -109.9666,
    },
    place: "Los Cabos, Mexico",
    offer: "Up to 55% off, all-inclusive",
    why: "The beach here faces the open Pacific and isn't for swimming, so the pools are the main event, with three water slides for kids. Book seven nights and the resort credit becomes unlimited.",
    terms: ["Book by November 27, 2026", "Stays through December 2027", "Airport transfers included; third and fourth guests stay free"],
    bookBy: "2026-11-27",
    dealUrl: "https://hotel.hardrock.com/all-inclusive/news/hard-rock-hotel-los-cabos-black-friday-deal-up-to-55-off-timed-for-whale-watching-season/",
    source: "Hard Rock Hotels; AIC Hotel Group release, November 23, 2026",
    checked: "2026-11-24",
  },
}
