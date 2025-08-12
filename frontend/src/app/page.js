"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const authToken = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");

    if (authToken && userRole) {
      // Redirect to appropriate dashboard based on role
      if (userRole === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    } else {
      // Redirect to login if not authenticated
      router.push("/login");
    }
  }, [router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">ETAKA TRADLINK</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading...</p>
      </div>
    </div>
  );
}
