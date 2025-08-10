"use client";

import { useState } from "react";
import { Sidebar } from "../../components/sidebar";
import FlexibleTable from "../../components/FlexibleTable";

export default function AdminTodayPayout() {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample payout data
  const payoutData = [
    {
      "Sl No": "1",
      "Date": "11/08/2025",
      "Bank Name": "State Bank of India",
      "Account Number": "1234567890",
      "Account Holder Name": "John Doe",
      "IFSC Code": "SBIN0001234",
      "Amount": "₹ 15,000",
      "Unique Code": "TXN001",
      "Transaction Type": "Credit",
      "Remark": "Salary Transfer",
      "Username": "john.doe",
      "Action": "Succeeded"
    },
    {
      "Sl No": "2", 
      "Date": "11/08/2025",
      "Bank Name": "HDFC Bank",
      "Account Number": "9876543210",
      "Account Holder Name": "Jane Smith",
      "IFSC Code": "HDFC0000123",
      "Amount": "₹ 25,000",
      "Unique Code": "TXN002",
      "Transaction Type": "Credit",
      "Remark": "Bonus Payment",
      "Username": "jane.smith",
      "Action": "Succeeded"
    },
    {
      "Sl No": "3",
      "Date": "11/08/2025", 
      "Bank Name": "ICICI Bank",
      "Account Number": "5555666677",
      "Account Holder Name": "Mike Johnson",
      "IFSC Code": "ICIC0000456",
      "Amount": "₹ 8,500",
      "Unique Code": "TXN003",
      "Transaction Type": "Debit",
      "Remark": "Refund Processing",
      "Username": "mike.johnson",
      "Action": "Succeeded"
    },
    {
      "Sl No": "4",
      "Date": "11/08/2025",
      "Bank Name": "Axis Bank", 
      "Account Number": "1111222233",
      "Account Holder Name": "Sarah Wilson",
      "IFSC Code": "UTIB0000789",
      "Amount": "₹ 12,000",
      "Unique Code": "TXN004",
      "Transaction Type": "Credit",
      "Remark": "Commission Payment",
      "Username": "sarah.wilson",
      "Action": "Succeeded"
    },
    {
      "Sl No": "5",
      "Date": "11/08/2025",
      "Bank Name": "Punjab National Bank",
      "Account Number": "7777888899",
      "Account Holder Name": "David Brown",
      "IFSC Code": "PUNB0001011", 
      "Amount": "₹ 18,750",
      "Unique Code": "TXN005",
      "Transaction Type": "Credit",
      "Remark": "Performance Bonus",
      "Username": "david.brown",
      "Action": "Succeeded"
    },
    {
      "Sl No": "6",
      "Date": "11/08/2025",
      "Bank Name": "Bank of Baroda",
      "Account Number": "4444555566",
      "Account Holder Name": "Lisa Davis",
      "IFSC Code": "BARB0001213",
      "Amount": "₹ 9,200",
      "Unique Code": "TXN006", 
      "Transaction Type": "Credit",
      "Remark": "Overtime Payment",
      "Username": "lisa.davis",
      "Action": "Succeeded"
    },
    {
      "Sl No": "7",
      "Date": "11/08/2025",
      "Bank Name": "Canara Bank",
      "Account Number": "2222333344",
      "Account Holder Name": "Robert Miller",
      "IFSC Code": "CNRB0001415",
      "Amount": "₹ 22,500",
      "Unique Code": "TXN007",
      "Transaction Type": "Credit", 
      "Remark": "Project Completion",
      "Username": "robert.miller",
      "Action": "Succeeded"
    },
    {
      "Sl No": "8",
      "Date": "11/08/2025",
      "Bank Name": "Union Bank",
      "Account Number": "8888999900",
      "Account Holder Name": "Emily Taylor",
      "IFSC Code": "UBIN0001617",
      "Amount": "₹ 14,300",
      "Unique Code": "TXN008",
      "Transaction Type": "Credit",
      "Remark": "Monthly Allowance", 
      "Username": "emily.taylor",
      "Action": "Succeeded"
    }
  ];

  // Filter data based on search term
  const filteredData = payoutData.filter(item => 
    Object.values(item).some(value => 
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Enhanced data with status badges
  const enhancedData = filteredData.map(item => ({
    ...item,
    "Action": (
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
        {item.Action}
      </span>
    )
  }));

  const columns = [
    "Sl No", "Date", "Bank Name", "Account Number", "Account Holder Name", 
    "IFSC Code", "Amount", "Unique Code", "Transaction Type", "Remark", 
    "Username", "Action"
  ];

  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="admin" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Today Payout</h1>
          
          {/* Search Bar */}
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search by any field..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
              <span className="text-sm text-gray-500">
                {filteredData.length} results
              </span>
            </div>
          </div>
          
          {/* Payout Table */}
          <FlexibleTable 
            heading="Payout Transactions" 
            columns={columns} 
            data={enhancedData} 
          />
        </div>
      </div>
    </div>
  );
}
