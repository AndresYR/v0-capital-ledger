"use client"

import * as React from "react"
import { CalendarDays, ChevronDown, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const portfolios = ["All portfolios", "Main Portfolio", "Retirement", "Growth Fund"]
const brokers = ["All brokers", "Interactive Brokers", "Fidelity", "Vanguard"]

export function PageHeader() {
  const [portfolio, setPortfolio] = React.useState(portfolios[0])
  const [broker, setBroker] = React.useState(brokers[0])
  return <header className="flex flex-col gap-5 border-b border-border/50 pb-5 xl:flex-row xl:items-end xl:justify-between">
    <div><p className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Overview</p><h1 className="text-[25px] font-semibold tracking-tight text-foreground">Dashboard</h1><p className="mt-1 text-[13px] text-muted-foreground">A clear view of your investments, cash, and realized results.</p></div>
    <div className="flex flex-wrap items-center gap-2">
      <Select value={portfolio} onValueChange={setPortfolio}><SelectTrigger className="h-9 w-[152px] text-[12px]"><SelectValue /></SelectTrigger><SelectContent>{portfolios.map((item) => <SelectItem key={item} value={item} className="text-[12px]">{item}</SelectItem>)}</SelectContent></Select>
      <Select value={broker} onValueChange={setBroker}><SelectTrigger className="h-9 w-[152px] text-[12px]"><SelectValue /></SelectTrigger><SelectContent>{brokers.map((item) => <SelectItem key={item} value={item} className="text-[12px]">{item}</SelectItem>)}</SelectContent></Select>
      <div className="hidden h-5 w-px bg-border/60 sm:block" />
      <span className="flex h-9 items-center gap-1.5 rounded-md border border-border/50 px-2.5 text-[11px] text-muted-foreground"><CalendarDays className="size-3.5" /> USD</span>
      <Button variant="outline" size="sm" className="h-9 text-[12px]"><RefreshCw data-icon="inline-start" />Update prices</Button>
    </div>
  </header>
}
