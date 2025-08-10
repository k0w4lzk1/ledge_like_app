"use client";

import { Sidebar } from "../../components/sidebar";

export default function UserLedgerBook() {
  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="user" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Ledger book</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">View your ledger entries and transaction history.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
