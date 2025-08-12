"use client";

import { Sidebar } from "../../components/sidebar";
import FlexibleTable from "../../components/FlexibleTable";

export default function AdminBalanceRequest() {
  const columns = ["SL No", "Username", "Amount", "Status", "Created Date", "Action"];
  const emptyData = []; // Empty table as requested
  const todaysAcceptAmount = "₹0"; // Sample data

  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="admin" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header with Accept Amount Display */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Balance Request</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-3">
              <p className="text-lg font-semibold text-blue-800">
                Todays Accept Bank Request Amount: <span className="text-blue-900">{todaysAcceptAmount}</span>
              </p>
            </div>
          </div>
          
          {/* Balance Request Table */}
          <FlexibleTable 
            heading="Balance Requests"
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
