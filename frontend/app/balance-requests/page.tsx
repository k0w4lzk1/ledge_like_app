import { DashboardLayout } from "@/components/dashboard-layout"
import { BalanceRequestManagement } from "@/components/balance-request-management"

export default function BalanceRequestsPage() {
  return (
    <DashboardLayout>
      <BalanceRequestManagement />
    </DashboardLayout>
  )
}
