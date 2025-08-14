"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Check, X, Clock, MoreHorizontal, CheckCircle, XCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Initial balance requests data
const initialBalanceRequests = [
  {
    id: 1,
    user: "KDV",
    amount: 20000000,
    status: "Success",
    createdDate: "26-05-2025, 06:29",
    processedDate: "26-05-2025, 06:30",
  },
  {
    id: 2,
    user: "KDV222@GMAIL.COM",
    amount: 20000000,
    status: "Success",
    createdDate: "26-05-2025, 06:28",
    processedDate: "26-05-2025, 06:29",
  },
  {
    id: 3,
    user: "ANWER",
    amount: 20000000,
    status: "Pending",
    createdDate: "26-05-2025, 06:28",
    processedDate: null,
  },
  {
    id: 4,
    user: "SAFVAN",
    amount: 20000000,
    status: "Success",
    createdDate: "26-05-2025, 06:28",
    processedDate: "26-05-2025, 06:29",
  },
]

export function BalanceRequestManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [balanceRequests, setBalanceRequests] = useState(initialBalanceRequests)

  const filteredRequests = balanceRequests.filter((request) => {
    const matchesSearch = request.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalAcceptedAmount = balanceRequests
    .filter((req) => req.status === "Success")
    .reduce((sum, req) => sum + req.amount, 0)

  const pendingRequests = balanceRequests.filter((req) => req.status === "Pending").length

  // Handle approve request
  const handleApprove = (id: number) => {
    setBalanceRequests(balanceRequests.map(request => 
      request.id === id 
        ? { 
            ...request, 
            status: "Success", 
            processedDate: new Date().toLocaleDateString('en-GB') + ", " + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
          }
        : request
    ))
  }

  // Handle decline request
  const handleDecline = (id: number) => {
    setBalanceRequests(balanceRequests.map(request => 
      request.id === id 
        ? { 
            ...request, 
            status: "Denied", 
            processedDate: new Date().toLocaleDateString('en-GB') + ", " + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
          }
        : request
    ))
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Denied":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Balance Request Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Process and monitor balance requests</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Badge variant="secondary" className="text-sm sm:text-lg px-3 sm:px-4 py-2">
            Today Accepted: ₹{totalAcceptedAmount.toLocaleString()}
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balanceRequests.filter((req) => req.status === "Success").length}</div>
            <p className="text-xs text-muted-foreground">Successfully processed</p>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <Check className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">₹{totalAcceptedAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Approved amount</p>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Balance Requests</CardTitle>
          <CardDescription>{filteredRequests.length} requests found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by user name..."
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
                <SelectItem value="denied">Denied</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {filteredRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">{request.user}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{request.createdDate}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {request.status === "Pending" && (
                          <>
                            <DropdownMenuItem className="text-green-600" onClick={() => handleApprove(request.id)}>
                              <Check className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDecline(request.id)}>
                              <X className="h-4 w-4 mr-2" />
                              Deny
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Amount:</span>
                      <span className="text-sm font-bold">₹{request.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Status:</span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(request.status)}
                        <Badge
                          variant="default"
                          className={
                            request.status === "Success"
                              ? "bg-green-100 text-green-800"
                              : request.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                    </div>
                    {request.processedDate && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Processed:</span>
                        <span className="text-sm">{request.processedDate}</span>
                      </div>
                    )}
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
                  <TableHead>User Name</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Processed Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell className="max-w-xs truncate">{request.user}</TableCell>
                    <TableCell className="text-right font-medium">₹{request.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(request.status)}
                        <Badge
                          variant="default"
                          className={
                            request.status === "Success"
                              ? "bg-green-100 text-green-800"
                              : request.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{request.createdDate}</TableCell>
                    <TableCell>{request.processedDate || "-"}</TableCell>
                    <TableCell className="text-right">
                      {request.status === "Pending" ? (
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleApprove(request.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDecline(request.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          {getStatusIcon(request.status)}
                        </div>
                      )}
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
