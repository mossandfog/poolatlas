// Destination guides. Each one is a filter over lib/pool-data.ts plus a little editorial.
// Counts and pool lists are computed from the data, so they never drift.
// To add a destination: add an entry here. The page, the Explore card and the sitemap follow.

import { pools, type Pool } from "@/lib/pool-data"

export interface DestinationChapter {
  /** Short name, e.g. "Maui" */
  name: string
  /** One or two sentences on what the place is like for a pool trip */
  intro: string
  /** Pools in this chapter, by id, in reading order */
  poolIds: number[]
}

export interface Destination {
  slug: string
  name: string
  /** Shown on the Explore card */
  tagline: string
  /** Page title and meta description */
  title: string
  description: string
  /** Opening paragraph(s) on the page */
  intro: string[]
  /** Cover photo. Defaults to the destination's top-ranked pool. */
  image?: string
  match: (pool: Pool) => boolean
  /** Optional island-by-island (or area-by-area) chapters */
  chapters?: DestinationChapter[]
  /** Optional "when to go" notes */
  whenToGo?: { label: string; text: string }[]
  /** Related Deep End posts, by slug */
  relatedPosts?: string[]
  /** Featured guides get the big card on Explore */
  featured?: boolean
}

export const destinations: Destination[] = [
  {
    slug: "hawaii",
    name: "Hawaii",
    tagline: "Lava rock, reef water and whales offshore",
    title: "The Best Hotel Pools in Hawaii, Island by Island | Pool Atlas",
    description:
      "Our guide to Hawaii's best hotel pools on Oahu, Maui, Lanai, Hawaii Island and Kauai: an orchid mosaic in Waikiki, a swimmable lava-rock aquarium, adults-only infinity edges and the state's wildest family pool.",
    intro: [
      "Hawaii does pools differently. The water around the islands is warm all year, so the best hotel pools here are not trying to replace the ocean. They frame it, borrow from it, or in one case, fill themselves with it. You will find lava rock instead of marble, reef fish instead of mosaics (and one mosaic you will never forget), and an infinity edge that lines up with humpback whales for a third of the year.",
      "We've ranked six pools across five islands, from the classic beachfront of Waikiki to a cliff above Hanalei Bay. Here is where to stay, island by island, and when to go.",
    ],
    image: "/images/pools/pool-four-seasons-hualalai-kings-pond.jpg",
    match: (p) => /Hawaii$/.test(p.location),
    chapters: [
      {
        name: "Oahu",
        intro:
          "The busiest island and the easiest to reach, with the most flights from the mainland. Waikiki is a city beach, so a calm hotel pool matters more here than anywhere else in the state.",
        poolIds: [126],
      },
      {
        name: "Maui",
        intro:
          "South Maui's Wailea coast is the island's resort strip: dry, sunny and pointed straight at the whale channel. West Maui is still rebuilding after the 2023 Lahaina fire, and visitors who book there are part of that recovery; travel thoughtfully and follow local guidance.",
        poolIds: [129, 133],
      },
      {
        name: "Lanai",
        intro:
          "Nine miles off Maui and a world away from it. Lanai has no traffic lights and two resorts, so the pool is most of the itinerary, in the best way.",
        poolIds: [134],
      },
      {
        name: "Hawaii Island",
        intro:
          "The Big Island's Kona-Kohala coast is black lava fields running down to turquoise water. The resorts here are big and spread out, built around the lava rather than on top of it.",
        poolIds: [127],
      },
      {
        name: "Kauai",
        intro:
          "The wettest and greenest island. The North Shore around Hanalei is the dramatic side, with cliffs, waterfalls and big winter surf, so a pool with a view of it is a very good plan B.",
        poolIds: [131],
      },
    ],
    whenToGo: [
      {
        label: "December to April",
        text: "Humpback season. The whales are in Hawaiian waters from about November through April, and most numerous from January to March. Maui's Wailea and Lanai's Manele Bay are front-row seats.",
      },
      {
        label: "The holidays",
        text: "Christmas and New Year's are the most expensive weeks of the year in Hawaii, with long minimum stays at many resorts. The first two weeks of December are quieter, with the same water.",
      },
      {
        label: "April, May, September, October",
        text: "The shoulder months: fewer people, lower rates, warm water. Summer brings families and calm seas, especially on the north shores.",
      },
    ],
    relatedPosts: ["best-hotel-pools-hawaii", "thanksgiving-pool-trips-2026", "christmas-new-years-at-the-pool"],
    featured: true,
  },
  {
    slug: "bali",
    name: "Bali",
    tagline: "Jungle valleys and cliff-top infinity edges",
    title: "The Best Hotel Pools in Bali | Pool Atlas",
    description: "Bali's best hotel pools, from Ubud's jungle valleys to the cliffs of Uluwatu, ranked by Pool Atlas.",
    intro: [
      "Bali's pools split neatly in two: the jungle infinity edges of Ubud, hanging over river valleys and rice terraces, and the cliff-top pools of the south, pointed at the Indian Ocean. Dry season runs roughly April to October.",
    ],
    match: (p) => /Bali/.test(p.location),
    relatedPosts: ["best-hotel-pools-bali"],
  },
  {
    slug: "maldives",
    name: "Maldives",
    tagline: "Overwater villas and the clearest water on earth",
    title: "The Best Hotel Pools in the Maldives | Pool Atlas",
    description: "The Maldives' best resort pools, from overwater villa plunge pools to underwater spas, ranked by Pool Atlas.",
    intro: [
      "In the Maldives the lagoon is the main pool, so the resort pools that stand out are the ones that make the most of it: infinity edges level with the reef, and villas with their own water at the end of a jetty. The dry northeast monsoon, roughly December to April, brings the calmest seas.",
    ],
    match: (p) => p.country === "Maldives",
    relatedPosts: ["best-hotel-pools-maldives"],
  },
  {
    slug: "santorini",
    name: "Santorini",
    tagline: "Caldera views from the cliff edge",
    title: "The Best Hotel Pools in Santorini | Pool Atlas",
    description: "Santorini's best hotel pools on the caldera rim in Oia and Imerovigli, ranked by Pool Atlas.",
    intro: [
      "Santorini's pools are carved into a volcano's rim, so nearly all of them face the same view: the flooded caldera and the islands across it. Go in May, June or September for warm water without the August crowds.",
    ],
    match: (p) => /Santorini|Oia|Imerovigli/.test(p.location),
    relatedPosts: ["best-hotel-pools-greece"],
  },
  {
    slug: "dubai",
    name: "Dubai",
    tagline: "Record-setting rooftops over the Gulf",
    title: "The Best Hotel Pools in Dubai | Pool Atlas",
    description: "Dubai's best hotel pools, from the world's highest infinity pools to the beach clubs of the Palm, ranked by Pool Atlas.",
    intro: [
      "Dubai builds pools the way it builds everything else: higher, longer and with a bar in the middle. November to March is the season to swim; summer midday heat keeps most people indoors.",
    ],
    match: (p) => p.country === "UAE" && /Dubai|JBR|Palm Jumeirah/.test(p.location + p.hotel),
  },
  {
    slug: "lake-como",
    name: "Lake Como",
    tagline: "Floating pools and Belle Époque villas",
    title: "The Best Hotel Pools on Lake Como | Pool Atlas",
    description: "Lake Como's best hotel pools, from Villa d'Este's floating pool to Il Sereno's lakefront edge, ranked by Pool Atlas.",
    intro: [
      "Lake Como's grand hotels solved the problem of swimming in a cold alpine lake a century ago: they built pools that float on it. The season runs April to October, and September is the sweet spot.",
    ],
    match: (p) => /Lake Como|Cernobbio|Como$/.test(p.location),
    relatedPosts: ["best-hotel-pools-italy"],
  },
]

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug)
}

export function poolsFor(destination: Destination): Pool[] {
  return pools.filter(destination.match).sort((a, b) => a.rank - b.rank)
}

export function coverImage(destination: Destination): string {
  return destination.image ?? poolsFor(destination)[0]?.image ?? "/images/hero-pool.jpg"
}
