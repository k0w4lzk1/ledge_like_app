"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { DashboardOverview } from "@/components/dashboard-overview"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function HomePage() {
  const { isLoggedIn, userRole, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        router.push("/login")
      } else if (userRole === "user") {
        router.push("/user")
      }
    }
  }, [isLoggedIn, userRole, isLoading, router])

  if (isLoading) {
    return null
  }

  if (!isLoggedIn || userRole !== "admin") {
    return null
  }

  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  )
}
