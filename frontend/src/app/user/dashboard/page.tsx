"use client";

import { Sidebar } from "../../components/sidebar";
import { DashboardCard } from "../../components/DashboardCard";

export default function UserDashboard() {
  // Sample data for dashboard cards
  const dashboardData = [
    {
      title: "Todays Address Book",
      value: "245"
    },
    {
      title: "Todays Transaction Amount",
      value: "₹ 1,25,750"
    },
    {
      title: "Todays Refund Amount",
      value: "₹ 8,200"
    },
    {
      title: "Todays Refund Address Book Count",
      value: "12"
    },
    {
      title: "Todays Successful Transaction Amount",
      value: "₹ 1,17,550"
    },
    {
      title: "Todays Successful Transaction Count",
      value: "187"
    },
    {
      title: "Month Transaction Amount",
      value: "₹ 45,25,450"
    }
  ];

  return (
    <div className="min-h-screen bg-app-bg">
      <Sidebar role="user" />
      <div className="ml-64 md:ml-20 lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          {/* Dashboard Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {dashboardData.map((item, index) => (
              <DashboardCard
                key={index}
                title={item.title}
                value={item.value}
              />
            ))}
          </div>

          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Welcome Back!</h2>
            <p className="text-gray-600">Here's your account overview. Use the cards above to quickly see your key metrics and the sidebar to navigate to different sections.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
