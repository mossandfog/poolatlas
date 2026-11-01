// Honeymoon Pools: hotel pools picked for two, grouped by the kind of trip.
// Every pool is already in the rankings (lib/pool-data.ts); this file only adds the
// grouping, the editorial lines and the booking context. Pool facts live in pool-data.
// To add a pick: add its id to a chapter. To add a chapter: add an entry below.

import { pools, type Pool } from "@/lib/pool-data"

export interface HoneymoonChapter {
  id: string
  name: string
  /** Two or three sentences on why this kind of trip works for two */
  intro: string
  /** When to go, in plain words */
  when: string
  /** Place name for the "Compare stays" search link; omitted when the picks are spread out */
  area?: string
  /** How to say the place in a sentence: "on the Amalfi Coast", "in the Maldives" */
  inPlace?: string
  /** Optional Stay22 map, only for chapters that sit in one place */
  map?: { lat: number; lng: number; venue: string }
  poolIds: number[]
}

/** Couples: booking links pre-fill two adults */
export const HONEYMOON_ADULTS = 2

export const honeymoonChapters: HoneymoonChapter[] = [
  {
    id: "santorini",
    name: "Santorini, above the caldera",
    intro:
      "The classic, and for good reason. The cliff villages face west across a drowned volcano, so every evening ends with the same show, and the best seats are in the water. Grace Santorini's pool is adults only; down the ridge in Oia, Andronis cut its pools into the rock.",
    when: "May to October. June and September bring warm water and thinner crowds.",
    area: "Santorini, Greece",
    inPlace: "on Santorini",
    map: { lat: 36.4316, lng: 25.423, venue: "Imerovigli, Santorini" },
    poolIds: [1, 27],
  },
  {
    id: "amalfi",
    name: "The Amalfi Coast",
    intro:
      "Three ways to look down on the Tyrrhenian Sea: a garden pool at an 11th-century palace in Ravello, a green pool high above Positano's harbor, and a freshwater infinity pool cut into the cliff at a former monastery. These are seasonal hotels, mostly open from spring to fall, so check your dates first.",
    when: "April to October. May and late September are the sweet spots.",
    area: "Amalfi Coast, Italy",
    inPlace: "on the Amalfi Coast",
    map: { lat: 40.64, lng: 14.56, venue: "Amalfi Coast, Italy" },
    poolIds: [7, 105, 6],
  },
  {
    id: "maldives",
    name: "The Maldives, barefoot",
    intro:
      "The honeymoon most people picture, and the pools are built to match. Huvafen Fushi lights its infinity pool with fiber optics after dark, One&Only Reethi Rah set a pool inside a pool inside the sea at its spa, and at Joali the edge simply runs into the lagoon.",
    when: "December to April, the dry season.",
    area: "North Malé Atoll, Maldives",
    inPlace: "in the Maldives",
    map: { lat: 4.37, lng: 73.39, venue: "North Malé Atoll, Maldives" },
    poolIds: [12, 92, 81],
  },
  {
    id: "private",
    name: "A pool of your own",
    intro:
      "For couples who would rather not share the water at all. Plunge pools on the decks at Koh Samui, villa pools facing the Aegean on Crete, clifftop plunge pools in Dominica, volcano-warmed pools in the Costa Rican rainforest, and Amanoi's quiet villas above Vinh Hy Bay.",
    when:
      "Koh Samui and Vietnam's south-central coast are driest in the first half of the year, Crete is a May to October trip, and Dominica and Costa Rica dry out from December to April.",
    poolIds: [121, 77, 52, 33, 24],
  },
  {
    id: "safari",
    name: "Safari, with a swim",
    intro:
      "Elephants at the waterhole and a pool to watch them from. Every suite at Royal Malewane has its own pool over the bush, Singita Sweni's private pools sit close to the river, and the Four Seasons in the Serengeti built its infinity pool above a waterhole where elephants come to drink.",
    when: "June to October, the dry season, when the animals gather near water.",
    poolIds: [117, 64, 22],
  },
  {
    id: "adults-only",
    name: "Adults only, a short flight from the US",
    intro:
      "No long-haul flight, and no cannonballs. The Serenity Pool at the Four Seasons Maui and the cliff pool at 1 Hotel Hanalei Bay are both for guests 21 and over, One&Only Palmilla keeps one of its two infinity pools for adults, and Amanyara's long dark pool faces an empty stretch of reserve coastline.",
    when:
      "Hawaii works all year, with humpback whales off Maui from December to April. Los Cabos and Turks and Caicos are best from late fall through spring.",
    poolIds: [129, 131, 130, 128],
  },
  {
    id: "desert",
    name: "The desert",
    intro:
      "Red rock, dry air and nights full of stars. Amangiri's pool sits in a courtyard framed by a rock escarpment in the Utah desert, and Banyan Tree AlUla carved its Rock Pool into the floor of a sandstone canyon.",
    when: "Spring and fall for Utah. October to March for AlUla, when the days are warm rather than hot.",
    poolIds: [5, 125],
  },
]

const byId = new Map(pools.map((p) => [p.id, p]))

export function chapterPools(chapter: HoneymoonChapter): Pool[] {
  return chapter.poolIds.map((id) => byId.get(id)).filter((p): p is Pool => Boolean(p))
}

/** Every honeymoon pick, in page order */
export const honeymoonPoolIds: number[] = honeymoonChapters.flatMap((c) => c.poolIds)

export const honeymoonCount = honeymoonPoolIds.filter((id) => byId.has(id)).length
