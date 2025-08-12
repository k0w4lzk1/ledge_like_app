"use client";

import { Sidebar } from "../../components/sidebar";
import FlexibleTable from "../../components/FlexibleTable";

export default function AdminTransactions() {
  const columns = ["SL No", "Username", "Action", "Current Balance", "Amount", "Credit In", "Debit Out"];
  const emptyData = []; // Empty table as requested

  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="admin" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Transactions</h1>
          
          {/* Transactions Table */}
          <FlexibleTable 
            heading="All Transactions"
            columns={columns}
            data={emptyData}
            showSearch={true}
            showEntriesSelector={true}
          />
        </div>
      </div>
    </div>
  );
}
