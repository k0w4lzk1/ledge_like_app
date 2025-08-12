"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    category: "user" // default to user
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Predefined credentials
  const credentials = {
    user: {
      email: "RAMEES@GMAIL.COM",
      password: "112929"
    },
    admin: {
      email: "nisarsuns@gmail.com",
      password: "NSA@12"
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Check credentials
      const expectedCredentials = credentials[formData.category];
      
      if (
        formData.email === expectedCredentials.email &&
        formData.password === expectedCredentials.password
      ) {
        // Store auth data
        localStorage.setItem("authToken", "dummy_token");
        localStorage.setItem("userRole", formData.category);
        localStorage.setItem("userData", JSON.stringify({
          email: formData.email,
          role: formData.category
        }));

        // Redirect based on role
        if (formData.category === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Company Logo/Name */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-2">ETAKA TRADLINK</h1>
          <h2 className="text-xl font-semibold text-black">Sign in to your account</h2>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            {/* Sign up link */}
            <div className="text-center">
              <span className="text-sm text-black">
                Don't have an account?{" "}
                <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </span>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-black mb-2">Demo Credentials:</h3>
            <div className="text-xs text-black space-y-1">
              <div><strong>User:</strong> RAMEES@GMAIL.COM / 112929</div>
              <div><strong>Admin:</strong> nisarsuns@gmail.com / NSA@12</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
