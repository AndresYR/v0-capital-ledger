"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Activity, ArrowLeftRight, BarChart3, BriefcaseBusiness, FileText, LayoutDashboard, LogOut, Menu, Plus, Settings, X } from "lucide-react"
import { TransactionDrawer } from "./transaction-drawer"

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Portfolio", icon: BriefcaseBusiness },
  { name: "Transactions", icon: ArrowLeftRight },
  { name: "Analytics", icon: BarChart3, disabled: true },
  { name: "Reports", icon: FileText, disabled: true },
  { name: "Settings", icon: Settings },
]

function SidebarContent({ onNewTransaction }: { onNewTransaction: () => void }) {
  return <div className="flex h-full flex-col">
    <div className="flex h-16 items-center gap-2.5 px-5"><div className="flex size-7 items-center justify-center rounded-md bg-foreground text-background"><Activity className="size-4" /></div><div><div className="text-[13px] font-semibold tracking-tight">Capital Ledger</div><div className="text-[10px] text-muted-foreground">Personal investing</div></div></div>
    <div className="px-3 pb-4 pt-2"><button onClick={onNewTransaction} className="flex w-full items-center gap-2 rounded-md bg-foreground px-3 py-2.5 text-[12px] font-medium text-background transition-opacity hover:opacity-90"><Plus className="size-4" />New transaction</button></div>
    <nav className="flex-1 px-3" aria-label="Primary navigation"><div className="mb-3 px-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/70">Workspace</div><div className="flex flex-col gap-1">{navigation.map((item) => { const Icon = item.icon; return <a key={item.name} href="#" aria-disabled={item.disabled} className={cn("flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] transition-colors", item.active ? "bg-sidebar-accent text-foreground" : item.disabled ? "cursor-not-allowed text-muted-foreground/40" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground")}><Icon className="size-4" />{item.name}{item.disabled && <span className="ml-auto text-[9px] uppercase tracking-wider">Soon</span>}</a> })}</div></nav>
    <div className="border-t border-sidebar-border p-3"><div className="flex items-center gap-2.5 rounded-md px-2 py-2"><div className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent text-[11px] font-medium">AR</div><div className="min-w-0 flex-1"><div className="truncate text-[12px] font-medium">Alex Rivera</div><div className="truncate text-[10px] text-muted-foreground">Sample account</div></div><a href="/login" aria-label="Log out" className="text-muted-foreground transition-colors hover:text-foreground"><LogOut className="size-4" /></a></div></div>
  </div>
}

export function Sidebar() {
  const [open, setOpen] = React.useState(false)
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  return <><aside className="hidden h-screen w-[232px] shrink-0 border-r border-sidebar-border bg-sidebar min-[900px]:block"><SidebarContent onNewTransaction={() => setDrawerOpen(true)} /></aside><div className="flex h-14 items-center justify-between border-b border-border/60 bg-sidebar px-4 min-[900px]:hidden"><div className="flex items-center gap-2"><div className="flex size-6 items-center justify-center rounded bg-foreground text-background"><Activity className="size-3.5" /></div><span className="text-[13px] font-semibold">Capital Ledger</span></div><button onClick={() => setOpen(!open)} aria-label="Open navigation" className="text-muted-foreground hover:text-foreground">{open ? <X className="size-5" /> : <Menu className="size-5" />}</button></div>{open && <div className="fixed inset-x-0 top-14 z-40 h-[calc(100vh-3.5rem)] border-b border-border bg-sidebar min-[900px]:hidden"><SidebarContent onNewTransaction={() => setDrawerOpen(true)} /></div>}<TransactionDrawer open={drawerOpen} onOpenChange={setDrawerOpen} /></>
}
