import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  label: string
  value: string
  delta?: string
  deltaType?: "positive" | "negative" | "neutral"
  subtitle?: string
  icon: React.ReactNode
}

function KPICard({ label, value, delta, deltaType = "neutral", subtitle, icon }: KPICardProps) {
  return (
    <Card className="relative overflow-hidden border-border/50 bg-card p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">
            {value}
          </p>
          {(delta || subtitle) && (
            <div className="flex items-center gap-2">
              {delta && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium tabular-nums",
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
              {subtitle && (
                <span className="text-xs text-muted-foreground">{subtitle}</span>
              )}
            </div>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground">
          {icon}
        </div>
      </div>
    </Card>
  )
}

export function KPICards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <KPICard
        label="Total Portfolio Value"
        value="$847,234.56"
        delta="+$12,847.32"
        deltaType="positive"
        subtitle="from last month"
        icon={<DollarSign className="h-5 w-5" />}
      />
      <KPICard
        label="Total Gain / Loss"
        value="+$127,892.18"
        delta="+17.8%"
        deltaType="positive"
        subtitle="all time"
        icon={<TrendingUp className="h-5 w-5" />}
      />
      <KPICard
        label="Daily Change"
        value="-$3,421.67"
        delta="-0.40%"
        deltaType="negative"
        subtitle="today"
        icon={<TrendingDown className="h-5 w-5" />}
      />
      <KPICard
        label="Total Return"
        value="+17.78%"
        delta="+2.3%"
        deltaType="positive"
        subtitle="vs S&P 500"
        icon={<Percent className="h-5 w-5" />}
      />
    </div>
  )
}
