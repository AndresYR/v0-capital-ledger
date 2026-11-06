export type Holding = {
  ticker: string
  name: string
  value: number
  cost: number
  broker: string
  color: string
}

export const holdings: Holding[] = [
  { ticker: "VOO", name: "Vanguard S&P 500 ETF", value: 20000, cost: 18000, broker: "Vanguard", color: "#60A5FA" },
  { ticker: "AAPL", name: "Apple Inc.", value: 12000, cost: 10000, broker: "Interactive Brokers", color: "#4FD16F" },
  { ticker: "MSFT", name: "Microsoft Corp.", value: 9600, cost: 10200, broker: "Fidelity", color: "#C084FC" },
  { ticker: "GLD", name: "SPDR Gold Shares", value: 6800, cost: 5800, broker: "Interactive Brokers", color: "#F0B45B" },
]

export const evolutionData = [
  { month: "Jan", value: 41200 }, { month: "Feb", value: 42500 }, { month: "Mar", value: 41800 },
  { month: "Apr", value: 43100 }, { month: "May", value: 43900 }, { month: "Jun", value: 44600 },
  { month: "Jul", value: 45200 }, { month: "Aug", value: 46100 }, { month: "Sep", value: 47200 },
  { month: "Oct", value: 46800 }, { month: "Nov", value: 47900 }, { month: "Dec", value: 48400 },
]

export const activity = [
  { type: "BUY", ticker: "AAPL", date: "Jun 18, 2024", quantity: "12 shares", amount: 2148.36 },
  { type: "SELL", ticker: "MSFT", date: "Jun 14, 2024", quantity: "8 shares", amount: 3372.80 },
  { type: "BUY", ticker: "VOO", date: "Jun 03, 2024", quantity: "5 shares", amount: 2487.15 },
]

export const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0)
export const totalCost = holdings.reduce((sum, holding) => sum + holding.cost, 0)
export const unrealizedPnl = totalValue - totalCost
export const realizedPnl = 1240
export const realizedCostBasis = 12400
