"use client";

import { useState } from "react";
import { Sidebar } from "../../components/sidebar";
import FlexibleTable from "../../components/FlexibleTable";

export default function AdminLedgerBook() {
  const [ledgerData, setLedgerData] = useState([
    {
      "Sl No": "1",
      "Name": "John Doe",
      "Email": "john.doe@example.com",
      "Today Total Transaction": "15",
      "Today Successful Transaction": "12",
      "Balance": "₹ 45,250",
      "Action": "Delete"
    },
    {
      "Sl No": "2", 
      "Name": "Jane Smith",
      "Email": "jane.smith@example.com",
      "Today Total Transaction": "8",
      "Today Successful Transaction": "7",
      "Balance": "₹ 28,750",
      "Action": "Delete"
    },
    {
      "Sl No": "3",
      "Name": "Mike Johnson", 
      "Email": "mike.johnson@example.com",
      "Today Total Transaction": "22",
      "Today Successful Transaction": "18",
      "Balance": "₹ 62,500",
      "Action": "Delete"
    },
    {
      "Sl No": "4",
      "Name": "Sarah Wilson",
      "Email": "sarah.wilson@example.com",
      "Today Total Transaction": "12",
      "Today Successful Transaction": "11",
      "Balance": "₹ 35,800",
      "Action": "Delete"
    },
    {
      "Sl No": "5",
      "Name": "David Brown",
      "Email": "david.brown@example.com", 
      "Today Total Transaction": "19",
      "Today Successful Transaction": "16",
      "Balance": "₹ 52,300",
      "Action": "Delete"
    },
    {
      "Sl No": "6",
      "Name": "Lisa Davis",
      "Email": "lisa.davis@example.com",
      "Today Total Transaction": "7",
      "Today Successful Transaction": "6",
      "Balance": "₹ 18,900",
      "Action": "Delete"
    },
    {
      "Sl No": "7",
      "Name": "Robert Miller",
      "Email": "robert.miller@example.com",
      "Today Total Transaction": "25",
      "Today Successful Transaction": "23",
      "Balance": "₹ 78,650",
      "Action": "Delete"
    },
    {
      "Sl No": "8",
      "Name": "Emily Taylor",
      "Email": "emily.taylor@example.com",
      "Today Total Transaction": "14",
      "Today Successful Transaction": "13", 
      "Balance": "₹ 41,200",
      "Action": "Delete"
    }
  ]);

  const handleDelete = (index) => {
    const updatedData = ledgerData.filter((_, i) => i !== index);
    // Re-number the entries
    const reNumberedData = updatedData.map((item, i) => ({
      ...item,
      "Sl No": (i + 1).toString()
    }));
    setLedgerData(reNumberedData);
  };

  const downloadCSV = () => {
    // Prepare CSV headers
    const headers = ["Sl No", "Name", "Email", "Today Total Transaction", "Today Successful Transaction", "Balance"];
    
    // Prepare CSV rows
    const csvContent = [
      headers.join(","),
      ...ledgerData.map(row => 
        headers.map(header => {
          let value = row[header];
          // Remove currency symbol and commas for balance
          if (header === "Balance") {
            value = value.replace(/[₹,\s]/g, "");
          }
          // Handle commas in values by wrapping in quotes
          if (typeof value === "string" && value.includes(",")) {
            return `"${value}"`;
          }
          return value;
        }).join(",")
      )
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `ledger-book-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadColumnCSV = (columnName) => {
    // Prepare CSV for specific column
    const csvContent = [
      `Sl No,${columnName}`,
      ...ledgerData.map(row => {
        let value = row[columnName];
        // Remove currency symbol and commas for balance
        if (columnName === "Balance") {
          value = value.replace(/[₹,\s]/g, "");
        }
        return `${row["Sl No"]},${value}`;
      })
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${columnName.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = ["Sl No", "Name", "Email", "Today Total Transaction", "Today Successful Transaction", "Balance", "Download CSV", "Action"];

  // Enhanced data with actual delete buttons and download CSV options
  const enhancedData = ledgerData.map((item, index) => ({
    ...item,
    "Download CSV": (
      <button
        onClick={() => downloadColumnCSV("Balance")}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
      >
        Download CSV
      </button>
    ),
    "Action": (
      <button
        onClick={() => handleDelete(index)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
      >
        Delete
      </button>
    )
  }));

  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="admin" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Ledger Book</h1>
          {/* Ledger Book Table */}
          <FlexibleTable 
            heading="Ledger Book Entries" 
            columns={columns} 
            data={enhancedData} 
          />
        </div>
      </div>
    </div>
  );
}
