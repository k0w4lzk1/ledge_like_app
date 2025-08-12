"use client";

import { Sidebar } from "../../components/sidebar";
import { useState } from "react";

export default function TransactionType() {
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (type) => {
    setSelectedType(type);
    console.log("Selected transaction type:", type);
  };

  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="admin" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Transaction Type</h1>
          
          {/* Transaction Type Selection */}
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Select Transaction Type</h2>
            
            <div className="space-y-4">
              {/* IMPS Option */}
              <div className="flex items-center">
                <input
                  id="imps"
                  name="transactionType"
                  type="radio"
                  value="IMPS"
                  checked={selectedType === "IMPS"}
                  onChange={() => handleTypeChange("IMPS")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="imps" className="ml-3 block text-sm font-medium text-gray-700">
                  IMPS (Immediate Payment Service)
                </label>
              </div>

              {/* NEFT Option */}
              <div className="flex items-center">
                <input
                  id="neft"
                  name="transactionType"
                  type="radio"
                  value="NEFT"
                  checked={selectedType === "NEFT"}
                  onChange={() => handleTypeChange("NEFT")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="neft" className="ml-3 block text-sm font-medium text-gray-700">
                  NEFT (National Electronic Funds Transfer)
                </label>
              </div>
            </div>

            {/* Selected Type Display */}
            {selectedType && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Selected:</strong> {selectedType}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {selectedType === "IMPS" 
                    ? "Instant money transfer service available 24x7" 
                    : "Electronic fund transfer system that operates on a batch basis"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
