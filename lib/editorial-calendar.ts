// Pool Atlas editorial calendar.
//
// Every month-specific piece of the homepage (Pool of the Month, Editor's Picks,
// the default Seasonal tab) reads from here, keyed off today's date. Plan the
// whole year once and the site never shows a stale month again.
//
// To change a month: swap the pool ids or rewrite the "why now" line.
// Pool ids come from lib/pool-data.ts.

import { pools } from "@/lib/pool-data"

export interface MonthPlan {
  /** Pool of the Month */
  featuredId: number
  /** One line on why this pool, this month */
  featuredWhy: string
  /** Editor's Picks row (five pools) */
  pickIds: number[]
  /** Subtitle under Editor's Picks */
  picksWhy: string
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

export const editorialCalendar: Record<number, MonthPlan> = {
  0: {
    featuredId: 18, // Rock House, Turks & Caicos
    featuredWhy: "Caribbean high season: dry air, calm water, and that limestone ledge at its brightest.",
    pickIds: [34, 107, 76, 78, 110],
    picksWhy: "Caribbean dry season, Uruguay's summer, and the Gulf at its most comfortable",
  },
  1: {
    featuredId: 78, // Amanpuri, Phuket
    featuredWhy: "February is the heart of the Andaman dry season, when the sea off Pansea Beach goes glassy.",
    pickIds: [12, 92, 110, 100, 72],
    picksWhy: "Andaman sunshine, Maldives clear water, and warm Caribbean evenings",
  },
  2: {
    featuredId: 106, // Alila Jabal Akhdar, Oman
    featuredWhy: "Spring on the Saiq Plateau: warm days, cool nights, and a canyon edge with no crowds.",
    pickIds: [125, 76, 17, 5, 24],
    picksWhy: "Desert spring in Arabia, Morocco and Utah, plus Costa Rica's dry season",
  },
  3: {
    featuredId: 17, // Mandarin Oriental Marrakech
    featuredWhy: "April in Marrakech: orange blossom, Atlas views, and pool weather before the heat arrives.",
    pickIds: [5, 62, 10, 27, 85],
    picksWhy: "Desert spring, an early Mediterranean opening, and cherry blossom season in Tokyo",
  },
  4: {
    featuredId: 4, // Hotel du Cap-Eden-Roc
    featuredWhy: "The Riviera's grande dame reopens for the season and May is its most graceful month.",
    pickIds: [7, 13, 52, 53, 58],
    picksWhy: "The Mediterranean wakes up: Amalfi, Lake Como, Crete and Bodrum before the crowds",
  },
  5: {
    featuredId: 105, // Le Sirenuse, Positano
    featuredWhy: "Early summer on the Amalfi Coast, with long evenings and the sea warm enough to follow the pool.",
    pickIds: [1, 118, 61, 56, 116],
    picksWhy: "Peak light in the Aegean and Balearics, and the start of Rwanda's dry season",
  },
  6: {
    featuredId: 1, // Grace Santorini
    featuredWhy: "High summer over the caldera. Book early and swim at sunrise.",
    pickIds: [6, 43, 22, 62, 119],
    picksWhy: "Mediterranean peak season and East Africa's dry season",
  },
  7: {
    featuredId: 64, // Singita Sweni, Kruger
    featuredWhy: "Kruger's dry winter thins the bush, and the river below the deck becomes the main event.",
    pickIds: [9, 88, 13, 117, 36],
    picksWhy: "Safari season in southern Africa and cooler escapes in Iceland and the Dolomites",
  },
  8: {
    featuredId: 75, // Il Sereno, Lake Como
    featuredWhy: "September on Lake Como: the summer crowds thin, the water stays warm, and the light softens.",
    pickIds: [105, 59, 99, 117, 84],
    picksWhy: "The Mediterranean shoulder season, when the water is warmest and the crowds are gone",
  },
  9: {
    featuredId: 5, // Amangiri, Utah
    featuredWhy: "October is the desert's best month: warm afternoons, cold clear nights, and long low light on the mesas.",
    pickIds: [125, 117, 17, 123, 74],
    picksWhy: "Desert season opens, safari's late dry season, and autumn color in Tokyo",
  },
  10: {
    featuredId: 9, // The Retreat at Blue Lagoon, Iceland
    featuredWhy: "Geothermal water stays near body temperature while the northern lights season gets going overhead.",
    pickIds: [110, 76, 8, 19, 86],
    picksWhy: "Warm water in cold places, and the Gulf and Rajasthan at their most comfortable",
  },
  11: {
    featuredId: 26, // Hermitage Bay, Antigua
    featuredWhy: "December opens the Caribbean winter season, and a beach pool villa is the best escape from it.",
    pickIds: [10, 71, 89, 18, 107],
    picksWhy: "Heated indoor pools for city holidays, and Caribbean sun for everything else",
  },
}

function zonedNow(date: Date = new Date()) {
  // Use Pacific time so the month flips when the editor's month flips.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "numeric",
  }).formatToParts(date)
  const year = Number(parts.find(p => p.type === "year")?.value)
  const month = Number(parts.find(p => p.type === "month")?.value) - 1
  return { year, month }
}

export type Season = "Spring" | "Summer" | "Fall" | "Winter"

export function seasonForMonth(month: number): Season {
  if (month >= 2 && month <= 4) return "Spring"
  if (month >= 5 && month <= 7) return "Summer"
  if (month >= 8 && month <= 10) return "Fall"
  return "Winter"
}

export function getCurrentEdition(date: Date = new Date()) {
  const { year, month } = zonedNow(date)
  const plan = editorialCalendar[month]
  const find = (id: number) => pools.find(p => p.id === id)
  return {
    year,
    month,
    monthName: MONTH_NAMES[month],
    label: `${MONTH_NAMES[month]} ${year}`,
    season: seasonForMonth(month),
    featuredId: find(plan.featuredId) ? plan.featuredId : pools[0].id,
    featuredWhy: plan.featuredWhy,
    pickIds: plan.pickIds.filter(id => find(id)),
    picksWhy: plan.picksWhy,
  }
}

export type Edition = ReturnType<typeof getCurrentEdition>

/** Site-wide numbers, computed from the data so they never drift. */
export const siteStats = (() => {
  const countries = new Set(pools.map(p => p.country)).size
  const avg = pools.reduce((sum, p) => sum + p.rating, 0) / pools.length
  return {
    poolCount: pools.length,
    countryCount: countries,
    avgRating: avg.toFixed(1),
  }
})()

/** When the rankings were last reviewed. Update this on each editorial pass. */
export const RANKINGS_REVIEWED = "October 2026"
