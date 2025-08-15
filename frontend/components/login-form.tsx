"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

// Mock credentials - In production, this would be handled by your backend
const CREDENTIALS = {
  admin: {
    username: "admin",
    password: "admin123",
    role: "admin",
  },
  user: {
    username: "user",
    password: "user123",
    role: "user",
  },
}

export function LoginForm() {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // Check credentials
      const { username, password } = formData

      if (!username || !password) {
        throw new Error("Please fill in all fields")
      }

      // Validate credentials and infer role
      const validCredentials = Object.values(CREDENTIALS).find(
        (cred) => cred.username === username && cred.password === password
      )

      if (!validCredentials) {
        throw new Error("Invalid credentials. Please check your username and password.")
      }

      // Login using auth context
      login(validCredentials.role, username)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
  setFormData((prev) => ({ ...prev, [field]: value }))
    setError("") // Clear error when user types
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl sm:text-2xl">ET</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">ETAKA TRADLINK</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">Ledger Book Management System</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center text-sm sm:text-base">Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4">
              {/* ...removed role selection... */}

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm sm:text-base">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  disabled={isLoading}
                  className="h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    disabled={isLoading}
                    className="h-10 sm:h-11 pr-10 text-sm sm:text-base"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Login Button */}
              <Button type="submit" className="w-full h-10 sm:h-11 text-sm sm:text-base font-medium" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Admin:</strong> username: admin, password: admin123
                </p>
                <p>
                  <strong>User:</strong> username: user, password: user123
                </p>
              </div>
            </div>

            {/* Signup Link */}
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; 2025 ETAKA TRADLINK. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
