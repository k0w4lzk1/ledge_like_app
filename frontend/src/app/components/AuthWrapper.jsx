"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function AuthWrapper({ children, requiredRole }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem("authToken");
      const userRole = localStorage.getItem("userRole");

      if (!authToken) {
        router.push("/login");
        return;
      }

      if (requiredRole && userRole !== requiredRole) {
        // Redirect to appropriate dashboard based on actual role
        if (userRole === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, requiredRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">ETAKA TRADLINK</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-black mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return children;
}
