import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import type { Pool } from "@/lib/pool-data"
import { DiamondButton } from "@/components/diamond-button"

interface PoolCardProps {
  pool: Pool
  /** Optional sizes hint for the image, e.g. when a row shows five across */
  sizes?: string
}

// A photograph first, then the facts. The whole card opens the pool's page.
export function PoolCard({ pool, sizes = "(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 80vw" }: PoolCardProps) {
  return (
    <article className="group relative">
      <Link
        href={`/pools/${pool.slug}`}
        className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
          <Image
            src={pool.image}
            alt={`${pool.name} at ${pool.hotel}`}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-xs font-semibold tabular-nums text-foreground shadow-sm">
            #{pool.rank}
          </span>
        </div>

        <div className="pt-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
              {pool.name}
            </h3>
            <span className="mt-0.5 flex shrink-0 items-center gap-1 text-sm tabular-nums text-foreground">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" aria-hidden="true" />
              {pool.rating.toFixed(1)}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground leading-snug">
            {pool.hotel}, {pool.country}
          </p>
        </div>
      </Link>

      <div className="absolute top-2 right-2">
        <DiamondButton poolId={pool.id} size="sm" />
      </div>
    </article>
  )
}
