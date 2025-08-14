"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  Users,
  ArrowUpDown,
  CreditCard,
  DollarSign,
  Activity,
  Download,
  RefreshCw,
  Eye,
} from "lucide-react"
import { TransactionChart } from "@/components/transaction-chart"
import { RecentTransactions } from "@/components/recent-transactions"
import { UserActivityChart } from "@/components/user-activity-chart"

const stats = [
  {
    title: "Today's Address Book",
    value: "566",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "blue",
  },
  {
    title: "Yesterday's Address Book",
    value: "655",
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "green",
  },
  {
    title: "Today's Transactions",
    value: "₹25,922,282.48",
    change: "+15%",
    trend: "up",
    icon: ArrowUpDown,
    color: "orange",
  },
  {
    title: "Current Month's Charge",
    value: "₹412,444.64",
    change: "+5%",
    trend: "up",
    icon: DollarSign,
    color: "teal",
  },
  {
    title: "Current Month's Amount",
    value: "₹824,889,280.00",
    change: "+22%",
    trend: "up",
    icon: CreditCard,
    color: "purple",
  },
  {
    title: "Today's Balance Requests",
    value: "0",
    change: "0%",
    trend: "neutral",
    icon: Activity,
    color: "gray",
  },
]

const quickActions = [
  { label: "Export", icon: Download },
  { label: "Refresh", icon: RefreshCw },
  { label: "Transaction", icon: ArrowUpDown },
  { label: "Add User", icon: Users },
]

export function DashboardOverview() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <Button key={action.label} variant="outline" size="sm" className="flex-1 sm:flex-none">
              <action.icon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 line-clamp-2">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900 flex-shrink-0`}>
                <stat.icon className={`h-4 w-4 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">{stat.value}</div>
              <div className="flex items-center mt-2">
                {stat.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />}
                {stat.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500 mr-1 flex-shrink-0" />}
                <span
                  className={`text-sm truncate ${
                    stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-gray-500"
                  }`}
                >
                  {stat.change} from yesterday
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
            <CardDescription>Daily transaction amounts over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <TransactionChart />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Active users and transaction counts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <UserActivityChart />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest successful transactions</CardDescription>
            </div>
            <Link href="/transactions">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                See More
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <RecentTransactions />
        </CardContent>
      </Card>
    </div>
  )
}
