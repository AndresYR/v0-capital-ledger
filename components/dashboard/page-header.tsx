"use client"

import * as React from "react"
import { AlertTriangle, CalendarDays, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const portfolios = ["All portfolios", "Main Portfolio", "Retirement", "Growth Fund"]
const brokers = ["All brokers", "Interactive Brokers", "Fidelity", "Vanguard"]

export function PageHeader() {
  const [portfolio, setPortfolio] = React.useState(portfolios[0])
  const [broker, setBroker] = React.useState(brokers[0])
  const [refreshing, setRefreshing] = React.useState(false)
  const refresh = () => { setRefreshing(true); window.setTimeout(() => setRefreshing(false), 700) }
  return <TooltipProvider><header className="flex flex-col gap-5 border-b border-border/50 pb-5 xl:flex-row xl:items-end xl:justify-between"><div><div className="mb-1 flex items-center gap-2"><p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Overview</p><span className="rounded border border-border/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">Sample data</span></div><h1 className="text-[25px] font-semibold tracking-tight text-foreground">Dashboard</h1><p className="mt-1 text-[13px] text-muted-foreground">A clear view of your investments, cash, and realized results.</p></div><div className="flex flex-wrap items-center gap-2"><Select value={portfolio} onValueChange={setPortfolio}><SelectTrigger className="h-9 w-[152px] text-[12px]"><SelectValue /></SelectTrigger><SelectContent>{portfolios.map((item) => <SelectItem key={item} value={item} className="text-[12px]">{item}</SelectItem>)}</SelectContent></Select><Select value={broker} onValueChange={setBroker}><SelectTrigger className="h-9 w-[152px] text-[12px]"><SelectValue /></SelectTrigger><SelectContent>{brokers.map((item) => <SelectItem key={item} value={item} className="text-[12px]">{item}</SelectItem>)}</SelectContent></Select><div className="hidden h-5 w-px bg-border/60 sm:block" /><span className="flex h-9 items-center gap-1.5 rounded-md border border-border/50 px-2.5 text-[11px] text-muted-foreground"><CalendarDays className="size-3.5" /> USD</span><Tooltip><TooltipTrigger asChild><button aria-label="View pricing data warning" className="flex size-9 items-center justify-center rounded-md border border-warning/30 text-warning outline-none hover:bg-warning/10 focus-visible:ring-2 focus-visible:ring-ring"><AlertTriangle className="size-3.5" /></button></TooltipTrigger><TooltipContent className="max-w-[245px] text-[11px] leading-relaxed">One or more assets do not have a current price. Valuation totals may be partial. Inspect affected assets in Portfolio.</TooltipContent></Tooltip><Button variant="outline" size="sm" className="h-9 text-[12px]" onClick={refresh} disabled={refreshing}><RefreshCw data-icon="inline-start" className={refreshing ? "animate-spin" : undefined} />{refreshing ? "Updating" : "Update prices"}</Button></div></header></TooltipProvider>
}
