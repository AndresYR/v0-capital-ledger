"use client"

import * as React from "react"
import { ArrowDownRight, ArrowUpRight, CircleAlert, Clock3, DollarSign, ExternalLink, RefreshCw, Wallet } from "lucide-react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { activity, evolutionData, holdings, totalCost, totalValue } from "./dashboard-data"

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const preciseMoney = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 })

function MetricCard({ label, value, detail, tone = "default", icon: Icon }: { label: string; value: string; detail: string; tone?: "default" | "positive" | "negative" | "cash"; icon: React.ElementType }) {
  return (
    <Card className="min-w-0">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
          <Icon className="size-4 text-muted-foreground/50" aria-hidden="true" />
        </div>
        <div className={cn("mt-3 font-mono text-[25px] font-medium tracking-tight tabular-nums", tone === "positive" && "text-positive", tone === "negative" && "text-negative", tone === "cash" && "text-info")}>{value}</div>
        <p className="mt-1 text-[11px] text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  )
}

function FutureChart() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between border-b border-border/60 px-5 py-4">
        <div>
          <CardTitle className="text-[15px]">Investment value evolution</CardTitle>
          <p className="mt-1 text-[11px] text-muted-foreground">Illustrative account value, not investment performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-warning/30 bg-warning/5 text-warning">Coming later</Badge>
          <span className="hidden text-[11px] text-muted-foreground sm:inline">Illustrative data</span>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-4 pt-5 sm:px-5">
        <div className="h-[245px] w-full" aria-label="Illustrative investment value evolution chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={evolutionData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <defs><linearGradient id="valueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#60A5FA" stopOpacity={0.2} /><stop offset="100%" stopColor="#60A5FA" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid stroke="#151D2A" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#6F7F99", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6F7F99", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${Math.round(v / 1000)}k`} domain={[40000, 50000]} />
              <Tooltip contentStyle={{ background: "#0C0D0F", border: "1px solid #151922", borderRadius: 8, fontSize: 12 }} formatter={(value: number) => [money.format(value), "Illustrative value"]} />
              <Area type="monotone" dataKey="value" stroke="#60A5FA" strokeWidth={2} fill="url(#valueFill)" dot={{ r: 2, fill: "#60A5FA", strokeWidth: 0 }} activeDot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-1 text-center text-[11px] text-muted-foreground">Historical snapshots are not available yet. This preview will become functional in a future release.</p>
      </CardContent>
    </Card>
  )
}

function CompositionCard() {
  const [view, setView] = React.useState("asset")
  const byBroker = [{ label: "Interactive Brokers", value: 18800, color: "#60A5FA" }, { label: "Vanguard", value: 20000, color: "#4FD16F" }, { label: "Fidelity", value: 9600, color: "#C084FC" }]
  const rows = view === "asset" ? holdings.map((h) => ({ label: h.ticker, value: h.value, color: h.color })) : byBroker
  return <Card><CardHeader className="flex flex-row items-center justify-between px-5 py-4"><div><CardTitle className="text-[15px]">Portfolio composition</CardTitle><p className="mt-1 text-[11px] text-muted-foreground">Valued investments only · cash excluded</p></div><Select value={view} onValueChange={setView}><SelectTrigger className="h-8 w-[112px] text-[11px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="asset">By asset</SelectItem><SelectItem value="broker">By broker</SelectItem></SelectContent></Select></CardHeader><CardContent className="px-5 pb-5"><div className="flex h-3 overflow-hidden rounded-sm bg-secondary">{rows.map((row) => <div key={row.label} style={{ width: `${(row.value / totalValue) * 100}%`, backgroundColor: row.color }} />)}</div><div className="mt-5 grid gap-3 sm:grid-cols-2">{rows.map((row) => <div key={row.label} className="flex items-center justify-between text-[12px]"><div className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ backgroundColor: row.color }} /><span className="text-muted-foreground">{row.label}</span></div><span className="font-mono tabular-nums text-foreground">{money.format(row.value)} <span className="text-muted-foreground">{((row.value / totalValue) * 100).toFixed(1)}%</span></span></div>)}</div></CardContent></Card>
}

function HighlightsCard() {
  const sorted = [...holdings].sort((a, b) => (b.value - b.cost) - (a.value - a.cost))
  return <Card><CardHeader className="flex flex-row items-center justify-between px-5 py-4"><div><CardTitle className="text-[15px]">Position highlights</CardTitle><p className="mt-1 text-[11px] text-muted-foreground">Cumulative unrealized results</p></div><Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">View portfolio <ExternalLink data-icon="inline-end" /></Button></CardHeader><CardContent className="flex flex-col gap-3 px-5 pb-5">{sorted.slice(0, 3).map((holding) => { const pnl = holding.value - holding.cost; const pct = pnl / holding.cost * 100; return <div key={holding.ticker} className="flex items-center justify-between"><div><div className="font-mono text-[13px] font-medium">{holding.ticker}</div><div className="text-[11px] text-muted-foreground">{holding.name}</div></div><div className={cn("text-right font-mono text-[12px] tabular-nums", pnl >= 0 ? "text-positive" : "text-negative")}><div>{pnl >= 0 ? "+" : ""}{money.format(pnl)}</div><div className="text-[11px]">{pnl >= 0 ? "+" : ""}{pct.toFixed(2)}%</div></div></div>})}</CardContent></Card>
}

function ActivityCard() {
  return <Card><CardHeader className="flex flex-row items-center justify-between px-5 py-4"><div><CardTitle className="text-[15px]">Recent activity</CardTitle><p className="mt-1 text-[11px] text-muted-foreground">Latest transactions</p></div><Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">View all <ExternalLink data-icon="inline-end" /></Button></CardHeader><CardContent className="px-5 pb-5"><div className="flex flex-col gap-4">{activity.map((item) => <div key={`${item.ticker}-${item.date}`} className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><span className={cn("flex size-7 shrink-0 items-center justify-center rounded-md text-[9px] font-semibold", item.type === "BUY" ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative")}>{item.type}</span><div className="min-w-0"><div className="font-mono text-[12px] font-medium">{item.ticker} <span className="font-sans text-muted-foreground">· {item.quantity}</span></div><div className="text-[11px] text-muted-foreground">{item.date}</div></div></div><span className="font-mono text-[12px] tabular-nums">{preciseMoney.format(item.amount)}</span></div>)}</div></CardContent></Card>
}

export function DashboardOverview() {
  const [period, setPeriod] = React.useState("30d")
  const [refreshing, setRefreshing] = React.useState(false)
  return <div className="flex flex-col gap-5">
    <div className="flex flex-col gap-3 rounded-lg border border-warning/20 bg-warning/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><CircleAlert className="mt-0.5 size-4 shrink-0 text-warning" /><div><p className="text-[12px] font-medium text-foreground">Sample data preview</p><p className="mt-0.5 text-[11px] text-muted-foreground">This dashboard uses illustrative data. Market prices are not connected.</p></div></div><Button variant="ghost" size="sm" className="h-7 shrink-0 px-2 text-[11px] text-warning hover:text-warning" onClick={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 700) }}><RefreshCw className={cn("mr-1.5 size-3.5", refreshing && "animate-spin")} />Refresh prices</Button></div>
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"><MetricCard label="Investment value" value={money.format(totalValue)} detail={`Open cost basis ${money.format(totalCost)}`} icon={DollarSign} /><MetricCard label="Available cash" value={money.format(3600)} detail="Separate from invested assets" tone="cash" icon={Wallet} /><MetricCard label="Unrealized P&L" value="+$4,400" detail="+10.00% relative to cost basis" tone="positive" icon={ArrowUpRight} /><MetricCard label="Realized P&L" value="+$1,240" detail={`${period === "30d" ? "Last 30 days" : period === "90d" ? "Last 90 days" : "All time"} · net of fees`} tone="positive" icon={ArrowDownRight} /></div>
    <div className="flex flex-col gap-3 border-b border-border/50 pb-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-[16px] font-medium">Activity scope</h2><p className="text-[11px] text-muted-foreground">Period applies to realized P&L, fees, and recent activity only.</p></div><div className="flex items-center gap-1 rounded-md border border-border/60 bg-secondary/50 p-1">{[["30d", "30 days"], ["90d", "90 days"], ["all", "All time"]].map(([value, label]) => <button key={value} onClick={() => setPeriod(value)} className={cn("rounded px-2.5 py-1.5 text-[11px] transition-colors", period === value ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground")}>{label}</button>)}</div></div>
    <FutureChart />
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]"><CompositionCard /><HighlightsCard /></div>
    <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]"><Card><CardHeader className="px-5 py-4"><CardTitle className="text-[15px]">Costs</CardTitle><p className="mt-1 text-[11px] text-muted-foreground">Selected period · {period === "all" ? "All time" : period === "30d" ? "Last 30 days" : "Last 90 days"}</p></CardHeader><CardContent className="px-5 pb-5"><div className="flex items-end justify-between"><span className="text-[12px] text-muted-foreground">Commissions</span><span className="font-mono text-[22px] tabular-nums">$38.40</span></div><p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">Commissions are already included in the relevant cost basis or realized calculations and are not subtracted again.</p></CardContent></Card><ActivityCard /></div>
    <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-secondary/30 px-4 py-3"><Clock3 className="mt-0.5 size-4 shrink-0 text-muted-foreground" /><div className="text-[11px]"><span className="font-medium text-foreground">Price coverage: 3 of 4 investments valued.</span><span className="ml-1 text-muted-foreground">Totals are partial when an asset has no current price. View affected assets in Portfolio.</span></div></div>
  </div>
}
