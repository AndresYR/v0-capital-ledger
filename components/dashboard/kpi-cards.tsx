import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  label: string
  value: string
  delta?: string
  deltaType?: "positive" | "negative" | "neutral"
  context?: string
}

function KPICard({ label, value, delta, deltaType = "neutral", context }: KPICardProps) {
  return (
    <Card className="relative overflow-hidden border-border/40 bg-card p-4">
      <div className="space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="text-[22px] font-semibold tracking-tight text-foreground tabular-nums leading-none">
          {value}
        </p>
        <div className="flex items-center gap-1.5 pt-0.5">
          {delta && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-[12px] font-medium tabular-nums",
                deltaType === "positive" && "text-success",
                deltaType === "negative" && "text-destructive",
                deltaType === "neutral" && "text-muted-foreground"
              )}
            >
              {deltaType === "positive" && <TrendingUp className="h-3 w-3" />}
              {deltaType === "negative" && <TrendingDown className="h-3 w-3" />}
              {delta}
            </span>
          )}
          {context && (
            <span className="text-[11px] text-muted-foreground/70">{context}</span>
          )}
        </div>
      </div>
    </Card>
  )
}

export function KPICards() {
  return (
    <div className="grid grid-cols-4 gap-3">
      <KPICard
        label="Portfolio Value"
        value="$847,234.56"
        delta="+$12,847"
        deltaType="positive"
        context="this month"
      />
      <KPICard
        label="Total Gain/Loss"
        value="+$127,892"
        delta="+17.8%"
        deltaType="positive"
        context="all time"
      />
      <KPICard
        label="Daily Change"
        value="-$3,422"
        delta="-0.40%"
        deltaType="negative"
        context="today"
      />
      <KPICard
        label="Total Return"
        value="+17.78%"
        delta="+2.3%"
        deltaType="positive"
        context="vs S&P 500"
      />
    </div>
  )
}
