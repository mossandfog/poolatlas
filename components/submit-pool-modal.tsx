"use client"

import { useState } from "react"
import { X, Send, MapPin, Building2, Sparkles, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitPool } from "@/app/actions/submit-pool"

interface SubmitPoolModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SubmitPoolModal({ isOpen, onClose }: SubmitPoolModalProps) {
  const [formData, setFormData] = useState({
    hotelName: "",
    poolName: "",
    location: "",
    country: "",
    whatMakesItSpecial: "",
    submitterEmail: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const result = await submitPool(formData)
    
    setIsSubmitting(false)
    
    if (result.success) {
      setIsSubmitted(true)
      
      // Reset after showing success
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          hotelName: "",
          poolName: "",
          location: "",
          country: "",
          whatMakesItSpecial: "",
          submitterEmail: "",
        })
        onClose()
      }, 2000)
    } else {
      setError(result.message)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground">
              Submit a Pool
            </h2>
            <p className="text-sm text-muted-foreground">
              Know an incredible pool? Tell us about it.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-chart-3/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-chart-3" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground mb-2">
                Thank You!
              </h3>
              <p className="text-muted-foreground">
                We'll review your submission and may reach out for more details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Hotel Name */}
              <div className="space-y-2">
                <Label htmlFor="hotelName" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  Hotel / Resort Name
                </Label>
                <Input
                  id="hotelName"
                  placeholder="e.g., Four Seasons Bali"
                  value={formData.hotelName}
                  onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                  required
                  className="rounded-xl"
                />
              </div>

              {/* Pool Name (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="poolName" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-muted-foreground" />
                  Pool Name <span className="text-muted-foreground font-normal">(if it has one)</span>
                </Label>
                <Input
                  id="poolName"
                  placeholder="e.g., The Infinity Pool, Main Pool"
                  value={formData.poolName}
                  onChange={(e) => setFormData({ ...formData, poolName: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              {/* Location */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    City / Region
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., Ubud"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="e.g., Indonesia"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              {/* What Makes It Special */}
              <div className="space-y-2">
                <Label htmlFor="whatMakesItSpecial">
                  What makes this pool special?
                </Label>
                <Textarea
                  id="whatMakesItSpecial"
                  placeholder="Tell us what makes this pool stand out - the views, the design, the experience..."
                  value={formData.whatMakesItSpecial}
                  onChange={(e) => setFormData({ ...formData, whatMakesItSpecial: e.target.value })}
                  required
                  className="rounded-xl min-h-[100px] resize-none"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="submitterEmail">
                  Your Email <span className="text-muted-foreground font-normal">(optional, for follow-up)</span>
                </Label>
                <Input
                  id="submitterEmail"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.submitterEmail}
                  onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full rounded-full gap-2"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Pool
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting, you agree that we may feature this pool on Pool Atlas.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
