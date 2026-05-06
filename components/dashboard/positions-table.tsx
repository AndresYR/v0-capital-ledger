"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface Transaction {
  id: string
  date: string
  type: "Buy" | "Sell" | "Dividend"
  quantity: number
  price: number
  currentPrice: number
  fees: number
  total: number
}

interface Position {
  id: string
  ticker: string
  name: string
  shares: number
  avgPrice: number
  currentPrice: number
  marketValue: number
  returnPercent: number
  profitLoss: number
  transactions: Transaction[]
}

const positions: Position[] = [
  {
    id: "1",
    ticker: "AAPL",
    name: "Apple Inc.",
    shares: 150,
    avgPrice: 142.50,
    currentPrice: 178.32,
    marketValue: 26748.00,
    returnPercent: 25.14,
    profitLoss: 5373.00,
    transactions: [
      { id: "t1", date: "2024-01-15", type: "Buy", quantity: 50, price: 145.20, currentPrice: 178.32, fees: 4.99, total: 7264.99 },
      { id: "t2", date: "2024-02-20", type: "Buy", quantity: 100, price: 141.15, currentPrice: 178.32, fees: 4.99, total: 14119.99 },
      { id: "t3", date: "2024-03-15", type: "Dividend", quantity: 150, price: 0.24, currentPrice: 178.32, fees: 0, total: 36.00 },
    ],
  },
  {
    id: "2",
    ticker: "MSFT",
    name: "Microsoft Corp.",
    shares: 85,
    avgPrice: 338.20,
    currentPrice: 415.50,
    marketValue: 35317.50,
    returnPercent: 22.86,
    profitLoss: 6570.50,
    transactions: [
      { id: "t4", date: "2023-11-10", type: "Buy", quantity: 50, price: 345.00, currentPrice: 415.50, fees: 4.99, total: 17254.99 },
      { id: "t5", date: "2024-01-05", type: "Buy", quantity: 35, price: 328.50, currentPrice: 415.50, fees: 4.99, total: 11502.49 },
    ],
  },
  {
    id: "3",
    ticker: "NVDA",
    name: "NVIDIA Corp.",
    shares: 200,
    avgPrice: 485.30,
    currentPrice: 875.28,
    marketValue: 175056.00,
    returnPercent: 80.35,
    profitLoss: 77996.00,
    transactions: [
      { id: "t6", date: "2023-08-20", type: "Buy", quantity: 100, price: 420.50, currentPrice: 875.28, fees: 4.99, total: 42054.99 },
      { id: "t7", date: "2023-12-15", type: "Buy", quantity: 100, price: 550.10, currentPrice: 875.28, fees: 4.99, total: 55014.99 },
      { id: "t8", date: "2024-02-15", type: "Dividend", quantity: 200, price: 0.04, currentPrice: 875.28, fees: 0, total: 8.00 },
    ],
  },
  {
    id: "4",
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    shares: 120,
    avgPrice: 138.75,
    currentPrice: 171.84,
    marketValue: 20620.80,
    returnPercent: 23.85,
    profitLoss: 3970.80,
    transactions: [
      { id: "t9", date: "2024-01-20", type: "Buy", quantity: 120, price: 138.75, currentPrice: 171.84, fees: 4.99, total: 16654.99 },
    ],
  },
  {
    id: "5",
    ticker: "TSLA",
    name: "Tesla Inc.",
    shares: 75,
    avgPrice: 248.60,
    currentPrice: 177.48,
    marketValue: 13311.00,
    returnPercent: -28.61,
    profitLoss: -5334.00,
    transactions: [
      { id: "t10", date: "2023-10-05", type: "Buy", quantity: 50, price: 260.40, currentPrice: 177.48, fees: 4.99, total: 13024.99 },
      { id: "t11", date: "2023-12-20", type: "Buy", quantity: 25, price: 225.00, currentPrice: 177.48, fees: 4.99, total: 5629.99 },
    ],
  },
  {
    id: "6",
    ticker: "VTI",
    name: "Vanguard Total Stock Market ETF",
    shares: 450,
    avgPrice: 218.45,
    currentPrice: 262.18,
    marketValue: 117981.00,
    returnPercent: 20.02,
    profitLoss: 19678.50,
    transactions: [
      { id: "t12", date: "2023-06-15", type: "Buy", quantity: 200, price: 210.30, currentPrice: 262.18, fees: 0, total: 42060.00 },
      { id: "t13", date: "2023-09-10", type: "Buy", quantity: 150, price: 220.50, currentPrice: 262.18, fees: 0, total: 33075.00 },
      { id: "t14", date: "2024-02-01", type: "Buy", quantity: 100, price: 228.40, currentPrice: 262.18, fees: 0, total: 22840.00 },
      { id: "t15", date: "2024-03-20", type: "Dividend", quantity: 450, price: 0.82, currentPrice: 262.18, fees: 0, total: 369.00 },
    ],
  },
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value)
}

function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}

function TransactionTypeBadge({ type }: { type: Transaction["type"] }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium text-[10px] px-1.5 py-0 h-5",
        type === "Buy" && "border-chart-1/40 bg-chart-1/10 text-chart-1",
        type === "Sell" && "border-destructive/40 bg-destructive/10 text-destructive",
        type === "Dividend" && "border-success/40 bg-success/10 text-success"
      )}
    >
      {type}
    </Badge>
  )
}

function PositionRow({ position }: { position: Position }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isPositive = position.profitLoss >= 0

  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-muted/20 transition-colors border-border/30"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <TableCell className="w-8 pl-3 pr-0">
          <div className="flex h-5 w-5 items-center justify-center">
            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </div>
        </TableCell>
        <TableCell className="py-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-semibold text-foreground tracking-tight">
              {position.ticker}
            </span>
            <span className="text-[11px] text-muted-foreground/70">{position.name}</span>
          </div>
        </TableCell>
        <TableCell className="text-right font-mono text-[13px] tabular-nums text-muted-foreground">
          {position.shares.toLocaleString()}
        </TableCell>
        <TableCell className="text-right font-mono text-[13px] tabular-nums text-muted-foreground">
          {formatCurrency(position.avgPrice)}
        </TableCell>
        <TableCell className="text-right font-mono text-[13px] tabular-nums text-muted-foreground">
          {formatCurrency(position.currentPrice)}
        </TableCell>
        <TableCell className="text-right font-mono text-[13px] tabular-nums font-medium text-foreground">
          {formatCurrency(position.marketValue)}
        </TableCell>
        <TableCell
          className={cn(
            "text-right font-mono text-[13px] tabular-nums font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}
        >
          {formatPercent(position.returnPercent)}
        </TableCell>
        <TableCell
          className={cn(
            "text-right font-mono text-[13px] tabular-nums font-medium pr-4",
            isPositive ? "text-success" : "text-destructive"
          )}
        >
          {isPositive ? "+" : ""}
          {formatCurrency(position.profitLoss)}
        </TableCell>
      </TableRow>
      {isExpanded &&
        position.transactions.map((tx, idx) => {
          const isLast = idx === position.transactions.length - 1
          return (
            <TableRow
              key={tx.id}
              className="hover:bg-muted/10 transition-colors border-none bg-muted/5"
            >
              <TableCell className="w-8 pl-3 pr-0 py-2">
                <div className="flex h-full items-center justify-center">
                  <span className="font-mono text-muted-foreground/50 text-[11px] select-none">
                    {isLast ? "└─" : "├─"}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[12px] tabular-nums text-muted-foreground">
                    {tx.date}
                  </span>
                  <TransactionTypeBadge type={tx.type} />
                </div>
              </TableCell>
              <TableCell className="text-right font-mono text-[12px] tabular-nums text-muted-foreground/80 py-2">
                {tx.type === "Dividend" ? "—" : tx.quantity.toLocaleString()}
              </TableCell>
              <TableCell className="text-right font-mono text-[12px] tabular-nums text-muted-foreground/80 py-2">
                {tx.type === "Dividend" ? `${formatCurrency(tx.price)}/sh` : formatCurrency(tx.price)}
              </TableCell>
              <TableCell className="text-right font-mono text-[12px] tabular-nums text-muted-foreground/80 py-2">
                {formatCurrency(tx.currentPrice)}
              </TableCell>
              <TableCell className="text-right font-mono text-[12px] tabular-nums text-muted-foreground/80 py-2">
                {tx.fees > 0 ? formatCurrency(tx.fees) : "—"}
              </TableCell>
              <TableCell className="text-right font-mono text-[12px] tabular-nums py-2">
                <span className={cn(
                  "font-medium",
                  tx.type === "Dividend" ? "text-success" : 
                  tx.type === "Sell" ? "text-destructive" : "text-foreground/80"
                )}>
                  {tx.type === "Sell" ? "-" : tx.type === "Dividend" ? "+" : ""}
                  {formatCurrency(tx.total)}
                </span>
              </TableCell>
              <TableCell className="pr-4 py-2" />
            </TableRow>
          )
        })}
    </>
  )
}

export function PositionsTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPositions = positions.filter(
    (p) =>
      p.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card className="border-border/40 bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-4">
        <h3 className="text-[13px] font-medium text-muted-foreground">
          Positions
          <span className="ml-2 text-foreground">{positions.length}</span>
        </h3>
        <div className="relative w-56">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search positions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 bg-muted/30 border-border/40 text-[12px] placeholder:text-muted-foreground/60 focus-visible:ring-ring/20"
          />
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-1">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/40">
              <TableHead className="w-8 pl-3" />
              <TableHead className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80">
                Ticker
              </TableHead>
              <TableHead className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80 text-right">
                Shares
              </TableHead>
              <TableHead className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80 text-right">
                Avg Price
              </TableHead>
              <TableHead className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80 text-right">
                Current
              </TableHead>
              <TableHead className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80 text-right">
                Market Value
              </TableHead>
              <TableHead className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80 text-right">
                Return
              </TableHead>
              <TableHead className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80 text-right pr-4">
                P/L
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPositions.map((position) => (
              <PositionRow key={position.id} position={position} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
