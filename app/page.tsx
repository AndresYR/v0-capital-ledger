import { Sidebar } from "@/components/dashboard/sidebar"
import { PageHeader } from "@/components/dashboard/page-header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { PositionsTable } from "@/components/dashboard/positions-table"

export default function PortfolioDashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-[1400px] px-6 py-5">
          <PageHeader />

          <div className="mt-5">
            <KPICards />
          </div>

          <div className="mt-4">
            <PerformanceChart />
          </div>

          <div className="mt-4 pb-6">
            <PositionsTable />
          </div>
        </div>
      </main>
    </div>
  )
}
