"use client"

// The hero film. The poster paints first (it is the LCP image); the video loads only
// after the page has finished loading, never for reduced motion or data saver, pauses
// when scrolled away, and always has a visible pause button.
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"
import type { HeroFilm as Film } from "@/lib/hero-film"

export function HeroFilm({ film, alt }: { film: Film; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [paused, setPaused] = useState(false)
  const userPaused = useRef(false)

  // Decide whether to load the film at all, then wait for the page to settle
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (reduce || saveData) return
    const start = () => setEnabled(true)
    const idle = () =>
      "requestIdleCallback" in window
        ? (window as Window & { requestIdleCallback: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback(start, { timeout: 2500 })
        : globalThis.setTimeout(start, 600)
    if (document.readyState === "complete") idle()
    else window.addEventListener("load", idle, { once: true })
    return () => window.removeEventListener("load", idle)
  }, [])

  // Load the right size, play, and pause while off screen
  useEffect(() => {
    const v = ref.current
    if (!enabled || !v) return
    v.src = window.matchMedia("(max-width: 767px)").matches ? film.srcSmall : film.src
    v.load()
    const tryPlay = () => v.play().catch(() => setPaused(true))
    tryPlay()
    const io = new IntersectionObserver(
      ([e]) => {
        if (userPaused.current) return
        if (e.isIntersecting) tryPlay()
        else v.pause()
      },
      { threshold: 0.15 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [enabled, film.src, film.srcSmall])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      userPaused.current = false
      v.play().catch(() => {})
      setPaused(false)
    } else {
      userPaused.current = true
      v.pause()
      setPaused(true)
    }
  }

  return (
    <div className="pa-film absolute inset-0">
      <Image
        src={film.poster}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 56vw, 100vw"
        className="object-cover pa-film-media"
      />
      {enabled && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setReady(true)}
          className={`pa-film-media absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${ready ? "opacity-100" : "opacity-0"}`}
        />
      )}
      {enabled && ready && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? "Play the pool film" : "Pause the pool film"}
          className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
        </button>
      )}
    </div>
  )
}
