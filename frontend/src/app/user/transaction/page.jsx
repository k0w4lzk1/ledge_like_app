"use client";

import { Sidebar } from "../../components/sidebar";
import FlexibleTable from "../../components/FlexibleTable";

export default function UserTransaction() {
  const columns = ["SL No"];
  const sampleData = [
    { "SL No": "1" },
    { "SL No": "2" },
    { "SL No": "3" },
    { "SL No": "4" },
    { "SL No": "5" },
  ];

  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="user" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Transaction List</h1>
          </div>
          
          {/* Table */}
          <FlexibleTable 
            heading="Transactions"
            columns={columns}
            data={sampleData}
            showSearch={true}
            showEntriesSelector={true}
          />
        </div>
      </div>
    </div>
  );
}
