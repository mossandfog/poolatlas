"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Pool, pools } from "./pool-data"

interface DreamListContextType {
  dreamList: number[] // Array of pool IDs
  addToDreamList: (poolId: number) => void
  removeFromDreamList: (poolId: number) => void
  isInDreamList: (poolId: number) => boolean
  getDreamListPools: () => Pool[]
  clearDreamList: () => void
}

const DreamListContext = createContext<DreamListContextType | undefined>(undefined)

export function DreamListProvider({ children }: { children: ReactNode }) {
  const [dreamList, setDreamList] = useState<number[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("poolatlas-dreamlist")
    if (stored) {
      try {
        setDreamList(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse dream list from localStorage")
      }
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage when dreamList changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("poolatlas-dreamlist", JSON.stringify(dreamList))
    }
  }, [dreamList, isHydrated])

  const addToDreamList = (poolId: number) => {
    setDreamList((prev) => {
      if (prev.includes(poolId)) return prev
      return [...prev, poolId]
    })
  }

  const removeFromDreamList = (poolId: number) => {
    setDreamList((prev) => prev.filter((id) => id !== poolId))
  }

  const isInDreamList = (poolId: number) => {
    return dreamList.includes(poolId)
  }

  const getDreamListPools = () => {
    return pools.filter((pool) => dreamList.includes(pool.id))
  }

  const clearDreamList = () => {
    setDreamList([])
  }

  return (
    <DreamListContext.Provider
      value={{
        dreamList,
        addToDreamList,
        removeFromDreamList,
        isInDreamList,
        getDreamListPools,
        clearDreamList,
      }}
    >
      {children}
    </DreamListContext.Provider>
  )
}

export function useDreamList() {
  const context = useContext(DreamListContext)
  if (context === undefined) {
    throw new Error("useDreamList must be used within a DreamListProvider")
  }
  return context
}
