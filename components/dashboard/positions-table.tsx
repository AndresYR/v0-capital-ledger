"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
      { id: "t1", date: "2024-01-15", type: "Buy", quantity: 50, price: 145.20, fees: 4.99, total: 7264.99 },
      { id: "t2", date: "2024-02-20", type: "Buy", quantity: 100, price: 141.15, fees: 4.99, total: 14119.99 },
      { id: "t3", date: "2024-03-15", type: "Dividend", quantity: 150, price: 0.24, fees: 0, total: 36.00 },
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
      { id: "t4", date: "2023-11-10", type: "Buy", quantity: 50, price: 345.00, fees: 4.99, total: 17254.99 },
      { id: "t5", date: "2024-01-05", type: "Buy", quantity: 35, price: 328.50, fees: 4.99, total: 11502.49 },
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
      { id: "t6", date: "2023-08-20", type: "Buy", quantity: 100, price: 420.50, fees: 4.99, total: 42054.99 },
      { id: "t7", date: "2023-12-15", type: "Buy", quantity: 100, price: 550.10, fees: 4.99, total: 55014.99 },
      { id: "t8", date: "2024-02-15", type: "Dividend", quantity: 200, price: 0.04, fees: 0, total: 8.00 },
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
      { id: "t9", date: "2024-01-20", type: "Buy", quantity: 120, price: 138.75, fees: 4.99, total: 16654.99 },
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
      { id: "t10", date: "2023-10-05", type: "Buy", quantity: 50, price: 260.40, fees: 4.99, total: 13024.99 },
      { id: "t11", date: "2023-12-20", type: "Buy", quantity: 25, price: 225.00, fees: 4.99, total: 5629.99 },
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
      { id: "t12", date: "2023-06-15", type: "Buy", quantity: 200, price: 210.30, fees: 0, total: 42060.00 },
      { id: "t13", date: "2023-09-10", type: "Buy", quantity: 150, price: 220.50, fees: 0, total: 33075.00 },
      { id: "t14", date: "2024-02-01", type: "Buy", quantity: 100, price: 228.40, fees: 0, total: 22840.00 },
      { id: "t15", date: "2024-03-20", type: "Dividend", quantity: 450, price: 0.82, fees: 0, total: 369.00 },
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
        "font-medium text-xs",
        type === "Buy" && "border-chart-1/50 bg-chart-1/10 text-chart-1",
        type === "Sell" && "border-destructive/50 bg-destructive/10 text-destructive",
        type === "Dividend" && "border-success/50 bg-success/10 text-success"
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
        className="cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <TableCell className="w-10 pr-0">
          <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-muted">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </TableCell>
        <TableCell className="font-medium">
          <div className="flex flex-col">
            <span className="text-foreground font-semibold">{position.ticker}</span>
            <span className="text-xs text-muted-foreground">{position.name}</span>
          </div>
        </TableCell>
        <TableCell className="text-right font-mono tabular-nums">
          {position.shares.toLocaleString()}
        </TableCell>
        <TableCell className="text-right font-mono tabular-nums">
          {formatCurrency(position.avgPrice)}
        </TableCell>
        <TableCell className="text-right font-mono tabular-nums">
          {formatCurrency(position.currentPrice)}
        </TableCell>
        <TableCell className="text-right font-mono tabular-nums font-medium">
          {formatCurrency(position.marketValue)}
        </TableCell>
        <TableCell
          className={cn(
            "text-right font-mono tabular-nums font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}
        >
          {formatPercent(position.returnPercent)}
        </TableCell>
        <TableCell
          className={cn(
            "text-right font-mono tabular-nums font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}
        >
          {isPositive ? "+" : ""}
          {formatCurrency(position.profitLoss)}
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={8} className="p-0">
            <div className="bg-muted/20 border-t border-b border-border/50 px-6 py-4">
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                Transaction History
              </h4>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/30">
                    <TableHead className="text-xs text-muted-foreground h-8">Date</TableHead>
                    <TableHead className="text-xs text-muted-foreground h-8">Type</TableHead>
                    <TableHead className="text-xs text-muted-foreground h-8 text-right">Quantity</TableHead>
                    <TableHead className="text-xs text-muted-foreground h-8 text-right">Price</TableHead>
                    <TableHead className="text-xs text-muted-foreground h-8 text-right">Fees</TableHead>
                    <TableHead className="text-xs text-muted-foreground h-8 text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {position.transactions.map((tx) => (
                    <TableRow key={tx.id} className="hover:bg-muted/20 border-border/30">
                      <TableCell className="font-mono text-sm tabular-nums py-2.5">
                        {tx.date}
                      </TableCell>
                      <TableCell className="py-2.5">
                        <TransactionTypeBadge type={tx.type} />
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm tabular-nums py-2.5">
                        {tx.quantity.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm tabular-nums py-2.5">
                        {formatCurrency(tx.price)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm tabular-nums py-2.5">
                        {formatCurrency(tx.fees)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm tabular-nums font-medium py-2.5">
                        {formatCurrency(tx.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TableCell>
        </TableRow>
      )}
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
    <Card className="border-border/50 bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-medium text-foreground">
          Positions
        </CardTitle>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search positions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-muted/30 border-border/50 text-sm placeholder:text-muted-foreground focus-visible:ring-ring/30"
          />
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="w-10" />
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Ticker
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">
                Shares
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">
                Avg Price
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">
                Current Price
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">
                Market Value
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">
                Return %
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-right pr-6">
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
