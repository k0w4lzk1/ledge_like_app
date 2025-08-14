"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const transactions = [
  {
    id: "11574GU",
    date: "27/05/2025",
    user: "SAFVAN",
    bank: "CANARA BANK",
    accountNumber: "597110400007",
    accountHolder: "MUHAMMED RAFEEK",
    ifsc: "CNRB0002823",
    amount: 50000,
    charge: 25,
    sgst: 2.25,
    cgst: 2.25,
    total: 50031.5,
    type: "NEFT",
    status: "Success",
  },
  {
    id: "WD4057A",
    date: "27/05/2025",
    user: "SAFVAN",
    bank: "BANK OF BARODA",
    accountNumber: "689901000172",
    accountHolder: "HAJIRA",
    ifsc: "BARB0NAJDEL",
    amount: 50000,
    charge: 25,
    sgst: 2.25,
    cgst: 2.25,
    total: 50031.5,
    type: "NEFT",
    status: "Success",
  },
]

export function TransactionManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const toggleTransaction = (id: string) => {
    setSelectedTransactions((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    setSelectedTransactions(
      selectedTransactions.length === filteredTransactions.length ? [] : filteredTransactions.map((t) => t.id),
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Transaction Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor and manage all financial transactions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>All Beneficiary Transactions</CardTitle>
          <CardDescription>
            {filteredTransactions.length} transactions found
            {selectedTransactions.length > 0 && ` • ${selectedTransactions.length} selected`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions, users, banks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedTransactions.includes(transaction.id)}
                        onCheckedChange={() => toggleTransaction(transaction.id)}
                      />
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">{transaction.id}</code>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">User:</span>
                      <span className="text-sm font-medium">{transaction.user}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Bank:</span>
                      <span className="text-sm font-medium truncate ml-2">{transaction.bank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Account Holder:</span>
                      <span className="text-sm font-medium truncate ml-2">{transaction.accountHolder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Amount:</span>
                      <span className="text-sm font-bold">₹{transaction.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Total:</span>
                      <span className="text-sm font-bold">₹{transaction.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{transaction.type}</Badge>
                      <Badge
                        variant="default"
                        className={
                          transaction.status === "Success"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedTransactions.length === filteredTransactions.length}
                      onCheckedChange={toggleAll}
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Account Holder</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedTransactions.includes(transaction.id)}
                        onCheckedChange={() => toggleTransaction(transaction.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">{transaction.id}</code>
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell className="max-w-xs truncate">{transaction.bank}</TableCell>
                    <TableCell className="max-w-xs truncate">{transaction.accountHolder}</TableCell>
                    <TableCell className="text-right">₹{transaction.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{transaction.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{transaction.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="default"
                        className={
                          transaction.status === "Success"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
