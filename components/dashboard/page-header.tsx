import { Button } from "@/components/ui/button"
import { Download, RefreshCw, Plus } from "lucide-react"

export function PageHeader() {
  return (
    <header className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Portfolio
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track positions, performance, and transaction history
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <RefreshCw className="mr-2 h-4 w-4" />
          Rebalance
        </Button>
        <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>
    </header>
  )
}
