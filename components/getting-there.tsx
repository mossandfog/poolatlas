// "Getting there", a panel from our sister magazine The Window Seat.
// It wears The Window Seat's own olive and yellow so it reads as a guest
// voice on the page, clearly apart from our teal booking buttons and maps.
import { ArrowUpRight } from "lucide-react"
import { windowSeatLink, WINDOW_SEAT_URL, type WindowSeatGuide } from "@/lib/window-seat"

interface GettingThereProps {
  guides: WindowSeatGuide[]
  /** Where the panel sits, for The Window Seat's stats (pa_pool, pa_destination) */
  placement: string
  /** Optional place name for the heading */
  place?: string
}

export function GettingThere({ guides, placement, place }: GettingThereProps) {
  if (guides.length === 0) return null
  return (
    <section
      aria-labelledby={`getting-there-${placement}`}
      className="rounded-2xl bg-[#353018] text-[#f8f6ec] px-5 py-6 sm:px-7 sm:py-7"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f5d63d]">
        <span aria-hidden="true">✈ </span>From The Window Seat
      </p>
      <h2
        id={`getting-there-${placement}`}
        className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold leading-snug"
      >
        {place ? `Getting to ${place}` : "Getting there"}
      </h2>
      <ul className="mt-4 divide-y divide-[#f8f6ec]/15 border-y border-[#f8f6ec]/15">
        {guides.map((g) => (
          <li key={g.url}>
            <a
              href={windowSeatLink(g.url, placement)}
              target="_blank"
              rel="noopener"
              className="group flex items-start gap-3 py-3.5 min-w-0"
            >
              <span className="min-w-0 flex-1">
                <span className="block font-semibold leading-snug group-hover:underline decoration-[#f5d63d] underline-offset-4">
                  {g.title}
                </span>
                <span className="mt-0.5 block text-sm text-[#f8f6ec]/70 leading-relaxed">{g.note}</span>
              </span>
              <ArrowUpRight
                className="mt-0.5 w-4 h-4 shrink-0 text-[#f5d63d] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-[#f8f6ec]/65 leading-relaxed">
        The Window Seat is our sister travel magazine, as interested in the flight as the destination.{" "}
        <a
          href={windowSeatLink(WINDOW_SEAT_URL, placement)}
          target="_blank"
          rel="noopener"
          className="font-semibold text-[#f8f6ec] underline decoration-[#f5d63d] underline-offset-4"
        >
          Visit The Window Seat
        </a>
      </p>
    </section>
  )
}
