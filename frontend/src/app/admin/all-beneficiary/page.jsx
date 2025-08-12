"use client";

import { Sidebar } from "../../components/sidebar";
import FlexibleTable from "../../components/FlexibleTable";
import { useState } from "react";

export default function AllBeneficiary() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Sample beneficiary data
  const beneficiaryData = [
    {
      "SL No": "1",
      "Date": "11/08/2025",
      "Username": "john.doe",
      "Bank Name": "State Bank of India",
      "Account Number": "1234567890",
      "Account Holder": "John Doe",
      "IFSC Code": "SBIN0001234",
      "Amount": "₹15,000",
      "Charge": "₹50",
      "SGST": "₹9",
      "CGST": "₹9",
      "Total": "₹15,068",
      "Unique Code": "TXN001",
      "Transaction Type": "IMPS",
      "Remark": "Salary Transfer",
      "Action": "Succeeded"
    },
    {
      "SL No": "2",
      "Date": "11/08/2025",
      "Username": "jane.smith",
      "Bank Name": "HDFC Bank",
      "Account Number": "9876543210",
      "Account Holder": "Jane Smith",
      "IFSC Code": "HDFC0000123",
      "Amount": "₹25,000",
      "Charge": "₹75",
      "SGST": "₹13.5",
      "CGST": "₹13.5",
      "Total": "₹25,102",
      "Unique Code": "TXN002",
      "Transaction Type": "NEFT",
      "Remark": "Bonus Payment",
      "Action": "Succeeded"
    }
  ];

  const columns = [
    "Select",
    "SL No", 
    "Date", 
    "Username", 
    "Bank Name", 
    "Account Number", 
    "Account Holder", 
    "IFSC Code", 
    "Amount", 
    "Charge", 
    "SGST", 
    "CGST", 
    "Total", 
    "Unique Code", 
    "Transaction Type", 
    "Remark", 
    "Action"
  ];

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleApply = () => {
    console.log("Applied filter with status:", selectedStatus);
  };

  const handleDownloadExcel = () => {
    console.log("Download Excel clicked");
  };

  const handleRowSelect = (index, isSelected) => {
    const newSelected = new Set(selectedRows);
    if (isSelected) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedRows(new Set(beneficiaryData.map((_, index) => index)));
    } else {
      setSelectedRows(new Set());
    }
  };

  // Enhanced data with checkboxes and action buttons
  const enhancedData = beneficiaryData.map((item, index) => ({
    ...item,
    "Select": (
      <input
        type="checkbox"
        checked={selectedRows.has(index)}
        onChange={(e) => handleRowSelect(index, e.target.checked)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
    ),
    "Action": (
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
        Succeeded
      </span>
    )
  }));

  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="admin" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header with Download Excel Button */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Beneficiary</h1>
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

          {/* Status Filter */}
          <div className="flex items-center gap-4 mb-6">
            <select 
              value={selectedStatus}
              onChange={handleStatusChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              <option value="succeeded">Succeeded</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <button 
              onClick={handleApply}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Apply
            </button>
          </div>

          {/* Select All Checkbox */}
          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedRows.size === beneficiaryData.length && beneficiaryData.length > 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Select All</span>
            </label>
          </div>
          
          {/* Beneficiary Table */}
          <FlexibleTable 
            heading="All Beneficiaries"
            columns={columns}
            data={enhancedData}
            showSearch={true}
            showEntriesSelector={true}
          />
        </div>
      </div>
    </div>
  );
}
