"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  ArrowUpDown,
  RotateCcw,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Activity,
  Plus,
  Eye,
  RefreshCw,
  UserPlus,
} from "lucide-react"

const mainStats = [
  {
    title: "Today's Address Book",
    value: "17",
    icon: Users,
    color: "blue",
    change: "+12%",
    changeType: "positive" as const,
  },
  {
    title: "Today's Transactions Amount",
    value: "872,700.00",
    prefix: "₹",
    icon: ArrowUpDown,
    color: "orange",
    change: "+15%",
    changeType: "positive" as const,
  },
]

const metrics = [
  {
    title: "Today's Refund Amount",
    value: "0",
    prefix: "₹",
    icon: RotateCcw,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
  },
  {
    title: "Today's Refund Address Book Count",
    value: "0",
    icon: RotateCcw,
    color: "text-gray-600",
    bg: "bg-gray-50",
    border: "border-gray-200",
  },
  {
    title: "Today's Successful Transaction Amount",
    value: "0",
    prefix: "₹",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    title: "Today's Successful Transactions Count",
    value: "0",
    icon: CheckCircle,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    title: "Month Transaction Amount",
    value: "25,000.00",
    prefix: "₹",
    icon: DollarSign,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
]

const quickActions = [
  {
    label: "New Transaction",
    icon: Plus,
    color: "blue",
    description: "Create a new transaction",
    href: "/user/transaction",
  },
  {
    label: "Add Beneficiary",
    icon: UserPlus,
    color: "indigo",
    description: "Add new beneficiary",
    href: "/user/add-beneficiary",
  },
  {
    label: "View Reports",
    icon: Eye,
    color: "green",
    description: "View detailed reports",
    href: "/user/today-pay-out",
  },
  {
    label: "Balance Request",
    icon: DollarSign,
    color: "orange",
    description: "Request balance update",
    href: "/user/balance-request",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "Transaction",
    description: "Payment to FEDERAL BANK",
    amount: "₹25,000.00",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    type: "Balance Request",
    description: "Balance request submitted",
    amount: "₹20,000,000",
    time: "5 hours ago",
    status: "pending",
  },
  {
    id: 3,
    type: "Transaction",
    description: "Payment to SOUTH INDIAN BANK",
    amount: "₹60,000.00",
    time: "1 day ago",
    status: "completed",
  },
]

export function UserDashboard() {
  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your account overview.</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {mainStats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 leading-tight">
                {stat.title}
              </CardTitle>
              <div className={`p-1.5 sm:p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900 flex-shrink-0`}>
                <stat.icon className={`h-3 w-3 sm:h-4 sm:w-4 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white break-all sm:break-normal">
                {stat.prefix && <span className="text-base sm:text-lg lg:text-xl">{stat.prefix}</span>}
                {stat.value}
              </div>
              <div className="flex items-center mt-1 sm:mt-2">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-green-600">
                  {stat.change} from yesterday
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <div className="group p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <div className={`p-2 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900 group-hover:bg-${action.color}-200 dark:group-hover:bg-${action.color}-800 transition-colors`}>
                      <action.icon className={`h-5 w-5 text-${action.color}-600 dark:text-${action.color}-400`} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">{action.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{action.description}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {metrics.map((metric) => (
          <Card
            key={metric.title}
            className={`border-2 ${metric.border} ${metric.bg} hover:shadow-lg transition-all duration-200`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${metric.bg}`}>
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                  {metric.prefix && <span className="text-lg sm:text-xl">{metric.prefix}</span>}
                  {metric.value}
                </div>
                <div className="text-xs text-gray-600 font-medium leading-tight">{metric.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
          <Link href="/user/transaction">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                    <Activity className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 truncate">{activity.type}</div>
                    <div className="text-sm text-gray-600 truncate">{activity.description}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="font-bold text-gray-900 text-sm sm:text-base">{activity.amount}</div>
                  <Badge
                    variant={activity.status === "completed" ? "default" : "secondary"}
                    className={
                      activity.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
