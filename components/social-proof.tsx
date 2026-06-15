"use client"

import { useEffect, useState } from "react"
import { Eye, TrendingUp, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SocialProofData {
  viewsToday: number
  viewingNow: number
  savedThisWeek: number
  trendingScore: number
}

// Simulated real-time data - modest numbers for a growing site
function generateSocialProof(): SocialProofData {
  return {
    viewsToday: Math.floor(Math.random() * 200) + 450,
    viewingNow: Math.floor(Math.random() * 8) + 12,
    savedThisWeek: Math.floor(Math.random() * 50) + 180,
    trendingScore: Math.floor(Math.random() * 15) + 70,
  }
}

// Social proof bar disabled until real analytics are available
export function SocialProofBar() {
  return null
}

// Pool-specific social proof badges
interface PoolSocialProofProps {
  poolId: number
  variant?: "compact" | "full"
}

const poolProofData: Record<number, { badge: string; icon: React.ReactNode; color: string }[]> = {
  1: [
    { badge: "Top Rated", icon: <TrendingUp className="w-3 h-3" />, color: "bg-primary" },
  ],
  2: [
    { badge: "Reader Favorite", icon: <Heart className="w-3 h-3" />, color: "bg-destructive" },
  ],
  3: [
    { badge: "Editors' Pick", icon: <TrendingUp className="w-3 h-3" />, color: "bg-chart-3" },
  ],
  4: [
    { badge: "Bucket List", icon: <Heart className="w-3 h-3" />, color: "bg-accent" },
  ],
  5: [
    { badge: "Iconic", icon: <TrendingUp className="w-3 h-3" />, color: "bg-chart-4" },
  ],
  11: [
    { badge: "Romantic", icon: <Heart className="w-3 h-3" />, color: "bg-destructive" },
  ],
}

export function PoolSocialProof({ poolId, variant = "compact" }: PoolSocialProofProps) {
  const proofs = poolProofData[poolId] || []
  
  if (proofs.length === 0) return null

  if (variant === "compact") {
    const proof = proofs[0]
    return (
      <Badge className={`${proof.color} text-white gap-1 text-xs`}>
        {proof.icon}
        {proof.badge}
      </Badge>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {proofs.map((proof, idx) => (
        <Badge key={idx} className={`${proof.color} text-white gap-1 text-xs`}>
          {proof.icon}
          {proof.badge}
        </Badge>
      ))}
    </div>
  )
}

// Recently viewed notification - disabled until real data available
export function RecentBookingNotification() {
  // Component disabled - return null
  return null
}
