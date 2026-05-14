"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Briefcase,
  ArrowLeftRight,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Plus,
} from "lucide-react"
import { TransactionDrawer } from "./transaction-drawer"

const navigation = [
  { name: "Dashboard", href: "#", icon: LayoutDashboard },
  { name: "Portfolio", href: "#", icon: Briefcase, active: true },
  { name: "Transactions", href: "#", icon: ArrowLeftRight },
  { name: "Analytics", href: "#", icon: BarChart3 },
  { name: "Reports", href: "#", icon: FileText },
  { name: "Settings", href: "#", icon: Settings },
]

export function Sidebar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  return (
    <>
      <aside className="flex h-screen w-60 flex-col bg-sidebar border-r border-sidebar-border">
        {/* Logo - more distinctive branding */}
        <div className="flex h-14 items-center gap-2.5 px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-background"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path d="M3 17L9 11L13 15L21 7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 7H21V11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-foreground tracking-tight">
            Capital Ledger
          </span>
        </div>

        {/* Add Transaction CTA */}
        <div className="px-3 pt-2 pb-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-3 py-2 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90"
          >
            <Plus className="h-4 w-4" />
            Add transaction
          </button>
        </div>

        {/* Navigation with refined spacing */}
        <nav className="flex-1 px-3">
          <div className="space-y-0.5">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors",
                    item.active
                      ? "bg-sidebar-accent text-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                  )}
                >
                  <Icon className={cn(
                    "h-4 w-4 shrink-0",
                    item.active ? "text-foreground" : "text-muted-foreground"
                  )} />
                  {item.name}
                </a>
              )
            })}
          </div>
        </nav>

        {/* Profile block - more polished */}
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-sidebar-accent/50 transition-colors cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/80 text-xs font-medium text-foreground">
              JD
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[13px] font-medium text-foreground truncate">John Doe</span>
              <span className="text-[11px] text-muted-foreground">Premium</span>
            </div>
            <a
              href="/login"
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </a>
          </div>
        </div>
      </aside>

      <TransactionDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  )
}
