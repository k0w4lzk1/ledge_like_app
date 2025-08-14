"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  isLoggedIn: boolean
  userRole: string | null
  username: string | null
  login: (role: string, username: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      try {
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn")
        const storedUserRole = localStorage.getItem("userRole")
        const storedUsername = localStorage.getItem("username")

        if (storedIsLoggedIn === "true" && storedUserRole && storedUsername) {
          setIsLoggedIn(true)
          setUserRole(storedUserRole)
          setUsername(storedUsername)
        }
      } catch (error) {
        console.error("Error checking auth:", error)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      // Handle routing based on authentication status
      if (!isLoggedIn && pathname !== "/login" && pathname !== "/signup") {
        router.push("/login")
      } else if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
        // Redirect based on role
        if (userRole === "admin") {
          router.push("/")
        } else if (userRole === "user") {
          router.push("/user")
        }
      } else if (isLoggedIn && pathname === "/" && userRole === "user") {
        // Prevent users from accessing admin routes
        router.push("/user")
      } else if (isLoggedIn && pathname.startsWith("/user") && userRole === "admin") {
        // Allow admins to access user routes if needed
        // router.push("/")
      }
    }
  }, [isLoggedIn, userRole, pathname, router, isLoading])

  const login = (role: string, username: string) => {
    try {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userRole", role)
      localStorage.setItem("username", username)
      setIsLoggedIn(true)
      setUserRole(role)
      setUsername(username)
    } catch (error) {
      console.error("Error during login:", error)
    }
  }

  const logout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userRole")
    localStorage.removeItem("username")
    setIsLoggedIn(false)
    setUserRole(null)
    setUsername(null)
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, username, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
