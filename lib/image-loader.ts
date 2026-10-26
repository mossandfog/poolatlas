// Pool Atlas image loader. Photos ship as static files (no paid image service),
// so phones get the 640px or 1080px copies made by scripts/image-sizes.py and
// large screens get the original. Anything without copies loads as-is.
import sizes from "./image-sizes.json"

const SIZES = sizes as Record<string, number>
const POOL_PHOTO = /^\/images\/pools\/([^/]+)\.(?:jpe?g|png|webp)$/i

export default function poolAtlasImageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const match = src.match(POOL_PHOTO)
  if (match) {
    const copies = SIZES[match[1]]
    if (copies && width <= 640) return `/images/pools/w640/${match[1]}.jpg`
    if (copies === 2 && width <= 1080) return `/images/pools/w1080/${match[1]}.jpg`
  }
  return src
}
