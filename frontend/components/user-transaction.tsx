"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react"

const transactions = [
  {
    id: "97208",
    action: "debit",
    currentBalance: "21794288.82519",
    amount: "25016.75",
    creditIn: "Admin",
    debitOut: "RAMEES",
    date: "27/05/2025",
    time: "14:30:25",
  },
  {
    id: "97207",
    action: "debit",
    currentBalance: "21819305.57519",
    amount: "60037.4",
    creditIn: "Admin",
    debitOut: "RAMEES",
    date: "27/05/2025",
    time: "14:25:10",
  },
  {
    id: "97206",
    action: "debit",
    currentBalance: "21879342.97519",
    amount: "22515.275",
    creditIn: "Admin",
    debitOut: "RAMEES",
    date: "27/05/2025",
    time: "14:20:45",
  },
  {
    id: "97205",
    action: "credit",
    currentBalance: "21901858.25019",
    amount: "50031.5",
    creditIn: "RAMEES",
    debitOut: "Admin",
    date: "27/05/2025",
    time: "14:15:30",
  },
  {
    id: "97204",
    action: "debit",
    currentBalance: "21951889.75019",
    amount: "20013.8",
    creditIn: "Admin",
    debitOut: "RAMEES",
    date: "27/05/2025",
    time: "14:10:15",
  },
]

export function UserTransaction() {
  const [entriesPerPage, setEntriesPerPage] = useState("10")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.id.includes(searchTerm) ||
      transaction.creditIn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.debitOut.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalDebits = transactions.filter((t) => t.action === "debit").length
  const totalCredits = transactions.filter((t) => t.action === "credit").length
  const totalDebitAmount = transactions
    .filter((t) => t.action === "debit")
    .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0)
  const totalCreditAmount = transactions
    .filter((t) => t.action === "credit")
    .reduce((sum, t) => sum + Number.parseFloat(t.amount), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600 mt-1">Complete record of all account transactions</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{transactions.length}</div>
                <div className="text-sm text-gray-600">Total Transactions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalDebits}</div>
                <div className="text-sm text-gray-600">Debit Transactions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalCredits}</div>
                <div className="text-sm text-gray-600">Credit Transactions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">
                  ₹{Number.parseFloat(transactions[0]?.currentBalance || "0").toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Current Balance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-xl font-bold">Transaction Log</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 entries</SelectItem>
                  <SelectItem value="25">25 entries</SelectItem>
                  <SelectItem value="50">50 entries</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-gray-900">#{transaction.id}</div>
                      <div className="text-sm text-gray-500">
                        {transaction.date} {transaction.time}
                      </div>
                    </div>
                    <Badge
                      variant="default"
                      className={
                        transaction.action === "debit" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                      }
                    >
                      {transaction.action.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Amount:</span>
                      <span className="text-sm font-bold">
                        ₹{Number.parseFloat(transaction.amount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Current Balance:</span>
                      <span className="text-sm font-medium">
                        ₹{Number.parseFloat(transaction.currentBalance).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Credit In:</span>
                      <span className="text-sm">{transaction.creditIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Debit Out:</span>
                      <span className="text-sm">{transaction.debitOut}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Current Balance</TableHead>
                  <TableHead>Credit In</TableHead>
                  <TableHead>Debit Out</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.date}</div>
                        <div className="text-sm text-gray-500">{transaction.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="default"
                        className={
                          transaction.action === "debit" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }
                      >
                        {transaction.action.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ₹{Number.parseFloat(transaction.amount).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ₹{Number.parseFloat(transaction.currentBalance).toLocaleString()}
                    </TableCell>
                    <TableCell>{transaction.creditIn}</TableCell>
                    <TableCell>{transaction.debitOut}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="text-sm text-gray-600">
              Showing {filteredTransactions.length} of {transactions.length} entries
            </div>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="default" size="sm" className="bg-blue-500">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
