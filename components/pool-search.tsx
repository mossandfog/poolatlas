"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Search, Sparkles, X, Send, Loader2, MapPin, Heart, Users, Waves, Mountain, Building2, Sunrise, PalmtreeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PoolSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/pool-search" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !isLoading) {
      sendMessage({ text: inputValue })
      setInputValue("")
    }
  }

  const quickCategories = [
    { icon: Heart, label: "Romantic", query: "Most romantic pools for couples" },
    { icon: Users, label: "Family", query: "Best pools for families with kids" },
    { icon: Waves, label: "Infinity", query: "Stunning infinity pool recommendations" },
    { icon: Building2, label: "Rooftop", query: "Best rooftop pools in the world" },
  ]

  const popularSearches = [
    { icon: MapPin, label: "Pools in Santorini", query: "Best hotel pools in Santorini" },
    { icon: PalmtreeIcon, label: "Bali jungle pools", query: "Jungle pools in Bali" },
    { icon: Mountain, label: "Alpine views", query: "Pools with mountain views" },
    { icon: Sunrise, label: "Sunrise spots", query: "Best pools for sunrise views" },
  ]

  const suggestions = [
    "Best pools for families with kids",
    "Infinity pools with ocean views",
    "Top rooftop pools in Asia",
    "Pools with waterslides",
    "Most romantic honeymoon pools"
  ]

  const getMessageText = (msg: typeof messages[0]): string => {
    if (!msg.parts || !Array.isArray(msg.parts)) return ""
    return msg.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("")
  }

  return (
    <div className="w-full max-w-2xl mx-auto relative" ref={dropdownRef}>
      {/* Search Bar Trigger */}
      <div
        className={`w-full flex items-center gap-3 px-5 py-3.5 bg-card border-2 rounded-2xl shadow-lg transition-all cursor-text ${
          isFocused 
            ? "border-primary shadow-xl shadow-primary/10 rounded-b-none" 
            : "border-primary/20 hover:border-primary/40 hover:shadow-xl"
        }`}
        onClick={() => {
          setIsFocused(true)
          inputRef.current?.focus()
        }}
      >
        <div className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
          isFocused ? "bg-primary" : "bg-primary/10"
        }`}>
          <Sparkles className={`w-4 h-4 ${isFocused ? "text-primary-foreground" : "text-primary"}`} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim()) {
              setIsOpen(true)
              setIsFocused(false)
              sendMessage({ text: inputValue })
              setInputValue("")
            }
          }}
          placeholder="Ask me anything about pools..."
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
        />
        <Search className={`w-5 h-5 transition-colors ${isFocused ? "text-primary" : "text-muted-foreground"}`} />
      </div>

      {/* Styled Dropdown */}
      {isFocused && !isOpen && (
        <div className="absolute left-0 right-0 top-full bg-card border-2 border-t-0 border-primary rounded-b-2xl shadow-xl shadow-primary/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Quick Categories */}
          <div className="p-4 border-b border-border">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Quick Search</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {quickCategories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => {
                    setIsOpen(true)
                    setIsFocused(false)
                    sendMessage({ text: cat.query })
                  }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <cat.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Popular Searches */}
          <div className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Popular Searches</p>
            <div className="space-y-1">
              {popularSearches.map((search) => (
                <button
                  key={search.label}
                  onClick={() => {
                    setIsOpen(true)
                    setIsFocused(false)
                    sendMessage({ text: search.query })
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors text-left group"
                >
                  <search.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm text-foreground">{search.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">Search</span>
                </button>
              ))}
            </div>
          </div>

          {/* Keyboard hint */}
          <div className="px-4 py-2.5 bg-secondary/30 border-t border-border flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Type your question and press Enter</p>
            <kbd className="px-2 py-0.5 text-xs bg-background border border-border rounded text-muted-foreground">Enter</kbd>
          </div>
        </div>
      )}

      {/* Modal Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div 
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative w-full max-w-2xl bg-card rounded-3xl shadow-2xl border border-border overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Pool Concierge</h3>
                  <p className="text-xs text-muted-foreground">AI-powered pool recommendations</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground text-center">
                    Hi! I&apos;m your pool concierge. Ask me anything about the world&apos;s best hotel pools!
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          sendMessage({ text: suggestion })
                        }}
                        className="px-3 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-full transition-colors text-secondary-foreground"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{getMessageText(message)}</p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground px-4 py-3 rounded-2xl">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-secondary/30">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about pools..."
                  className="flex-1 px-4 py-3 bg-card border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="rounded-full h-12 w-12 shadow-md"
                  disabled={isLoading || !inputValue.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
