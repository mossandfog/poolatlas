// When each pool is at its best, and when its hotel is closed.
//
// best: the months we'd plan a swim, 1 = January. Climate-based: dry seasons,
// sea warmth, and when it's too hot or too cold to enjoy an outdoor pool.
// closed: only from the hotel's own site (or a reputable outlet), with the source.
//
// Every pool in lib/pool-data.ts needs an entry. To add a pool, give it a preset
// or a list of months. To record a closure, add it to `closures` with its source.

import type { Pool } from "@/lib/pool-data"

export interface PoolSeason {
  /** Best months to swim, 1 to 12 */
  best: number[]
  /** Indoor or enclosed pools: good all year whatever the weather */
  indoor?: boolean
}

export interface Closure {
  /** Months the hotel is closed, 1 to 12 */
  months: number[]
  /** What the hotel says, in our words, e.g. "Closed for winter" */
  label: string
  /** Where we read it */
  source: string
  /** When we last checked */
  checked: string
  /** The month the hotel reopens, e.g. "2027-04", when the hotel has published it */
  reopens?: string
  /** One-off closures (renovations): the last closed month, e.g. "2027-01". After it, the closure lapses on its own */
  until?: string
  /** True when the reopening date is a projection, not a confirmed date */
  tentative?: boolean
  /** Day of the reopening month the hotel opens, when known. Booking links start on or after it */
  opensDay?: number
}

const r = (from: number, to: number): number[] => {
  const out: number[] = []
  let m = from
  for (;;) {
    out.push(m)
    if (m === to) break
    m = m === 12 ? 1 : m + 1
  }
  return out
}
const ALL = r(1, 12)

// Presets by climate
const MED_SUMMER = r(6, 9) // Aegean, Amalfi, Riviera, Como, Balearics, inland Italy and Provence
const MED_LONG = r(5, 10) // warmer, longer seasons: Bodrum, Athens rooftop, Madeira
const MALDIVES = r(12, 4)
const BALI = r(4, 10)
const ANDAMAN = r(11, 4) // Phuket, Phang Nga
const GULF_THAI = r(1, 8) // Koh Samui
const THAI_COOL = r(11, 3) // Bangkok, Pattaya, Hua Hin, Chiang Mai, Siem Reap
const ARABIA = r(11, 3) // Dubai, Muscat, AlUla: swim in the cool months
const CARIBBEAN = r(12, 4) // dry season, outside hurricane season
const SAFARI_SOUTH = r(5, 10) // Kruger, Namibia, Botswana dry season
const EAST_AFRICA = r(6, 10)
const DESERT_SW = [...r(4, 6), ...r(9, 10)] // Utah and Arizona: spring and fall
const NE_US_SUMMER = r(6, 9)
const MIAMI = r(11, 4) // dry season, outside hurricane season

const seasons: Record<number, PoolSeason> = {
  1: { best: MED_SUMMER }, // Santorini
  2: { best: ALL }, // Singapore
  3: { best: BALI },
  4: { best: MED_SUMMER }, // Cap d'Antibes
  5: { best: DESERT_SW },
  6: { best: MED_SUMMER }, // Amalfi
  7: { best: MED_SUMMER },
  8: { best: r(10, 3) }, // Udaipur
  9: { best: ALL }, // Blue Lagoon, geothermal
  10: { best: ALL, indoor: true }, // Aman Tokyo
  11: { best: MED_SUMMER }, // Provence
  12: { best: MALDIVES },
  13: { best: MED_SUMMER }, // Lake Como
  14: { best: r(11, 2) }, // Chiang Mai
  15: { best: ARABIA },
  16: { best: r(12, 3) }, // Rio summer
  17: { best: [...r(4, 6), ...r(9, 10)] }, // Marrakech
  18: { best: CARIBBEAN },
  19: { best: THAI_COOL }, // Siem Reap
  20: { best: r(5, 10) }, // Fiji dry season
  21: { best: NE_US_SUMMER },
  22: { best: EAST_AFRICA },
  23: { best: ALL, indoor: true }, // Lhasa
  24: { best: CARIBBEAN }, // Costa Rica dry season
  25: { best: r(4, 9) }, // Uluru
  26: { best: CARIBBEAN },
  27: { best: MED_SUMMER },
  28: { best: CARIBBEAN },
  29: { best: DESERT_SW },
  30: { best: THAI_COOL },
  31: { best: BALI },
  32: { best: CARIBBEAN }, // Riviera Maya
  33: { best: CARIBBEAN },
  34: { best: CARIBBEAN },
  35: { best: SAFARI_SOUTH },
  36: { best: SAFARI_SOUTH },
  37: { best: MED_SUMMER }, // Rome
  38: { best: r(11, 3) }, // Cape Town summer
  39: { best: ALL, indoor: true },
  40: { best: [...r(4, 5), ...r(10, 12)] }, // Hong Kong, outside the summer rains
  41: { best: MED_SUMMER },
  42: { best: THAI_COOL },
  43: { best: MED_SUMMER }, // Ibiza
  44: { best: MED_SUMMER }, // Lake Garda
  45: { best: NE_US_SUMMER }, // Virginia Beach
  46: { best: r(11, 5) }, // Cabo
  47: { best: r(5, 9) }, // Vienna rooftop
  48: { best: r(5, 9) }, // St. Louis rooftop
  49: { best: [...r(3, 5), ...r(10, 11)] }, // Tucson
  50: { best: BALI },
  51: { best: MED_SUMMER },
  52: { best: MED_SUMMER }, // Crete
  53: { best: MED_LONG }, // Bodrum
  54: { best: MED_SUMMER }, // Tuscany
  55: { best: MED_LONG },
  56: { best: MED_SUMMER },
  57: { best: BALI },
  58: { best: MED_SUMMER }, // Umbria
  59: { best: MED_LONG }, // Athens rooftop
  60: { best: r(5, 10) }, // Los Angeles
  61: { best: MED_SUMMER }, // Mykonos
  62: { best: MED_SUMMER }, // Mallorca
  63: { best: ARABIA },
  64: { best: SAFARI_SOUTH },
  65: { best: MED_SUMMER },
  66: { best: BALI },
  67: { best: BALI },
  68: { best: [...r(4, 5), ...r(10, 11)] }, // Seychelles, calm months between the trade winds
  69: { best: r(12, 4) }, // Sri Lanka's south coast
  70: { best: r(6, 10) }, // Whitsundays dry season
  71: { best: ALL, indoor: true }, // retractable roof
  72: { best: ANDAMAN },
  73: { best: ALL, indoor: true }, // Le Bristol's enclosed rooftop pool
  74: { best: BALI },
  75: { best: MED_SUMMER },
  76: { best: ARABIA }, // Muscat
  77: { best: GULF_THAI },
  78: { best: ANDAMAN },
  79: { best: r(2, 7) }, // Hoi An
  80: { best: [...r(4, 5), ...r(10, 11)] },
  81: { best: MALDIVES },
  82: { best: MALDIVES },
  83: { best: MED_SUMMER },
  84: { best: MED_SUMMER },
  85: { best: MED_SUMMER },
  86: { best: [...r(3, 5), ...r(9, 11)] }, // Atacama: warm days, fewer winds
  87: { best: SAFARI_SOUTH },
  88: { best: MED_SUMMER }, // South Tyrol
  89: { best: ALL, indoor: true },
  90: { best: ALL, indoor: true },
  91: { best: MED_SUMMER },
  92: { best: MALDIVES },
  93: { best: THAI_COOL },
  94: { best: THAI_COOL }, // Hua Hin
  96: { best: MED_SUMMER },
  97: { best: ALL }, // indoor and outdoor pools
  98: { best: MED_LONG }, // Madeira
  99: { best: MED_LONG },
  100: { best: CARIBBEAN },
  101: { best: ARABIA },
  102: { best: [...r(3, 5), ...r(10, 11)] }, // Orlando, outside the summer storms
  103: { best: r(5, 10) }, // Tenerife
  104: { best: BALI },
  105: { best: MED_SUMMER },
  106: { best: [...r(3, 5), ...r(9, 11)] }, // Jebel Akhdar, mountain spring and fall
  107: { best: r(12, 2) }, // Uruguay's summer
  108: { best: r(7, 8) }, // Atlantic coast, Arcachon
  110: { best: ARABIA },
  111: { best: r(10, 3) }, // Hejaz Mountains
  112: { best: r(12, 4) }, // Cartagena dry season
  113: { best: ALL, indoor: true },
  114: { best: NE_US_SUMMER },
  115: { best: ALL, indoor: true },
  116: { best: [...r(6, 9), 12, 1, 2] }, // Rwanda's two dry seasons
  117: { best: SAFARI_SOUTH },
  118: { best: MED_SUMMER },
  119: { best: MED_SUMMER },
  120: { best: MED_SUMMER },
  121: { best: r(2, 8) }, // Vietnam's south-central coast
  122: { best: r(5, 9) }, // Dallas rooftop
  123: { best: ALL, indoor: true },
  124: { best: THAI_COOL },
  125: { best: r(10, 3) }, // AlUla
  126: { best: ALL }, // Hawaii
  127: { best: ALL },
  128: { best: CARIBBEAN },
  129: { best: ALL },
  130: { best: r(11, 5) },
  131: { best: ALL },
  132: { best: r(6, 10) },
  133: { best: ALL },
  134: { best: ALL },
  135: { best: MIAMI },
  136: { best: MIAMI },
  137: { best: MIAMI },
}

// Closures, only from the hotel's own site or a reputable outlet.
const CHECKED = "2026-11-01"
const W = "Closed for winter"
const closures: Record<number, Closure> = {
  // Greece
  1: { months: [11, 12, 1, 2, 3], label: W, opensDay: 15, checked: CHECKED,
    source: "https://auberge.com/grace-hotel/hotel-policies/" }, // "typically remains closed November till April 14"
  27: { months: [11, 12, 1, 2, 3], label: W, opensDay: 1, checked: CHECKED,
    source: "https://andronisboutiquehotel.reserve-online.net/about" }, // "operates from Apr 1 to Oct 30"
  84: { months: [11, 12, 1, 2, 3, 4], label: W, opensDay: 1, checked: CHECKED,
    source: "https://erosantorini.reserve-online.net/about" }, // "operates from May 1 to Oct 31"
  61: { months: [10, 11, 12, 1, 2, 3, 4], label: W, opensDay: 15, checked: CHECKED,
    source: "https://calimykonos.reserve-online.net/about" }, // "operates from May 15 to Oct 1"
  52: { months: [11, 12, 1, 2, 3], label: W, opensDay: 16, checked: CHECKED,
    source: "https://daioscovecrete.reserve-online.net/about" }, // "operates from Apr 16 to Nov 7"
  // Turkey
  53: { months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: "Closed for renovation", checked: CHECKED,
    source: "https://www.aman.com/resorts/amanruya" }, // "Reopening dates will be announced in due course"
  55: { months: [11, 12, 1, 2, 3], label: W, opensDay: 16, checked: CHECKED,
    source: "https://www.marriott.com/en-us/hotels/bjveb-the-bodrum-edition/overview/" }, // seasonally closed now; 2026 season opened April 16
  // France
  4: { months: [11, 12, 1, 2, 3], label: W, reopens: "2027-04", opensDay: 18, checked: CHECKED,
    source: "https://www.oetkerhotels.com/hotels/hotel-du-cap-eden-roc/" }, // season April 18 to October 17, 2027
  96: { months: [11, 12, 1, 2], label: W, reopens: "2027-03", opensDay: 25, checked: CHECKED,
    source: "https://www.reservebeaulieu.com/en/" }, // "welcoming you again on Thursday 25 March 2027"
  11: { months: [11, 12, 1, 2, 3], label: W, reopens: "2027-04", opensDay: 22, checked: CHECKED,
    source: "https://www.airelles.com/en/destination/gordes" }, // "Reopening on April 22, 2027"
  // Italy
  7: { months: [11, 12, 1, 2, 3], label: W, reopens: "2027-04", opensDay: 13, checked: CHECKED,
    source: "https://www.belmond.com/hotels/europe/italy/amalfi-coast/belmond-hotel-caruso/" }, // "will reopen on 13 April 2027"
  6: { months: [11, 12, 1, 2, 3], label: W, opensDay: 16, checked: CHECKED,
    source: "https://monasterosantarosa.com/reservations/" }, // seasonal, early November to mid-April
  65: { months: [11, 12, 1, 2], label: W, opensDay: 15, checked: CHECKED,
    source: "https://www.forbestravelguide.com/hotels/amalfi-coast-italy/hotel-santa-caterina" }, // "open seasonally from mid-March through the beginning of November"
  105: { months: [11, 12, 1, 2], label: W, opensDay: 27, checked: CHECKED,
    source: "https://forbestravelguide.com/hotels/amalfi-coast-italy/le-sirenuse" }, // seasonal; reopened March 27 in 2026
  13: { months: [1, 2], label: W, opensDay: 18, checked: CHECKED,
    source: "https://www.villadeste.com/festive-season" }, // open for the festive season to January 7, then closed to mid-March
  51: { months: [11, 12, 1, 2], label: W, opensDay: 19, checked: CHECKED,
    source: "https://www.virtuoso.com/hotels/6164234/grand-hotel-tremezzo" }, // closed from November 3, 2026; reopened March 19 in 2026
  75: { months: [12, 1, 2], label: W, opensDay: 15, checked: CHECKED,
    source: "https://www.mrandmrssmith.com/luxury-hotels/il-sereno" }, // open mid-March to mid-November
  58: { months: [12, 1, 2], label: W, opensDay: 15, checked: CHECKED,
    source: "https://mrandmrssmith.com/luxury-hotels/hotel-castello-di-reschio" }, // closed mid-November to mid-March
  54: { months: [12, 1, 2], label: W, opensDay: 21, checked: CHECKED,
    source: "https://www.virtuoso.com/hotels/16728727/castello-di-vicarello" }, // closed December 1 to March 20
  // Spain
  43: { months: [11, 12, 1, 2], label: W, opensDay: 27, checked: CHECKED,
    source: "https://www.slh.com/hotels/hotel-aguas-de-ibiza-lifestyle-and-spa/" }, // closed November to March; season opened March 27
  56: { months: [11, 12, 1, 2, 3], label: W, opensDay: 16, checked: CHECKED,
    source: "https://www.periodicodeibiza.es/noticias/escaparate/2026/03/17/2591283/nobu-hotel-ibiza-bay-inaugura-nueva-temporada-lujo-relajado-abril.html" }, // 2026 season opened April 16
  62: { months: [12, 1, 2], label: W, checked: CHECKED,
    source: "https://www.slh.com/hotels/cap-rocat-mallorca/" }, // closed mid-November to March
  119: { months: [11, 12, 1, 2], label: W, reopens: "2027-03", opensDay: 16, checked: CHECKED,
    source: "https://belmond.com/hotels/europe/mallorca/deia/belmond-la-residencia" }, // "will reopen on 16th March 2027"
  120: { months: [11, 12, 1, 2], label: W, opensDay: 14, checked: CHECKED,
    source: "https://www.journaldespalaces.com/communique-77445-jumeirah-mallorca-annonce-sa-reouverture-pour-l-ete-2026.html" }, // reopened March 14 in 2026
  // Fiji: a one-off renovation, not a season
  20: { months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: "Closed for renovation", until: "2027-01", reopens: "2027-02",
    opensDay: 1, tentative: true, checked: CHECKED,
    source: "https://latteluxurynews.com/2026/02/20/laucala-island-parts-way-with-como/" }, // projected to February 2027, not confirmed
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
export const monthName = (m: number) => MONTHS[m - 1]

export function seasonFor(pool: Pick<Pool, "id">): PoolSeason | undefined {
  return seasons[pool.id]
}

export function closureFor(pool: Pick<Pool, "id">): Closure | undefined {
  return closures[pool.id]
}

/** The current month, 1 to 12, in Pacific time like the rest of the site's calendar */
export function currentMonth(date = new Date()): number {
  return Number(new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", month: "numeric" }).format(date))
}

function currentYear(date = new Date()): number {
  return Number(new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", year: "numeric" }).format(date))
}

/** "YYYY-MM" for the next time `month` comes around, counting this month as now */
function ymFor(month: number, date = new Date()): string {
  const now = currentMonth(date)
  const y = month < now ? currentYear(date) + 1 : currentYear(date)
  return `${y}-${String(month).padStart(2, "0")}`
}

export function isClosed(pool: Pick<Pool, "id">, month = currentMonth(), date = new Date()): boolean {
  const c = closures[pool.id]
  if (!c || !c.months.includes(month)) return false
  if (c.until && ymFor(month, date) > c.until) return false
  return true
}

export function isInSeason(pool: Pick<Pool, "id">, month = currentMonth()): boolean {
  const s = seasons[pool.id]
  return Boolean(s && s.best.includes(month) && !isClosed(pool, month))
}

/** Split a month list into runs, wrapping across the new year: [12,1,2,6,7] gives [[12,1,2],[6,7]] */
function runs(months: number[]): number[][] {
  const set = new Set(months)
  if (set.size === 12) return [ALL]
  const starts = [...set].filter((m) => !set.has(m === 1 ? 12 : m - 1)).sort((a, b) => a - b)
  return starts.map((s) => {
    const run = [s]
    let m = s
    for (;;) {
      const next = m === 12 ? 1 : m + 1
      if (!set.has(next)) break
      run.push(next)
      m = next
    }
    return run
  })
}

/** "December to April", "April to June and September to October", "Year-round" */
export function describeMonths(months: number[]): string {
  if (new Set(months).size === 12) return "Year-round"
  const all = runs(months)
  const parts = all.map((run) =>
    run.length === 1
      ? MONTHS[run[0] - 1]
      : run.length === 2 && all.length === 1
        ? `${MONTHS[run[0] - 1]} and ${MONTHS[run[1] - 1]}`
        : `${MONTHS[run[0] - 1]} to ${MONTHS[run[run.length - 1] - 1]}`,
  )
  return parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}` : parts[0]
}

/** One line for a pool page: "December to April", or "Year-round, indoors" */
export function bestTimeLabel(pool: Pick<Pool, "id">): string | null {
  const s = seasons[pool.id]
  if (!s) return null
  const base = describeMonths(s.best)
  return s.indoor ? `${base}, indoors` : base
}

/** The first month the hotel is open again after `month` */
export function reopensMonth(pool: Pick<Pool, "id">, month = currentMonth()): number | null {
  const c = closures[pool.id]
  if (!c || !c.months.includes(month)) return null
  let m = month
  for (let i = 0; i < 12; i++) {
    m = m === 12 ? 1 : m + 1
    if (!c.months.includes(m)) return m
  }
  return null
}

/** Pools to swim in this month, best-ranked first */
export function swimmableNow<T extends Pick<Pool, "id" | "rank">>(pools: T[], month = currentMonth()): T[] {
  return pools.filter((p) => isInSeason(p, month) && !seasons[p.id]?.indoor).sort((a, b) => a.rank - b.rank)
}

/** Dates for a first look at a closed hotel's reopening month: two nights from the opening day
 * (or the 25th when we don't know the day, so the stay never lands before the doors open) */
export function reopeningStay(
  pool: Pick<Pool, "id">,
  date = new Date(),
): { month: number; year: number; checkin: string; checkout: string; tentative: boolean } | null {
  const c = closures[pool.id]
  const now = currentMonth(date)
  if (!c || !isClosed(pool, now, date)) return null
  const year = currentYear(date)
  let y: number, m: number
  if (c.reopens) {
    ;[y, m] = c.reopens.split("-").map(Number)
  } else {
    const r = reopensMonth(pool, now)
    if (!r) return null
    m = r
    y = r <= now ? year + 1 : year
  }
  const pad = (n: number) => String(n).padStart(2, "0")
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const day = Math.min(Math.max(c.opensDay ?? 25, 1), daysInMonth - 2)
  return { month: m, year: y, checkin: `${y}-${pad(m)}-${pad(day)}`, checkout: `${y}-${pad(m)}-${pad(day + 2)}`, tentative: Boolean(c.tentative) }
}

export const seasonsChecked = CHECKED
export { seasons as poolSeasons, closures as poolClosures }
