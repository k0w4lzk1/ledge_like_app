"use client";

import { Sidebar } from "../../components/sidebar";
import { DashboardCard } from "../../components/DashboardCard";
import FlexibleTable from "../../components/FlexibleTable";

export default function UserDashboard() {
  // Sample data for dashboard cards
  const dashboardData = [
    {
      title: "Todays Address Book",
      value: "245"
    },
    {
      title: "Todays Transaction Amount",
      value: "₹ 1,25,750"
    },
    {
      title: "Todays Refund Amount",
      value: "₹ 8,200"
    },
    {
      title: "Todays Refund Address Book Count",
      value: "12"
    },
    {
      title: "Todays Successful Transaction Amount",
      value: "₹ 1,17,550"
    },
    {
      title: "Todays Successful Transaction Count",
      value: "187"
    },
    {
      title: "Month Transaction Amount",
      value: "₹ 45,25,450"
    }
  ];

  // Sample table data for transactions
  const transactionColumns = ["Transaction ID", "Amount", "Type", "Status", "Date", "Actions"];
  const transactionData = [
    { "Transaction ID": "TXN001", "Amount": "₹ 2,500", "Type": "Credit", "Status": "Success", "Date": "10/08/2025", "Actions": "View" },
    { "Transaction ID": "TXN002", "Amount": "₹ 1,200", "Type": "Debit", "Status": "Success", "Date": "10/08/2025", "Actions": "View" },
    { "Transaction ID": "TXN003", "Amount": "₹ 5,000", "Type": "Credit", "Status": "Pending", "Date": "09/08/2025", "Actions": "View" },
    { "Transaction ID": "TXN004", "Amount": "₹ 800", "Type": "Debit", "Status": "Failed", "Date": "09/08/2025", "Actions": "Retry" },
    { "Transaction ID": "TXN005", "Amount": "₹ 3,200", "Type": "Credit", "Status": "Success", "Date": "08/08/2025", "Actions": "View" },
    { "Transaction ID": "TXN006", "Amount": "₹ 1,500", "Type": "Debit", "Status": "Success", "Date": "08/08/2025", "Actions": "View" },
    { "Transaction ID": "TXN007", "Amount": "₹ 2,800", "Type": "Credit", "Status": "Success", "Date": "07/08/2025", "Actions": "View" },
  ];

  // Sample data for balance requests
  const balanceColumns = ["Request ID", "Requested Amount", "Current Balance", "Status", "Date"];
  const balanceData = [
    { "Request ID": "REQ001", "Requested Amount": "₹ 10,000", "Current Balance": "₹ 25,000", "Status": "Approved", "Date": "10/08/2025" },
    { "Request ID": "REQ002", "Requested Amount": "₹ 5,000", "Current Balance": "₹ 15,000", "Status": "Pending", "Date": "09/08/2025" },
    { "Request ID": "REQ003", "Requested Amount": "₹ 8,000", "Current Balance": "₹ 10,000", "Status": "Rejected", "Date": "08/08/2025" },
    { "Request ID": "REQ004", "Requested Amount": "₹ 3,000", "Current Balance": "₹ 2,000", "Status": "Approved", "Date": "07/08/2025" },
    { "Request ID": "REQ005", "Requested Amount": "₹ 12,000", "Current Balance": "₹ 14,000", "Status": "Pending", "Date": "06/08/2025" },
  ];

  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="user" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          {/* Dashboard Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {dashboardData.map((item, index) => (
              <DashboardCard
                key={index}
                title={item.title}
                value={item.value}
              />
            ))}
          </div>

          {/* Recent Transactions Table */}
          <div className="mb-8">
            <FlexibleTable 
              heading="Recent Transactions" 
              columns={transactionColumns} 
              data={transactionData} 
            />
          </div>

          {/* Balance Requests Table */}
          <div className="mb-8">
            <FlexibleTable 
              heading="Balance Requests" 
              columns={balanceColumns} 
              data={balanceData} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
