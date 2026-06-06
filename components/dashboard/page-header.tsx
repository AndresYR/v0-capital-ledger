"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { Download, RefreshCw } from "lucide-react"

const portfolios = [
  { id: "main", name: "Main Portfolio", value: "$847,291" },
  { id: "retirement", name: "Retirement", value: "$234,500" },
  { id: "growth", name: "Growth Fund", value: "$125,800" },
  { id: "all", name: "All Portfolios", value: "$1,207,591" },
]

const brokers = [
  { id: "all", name: "All Brokers" },
  { id: "ibkr", name: "Interactive Brokers" },
  { id: "fidelity", name: "Fidelity" },
  { id: "schwab", name: "Charles Schwab" },
  { id: "vanguard", name: "Vanguard" },
]

export function PageHeader() {
  const [portfolio, setPortfolio] = React.useState("main")
  const [broker, setBroker] = React.useState("all")

  const selectedPortfolio = portfolios.find((p) => p.id === portfolio)
  const selectedBroker = brokers.find((b) => b.id === broker)

  return (
    <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-0.5">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Portfolio
        </h1>
        <p className="text-[13px] text-muted-foreground">
          Positions, performance, and transaction history
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Scope selectors */}
        <div className="flex items-center gap-1.5">
          <Select value={portfolio} onValueChange={setPortfolio}>
            <SelectTrigger className="h-8 w-[170px] bg-muted/30 border-border/40 text-[12px] px-2.5 gap-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-muted/60 text-[10px] font-medium text-muted-foreground shrink-0">
                  {selectedPortfolio?.name.charAt(0)}
                </div>
                <span className="truncate text-foreground">{selectedPortfolio?.name}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              {portfolios.map((p) => (
                <SelectItem key={p.id} value={p.id} className="text-[12px]">
                  <div className="flex items-center justify-between gap-4">
                    <span>{p.name}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{p.value}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={broker} onValueChange={setBroker}>
            <SelectTrigger className="h-8 w-[150px] bg-muted/30 border-border/40 text-[12px] px-2.5 gap-1.5">
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

        {/* Divider */}
        <div className="hidden h-5 w-px bg-border/40 lg:block" />

        {/* Action buttons */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
            Rebalance
          </Button>
        </div>
      </div>
    </header>
  )
}
