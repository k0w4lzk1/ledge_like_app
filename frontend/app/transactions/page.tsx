import { DashboardLayout } from "@/components/dashboard-layout"
import { TransactionManagement } from "@/components/transaction-management"

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <TransactionManagement />
    </DashboardLayout>
  )
}
