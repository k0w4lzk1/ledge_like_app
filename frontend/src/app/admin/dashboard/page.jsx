"use client";

import { Sidebar } from "../../components/sidebar";
import { DashboardCard } from "../../components/DashboardCard";
import { AuthWrapper } from "../../components/AuthWrapper";

export default function AdminDashboard() {
  // Sample data for dashboard cards
  const dashboardData = [
    { title: "Today Address Book", value: "125" },
    { title: "Yesterday Address Book", value: "118" },
    { title: "Today Transaction", value: "89" },
    { title: "Current Month Charge", value: "₹45,750" },
    { title: "Current Month Payment", value: "₹67,890" },
    { title: "Todays Balance Request", value: "23" },
    { title: "Todays Total Balance Request Amount", value: "₹1,25,000" },
    { title: "Todays Pending Balance Request", value: "8" },
    { title: "Todays Successful Transaction Amount", value: "₹89,450" },
    { title: "Todays Refund Amount", value: "₹5,200" },
    { title: "Todays Charge Profit", value: "₹12,850" },
    { title: "Yesterdays Charge Profit", value: "₹11,950" }
  ];

  return (
    <AuthWrapper requiredRole="admin">
      <div className="min-h-screen bg-app-bg">
        <Sidebar role="admin" />
        <div className="ml-64 md:ml-20 lg:ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
            
            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dashboardData.map((item, index) => (
                <DashboardCard
                  key={index}
                  title={item.title}
                  value={item.value}
                  className="hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
