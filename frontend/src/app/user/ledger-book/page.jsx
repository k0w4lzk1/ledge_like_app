"use client";

import { Sidebar } from "../../components/sidebar";
import FlexibleTable from "../../components/FlexibleTable";

export default function UserLedgerBook() {
  const columns = ["Date", "Description", "Amount", "Status"];
  const emptyData = []; // No data to show empty table

  const handleAddNew = () => {
    console.log("Add new clicked");
  };

  const handleDownloadExcel = () => {
    console.log("Download Excel clicked");
  };

  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="user" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header with Action Buttons */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Ledger Book</h1>
            <div className="flex gap-3">
              <button 
                onClick={handleAddNew}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add New
              </button>
              <button 
                onClick={handleDownloadExcel}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Excel
              </button>
            </div>
          </div>
          
          {/* Table */}
          <FlexibleTable 
            heading="Ledger Entries"
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
