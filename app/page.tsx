import { Sidebar } from "@/components/dashboard/sidebar"
import { PageHeader } from "@/components/dashboard/page-header"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

export default function DashboardPage() {
  return <div className="flex min-h-screen flex-col bg-background min-[900px]:flex-row"><Sidebar /><main className="min-w-0 flex-1 overflow-auto"><div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 xl:px-10"><PageHeader /><div className="mt-5"><DashboardOverview /></div></div></main></div>
}
