"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
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

    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (email !== "demo@capitalledger.com") {
      setError("Invalid credentials. Please check your email and password.")
      setIsLoading(false)
      return
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-[380px]">
        {/* Brand identity - more deliberate and confident */}
        <div className="mb-10 flex flex-col items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-foreground shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 text-background"
              strokeWidth="2.25"
              stroke="currentColor"
            >
              <path d="M3 17L9 11L13 15L21 7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 7H21V11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-semibold text-foreground tracking-tight">
              Capital Ledger
            </span>
            <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60">
              Portfolio Management
            </span>
          </div>
        </div>

        {/* Login panel - stronger premium dark surface treatment */}
        <div className="rounded-xl border border-border/40 bg-card p-7 shadow-sm">
          {/* Header - refined hierarchy */}
          <div className="mb-6">
            <h1 className="text-[15px] font-semibold text-foreground tracking-tight">
              Sign in to your account
            </h1>
            <p className="mt-1 text-[12px] text-muted-foreground/80">
              Access your portfolio and transaction history
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 px-3.5 py-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <p className="text-[12px] text-destructive/90 leading-relaxed">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-[10px] font-medium text-muted-foreground/80 uppercase tracking-widest"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className={cn(
                  "h-10 bg-muted/30 border-border/40 text-[13px] placeholder:text-muted-foreground/40",
                  "focus-visible:border-border/60 focus-visible:ring-1 focus-visible:ring-ring/20"
                )}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[10px] font-medium text-muted-foreground/80 uppercase tracking-widest"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-[11px] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className={cn(
                  "h-10 bg-muted/30 border-border/40 text-[13px] placeholder:text-muted-foreground/40",
                  "focus-visible:border-border/60 focus-visible:ring-1 focus-visible:ring-ring/20"
                )}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "flex h-10 w-full items-center justify-center gap-2 rounded-lg text-[13px] font-medium transition-all",
                "bg-foreground text-background hover:bg-foreground/90",
                "disabled:pointer-events-none disabled:opacity-60"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Separator */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border/30" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50">
              or
            </span>
            <div className="h-px flex-1 bg-border/30" />
          </div>

          {/* SSO option */}
          <button
            type="button"
            className={cn(
              "flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border/40 text-[13px] font-medium transition-all",
              "text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:border-border/60"
            )}
          >
            Continue with SSO
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-[11px] text-muted-foreground/50">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-muted-foreground/70 hover:text-foreground transition-colors">
              Request access
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
