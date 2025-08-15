"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Download, Search, Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const initialTransactions = [
  {
    id: 1,
    date: "27/05/2025",
    bankName: "FEDERAL BANK",
    accountNumber: "213601004012",
    accountHolder: "ANSHID ALI K M",
    ifscCode: "FDRL0000001",
    amount: "25000.00",
    transactionType: "NEFT",
    remark: "RMS",
    status: "Completed",
  },
  {
    id: 2,
    date: "27/05/2025",
    bankName: "FEDERAL BANK",
    accountNumber: "207901004524",
    accountHolder: "SHABEEB K V",
    ifscCode: "FDRL0000001",
    amount: "60000.00",
    transactionType: "NEFT",
    remark: "RMS",
    status: "Completed",
  },
  {
    id: 3,
    date: "27/05/2025",
    bankName: "SOUTH INDIAN BANK",
    accountNumber: "555605300056396",
    accountHolder: "NABIL KUNNIL MOHAMMED",
    ifscCode: "SIBL0000153",
    amount: "22500.00",
    transactionType: "NEFT",
    remark: "RMS",
    status: "Pending",
  },
]

export function UserTodayPayOut() {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [entriesPerPage, setEntriesPerPage] = useState("10")
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    ifscCode: "",
    amount: "",
    transactionType: "NEFT",
    remark: "",
  })

  const handleAddTransaction = () => {
    if (!newTransaction.bankName || !newTransaction.accountNumber || !newTransaction.accountHolder || !newTransaction.amount) {
      return
    }

    const currentDate = new Date()
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`
    
    const newId = Math.max(...transactions.map(t => t.id)) + 1
    
    const transactionToAdd = {
      id: newId,
      date: formattedDate,
      bankName: newTransaction.bankName,
      accountNumber: newTransaction.accountNumber,
      accountHolder: newTransaction.accountHolder,
      ifscCode: newTransaction.ifscCode,
      amount: newTransaction.amount,
      transactionType: newTransaction.transactionType,
      remark: newTransaction.remark,
      status: "Pending" as const,
    }

    setTransactions([transactionToAdd, ...transactions])
    setNewTransaction({
      bankName: "",
      accountNumber: "",
      accountHolder: "",
      ifscCode: "",
      amount: "",
      transactionType: "NEFT",
      remark: "",
    })
    setIsDialogOpen(false)
  }

  const handleDownloadExcel = () => {
    const headers = ["Date", "Bank Name", "Account Number", "Account Holder", "IFSC Code", "Amount", "Transaction Type", "Remark", "Status"]
    const csvContent = [
      headers.join(","),
      ...transactions.map(transaction => [
        transaction.date,
        `"${transaction.bankName}"`,
        transaction.accountNumber,
        `"${transaction.accountHolder}"`,
        transaction.ifscCode,
        transaction.amount,
        transaction.transactionType,
        `"${transaction.remark}"`,
        transaction.status
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `today_payout_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.accountHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.accountNumber.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Today's Pay Out</h1>
          <p className="text-gray-600 mt-1">Manage today's payment transactions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] mx-4 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Payout Transaction</DialogTitle>
                <DialogDescription>
                  Enter the details for a new payout transaction.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                  <Label htmlFor="bankName" className="sm:text-right">
                    Bank Name
                  </Label>
                  <Input
                    id="bankName"
                    placeholder="Enter bank name"
                    value={newTransaction.bankName}
                    onChange={(e) => setNewTransaction({ ...newTransaction, bankName: e.target.value })}
                    className="sm:col-span-3"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                  <Label htmlFor="accountNumber" className="sm:text-right">
                    Account Number
                  </Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter account number"
                    value={newTransaction.accountNumber}
                    onChange={(e) => setNewTransaction({ ...newTransaction, accountNumber: e.target.value })}
                    className="sm:col-span-3"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                  <Label htmlFor="accountHolder" className="sm:text-right">
                    Account Holder
                  </Label>
                  <Input
                    id="accountHolder"
                    placeholder="Enter account holder name"
                    value={newTransaction.accountHolder}
                    onChange={(e) => setNewTransaction({ ...newTransaction, accountHolder: e.target.value })}
                    className="sm:col-span-3"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                  <Label htmlFor="ifscCode" className="sm:text-right">
                    IFSC Code
                  </Label>
                  <Input
                    id="ifscCode"
                    placeholder="Enter IFSC code"
                    value={newTransaction.ifscCode}
                    onChange={(e) => setNewTransaction({ ...newTransaction, ifscCode: e.target.value })}
                    className="sm:col-span-3"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                  <Label htmlFor="amount" className="sm:text-right">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="sm:col-span-3"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                  <Label htmlFor="transactionType" className="sm:text-right">
                    Type
                  </Label>
                  <Select
                    value={newTransaction.transactionType}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, transactionType: value })}
                  >
                    <SelectTrigger className="sm:col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEFT">NEFT</SelectItem>
                      <SelectItem value="RTGS">RTGS</SelectItem>
                      <SelectItem value="IMPS">IMPS</SelectItem>
                      <SelectItem value="UPI">UPI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                  <Label htmlFor="remark" className="sm:text-right">
                    Remark
                  </Label>
                  <Input
                    id="remark"
                    placeholder="Enter remark"
                    value={newTransaction.remark}
                    onChange={(e) => setNewTransaction({ ...newTransaction, remark: e.target.value })}
                    className="sm:col-span-3"
                  />
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button type="button" onClick={handleAddTransaction} className="w-full sm:w-auto">
                  Add Transaction
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={handleDownloadExcel} className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Download Excel
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{transactions.length}</div>
            <div className="text-sm text-gray-600">Total Transactions</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">
              ₹{transactions.reduce((sum, t) => sum + Number.parseFloat(t.amount), 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Amount</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">
              {transactions.filter((t) => t.status === "Completed").length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-xl font-bold">Transaction List</CardTitle>
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
                      <div className="text-sm text-gray-500">{transaction.date}</div>
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
                      <span className="text-sm text-gray-500">Bank:</span>
                      <span className="text-sm font-medium">{transaction.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Account:</span>
                      <span className="text-sm font-medium">{transaction.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Holder:</span>
                      <span className="text-sm font-medium">{transaction.accountHolder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Amount:</span>
                      <span className="text-sm font-bold">₹{transaction.amount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Status:</span>
                      <Badge
                        variant={transaction.status === "Completed" ? "default" : "secondary"}
                        className={
                          transaction.status === "Completed"
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
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Bank Name</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Account Holder</TableHead>
                  <TableHead>IFSC Code</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell className="max-w-xs truncate">{transaction.bankName}</TableCell>
                    <TableCell>{transaction.accountNumber}</TableCell>
                    <TableCell className="max-w-xs truncate">{transaction.accountHolder}</TableCell>
                    <TableCell>{transaction.ifscCode}</TableCell>
                    <TableCell className="text-right font-semibold">₹{transaction.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.transactionType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={transaction.status === "Completed" ? "default" : "secondary"}
                        className={
                          transaction.status === "Completed"
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
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
