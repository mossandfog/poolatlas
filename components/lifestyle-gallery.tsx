import Image from "next/image"

const lifestyleImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pablo-merchan-montes-0kiaWkj-epk-unsplash-lTkq7Z6Mx9MKcqXtXXlmfVivtiHIex.jpg",
    alt: "Relaxing poolside at tropical resort"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pablo-merchan-montes-PIQw9LP7ydE-unsplash-yhlxaSzhl7nRp1c5KPrnwRiJTMQ7xN.jpg",
    alt: "Poolside with colorful towel"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pablo-merchan-montes-wQIfSsPKDrw-unsplash-0t8ykfjWRMX27BjTbFEAzCYIumfhLt.jpg",
    alt: "Woman enjoying natural pool with waterfall"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pablo-merchan-montes-ppDPuqXmvZw-unsplash-ZGrxRCiaZXJhzhyKkoIYITFImomyya.jpg",
    alt: "Man relaxing in turquoise pool"
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pablo-merchan-montes-5RECtN-X3ec-unsplash-iutVo6nJSOWQNzoCqJzhUsG6QO0fX6.jpg",
    alt: "Woman basking in the sun at pool edge"
  }
]

export function LifestyleGallery() {
  return (
    <section className="py-12 overflow-hidden">
      {/* Text overlay */}
      <div className="text-center mb-8 px-4">
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Real Moments</p>
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-foreground">
          Your Next Memory Awaits
        </h2>
      </div>
      
      {/* Full-width photo stripe */}
      <div className="relative w-full">
        <div className="flex gap-2 md:gap-3">
          {lifestyleImages.map((image, index) => (
            <div 
              key={index}
              className="relative flex-shrink-0 w-[280px] md:w-[320px] lg:w-[380px] h-[200px] md:h-[240px] lg:h-[280px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
          {/* Duplicate for seamless feel */}
          {lifestyleImages.slice(0, 2).map((image, index) => (
            <div 
              key={`dup-${index}`}
              className="relative flex-shrink-0 w-[280px] md:w-[320px] lg:w-[380px] h-[200px] md:h-[240px] lg:h-[280px]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Gradient overlays on edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
      
      {/* Photo credit */}
      <p className="text-center text-xs text-muted-foreground mt-4 px-4">
        Photos by Pablo Merchan Montes on Unsplash
      </p>
    </section>
  )
}
