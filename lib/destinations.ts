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
  /** Where the "Find stays" link searches. Defaults to "<chapter>, <destination>". */
  place?: string
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
  /** Where the stays map centers. Defaults to the name; null hides the map (guides that span several countries). */
  mapPlace?: string | null
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
  {
    slug: "miami-beach",
    name: "Miami Beach",
    tagline: "Art Deco, cabana rows and the Atlantic",
    title: "The Best Hotel Pools in Miami Beach | Pool Atlas",
    description:
      "Miami Beach's best hotel pools, from the 1930 Surf Club's Cabana Row to Faena's candy-striped deck and the Setai's three heated infinity pools, ranked by Pool Atlas.",
    intro: [
      "Miami Beach invented the American resort pool as a stage, and the best ones still play the part. A 1930 beach club with its original cabana row, a Lapidus landmark from the Rat Pack years, three infinity pools at three different temperatures, and a rooftop 18 floors over South Beach.",
      "We've ranked five pools along Collins Avenue, from South Beach up to Surfside. Most sit right on the sand, so the pool and the Atlantic are one decision, not two.",
    ],
    image: "/images/pools/pool-four-seasons-surf-club.jpg",
    match: (p) => /Miami Beach/.test(p.location),
    mapPlace: "Miami Beach, Florida",
    chapters: [
      {
        name: "South Beach",
        intro: "The Art Deco district and the busiest stretch of sand. Pools here are a retreat from the scene on Ocean Drive, or the scene itself, depending on the deck.",
        poolIds: [136, 137],
        place: "South Beach, Miami Beach, Florida",
      },
      {
        name: "Mid-Beach",
        intro: "North of the Collins Canal the hotels get bigger and the beach gets calmer. This is where Miami Beach's 1950s grandeur lives, and where the art crowd stays.",
        poolIds: [135, 139],
        place: "Mid-Beach, Miami Beach, Florida",
      },
      {
        name: "Surfside",
        intro: "A quiet small town just north of the city line, with a wide beach and the most exclusive address on the strip.",
        poolIds: [138],
        place: "Surfside, Florida",
      },
    ],
    whenToGo: [
      { label: "November to April", text: "Dry, sunny and in the high 70s. The season that built Miami Beach, and the reason the pools fill up." },
      { label: "Art Basel week", text: "Early December. Every room on the beach books out months ahead, so plan by late summer." },
      { label: "June to November", text: "Hot, humid and hurricane season. Rates drop sharply; watch the forecast and book flexible." },
    ],
    relatedPosts: ["art-basel-miami-beach-2026-hotel-pools", "where-to-swim-this-winter"],
  },
  {
    slug: "mexico",
    name: "Mexico",
    tagline: "Desert edges in Cabo, jungle lagoons on the Riviera Maya",
    title: "The Best Hotel Pools in Mexico | Pool Atlas",
    description:
      "Mexico's best hotel pools in Los Cabos and on the Riviera Maya: infinity edges over the Sea of Cortez and resort pools on the Caribbean, ranked by Pool Atlas.",
    intro: [
      "Mexico gives you two very different pool trips. In Los Cabos, at the tip of Baja, the desert runs straight into the Sea of Cortez, and most of the beaches are too rough to swim, so the pool does the work and the infinity edge is the point. On the Riviera Maya, the Caribbean side, the water is calm and turquoise and the resorts are built among mangroves and cenotes.",
    ],
    image: "/images/pools/pool-las-ventanas-al-paraiso.jpg",
    match: (p) => p.country === "Mexico",
    mapPlace: null,
    chapters: [
      {
        name: "Los Cabos",
        intro: "The Tourist Corridor between San José del Cabo and Cabo San Lucas is lined with resorts facing the Sea of Cortez. Direct flights from most of the US make it the easiest winter sun on the West Coast.",
        poolIds: [140, 130, 46],
        place: "Los Cabos, Baja California Sur, Mexico",
      },
      {
        name: "Riviera Maya",
        intro: "South of Cancún, from Puerto Morelos down toward Tulum. Calm Caribbean water, Mayan ruins and freshwater cenotes in the jungle behind the beach.",
        poolIds: [32],
        place: "Riviera Maya, Quintana Roo, Mexico",
      },
    ],
    whenToGo: [
      { label: "Los Cabos: November to May", text: "Dry and warm, with gray whales offshore from roughly December to April." },
      { label: "Riviera Maya: December to April", text: "The dry season. Sargassum seaweed can reach the beaches from spring into summer, one more reason the pool matters." },
      { label: "Summer and fall", text: "Hot, humid and hurricane season on both coasts, with the lowest rates of the year." },
    ],
  },
  {
    slug: "amalfi-coast",
    name: "Amalfi Coast",
    tagline: "Cliff-hung pools above the Tyrrhenian",
    title: "The Best Hotel Pools on the Amalfi Coast | Pool Atlas",
    description:
      "The Amalfi Coast's best hotel pools in Ravello, Positano, Amalfi and Conca dei Marini, from Belmond Caruso's floating edge to a 17th-century monastery's terraces, ranked by Pool Atlas.",
    intro: [
      "The Amalfi Coast is a cliff with towns stuck to it, and there is very little beach to go around. That is why its hotel pools are some of the most famous in the world: carved into terraces, cantilevered off old monasteries and villas, and hung hundreds of feet over the sea.",
      "Most hotels here close for winter, so the season is short and the good rooms go early. Book for June or September and you get warm water without August's crowds.",
    ],
    match: (p) => [6, 7, 65, 105].includes(p.id),
    mapPlace: "Amalfi Coast, Italy",
    whenToGo: [
      { label: "May and June", text: "Long days, warm sun and the lemon groves in leaf. The sea is still cool, which is when a heated pool earns its keep." },
      { label: "July and August", text: "Peak season, peak prices, and the coast road at a crawl. Stay put and swim." },
      { label: "September and October", text: "The sea is at its warmest and the crowds thin out. Most hotels close from November to March or April." },
    ],
    relatedPosts: ["best-hotel-pools-italy", "best-hotel-pools-for-honeymoons"],
  },
  {
    slug: "mallorca-ibiza",
    name: "Mallorca & Ibiza",
    tagline: "Fortress walls, orange groves and Ibiza sunsets",
    title: "The Best Hotel Pools in Mallorca and Ibiza | Pool Atlas",
    description:
      "The Balearic Islands' best hotel pools, from a fortress above the Bay of Palma to Deià's mountain village and Ibiza's cliffs, ranked by Pool Atlas.",
    intro: [
      "Spain's Balearic Islands are close neighbors with completely different moods. Mallorca is mountains, stone villages and old fortresses; Ibiza is coves, pine forest and the best sunsets in the Mediterranean, once you get away from the clubs.",
      "We've ranked six pools across the two islands. Many hotels here are seasonal, opening around April and closing in late October.",
    ],
    image: "/images/pools/pool-cap-rocat-mallorca.jpg",
    match: (p) => [62, 119, 120, 43, 56, 118].includes(p.id),
    mapPlace: null,
    chapters: [
      {
        name: "Mallorca",
        intro: "The bigger island, with the Tramuntana mountains along its northwest coast and Palma's cathedral on the bay. Rent a car; the mountain roads are half the trip.",
        poolIds: [62, 119, 120],
        place: "Mallorca, Spain",
      },
      {
        name: "Ibiza",
        intro: "Smaller and wilder than its reputation. The north of the island, around San Miguel and Portinatx, is quiet, green and made for long lunches.",
        poolIds: [43, 56, 118],
        place: "Ibiza, Spain",
      },
    ],
    whenToGo: [
      { label: "May and June", text: "Warm, green and calm before the summer rush. Almond and orange blossom are done, the beaches aren't full yet." },
      { label: "July and August", text: "Hot and busy, especially on Ibiza. Pool days become the plan." },
      { label: "September", text: "The sweet spot: the sea is warm, the light is golden and the season winds down by late October." },
    ],
    relatedPosts: ["best-hotel-pools-spain"],
  },
  {
    slug: "caribbean",
    name: "The Caribbean",
    tagline: "Clifftop edges and reef-blue water, island by island",
    title: "The Best Hotel Pools in the Caribbean | Pool Atlas",
    description:
      "The Caribbean's best hotel pools on Turks and Caicos, Anguilla, Antigua, Dominica, Saint Lucia and Puerto Rico, ranked by Pool Atlas.",
    intro: [
      "Every Caribbean island has a beach. What sets the best hotels apart is where they put the pool: on a cliff over Grace Bay, under the Pitons, in a rainforest by a river mouth, or right on the reef line so the pool and the sea read as one color.",
      "We've ranked seven pools across six islands. The season runs December to April, and the winter holidays book out first.",
    ],
    match: (p) => [18, 128, 34, 26, 33, 100, 28].includes(p.id),
    mapPlace: null,
    chapters: [
      {
        name: "Turks and Caicos",
        intro: "Providenciales has the famous beach, Grace Bay, and some of the clearest water in the Caribbean. Short flights from the East Coast.",
        poolIds: [18, 128],
        place: "Providenciales, Turks and Caicos",
      },
      {
        name: "Anguilla",
        intro: "Flat, quiet and ringed with white sand. No cruise ships, no high-rises, and some of the best beaches in the region.",
        poolIds: [34],
        place: "Anguilla",
      },
      {
        name: "Antigua",
        intro: "An island said to have a beach for every day of the year, with sheltered bays on the calm west coast.",
        poolIds: [26],
        place: "Antigua",
      },
      {
        name: "Dominica",
        intro: "The nature island: rainforest, hot springs and black sand. Come for the drama, not the long flat beaches.",
        poolIds: [33],
        place: "Portsmouth, Dominica",
      },
      {
        name: "Saint Lucia",
        intro: "Volcanic and steep, with the twin Pitons rising out of the sea near Soufrière.",
        poolIds: [100],
        place: "Soufrière, Saint Lucia",
      },
      {
        name: "Puerto Rico",
        intro: "No passport needed from the US, and Dorado's beaches are under an hour from San Juan.",
        poolIds: [28],
        place: "Dorado, Puerto Rico",
      },
    ],
    whenToGo: [
      { label: "December to April", text: "Dry season: sunny, breezy and in the low 80s. The peak, so book the holidays early." },
      { label: "May and June", text: "Still lovely and noticeably cheaper, before the rains and the storms." },
      { label: "June to November", text: "Hurricane season, peaking August to October. Some resorts close for a few weeks in the fall." },
    ],
    relatedPosts: ["best-hotel-pools-caribbean", "christmas-new-years-at-the-pool"],
  },
  {
    slug: "thailand",
    name: "Thailand",
    tagline: "Rooftops in Bangkok, limestone bays in the south",
    title: "The Best Hotel Pools in Thailand | Pool Atlas",
    description:
      "Thailand's best hotel pools in Bangkok, Chiang Mai, Phuket, Phang Nga Bay, Koh Samui and Hua Hin, ranked by Pool Atlas.",
    intro: [
      "Thailand does every kind of hotel pool and does it at a price the rest of the world can't match. Rooftop pools over Bangkok, rice-paddy views in the north, and infinity edges over limestone islands in the Andaman Sea.",
      "Two coasts with two monsoons mean there is a good beach somewhere in Thailand most months of the year. Here is where to swim, and when.",
    ],
    match: (p) => p.country === "Thailand",
    mapPlace: null,
    chapters: [
      {
        name: "Bangkok",
        intro: "The capital is hot and humid all year, which makes a rooftop pool the best room in the hotel.",
        poolIds: [30, 124],
        place: "Bangkok, Thailand",
      },
      {
        name: "Chiang Mai",
        intro: "The cooler, greener north, with temples, night markets and mountains on every side.",
        poolIds: [14],
        place: "Chiang Mai, Thailand",
      },
      {
        name: "The Andaman Coast",
        intro: "Phuket and Phang Nga Bay, on the west coast: limestone karsts rising out of the sea. Best from November to April.",
        poolIds: [78, 72],
        place: "Phuket, Thailand",
      },
      {
        name: "The Gulf of Thailand",
        intro: "Koh Samui and the coast south of Bangkok. The Gulf keeps its own calendar, and Samui is often at its best when the Andaman side is rainy.",
        poolIds: [77, 94, 42],
        place: "Koh Samui, Thailand",
      },
    ],
    whenToGo: [
      { label: "November to March", text: "The cool, dry season across most of the country, and the best time for Bangkok, the north and the Andaman coast." },
      { label: "January to August", text: "Koh Samui's long dry spell. Its rainy months are October and November." },
      { label: "April and May", text: "The hottest months, right before the southwest monsoon. Pool weather, if you can take the heat." },
    ],
    relatedPosts: ["best-hotel-pools-thailand"],
  },
  {
    slug: "safari",
    name: "Safari Lodges",
    tagline: "Plunge pools with elephants at the waterhole",
    title: "The Best Safari Lodge Pools in Africa | Pool Atlas",
    description:
      "The best safari lodge pools in Africa, in the Serengeti, Kruger, Botswana's salt pans and Namibia's desert, ranked by Pool Atlas.",
    intro: [
      "On safari the pool is where you spend the middle of the day, when the animals sleep in the shade and so should you. The best lodges point their pools at a waterhole or a river, so the game drive never really stops.",
      "We've ranked six lodges in four countries. Most safari seasons follow the dry months, when the bush thins and the animals gather near water.",
    ],
    match: (p) => [22, 64, 117, 36, 35, 87].includes(p.id),
    mapPlace: null,
    chapters: [
      {
        name: "Tanzania",
        intro: "The Serengeti, home of the Great Migration. The herds move through the year, so ask your lodge where they will be for your dates.",
        poolIds: [22],
        place: "Serengeti National Park, Tanzania",
      },
      {
        name: "South Africa",
        intro: "Kruger and the private reserves on its western edge: an easy hop from Johannesburg, and very good for the Big Five.",
        poolIds: [64, 117],
        place: "Kruger National Park, South Africa",
      },
      {
        name: "Botswana",
        intro: "The Makgadikgadi salt pans: flat, white and enormous, with meerkats and zebra migrations in place of the usual safari script.",
        poolIds: [36],
        place: "Makgadikgadi Pans, Botswana",
      },
      {
        name: "Namibia",
        intro: "Red dunes at Sossusvlei and open savannah to the north. Desert air, huge skies and some of the best stargazing on earth.",
        poolIds: [35, 87],
        place: "Sossusvlei, Namibia",
      },
    ],
    whenToGo: [
      { label: "June to October", text: "The dry season across southern and East Africa: the best game viewing, cool mornings and warm afternoons at the pool." },
      { label: "November to March", text: "Green season. Lush, cheaper and full of newborn animals, with afternoon storms." },
      { label: "Pack for the cold", text: "Desert and highland mornings can be near freezing in July, even when the pool is warm by noon." },
    ],
    relatedPosts: ["best-hotel-pools-africa"],
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
