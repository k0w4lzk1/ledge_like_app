"use client";

import { Sidebar } from "../../components/sidebar";
import { useState } from "react";

export default function AdminBankDataForm() {
  const [formData, setFormData] = useState({
    bankAccountNumber: "",
    confirmBankAccount: "",
    bankName: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Validation
    if (formData.bankAccountNumber !== formData.confirmBankAccount) {
      alert("Bank account numbers do not match!");
      return;
    }
    
    if (!formData.bankAccountNumber || !formData.bankName) {
      alert("Please fill all required fields!");
      return;
    }

    console.log("Saving bank data:", formData);
    alert("Bank data saved successfully!");
    
    // Reset form
    setFormData({
      bankAccountNumber: "",
      confirmBankAccount: "",
      bankName: ""
    });
  };

  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="admin" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Bank Data</h1>
          </div>
          
          {/* Bank Data Form */}
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Bank Account Information</h2>
            
            <div className="space-y-6">
              {/* Bank Account Number */}
              <div>
                <label htmlFor="bankAccountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Account Number *
                </label>
                <input
                  type="text"
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter bank account number"
                  required
                />
              </div>

              {/* Confirm Bank Account Number */}
              <div>
                <label htmlFor="confirmBankAccount" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Bank Account Number *
                </label>
                <input
                  type="text"
                  id="confirmBankAccount"
                  name="confirmBankAccount"
                  value={formData.confirmBankAccount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm bank account number"
                  required
                />
                {formData.confirmBankAccount && formData.bankAccountNumber !== formData.confirmBankAccount && (
                  <p className="text-red-500 text-sm mt-1">Account numbers do not match</p>
                )}
              </div>

              {/* Bank Name */}
              <div>
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name *
                </label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter bank name"
                  required
                />
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
