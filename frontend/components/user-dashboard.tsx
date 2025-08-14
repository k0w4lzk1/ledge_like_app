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
    gradient: "from-blue-500 to-blue-600",
    change: "+12%",
    changeType: "positive" as const,
  },
  {
    title: "Today's Transactions Amount",
    value: "872,700.00",
    prefix: "₹",
    icon: ArrowUpDown,
    gradient: "from-orange-500 to-orange-600",
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
    color: "bg-blue-500 hover:bg-blue-600",
    description: "Create a new transaction",
  },
  {
    label: "Add Beneficiary",
    icon: UserPlus,
    color: "bg-indigo-500 hover:bg-indigo-600",
    description: "Add new beneficiary",
  },
  {
    label: "View Reports",
    icon: Eye,
    color: "bg-green-500 hover:bg-green-600",
    description: "View detailed reports",
  },
  {
    label: "Balance Request",
    icon: DollarSign,
    color: "bg-orange-500 hover:bg-orange-600",
    description: "Request balance update",
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
          <Card key={stat.title} className="overflow-hidden border-0 shadow-lg">
            <CardContent className="p-0">
              <div className={`bg-gradient-to-br ${stat.gradient} text-white p-4 sm:p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 truncate">
                      {stat.prefix && <span className="text-2xl sm:text-3xl lg:text-4xl">{stat.prefix}</span>}
                      {stat.value}
                    </div>
                    <div className="text-sm sm:text-lg opacity-90 font-medium">{stat.title}</div>
                    <div className="flex items-center mt-3">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{stat.change} from yesterday</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <div className="p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <stat.icon className="h-8 w-8 sm:h-10 sm:w-10" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                className={`${action.color} text-white h-auto p-4 flex-col space-y-2 shadow-lg hover:shadow-xl transition-all duration-200`}
              >
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-semibold text-sm">{action.label}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
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
