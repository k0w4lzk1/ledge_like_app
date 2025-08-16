"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Building2,
  ArrowUpDown,
  Users,
  UserPlus,
  CreditCard,
  BarChart3,
  Settings,
  Menu,
  Bell,
  Search,
  Moon,
  Sun,
  LogOut,
  User,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { useAuth } from "@/components/auth-provider"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Bank Data", href: "/bank-data", icon: Building2 },
  { name: "Transactions", href: "/transactions", icon: ArrowUpDown },
  { name: "Ledger Book", href: "/ledger-book", icon: Users },
  { name: "Create User", href: "/users/create", icon: UserPlus },
  { name: "Balance Requests", href: "/balance-requests", icon: CreditCard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { logout, username } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0 bg-white dark:bg-gray-800">
          <div className="flex h-full flex-col">
            {/* Mobile sidebar header */}
            <div className="flex h-16 items-center px-4 border-b border-gray-200 dark:border-gray-700">
              <Link href="/" className="flex items-center space-x-2" onClick={closeSidebar}>
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ET</span>
                </div>
                <span className="font-bold text-lg text-gray-900 dark:text-white">ETAKA TRADLINK</span>
              </Link>
            </div>

            {/* Mobile navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors w-full",
                      isActive
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                    )}
                    onClick={closeSidebar}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Mobile user section */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {username?.slice(0, 2).toUpperCase() || "AD"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {username?.toUpperCase() || "ADMIN"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex h-16 items-center px-6 border-b border-gray-200 dark:border-gray-700">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ET</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">ETAKA TRADLINK</span>
            </Link>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-14 sm:h-16 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>

              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search..." className="pl-10 w-48 lg:w-64" />
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search button for mobile */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>

              {/* Theme toggle */}
              {mounted && (
                <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              )}

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {username?.slice(0, 2).toUpperCase() || "AD"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden sm:block">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {username?.toUpperCase() || "ADMIN"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
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

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  )
}
