import { Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <Waves className="w-6 h-6 text-primary-foreground" />
          </div>
          <Image
            src="/images/poolatlas-logotype.png"
            alt="Pool Atlas"
            width={160}
            height={32}
            className="h-7 w-auto"
          />
        </div>
        
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          This pool doesn&apos;t exist
        </h2>
        <p className="text-muted-foreground mb-8">
          Looks like you&apos;ve wandered into the deep end. The page you&apos;re looking for has either been moved or doesn&apos;t exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/">
              Back to Rankings
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/#top-100">
              View Top 100
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
