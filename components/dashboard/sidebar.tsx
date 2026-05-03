"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Briefcase,
  ArrowLeftRight,
  BarChart3,
  FileText,
  Settings,
  TrendingUp,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "#", icon: LayoutDashboard },
  { name: "Portfolio", href: "#", icon: Briefcase, active: true },
  { name: "Transactions", href: "#", icon: ArrowLeftRight },
  { name: "Analytics", href: "#", icon: BarChart3 },
  { name: "Reports", href: "#", icon: FileText },
  { name: "Settings", href: "#", icon: Settings },
]

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 px-6 border-b border-sidebar-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
          <TrendingUp className="h-4 w-4 text-background" />
        </div>
        <span className="text-base font-semibold text-foreground tracking-tight">
          Capital Ledger
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    item.active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.name}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">John Doe</span>
            <span className="text-xs text-muted-foreground">Premium</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
