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
import { Plus, Search, Clock, CheckCircle, Calendar } from "lucide-react"

const initialBalanceRequests = [
  {
    id: 1,
    amount: "20000000",
    status: "Completed",
    createdAt: "09-05-2025, 11:07",
    processedAt: "09-05-2025, 11:15",
    requestType: "Balance Top-up",
  },
  {
    id: 2,
    amount: "20000000",
    status: "Completed",
    createdAt: "04-05-2025, 14:31",
    processedAt: "04-05-2025, 14:45",
    requestType: "Balance Top-up",
  },
  {
    id: 3,
    amount: "20000000",
    status: "Completed",
    createdAt: "19-04-2025, 11:49",
    processedAt: "19-04-2025, 12:00",
    requestType: "Balance Top-up",
  },
  {
    id: 4,
    amount: "2000000",
    status: "Pending",
    createdAt: "19-04-2025, 11:45",
    processedAt: null,
    requestType: "Balance Top-up",
  },
  {
    id: 5,
    amount: "2000000",
    status: "Rejected",
    createdAt: "18-04-2025, 11:28",
    processedAt: "18-04-2025, 15:30",
    requestType: "Balance Top-up",
  },
]

export function UserBalanceRequest() {
  const [balanceRequests, setBalanceRequests] = useState(initialBalanceRequests)
  const [entriesPerPage, setEntriesPerPage] = useState("10")
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newRequest, setNewRequest] = useState({
    amount: "",
    requestType: "Balance Top-up",
  })

  const handleAddRequest = () => {
    if (!newRequest.amount) return

    const currentDate = new Date()
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}, ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`
    
    const newId = Math.max(...balanceRequests.map(r => r.id)) + 1
    
    const requestToAdd = {
      id: newId,
      amount: newRequest.amount,
      status: "Pending" as const,
      createdAt: formattedDate,
      processedAt: null,
      requestType: newRequest.requestType,
    }

    setBalanceRequests([requestToAdd, ...balanceRequests])
    setNewRequest({ amount: "", requestType: "Balance Top-up" })
    setIsDialogOpen(false)
  }

  const filteredRequests = balanceRequests.filter(
    (request) => request.amount.includes(searchTerm) || request.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalRequests = balanceRequests.length
  const completedRequests = balanceRequests.filter((r) => r.status === "Completed").length
  const pendingRequests = balanceRequests.filter((r) => r.status === "Pending").length
  const totalAmount = balanceRequests
    .filter((r) => r.status === "Completed")
    .reduce((sum, r) => sum + Number.parseFloat(r.amount), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Balance Requests</h1>
          <p className="text-gray-600 mt-1">Manage your balance requests and track their status</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] mx-4 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Balance Request</DialogTitle>
              <DialogDescription>
                Submit a new balance request. Your request will be reviewed and processed by our team.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="amount" className="sm:text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={newRequest.amount}
                  onChange={(e) => setNewRequest({ ...newRequest, amount: e.target.value })}
                  className="sm:col-span-3"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="type" className="sm:text-right">
                  Type
                </Label>
                <Select
                  value={newRequest.requestType}
                  onValueChange={(value) => setNewRequest({ ...newRequest, requestType: value })}
                >
                  <SelectTrigger className="sm:col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Balance Top-up">Balance Top-up</SelectItem>
                    <SelectItem value="Emergency Request">Emergency Request</SelectItem>
                    <SelectItem value="Business Request">Business Request</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="button" onClick={handleAddRequest} className="w-full sm:w-auto">
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalRequests}</div>
                <div className="text-sm text-gray-600">Total Requests</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{completedRequests}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{pendingRequests}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Approved</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-xl font-bold">Request History</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search requests..."
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
            {filteredRequests.map((request) => (
              <Card key={request.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-gray-900">Request #{request.id}</div>
                      <div className="text-sm text-gray-500">{request.requestType}</div>
                    </div>
                    <Badge
                      variant="default"
                      className={
                        request.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : request.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Amount:</span>
                      <span className="text-sm font-bold">₹{Number.parseFloat(request.amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Created:</span>
                      <span className="text-sm">{request.createdAt}</span>
                    </div>
                    {request.processedAt && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Processed:</span>
                        <span className="text-sm">{request.processedAt}</span>
                      </div>
                    )}
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
                  <TableHead>Request Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Processed At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.requestType}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ₹{Number.parseFloat(request.amount).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="default"
                        className={
                          request.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : request.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{request.createdAt}</TableCell>
                    <TableCell>{request.processedAt || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="text-sm text-gray-600">
              Showing {filteredRequests.length} of {balanceRequests.length} entries
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
