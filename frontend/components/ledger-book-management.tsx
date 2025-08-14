"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Download, Trash2, UserPlus, TrendingUp, MoreHorizontal, Edit } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Initial ledger data
const initialLedgerData = [
  {
    id: 1,
    name: "KDV222@GMAIL.COM",
    email: "KDV222@GMAIL.COM",
    todayTransactions: 771700.0,
    successfulTransactions: 0.0,
    balance: 30857315.23,
    status: "Active",
  },
  {
    id: 2,
    name: "KFC@GMAIL.COM",
    email: "KFC@GMAIL.COM",
    todayTransactions: 0.0,
    successfulTransactions: 0.0,
    balance: 18749000.38,
    status: "Active",
  },
  {
    id: 3,
    name: "EMERGENCY@GMAIL.COM",
    email: "EMERGENCY@GMAIL.COM",
    todayTransactions: 0.0,
    successfulTransactions: 0.0,
    balance: 9432155.18,
    status: "Active",
  },
  {
    id: 4,
    name: "SAFVAN",
    email: "safvan@gmail.com",
    todayTransactions: 19106200.0,
    successfulTransactions: 0.0,
    balance: 16103085.5,
    status: "Active",
  },
]

export function LedgerBookManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [ledgerData, setLedgerData] = useState(initialLedgerData)
  const [newUser, setNewUser] = useState({ name: "", email: "", balance: 0 })

  const filteredUsers = ledgerData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalBalance = filteredUsers.reduce((sum, user) => sum + user.balance, 0)
  const totalTodayTransactions = filteredUsers.reduce((sum, user) => sum + user.todayTransactions, 0)

  // Add new user
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const newId = Math.max(...ledgerData.map(u => u.id)) + 1
      setLedgerData([...ledgerData, {
        id: newId,
        name: newUser.name,
        email: newUser.email,
        todayTransactions: 0.0,
        successfulTransactions: 0.0,
        balance: newUser.balance,
        status: "Active"
      }])
      setNewUser({ name: "", email: "", balance: 0 })
      setIsAddDialogOpen(false)
    }
  }

  // Delete user
  const handleDeleteUser = (id: number) => {
    setLedgerData(ledgerData.filter(user => user.id !== id))
  }

  // Export to CSV
  const handleExport = () => {
    const headers = ["ID", "Name", "Email", "Today's Transactions", "Current Balance", "Status"]
    const csvContent = [
      headers.join(","),
      ...filteredUsers.map(user => 
        [
          user.id, 
          `"${user.name}"`, 
          `"${user.email}"`, 
          user.todayTransactions, 
          user.balance, 
          user.status
        ].join(",")
      )
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `ledger_users_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Ledger Book Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage user accounts and balances</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] mx-4">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Add a new user account to the ledger system.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="user-name">Full Name</Label>
                  <Input 
                    id="user-name" 
                    placeholder="Enter full name" 
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="user-email">Email Address</Label>
                  <Input 
                    id="user-email" 
                    type="email"
                    placeholder="Enter email address" 
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="user-balance">Initial Balance</Label>
                  <Input 
                    id="user-balance" 
                    type="number"
                    placeholder="Enter initial balance" 
                    value={newUser.balance}
                    onChange={(e) => setNewUser({...newUser, balance: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button onClick={handleAddUser} className="w-full sm:w-auto">
                  Add User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredUsers.length}</div>
            <p className="text-xs text-muted-foreground">Active accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">₹{totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all accounts</p>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Activity</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">₹{totalTodayTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Transaction volume</p>
          </CardContent>
        </Card>
      </div>

      {/* User Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
          <CardDescription>{filteredUsers.length} users found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">{user.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Today's Transactions:</span>
                      <span className="text-sm font-medium">
                        {user.todayTransactions > 0 ? (
                          <span className="flex items-center">
                            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />₹
                            {user.todayTransactions.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-gray-400">₹0.00</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Current Balance:</span>
                      <span className="text-sm font-bold">₹{user.balance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Status:</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {user.status}
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
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Today's Transactions</TableHead>
                  <TableHead className="text-right">Current Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell className="max-w-xs truncate">{user.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{user.email}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        {user.todayTransactions > 0 && <TrendingUp className="h-4 w-4 text-green-500 mr-1" />}₹
                        {user.todayTransactions.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">₹{user.balance.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteUser(user.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
