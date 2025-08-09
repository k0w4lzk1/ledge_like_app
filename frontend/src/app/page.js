"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Sidebar } from "./components/sidebar";

export default function Home() {
  const [selectedRole, setSelectedRole] = useState("user"); // Default to user

  if (selectedRole === "user") {
    return (
      <div className="min-h-screen bg-app-bg">
        <Sidebar role="user" />
        <div className="ml-64 md:ml-20 lg:ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">ETAKA TRADLINK</h1>
              <p className="text-lg text-gray-600 mb-6">Welcome to the User Dashboard</p>
              <div className="space-x-4">
                <Link
                  href="/user/dashboard"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => setSelectedRole("admin")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Switch to Admin
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">You are currently viewing the user interface. Use the sidebar to navigate to different sections.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedRole === "admin") {
    return (
      <div className="min-h-screen bg-app-bg">
        <Sidebar role="admin" />
        <div className="ml-64 md:ml-20 lg:ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">ETAKA TRADLINK</h1>
              <p className="text-lg text-gray-600 mb-6">Welcome to the Admin Dashboard</p>
              <div className="space-x-4">
                <Link
                  href="/admin/dashboard"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => setSelectedRole("user")}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Switch to User
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">You are currently viewing the admin interface. Use the sidebar to navigate to different administrative sections.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
