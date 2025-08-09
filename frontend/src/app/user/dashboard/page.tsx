"use client";

import { Sidebar } from "../../components/sidebar";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="user" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Welcome to your dashboard. Here you can view your account information and recent activities.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
