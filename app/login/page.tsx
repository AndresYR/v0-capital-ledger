"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Demo error state - in production, this would be actual auth logic
    if (email !== "demo@capitalledger.com") {
      setError("Invalid credentials. Please check your email and password.")
      setIsLoading(false)
      return
    }

    // Success - redirect would happen here
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-[360px]">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4.5 w-4.5 text-background"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path d="M3 17L9 11L13 15L21 7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 7H21V11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-base font-semibold text-foreground tracking-tight">
            Capital Ledger
          </span>
        </div>

        {/* Login panel */}
        <div className="rounded-lg border border-border/40 bg-card p-6">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-lg font-semibold text-foreground">
              Sign in to your account
            </h1>
            <p className="mt-1.5 text-[13px] text-muted-foreground">
              Enter your credentials to access your portfolio
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 flex items-start gap-2.5 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <p className="text-[13px] text-destructive leading-snug">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className={cn(
                  "h-10 bg-input/50 border-border/60 placeholder:text-muted-foreground/50",
                  "focus-visible:border-border focus-visible:ring-1 focus-visible:ring-ring/30"
                )}
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className={cn(
                  "h-10 bg-input/50 border-border/60 placeholder:text-muted-foreground/50",
                  "focus-visible:border-border focus-visible:ring-1 focus-visible:ring-ring/30"
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-10 w-full text-[13px] font-medium"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* Footer link */}
          <div className="mt-5 text-center">
            <a
              href="#"
              className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        {/* Bottom text */}
        <p className="mt-6 text-center text-[11px] text-muted-foreground/70">
          Demo credentials: demo@capitalledger.com
        </p>
      </div>
    </div>
  )
}
