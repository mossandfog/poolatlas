"use client"

import { useState } from "react"
import Image from "next/image"
import { X, MapPin, Star, Heart, Trash2, Share2, ExternalLink, Link2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useDreamList } from "@/lib/dream-list-context"

interface DreamListDrawerProps {
  isOpen: boolean
  onClose: () => void
}

// Encode pool IDs to a shareable string
function encodeShareId(poolIds: number[]): string {
  return btoa(poolIds.join(','))
}

export function DreamListDrawer({ isOpen, onClose }: DreamListDrawerProps) {
  const { getDreamListPools, removeFromDreamList, clearDreamList, dreamList } = useDreamList()
  const [copied, setCopied] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  
  const dreamPools = getDreamListPools()

  const getShareableUrl = () => {
    const shareId = encodeShareId(dreamList)
    return `${window.location.origin}/dream-list/${shareId}`
  }

  const handleCopyLink = async () => {
    const url = getShareableUrl()
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setShowShareOptions(false)
    }, 2000)
  }

  const handleNativeShare = async () => {
    const url = getShareableUrl()
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Pool Atlas Dream List',
          text: `Check out my dream list of ${dreamPools.length} amazing hotel pools!`,
          url: url,
        })
      } catch (e) {
        // User cancelled
      }
    }
    setShowShareOptions(false)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Dream List</h2>
              <p className="text-xs text-muted-foreground">
                {dreamList.length} {dreamList.length === 1 ? 'pool' : 'pools'} saved
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {dreamPools.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Your dream list is empty</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Click the heart icon on any pool to add it to your dream list and start planning your perfect pool trip.
              </p>
              <Button variant="outline" onClick={onClose} className="rounded-full">
                Explore Pools
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {dreamPools.map((pool) => (
                <div 
                  key={pool.id} 
                  className="flex gap-3 p-3 bg-secondary/50 rounded-xl border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={pool.image}
                      alt={pool.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-[10px] font-bold text-primary-foreground">#{pool.rank}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-sm truncate">{pool.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{pool.hotel}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{pool.location}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        <span className="text-xs font-medium">{pool.rating}</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        {pool.region}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <a
                      href={pool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                      title="Visit property"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-primary" />
                    </a>
                    <button
                      onClick={() => removeFromDreamList(pool.id)}
                      className="w-8 h-8 rounded-full bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center transition-colors"
                      title="Remove from dream list"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {dreamPools.length > 0 && (
          <div className="p-4 border-t border-border bg-card space-y-3">
            {showShareOptions ? (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center mb-2">Share your dream list</p>
                <Button 
                  onClick={handleCopyLink} 
                  variant="outline"
                  className="w-full rounded-full gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Link Copied!" : "Copy Shareable Link"}
                </Button>
                {typeof navigator !== 'undefined' && navigator.share && (
                  <Button 
                    onClick={handleNativeShare} 
                    className="w-full rounded-full gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share via...
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  onClick={() => setShowShareOptions(false)}
                  className="w-full text-muted-foreground text-sm"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  onClick={() => setShowShareOptions(true)} 
                  className="w-full rounded-full gap-2"
                >
                  <Link2 className="w-4 h-4" />
                  Share Dream List
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={clearDreamList}
                  className="w-full text-muted-foreground hover:text-destructive text-sm"
                >
                  Clear All
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}
