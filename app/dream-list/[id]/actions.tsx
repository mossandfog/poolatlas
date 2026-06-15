"use client"

import { useState } from "react"
import { Copy, Check, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDreamList } from "@/lib/dream-list-context"

interface ShareableDreamListActionsProps {
  poolIds: number[]
}

export function ShareableDreamListActions({ poolIds }: ShareableDreamListActionsProps) {
  const [copied, setCopied] = useState(false)
  const { addToDreamList, dreamList } = useDreamList()

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAddAllToMyList = () => {
    poolIds.forEach(id => addToDreamList(id))
  }

  const allAlreadyInList = poolIds.every(id => dreamList.includes(id))

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button
        variant="outline"
        className="rounded-full gap-2"
        onClick={handleCopyLink}
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? "Link Copied!" : "Copy Link"}
      </Button>
      
      <Button
        className="rounded-full gap-2"
        onClick={handleAddAllToMyList}
        disabled={allAlreadyInList}
      >
        <Heart className="w-4 h-4" />
        {allAlreadyInList ? "All Added to Your List" : "Add All to My Dream List"}
      </Button>
    </div>
  )
}
