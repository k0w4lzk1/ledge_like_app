"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Download,
  Users,
  CreditCard,
  ArrowUpDown,
  Menu,
  LogOut,
  User,
  X,
  Bell,
  Settings,
  Wallet,
  UserPlus,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"

const userNavigation = [
  {
    name: "Dashboard",
    href: "/user",
    icon: LayoutDashboard,
    gradient: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    name: "Today Pay Out",
    href: "/user/today-pay-out",
    icon: Download,
    gradient: "from-emerald-500 to-emerald-600",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    name: "Add Beneficiary",
    href: "/user/add-beneficiary",
    icon: UserPlus,
    gradient: "from-indigo-500 to-indigo-600",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    name: "Ledger Book",
    href: "/user/ledger-book",
    icon: Users,
    gradient: "from-purple-500 to-purple-600",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    name: "Balance Request",
    href: "/user/balance-request",
    icon: CreditCard,
    gradient: "from-orange-500 to-orange-600",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    name: "Transaction",
    href: "/user/transaction",
    icon: ArrowUpDown,
    gradient: "from-teal-500 to-teal-600",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
]

interface UserDashboardLayoutProps {
  children: React.ReactNode
}

export function UserDashboardLayout({ children }: UserDashboardLayoutProps) {
  const pathname = usePathname()
  const { logout, username } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [balance] = useState("21,794,288.83")

  useEffect(() => {
    setMounted(true)
  }, [])

  const closeSidebar = () => setSidebarOpen(false)

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-80 p-0 bg-white">
          <div className="flex h-full flex-col">
            {/* Mobile sidebar header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
              <div className="flex items-center mb-4">
                <Link href="/user" className="flex items-center space-x-3" onClick={closeSidebar}>
                  <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">ET</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg">ETAKA TRADLINK</div>
                    <div className="text-xs text-blue-100">User Portal</div>
                  </div>
                </Link>
              </div>

              {/* Balance in header */}
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5" />
                  <div>
                    <div className="text-xs opacity-80">Current Balance</div>
                    <div className="text-lg font-bold">₹{balance}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {userNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                        : "text-gray-700 hover:bg-gray-100",
                    )}
                    onClick={closeSidebar}
                  >
                    <div className={cn("p-2 rounded-lg", isActive ? "bg-white/20" : `${item.iconBg}`)}>
                      <item.icon className={cn("h-4 w-4", isActive ? "text-white" : item.iconColor)} />
                    </div>
                    <span className="text-sm">{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Top Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="sm" className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">ET</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg sm:text-xl font-bold text-gray-900">ETAKA</span>
                <span className="text-lg sm:text-xl font-bold text-blue-600 ml-1">TRADLINK</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Balance Badge - Mobile */}
            <div className="sm:hidden bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
              ₹{balance}
            </div>

            {/* Balance Badge - Desktop */}
            <div className="hidden sm:flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full shadow-sm">
              <Wallet className="h-4 w-4 mr-2" />
              <span className="font-semibold">₹{balance}</span>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-blue-500 text-white font-bold text-sm">
                      {username?.slice(0, 2).toUpperCase() || "US"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden sm:block">
                    <div className="font-semibold text-sm text-gray-900">{username?.toUpperCase() || "USER"}</div>
                    <div className="text-xs text-gray-500">User Account</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside
          className="hidden lg:block w-80 bg-white shadow-sm border-r flex flex-col"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          {/* Sidebar Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white flex-shrink-0">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">ET</span>
              </div>
              <div>
                <div className="font-bold text-xl">ETAKA TRADLINK</div>
                <div className="text-sm text-blue-100">User Portal</div>
              </div>
            </div>

            {/* Balance Display */}
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm opacity-80">Current Balance</div>
                  <div className="text-2xl font-bold">₹{balance}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {userNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                      : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  <div className={cn("p-2 rounded-lg", isActive ? "bg-white/20" : `${item.iconBg}`)}>
                    <item.icon className={cn("h-5 w-5", isActive ? "text-white" : item.iconColor)} />
                  </div>
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 min-h-screen bg-gray-50 overflow-x-hidden">
          <div className="max-w-full">{children}</div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-3">
        <p className="text-sm px-4">Copyright © 2024 ETAKA TRADLINK CORP PRIVATE LIMITED. All Rights Reserved. ❤️</p>
      </footer>
    </div>
  )
}
