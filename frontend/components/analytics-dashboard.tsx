"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Download } from "lucide-react"

const profitData = [
  { user: "SAFVAN", entries: 400, charge: 9553.13 },
  { user: "RAMEES", entries: 17, charge: 436.35 },
  { user: "KDV", entries: 135, charge: 2577.66 },
  { user: "KDV222@GMAIL.COM", entries: 14, charge: 385.85 },
]

const transactionTrends = [
  { month: "Jan", amount: 45000000, transactions: 1200 },
  { month: "Feb", amount: 52000000, transactions: 1450 },
  { month: "Mar", amount: 48000000, transactions: 1320 },
  { month: "Apr", amount: 61000000, transactions: 1680 },
  { month: "May", amount: 58000000, transactions: 1590 },
  { month: "Jun", amount: 67000000, transactions: 1820 },
]

const bankDistribution = [
  { name: "CANARA BANK", value: 35, color: "#3b82f6" },
  { name: "BANK OF BARODA", value: 25, color: "#10b981" },
  { name: "KERALA STATE CO OP", value: 20, color: "#f59e0b" },
  { name: "FEDERAL BANK", value: 12, color: "#ef4444" },
  { name: "Others", value: 8, color: "#8b5cf6" },
]

export function AnalyticsDashboard() {
  const totalProfit = profitData.reduce((sum, item) => sum + item.charge, 0)
  const totalEntries = profitData.reduce((sum, item) => sum + item.entries, 0)

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Profit</CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold break-all sm:break-normal">₹{totalProfit.toLocaleString()}</div>
            <div className="flex items-center mt-1 sm:mt-2">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-green-600">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Entries</CardTitle>
            <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">{totalEntries.toLocaleString()}</div>
            <div className="flex items-center mt-1 sm:mt-2">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-green-600">+8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Active Users</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold">{profitData.length}</div>
            <div className="flex items-center mt-1 sm:mt-2">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-green-600">+2 new users</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Avg. Profit/User</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold break-all sm:break-normal">₹{(totalProfit / profitData.length).toFixed(2)}</div>
            <div className="flex items-center mt-1 sm:mt-2">
              <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 mr-1 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-red-600">-3% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        {/* User Profit Analysis */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-sm sm:text-base">User Profit Analysis</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Profit distribution by user</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="h-[250px] sm:h-[300px] w-full overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="user" 
                    fontSize={10}
                    tick={{ fontSize: 10 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis fontSize={10} tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(value: number) => [`₹${value}`, "Charge"]} />
                  <Bar dataKey="charge" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bank Distribution */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-sm sm:text-base">Bank Distribution</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Transaction distribution by bank</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="h-[250px] sm:h-[300px] w-full overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bankDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                    fontSize={8}
                  >
                    {bankDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Trends */}
      <Card>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base">Transaction Trends</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Monthly transaction volume and amount trends</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="h-[300px] sm:h-[400px] w-full overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={transactionTrends} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  fontSize={10}
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  yAxisId="left" 
                  tickFormatter={(value) => `₹${(value / 1000000).toFixed(0)}M`} 
                  fontSize={10}
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  fontSize={10}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === "amount" ? `₹${value.toLocaleString()}` : value,
                    name === "amount" ? "Amount" : "Transactions",
                  ]}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="amount"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card>
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-sm sm:text-base">Top Performers</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Users with highest activity and profit</CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="space-y-3 sm:space-y-4">
            {profitData
              .sort((a, b) => b.charge - a.charge)
              .map((user, index) => (
                <div key={user.user} className="flex items-center justify-between p-2 sm:p-3 lg:p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 min-w-0 flex-1">
                    <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex-shrink-0">
                      <span className="text-xs sm:text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">{user.user}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.entries} entries</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">₹{user.charge.toLocaleString()}</p>
                    <Badge variant="secondary" className="text-xs">
                      {((user.charge / totalProfit) * 100).toFixed(1)}% of total
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
