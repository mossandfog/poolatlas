// What a sponsor can buy on Pool Atlas. Shown on /advertise and used as the
// interest chips in the inquiry form. No prices or audience figures here on purpose:
// we share those one to one, after an inquiry.

export interface Offering {
  id: string
  title: string
  forWho: string
  summary: string
  includes: string[]
}

export const OFFERINGS: Offering[] = [
  {
    id: "spotlight",
    title: "Hotel Spotlight",
    forWho: "Hotels and resorts",
    summary: "A full feature built around your pool, across the places our readers look first.",
    includes: [
      "Your film or photography in the homepage hero for a set period",
      "A story about your pool in The Deep End, written by our editors",
      "A spotlight in our monthly email",
    ],
  },
  {
    id: "story",
    title: "Partner Story",
    forWho: "Hotels, groups and brands",
    summary: "An editorial piece made with you and published in The Deep End, clearly marked as a partnership.",
    includes: [
      "Written and art directed by our editors",
      "Booking links to your property built in",
      "Stays live and searchable, not a one day post",
    ],
  },
  {
    id: "newsletter",
    title: "Newsletter Sponsor",
    forWho: "Travel and lifestyle brands",
    summary: "The one presenting partner of our monthly email of new pools, seasonal picks and guides.",
    includes: [
      "A single sponsor per issue, so you're never one of many",
      "A short message in our voice, with your image and link",
    ],
  },
  {
    id: "destination",
    title: "Destination Partner",
    forWho: "Tourism boards and regions",
    summary: "Present one of our destination guides, from Hawaii to the Maldives, or commission a new one.",
    includes: [
      "\"Presented with\" credit on the guide and its maps",
      "A new guide for your region, researched and ranked by our editors",
    ],
  },
  {
    id: "display",
    title: "Display Placement",
    forWho: "Hotels and brands",
    summary: "One tasteful banner on the pool pages and guides that match your audience, like every Maldives pool or every rooftop.",
    includes: [
      "Targeted by destination or pool type",
      "Designed to match the page, never pop-ups or takeovers",
    ],
  },
  {
    id: "network",
    title: "Moss & Fog Media Package",
    forWho: "Anyone reaching travelers with taste",
    summary: "Run with our sister titles: The Window Seat, our travel magazine, and Moss & Fog, on design and visual culture.",
    includes: [
      "One brief, placements across all three",
      "Stories shaped to each publication's voice",
    ],
  },
]
