"use client"

import { useState } from "react"
import { Twitter, Linkedin, Link2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareButtonsProps {
  title: string
  slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  
  const url = typeof window !== "undefined" 
    ? `${window.location.origin}/blog/${slug}`
    : `https://poolatlas.io/blog/${slug}`
  
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    bluesky: `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="rounded-full gap-2"
        asChild
      >
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter className="w-4 h-4" />
          Twitter
        </a>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="rounded-full gap-2"
        asChild
      >
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="rounded-full gap-2"
        asChild
      >
        <a href={shareLinks.bluesky} target="_blank" rel="noopener noreferrer">
          <svg className="w-4 h-4" viewBox="0 0 568 501" fill="currentColor">
            <path d="M123.121 33.6637C188.241 82.5526 258.281 181.681 284 234.873C309.719 181.681 379.759 82.5526 444.879 33.6637C491.866 -1.61183 568 -28.9064 568 57.9464C568 75.2916 558.055 203.659 552.222 224.501C531.947 296.954 458.067 315.434 392.347 304.249C507.222 323.8 536.444 388.56 473.333 453.32C353.473 576.312 301.061 422.461 287.631 383.039C285.169 375.812 284.017 372.431 284 375.306C283.983 372.431 282.831 375.812 280.369 383.039C266.939 422.461 214.527 576.312 94.6667 453.32C31.5556 388.56 60.7778 323.8 175.653 304.249C109.933 315.434 36.0535 296.954 15.7778 224.501C9.94525 203.659 0 75.2916 0 57.9464C0 -28.9064 76.1345 -1.61183 123.121 33.6637Z"/>
          </svg>
          Bluesky
        </a>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="rounded-full gap-2"
        onClick={copyToClipboard}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-500" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="w-4 h-4" />
            Copy Link
          </>
        )}
      </Button>
    </div>
  )
}
