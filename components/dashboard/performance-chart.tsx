"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
      <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-lg">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground tabular-nums">
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

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium text-foreground">
          Portfolio Performance
        </CardTitle>
        <div className="flex items-center gap-1 rounded-lg bg-muted/50 p-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                selectedRange === range
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.18 220)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.65 0.18 220)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.25 0.005 260)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.55 0 0)", fontSize: 11 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.55 0 0)", fontSize: 11 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="oklch(0.65 0.18 220)"
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
