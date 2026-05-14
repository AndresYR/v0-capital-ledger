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
import { X, TrendingUp, TrendingDown, Calendar, Loader2 } from "lucide-react"

interface TransactionDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type TransactionType = "buy" | "sell"

export function TransactionDrawer({ open, onOpenChange }: TransactionDrawerProps) {
  const [transactionType, setTransactionType] = React.useState<TransactionType>("buy")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  
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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    onOpenChange(false)
    // Reset form
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[420px] sm:max-w-[420px] p-0 flex flex-col bg-card border-border/40"
      >
        {/* Custom close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* Header */}
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-border/40">
          <SheetTitle className="text-base font-semibold text-foreground">
            Add transaction
          </SheetTitle>
          <SheetDescription className="text-[13px] text-muted-foreground mt-1">
            Register a buy or sell operation for the active portfolio and broker.
          </SheetDescription>
          
          {/* Context metadata */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/30">
            <div className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">Portfolio</span>
              <span className="text-[12px] text-foreground">Main Portfolio</span>
            </div>
            <div className="w-px h-6 bg-border/40" />
            <div className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">Broker</span>
              <span className="text-[12px] text-foreground">Interactive Brokers</span>
            </div>
          </div>
        </SheetHeader>

        {/* Segmented control */}
        <div className="px-5 py-4">
          <div className="flex gap-1 p-1 rounded-lg bg-muted/40 border border-border/30">
            <button
              type="button"
              onClick={() => setTransactionType("buy")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-[13px] font-medium transition-all",
                isBuy
                  ? "bg-success/15 text-success border border-success/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Buy
            </button>
            <button
              type="button"
              onClick={() => setTransactionType("sell")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-[13px] font-medium transition-all",
                !isBuy
                  ? "bg-destructive/15 text-destructive border border-destructive/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <TrendingDown className="h-3.5 w-3.5" />
              Sell
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-5 pb-4">
            <div className="space-y-4">
              {/* Asset / Symbol */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80">
                  Asset / Symbol
                </Label>
                <Input
                  placeholder="e.g. AAPL, MSFT, VTI"
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                  className="h-9 bg-muted/30 border-border/40 text-[13px] placeholder:text-muted-foreground/50"
                  required
                />
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80">
                  Date
                </Label>
                <div className="relative">
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="h-9 bg-muted/30 border-border/40 text-[13px] pr-9"
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
                </div>
              </div>

              {/* Quantity + Price per share */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80">
                    Quantity
                  </Label>
                  <Input
                    type="number"
                    placeholder="0"
                    min="0"
                    step="any"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="h-9 bg-muted/30 border-border/40 text-[13px] font-mono tabular-nums placeholder:text-muted-foreground/50"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80">
                    Price per share
                  </Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="h-9 bg-muted/30 border-border/40 text-[13px] font-mono tabular-nums placeholder:text-muted-foreground/50"
                    required
                  />
                </div>
              </div>

              {/* Fees + Currency */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80">
                    Fees / Commission
                  </Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
                    className="h-9 bg-muted/30 border-border/40 text-[13px] font-mono tabular-nums placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80">
                    Currency
                  </Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData({ ...formData, currency: value })}
                  >
                    <SelectTrigger className="h-9 bg-muted/30 border-border/40 text-[13px] w-full">
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

              {/* Notes */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80">
                  Notes <span className="text-muted-foreground/50 normal-case tracking-normal">(optional)</span>
                </Label>
                <textarea
                  placeholder="Add any additional notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full rounded-md border border-border/40 bg-muted/30 px-3 py-2 text-[13px] placeholder:text-muted-foreground/50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none resize-none"
                />
              </div>

              {/* Summary */}
              {formData.quantity && formData.price && (
                <div className="rounded-lg border border-border/30 bg-muted/20 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/70">
                      Total
                    </span>
                    <span className={cn(
                      "text-base font-semibold font-mono tabular-nums",
                      isBuy ? "text-foreground" : "text-destructive"
                    )}>
                      {!isBuy && "-"}
                      {formData.currency === "USD" && "$"}
                      {formData.currency === "EUR" && "€"}
                      {formData.currency === "GBP" && "£"}
                      {formData.currency === "JPY" && "¥"}
                      {formData.currency === "CHF" && "CHF "}
                      {formData.currency === "CAD" && "CA$"}
                      {(
                        parseFloat(formData.quantity) * parseFloat(formData.price) +
                        (parseFloat(formData.fees) || 0)
                      ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky footer */}
          <div className="border-t border-border/40 bg-card px-5 py-4 mt-auto">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="flex-1 h-9 text-[13px] text-muted-foreground hover:text-foreground"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.symbol || !formData.quantity || !formData.price}
                className={cn(
                  "flex-1 h-9 text-[13px]",
                  isBuy
                    ? "bg-success text-success-foreground hover:bg-success/90"
                    : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
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
