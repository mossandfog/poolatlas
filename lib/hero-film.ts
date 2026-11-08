// The homepage film: a short, silent loop from one of our ranked pools, shown in
// the hero in place of the still cover. Only use footage the hotel publishes itself,
// credit it, and link back. Set HERO_FILM to null to go back to the still cover.
//
// To swap the film: cut a 5 to 8 second loop (crossfade the end into the start),
// export 1920 and 960 wide H.264 MP4s with no audio and +faststart, keep the large
// file under about 3MB, and save its first frame as the poster in /images/pools/.

export interface HeroFilm {
  /** The ranked pool the footage shows (id in lib/pool-data.ts) */
  poolId: number
  src: string
  /** Smaller file for phones */
  srcSmall: string
  poster: string
  /** Who made the footage */
  credit: string
  creditUrl: string
}

export const HERO_FILM: HeroFilm | null = {
  poolId: 135,
  src: "/film/faena-pool-1080.mp4",
  srcSmall: "/film/faena-pool-540.mp4",
  poster: "/images/pools/film-faena-poster.jpg",
  credit: "Faena Hotel Miami Beach",
  creditUrl: "https://www.faena.com/miami-beach/things-to-do/pool-beach",
}
