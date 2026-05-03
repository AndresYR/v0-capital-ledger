import { Button } from "@/components/ui/button"
import { Download, RefreshCw, Plus } from "lucide-react"

export function PageHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="space-y-0.5">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Portfolio
        </h1>
        <p className="text-[13px] text-muted-foreground">
          Positions, performance, and transaction history
        </p>
      </div>
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
        <Button 
          size="sm" 
          className="h-8 px-3 text-[13px] bg-foreground text-background hover:bg-foreground/90"
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Add Transaction
        </Button>
      </div>
    </header>
  )
}
