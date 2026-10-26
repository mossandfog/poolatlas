"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDreamList } from "@/lib/dream-list-context"

export function PoolDreamListButton({ poolId }: { poolId: number }) {
  const { addToDreamList, removeFromDreamList, isInDreamList } = useDreamList()
  const inList = isInDreamList(poolId)
  const [popped, setPopped] = useState(false)

  return (
    <Button
      variant="outline"
      className={`w-full rounded-full gap-2 transition-colors ${
        inList
          ? "border-rose-500/50 text-rose-500 hover:bg-rose-500/10 hover:border-rose-500"
          : "hover:border-rose-400 hover:text-rose-500"
      }`}
      size="lg"
      onClick={() => {
        if (inList) return removeFromDreamList(poolId)
        addToDreamList(poolId)
        setPopped(true)
      }}
    >
      <Heart
        onAnimationEnd={() => setPopped(false)}
        className={`w-4 h-4 transition-all ${inList ? "fill-rose-500 text-rose-500" : ""} ${popped ? "pa-pop" : ""}`}
      />
      {inList ? "Saved to Dream List" : "Add to Dream List"}
    </Button>
  )
}
