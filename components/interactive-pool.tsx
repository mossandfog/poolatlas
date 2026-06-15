"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"

interface Ripple {
  id: number
  x: number
  y: number
}

export function InteractivePool() {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const rippleIdRef = useRef(0)

  const createRipple = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    
    // Only create ripples in the "pool area" (roughly center of image)
    if (x > 20 && x < 80 && y > 25 && y < 75) {
      const newRipple: Ripple = {
        id: rippleIdRef.current++,
        x,
        y
      }
      
      setRipples(prev => [...prev, newRipple])
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, 1500)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-md mx-auto cursor-pointer select-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={createRipple}
      onClick={createRipple}
    >
      {/* Pool Image */}
      <div className={`relative transition-transform duration-300 ${isHovering ? 'scale-105' : 'scale-100'}`}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-03-18%20at%202.16.51%E2%80%AFPM-WN1AIYD9EcOKL2XB0asnAfL8prDod2.jpg"
          alt="3D isometric swimming pool illustration"
          width={600}
          height={450}
          className="w-full h-auto rounded-xl"
          priority
        />
        
        {/* Water shimmer overlay */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
            animation: isHovering ? 'shimmer 2s infinite linear' : 'none',
            borderRadius: '0.75rem'
          }}
        />
      </div>
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Multiple expanding rings */}
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="absolute rounded-full border-2 border-cyan-400/60"
              style={{
                width: '10px',
                height: '10px',
                left: '-5px',
                top: '-5px',
                animation: `ripple-expand 1.5s ease-out ${i * 0.2}s forwards`,
                opacity: 0
              }}
            />
          ))}
        </div>
      ))}
      
      {/* Hover hint */}
      <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
        Hover to make waves
      </div>

      <style jsx>{`
        @keyframes ripple-expand {
          0% {
            width: 10px;
            height: 10px;
            left: -5px;
            top: -5px;
            opacity: 0.8;
          }
          100% {
            width: 120px;
            height: 80px;
            left: -60px;
            top: -40px;
            opacity: 0;
            border-radius: 50%;
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  )
}
