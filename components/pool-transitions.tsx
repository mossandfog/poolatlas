"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Tap a pool's photo anywhere on the site and it grows into that pool's cover.
// Uses the browser's View Transitions API. Browsers without it, people who
// prefer reduced motion, and modified clicks (new tab, etc.) get a normal link.
// Only the tapped photo is named, so the same pool can appear twice on a page.
const NAME = "pool-photo"
const MAX_WAIT = 1200

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void> | void) => { finished: Promise<void> }
}

function waitForCover(path: string): Promise<HTMLElement | null> {
  const start = performance.now()
  return new Promise((resolve) => {
    const check = () => {
      const cover = document.querySelector<HTMLImageElement>("img[data-pool-cover]")
      const arrived = location.pathname === path && cover
      if (arrived && (cover.complete || performance.now() - start > MAX_WAIT * 0.6)) return resolve(cover)
      if (performance.now() - start > MAX_WAIT) return resolve(arrived ? cover : null)
      setTimeout(check, 16)
    }
    // A timer, not requestAnimationFrame: the browser pauses frames while it
    // holds the old page on screen during a view transition.
    setTimeout(check, 16)
  })
}

export function PoolTransitions() {
  const router = useRouter()

  useEffect(() => {
    const doc = document as ViewTransitionDocument
    if (!doc.startViewTransition) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || reduce.matches) return
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="/pools/"]')
      if (!link || link.target === "_blank") return
      const url = new URL(link.href)
      if (url.pathname === location.pathname) return
      const holder = link.querySelector<HTMLElement>("[data-pool-photo]") ?? link.closest("[data-pool-card]")?.querySelector<HTMLElement>("[data-pool-photo]")
      const photo = holder?.querySelector<HTMLElement>("img") ?? holder
      if (!photo || photo.getBoundingClientRect().bottom < 0) return

      e.preventDefault()
      photo.style.viewTransitionName = NAME
      document.documentElement.dataset.poolNav = ""
      let cover: HTMLElement | null = null
      const transition = doc.startViewTransition!(async () => {
        photo.style.viewTransitionName = ""
        router.push(url.pathname + url.search + url.hash)
        cover = await waitForCover(url.pathname)
        if (cover) cover.style.viewTransitionName = NAME
      })
      transition.finished.finally(() => {
        if (cover) cover.style.viewTransitionName = ""
        delete document.documentElement.dataset.poolNav
      })
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [router])

  return null
}
