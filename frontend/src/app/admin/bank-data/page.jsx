"use client";

import { useState } from "react";
import { Sidebar } from "../../components/sidebar";
import FlexibleTable from "../../components/FlexibleTable";

export default function BankData() {
  const [bankData, setBankData] = useState([
    { "Sl No": "1", "Name": "State Bank of India", "IFSC": "SBIN0001234", "Action": "Delete" },
    { "Sl No": "2", "Name": "HDFC Bank", "IFSC": "HDFC0000123", "Action": "Delete" },
    { "Sl No": "3", "Name": "ICICI Bank", "IFSC": "ICIC0000456", "Action": "Delete" },
    { "Sl No": "4", "Name": "Axis Bank", "IFSC": "UTIB0000789", "Action": "Delete" },
    { "Sl No": "5", "Name": "Punjab National Bank", "IFSC": "PUNB0001011", "Action": "Delete" },
    { "Sl No": "6", "Name": "Bank of Baroda", "IFSC": "BARB0001213", "Action": "Delete" },
    { "Sl No": "7", "Name": "Canara Bank", "IFSC": "CNRB0001415", "Action": "Delete" },
    { "Sl No": "8", "Name": "Union Bank of India", "IFSC": "UBIN0001617", "Action": "Delete" },
    { "Sl No": "9", "Name": "Indian Bank", "IFSC": "IDIB0001819", "Action": "Delete" },
    { "Sl No": "10", "Name": "Bank of India", "IFSC": "BKID0002021", "Action": "Delete" },
    { "Sl No": "11", "Name": "Central Bank of India", "IFSC": "CBIN0002223", "Action": "Delete" },
    { "Sl No": "12", "Name": "Indian Overseas Bank", "IFSC": "IOBA0002425", "Action": "Delete" },
    { "Sl No": "13", "Name": "UCO Bank", "IFSC": "UCBA0002627", "Action": "Delete" },
    { "Sl No": "14", "Name": "Bank of Maharashtra", "IFSC": "MAHB0002829", "Action": "Delete" },
    { "Sl No": "15", "Name": "Punjab & Sind Bank", "IFSC": "PSIB0003031", "Action": "Delete" }
  ]);

  const handleDelete = (index) => {
    const updatedData = bankData.filter((_, i) => i !== index);
    // Re-number the entries
    const reNumberedData = updatedData.map((item, i) => ({
      ...item,
      "Sl No": (i + 1).toString()
    }));
    setBankData(reNumberedData);
  };

  const columns = ["Sl No", "Name", "IFSC", "Action"];

  // Enhanced data with actual delete buttons
  const enhancedData = bankData.map((item, index) => ({
    ...item,
    "Action": (
      <button
        onClick={() => handleDelete(index)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
      >
        Delete
      </button>
    )
  }));

  const handleCreate = () => {
    console.log("Create new bank data clicked");
  };

  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="admin" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header with Create Button */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Bank Data</h1>
            <button 
              onClick={handleCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create
            </button>
          </div>
          
          {/* Bank Data Table */}
          <FlexibleTable 
            heading="Bank Data" 
            columns={columns} 
            data={enhancedData} 
          />
        </div>
      </div>
    </div>
  );
}
