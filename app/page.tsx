import { Sidebar } from "@/components/dashboard/sidebar"
import { PageHeader } from "@/components/dashboard/page-header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { PositionsTable } from "@/components/dashboard/positions-table"

export default function PortfolioDashboard() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-[1600px] px-8 py-8">
          {/* Page Header */}
          <PageHeader />

          {/* KPI Summary Cards */}
          <div className="mt-8">
            <KPICards />
          </div>

          {/* Performance Chart */}
          <div className="mt-6">
            <PerformanceChart />
          </div>

          {/* Positions Table */}
          <div className="mt-6 pb-8">
            <PositionsTable />
          </div>
        </div>
      </main>
    </div>
  )
}
