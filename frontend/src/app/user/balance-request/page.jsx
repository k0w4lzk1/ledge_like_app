"use client";

import { Sidebar } from "../../components/sidebar";
import FlexibleTable from "../../components/FlexibleTable";

export default function UserBalanceRequest() {
  const columns = ["SL No"];
  const sampleData = [
    { "SL No": "1" },
    { "SL No": "2" },
    { "SL No": "3" },
    { "SL No": "4" },
    { "SL No": "5" },
  ];

  const handleAddNew = () => {
    console.log("Add new balance request clicked");
  };

  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="user" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header with Add New Button */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Balance Request</h1>
            <button 
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add New
            </button>
          </div>
          
          {/* Table */}
          <FlexibleTable 
            heading="Balance Requests"
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
