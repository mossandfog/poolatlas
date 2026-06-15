"use client"

import { Heart } from "lucide-react"
import { useDreamList } from "@/lib/dream-list-context"
import { cn } from "@/lib/utils"

interface DiamondButtonProps {
  poolId: number
  className?: string
  size?: "sm" | "md"
}

export function DiamondButton({ poolId, className, size = "md" }: DiamondButtonProps) {
  const { isInDreamList, addToDreamList, removeFromDreamList } = useDreamList()
  
  const isActive = isInDreamList(poolId)
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card expansion when clicking diamond
    if (isActive) {
      removeFromDreamList(poolId)
    } else {
      addToDreamList(poolId)
    }
  }

  const sizeClasses = size === "sm" 
    ? "w-7 h-7" 
    : "w-9 h-9"
    
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"

  return (
    <button
      onClick={handleClick}
      className={cn(
        "rounded-full flex items-center justify-center transition-all duration-300 shadow-md",
        isActive 
          ? "bg-gradient-to-br from-rose-500 to-pink-500 scale-110" 
          : "bg-background/80 backdrop-blur-sm hover:bg-background hover:scale-105",
        sizeClasses,
        className
      )}
      title={isActive ? "Remove from Dream List" : "Add to Dream List"}
      aria-label={isActive ? "Remove from Dream List" : "Add to Dream List"}
    >
      <Heart 
        className={cn(
          iconSize,
          "transition-colors",
          isActive ? "text-white fill-white" : "text-foreground/70 hover:text-rose-500"
        )} 
      />
    </button>
  )
}
