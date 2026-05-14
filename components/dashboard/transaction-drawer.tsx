"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { X, TrendingUp, TrendingDown, Calendar, Loader2, ChevronDown } from "lucide-react"

interface TransactionDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type TransactionType = "buy" | "sell"

// Mock data for portfolios and brokers
const portfolios = [
  { id: "main", name: "Main Portfolio", value: "$847,291" },
  { id: "retirement", name: "Retirement", value: "$234,500" },
  { id: "growth", name: "Growth Fund", value: "$125,800" },
]

const brokers = [
  { id: "ibkr", name: "Interactive Brokers" },
  { id: "fidelity", name: "Fidelity" },
  { id: "schwab", name: "Charles Schwab" },
  { id: "vanguard", name: "Vanguard" },
]

export function TransactionDrawer({ open, onOpenChange }: TransactionDrawerProps) {
  const [transactionType, setTransactionType] = React.useState<TransactionType>("buy")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [portfolio, setPortfolio] = React.useState("main")
  const [broker, setBroker] = React.useState("ibkr")
  
  // Form state
  const [formData, setFormData] = React.useState({
    symbol: "",
    date: new Date().toISOString().split("T")[0],
    quantity: "",
    price: "",
    fees: "",
    currency: "USD",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    onOpenChange(false)
    setFormData({
      symbol: "",
      date: new Date().toISOString().split("T")[0],
      quantity: "",
      price: "",
      fees: "",
      currency: "USD",
      notes: "",
    })
  }

  const isBuy = transactionType === "buy"
  const selectedPortfolio = portfolios.find(p => p.id === portfolio)
  const selectedBroker = brokers.find(b => b.id === broker)

  const total = formData.quantity && formData.price
    ? parseFloat(formData.quantity) * parseFloat(formData.price) + (parseFloat(formData.fees) || 0)
    : 0

  const formatCurrency = (value: number, currency: string) => {
    const symbols: Record<string, string> = {
      USD: "$", EUR: "€", GBP: "£", JPY: "¥", CHF: "CHF ", CAD: "CA$"
    }
    return `${symbols[currency] || ""}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[400px] sm:max-w-[400px] p-0 flex flex-col bg-card border-l border-border/40"
      >
        {/* Header with integrated close */}
        <SheetHeader className="px-5 pt-4 pb-3 border-b border-border/30">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-[15px] font-semibold text-foreground">
              Add transaction
            </SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-md p-1 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <SheetDescription className="sr-only">
            Register a buy or sell transaction
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {/* Context section - Portfolio & Broker selectors */}
            <div className="px-5 py-4 border-b border-border/30">
              <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 mb-2.5">
                Context
              </div>
              <div className="flex gap-2">
                {/* Portfolio selector */}
                <Select value={portfolio} onValueChange={setPortfolio}>
                  <SelectTrigger className="flex-1 h-8 bg-muted/20 border-border/30 text-[12px] px-2.5 gap-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex h-5 w-5 items-center justify-center rounded bg-muted/50 text-[10px] font-medium text-muted-foreground shrink-0">
                        {selectedPortfolio?.name.charAt(0)}
                      </div>
                      <span className="truncate text-foreground">{selectedPortfolio?.name}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {portfolios.map((p) => (
                      <SelectItem key={p.id} value={p.id} className="text-[12px]">
                        <div className="flex items-center justify-between gap-3">
                          <span>{p.name}</span>
                          <span className="text-muted-foreground font-mono text-[11px]">{p.value}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Broker selector */}
                <Select value={broker} onValueChange={setBroker}>
                  <SelectTrigger className="w-[140px] h-8 bg-muted/20 border-border/30 text-[12px] px-2.5 gap-1.5">
                    <span className="truncate text-foreground">{selectedBroker?.name}</span>
                  </SelectTrigger>
                  <SelectContent>
                    {brokers.map((b) => (
                      <SelectItem key={b.id} value={b.id} className="text-[12px]">
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Transaction type */}
            <div className="px-5 py-4 border-b border-border/30">
              <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 mb-2.5">
                Transaction type
              </div>
              <div className="flex gap-1 p-0.5 rounded-md bg-muted/30 border border-border/20">
                <button
                  type="button"
                  onClick={() => setTransactionType("buy")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-[12px] font-medium transition-all",
                    isBuy
                      ? "bg-success/15 text-success shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <TrendingUp className="h-3.5 w-3.5" />
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => setTransactionType("sell")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-[12px] font-medium transition-all",
                    !isBuy
                      ? "bg-destructive/15 text-destructive shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <TrendingDown className="h-3.5 w-3.5" />
                  Sell
                </button>
              </div>
            </div>

            {/* Order details */}
            <div className="px-5 py-4 border-b border-border/30">
              <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 mb-3">
                Order details
              </div>
              <div className="space-y-3">
                {/* Asset / Symbol */}
                <div className="space-y-1">
                  <Label className="text-[11px] text-muted-foreground/80">
                    Asset / Symbol
                  </Label>
                  <Input
                    placeholder="e.g. AAPL, MSFT, VTI"
                    value={formData.symbol}
                    onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                    className="h-8 bg-muted/20 border-border/30 text-[13px] placeholder:text-muted-foreground/40"
                    required
                  />
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <Label className="text-[11px] text-muted-foreground/80">
                    Date
                  </Label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="h-8 bg-muted/20 border-border/30 text-[13px] pr-8"
                      required
                    />
                    <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40 pointer-events-none" />
                  </div>
                </div>

                {/* Quantity + Price */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground/80">
                      Quantity
                    </Label>
                    <Input
                      type="number"
                      placeholder="0"
                      min="0"
                      step="any"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="h-8 bg-muted/20 border-border/30 text-[13px] font-mono tabular-nums placeholder:text-muted-foreground/40"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground/80">
                      Price per share
                    </Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="h-8 bg-muted/20 border-border/30 text-[13px] font-mono tabular-nums placeholder:text-muted-foreground/40"
                      required
                    />
                  </div>
                </div>

                {/* Fees + Currency */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground/80">
                      Fees / Commission
                    </Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={formData.fees}
                      onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                      className="h-8 bg-muted/20 border-border/30 text-[13px] font-mono tabular-nums placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground/80">
                      Currency
                    </Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => setFormData({ ...formData, currency: value })}
                    >
                      <SelectTrigger className="h-8 bg-muted/20 border-border/30 text-[13px] w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                        <SelectItem value="CHF">CHF</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes section */}
            <div className="px-5 py-4">
              <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 mb-2.5">
                Notes <span className="normal-case tracking-normal font-normal">(optional)</span>
              </div>
              <textarea
                placeholder="Add any additional notes..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full rounded-md border border-border/30 bg-muted/20 px-2.5 py-2 text-[13px] placeholder:text-muted-foreground/40 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none resize-none"
              />
            </div>
          </div>

          {/* Sticky footer with summary */}
          <div className="border-t border-border/30 bg-card mt-auto">
            {/* Total summary */}
            {total > 0 && (
              <div className="px-5 py-3 border-b border-border/20 bg-muted/10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">
                    Total {isBuy ? "cost" : "proceeds"}
                  </span>
                  <span className={cn(
                    "text-[15px] font-semibold font-mono tabular-nums",
                    isBuy ? "text-foreground" : "text-destructive"
                  )}>
                    {!isBuy && "−"}{formatCurrency(total, formData.currency)}
                  </span>
                </div>
              </div>
            )}
            
            {/* Actions */}
            <div className="px-5 py-3 flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="h-8 px-3 text-[12px] text-muted-foreground hover:text-foreground"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.symbol || !formData.quantity || !formData.price}
                className={cn(
                  "flex-1 h-8 text-[12px] font-medium",
                  isBuy
                    ? "bg-success hover:bg-success/90 text-success-foreground"
                    : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                    Saving...
                  </>
                ) : (
                  <>Save {isBuy ? "buy" : "sell"}</>
                )}
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
