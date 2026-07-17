"use client"

import { useState } from "react"
import { Share2, Check, Link2 } from "lucide-react"

interface PoolShareButtonProps {
  title: string
  url: string
}

export function PoolShareButton({ title, url }: PoolShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // fall through to clipboard
      }
    }
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-primary" />
          <span className="text-primary font-medium">Copied!</span>
        </>
      ) : (
        <>
          <Link2 className="w-3.5 h-3.5" />
          Share this pool
        </>
      )}
    </button>
  )
}
