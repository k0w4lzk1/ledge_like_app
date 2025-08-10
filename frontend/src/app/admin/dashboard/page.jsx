"use client";

import { Sidebar } from "../../components/sidebar";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="admin" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Welcome to the admin dashboard. This is where you can manage all administrative functions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
