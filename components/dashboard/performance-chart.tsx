"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

const timeRanges = ["1M", "3M", "6M", "1Y", "ALL"] as const
type TimeRange = (typeof timeRanges)[number]

// Generate realistic portfolio data
function generateData(range: TimeRange) {
  const dataPoints: { date: string; value: number }[] = []
  let days: number
  let dateFormat: (date: Date) => string

  switch (range) {
    case "1M":
      days = 30
      dateFormat = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      break
    case "3M":
      days = 90
      dateFormat = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      break
    case "6M":
      days = 180
      dateFormat = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      break
    case "1Y":
      days = 365
      dateFormat = (d) => d.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
      break
    case "ALL":
      days = 730
      dateFormat = (d) => d.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
      break
  }

  let value = 650000
  const volatility = 0.015
  const drift = 0.0003

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    // Random walk with slight upward drift
    const change = (Math.random() - 0.48) * volatility + drift
    value = value * (1 + change)

    // Add some data points based on range
    const interval = range === "1M" ? 1 : range === "3M" ? 2 : range === "6M" ? 4 : range === "1Y" ? 7 : 14
    if (i % interval === 0 || i === 0) {
      dataPoints.push({
        date: dateFormat(date),
        value: Math.round(value),
      })
    }
  }

  return dataPoints
}

const dataCache: Partial<Record<TimeRange, ReturnType<typeof generateData>>> = {}
function getData(range: TimeRange) {
  if (!dataCache[range]) {
    dataCache[range] = generateData(range)
  }
  return dataCache[range]!
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-border/60 bg-popover px-2.5 py-1.5 shadow-md">
        <p className="text-[10px] text-muted-foreground mb-0.5">{label}</p>
        <p className="text-[13px] font-semibold text-foreground tabular-nums">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export function PerformanceChart() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("1Y")
  const data = getData(selectedRange)
  
  // Calculate period performance
  const periodStats = useMemo(() => {
    if (data.length < 2) return { change: 0, percent: 0, isPositive: true }
    const startValue = data[0].value
    const endValue = data[data.length - 1].value
    const change = endValue - startValue
    const percent = ((endValue - startValue) / startValue) * 100
    return { change, percent, isPositive: change >= 0, currentValue: endValue }
  }, [data])

  return (
    <Card className="border-border/40 bg-card">
      <CardHeader className="flex flex-row items-start justify-between pb-0 pt-4 px-4">
        <div className="space-y-1">
          <h3 className="text-[13px] font-medium text-muted-foreground">
            Portfolio Performance
          </h3>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-foreground tabular-nums">
              ${periodStats.currentValue?.toLocaleString()}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-[13px] font-medium tabular-nums",
                periodStats.isPositive ? "text-success" : "text-destructive"
              )}
            >
              {periodStats.isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {periodStats.isPositive ? "+" : ""}
              {periodStats.percent.toFixed(2)}%
              <span className="text-muted-foreground/70 font-normal ml-1">
                {selectedRange === "ALL" ? "all time" : `past ${selectedRange.toLowerCase()}`}
              </span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-0.5 rounded-md bg-muted/40 p-0.5">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={cn(
                "rounded px-2.5 py-1 text-[11px] font-medium transition-all",
                selectedRange === range
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pb-3 pt-2 px-2">
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.18 220)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="oklch(0.65 0.18 220)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.22 0.005 260)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.45 0 0)", fontSize: 10 }}
                dy={8}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.45 0 0)", fontSize: 10 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                dx={-4}
                width={48}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ stroke: "oklch(0.35 0 0)", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="oklch(0.65 0.18 220)"
                strokeWidth={2}
                fill="url(#colorValue)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "oklch(0.65 0.18 220)",
                  stroke: "oklch(0.16 0.005 260)",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
