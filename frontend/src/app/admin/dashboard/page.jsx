
"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  Home, 
  Package, 
  Users, 
  Settings, 
  ChevronRight,
  TrendingUp,
  Calendar,
  MapPin,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { Sidebar } from "../../components/sidebar";
import { Header } from "../../components/header";
import {StatusWidget} from "../../components/statuswidget";
import { DashboardCard } from "../../components/DashboardCard";



// Simple utility function to conditionally join class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Simple Button component
function Button({ 
  children, 
  variant = "default", 
  className = "", 
  onClick,
  ...props 
}) {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4",
    outline: "border border-black text-black hover:bg-gray-50 hover:text-black h-10 py-2 px-4"
  };
  
  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

// Simple Avatar components
function Avatar({ children, className = "" }) {
  return (
    <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>
      {children}
    </div>
  );
}

function AvatarImage({ src, alt }) {
  return src ? (
    <img className="aspect-square h-full w-full" src={src} alt={alt} />
  ) : null;
}

function AvatarFallback({ children }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
      {children}
    </div>
  );
}

// Simple icon components (using text symbols)
const icons = {
  logout: "🚪",
  menu: "☰",
  close: "✕"
};

// Sample data for charts based on your dashboard data
const transactionData = [
  { name: 'Mon', today: 89, yesterday: 78 },
  { name: 'Tue', today: 95, yesterday: 85 },
  { name: 'Wed', today: 78, yesterday: 90 },
  { name: 'Thu', today: 102, yesterday: 88 },
  { name: 'Fri', today: 89, yesterday: 82 },
  { name: 'Sat', today: 76, yesterday: 95 },
  { name: 'Sun', today: 68, yesterday: 72 }
];

const profitData = [
  { name: 'Week 1', profit: 12850 },
  { name: 'Week 2', profit: 11950 },
  { name: 'Week 3', profit: 13200 },
  { name: 'Week 4', profit: 14100 }
];

const balanceRequestData = [
  { name: 'Pending', value: 8, color: '#F59E0B' },
  { name: 'Approved', value: 15, color: '#10B981' },
];



export default function AdminDashboard() {
  // Your dashboard data transformed for Skydash theme
  const dashboardData = [
    { title: "Today Address Book", value: "125", color: "lightBlue", icon: Users },
    { title: "Yesterday Address Book", value: "118", color: "blue", icon: Users },
    { title: "Today Transaction", value: "89", color: "purple", icon: Activity },
    { title: "Current Month Charge", value: "₹45,750", color: "green", icon: DollarSign },
    { title: "Current Month Payment", value: "₹67,890", color: "coral", icon: DollarSign },
    { title: "Todays Balance Request", value: "23", color: "orange", icon: Bell },
    { title: "Todays Total Balance Request Amount", value: "₹1,25,000", color: "purple", icon: TrendingUp },
    { title: "Todays Pending Balance Request", value: "8", color: "coral", icon: Bell },
    { title: "Todays Successful Transaction Amount", value: "₹89,450", color: "green", icon: TrendingUp },
    { title: "Todays Refund Amount", value: "₹5,200", color: "orange", icon: ArrowDownRight },
    { title: "Todays Charge Profit", value: "₹12,850", color: "green", icon: TrendingUp, trend: { direction: 'up', value: '7.2% vs yesterday' } },
    { title: "Yesterdays Charge Profit", value: "₹11,950", color: "blue", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role="admin" />
      
      <div className="ml-64 md:ml-20 lg:ml-64">
        <Header />
        
        <div className="p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Admin</h1>
                <p className="text-gray-600">All systems are running smoothly! You have <span className="text-red-500 font-semibold">3 unread alerts!</span></p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Status Widget */}
            <div className="lg:col-span-1">
              <StatusWidget />
            </div>

            {/* Key Metrics Cards */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-6">
              <DashboardCard
                title="Today Transaction"
                value="89"
                subtitle="Active transactions"
                color="lightBlue"
                icon={Activity}
              />
              <DashboardCard
                title="Total Address Book"
                value="243"
                subtitle="125 today, 118 yesterday"
                color="purple"
                icon={Users}
              />
              <DashboardCard
                title="Balance Requests"
                value="23"
                subtitle="8 pending approval"
                color="orange"
                icon={Bell}
              />
              <DashboardCard
                title="Today's Profit"
                value="₹12,850"
                subtitle="7.2% increase"
                color="green"
                icon={TrendingUp}
                trend={{ direction: 'up', value: '7.2% vs yesterday' }}
              />
            </div>
          </div>

          {/* Main Dashboard Cards Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Detailed Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dashboardData.map((item, index) => (
                <DashboardCard
                  key={index}
                  title={item.title}
                  value={item.value}
                  color={item.color}
                  icon={item.icon}
                  trend={item.trend}
                  className="hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Transaction Trends */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Trends</h3>
              <p className="text-sm text-gray-600 mb-6">
                Daily transaction comparison between today and yesterday
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">89</div>
                  <div className="text-sm text-gray-500">Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">78</div>
                  <div className="text-sm text-gray-500">Yesterday Avg</div>
                </div>
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transactionData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Bar dataKey="yesterday" fill="#C4B5FD" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="today" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Profit Analysis */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Profit Analysis</h3>
                <button className="text-purple-600 text-sm font-medium hover:underline">View all</button>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                Weekly profit trends and performance metrics
              </p>

              <div className="mb-6">
                <div className="text-2xl font-bold text-green-600 mb-1">₹12,850</div>
                <div className="text-sm text-gray-500">Today's Charge Profit</div>
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profitData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Line 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Balance Requests Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Balance Request Status</h3>
              <p className="text-sm text-gray-600 mb-6">
                Current status of today's balance requests
              </p>
              
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={balanceRequestData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        {balanceRequestData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">23</div>
                      <div className="text-sm text-gray-500">Total</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Pending (8)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Approved (15)</span>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Summary</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Current Month Payment</div>
                    <div className="text-xl font-bold text-green-600">₹67,890</div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Current Month Charge</div>
                    <div className="text-xl font-bold text-blue-600">₹45,750</div>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-500" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Today's Refund Amount</div>
                    <div className="text-xl font-bold text-orange-600">₹5,200</div>
                  </div>
                  <ArrowDownRight className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
