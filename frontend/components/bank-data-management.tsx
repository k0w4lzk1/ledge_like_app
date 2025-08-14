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
import { Plus, Search, Trash2, Edit, Download, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Initial bank data
const initialBankData = [
  { id: 1, name: "UNITY Small Finance", ifsc: "UNBA0000019", status: "Active" },
  { id: 2, name: "CSBK", ifsc: "CSBK0000001", status: "Active" },
  { id: 3, name: "BARODA U P GRAMIN BANK", ifsc: "BARB0BUPGBX", status: "Active" },
  { id: 4, name: "STCB BANK", ifsc: "STCB0000065", status: "Active" },
  { id: 5, name: "THE KANYAKUMARI DISTRICT BANK", ifsc: "TNSC0010300", status: "Active" },
]

export function BankDataManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [bankData, setBankData] = useState(initialBankData)
  const [editingBank, setEditingBank] = useState<any>(null)
  const [newBank, setNewBank] = useState({ name: "", ifsc: "" })

  const filteredBanks = bankData.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.ifsc.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Add new bank
  const handleAddBank = () => {
    if (newBank.name && newBank.ifsc) {
      const newId = Math.max(...bankData.map(b => b.id)) + 1
      setBankData([...bankData, {
        id: newId,
        name: newBank.name,
        ifsc: newBank.ifsc,
        status: "Active"
      }])
      setNewBank({ name: "", ifsc: "" })
      setIsAddDialogOpen(false)
    }
  }

  // Edit bank
  const handleEditBank = (bank: any) => {
    setEditingBank({ ...bank })
    setIsEditDialogOpen(true)
  }

  const handleUpdateBank = () => {
    if (editingBank) {
      setBankData(bankData.map(bank => 
        bank.id === editingBank.id ? editingBank : bank
      ))
      setEditingBank(null)
      setIsEditDialogOpen(false)
    }
  }

  // Delete bank
  const handleDeleteBank = (id: number) => {
    setBankData(bankData.filter(bank => bank.id !== id))
  }

  // Export to CSV
  const handleExport = () => {
    const headers = ["ID", "Bank Name", "IFSC Code", "Status"]
    const csvContent = [
      headers.join(","),
      ...filteredBanks.map(bank => 
        [bank.id, `"${bank.name}"`, bank.ifsc, bank.status].join(",")
      )
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `bank_data_${new Date().toISOString().split('T')[0]}.csv`)
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Bank Data Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage bank information and IFSC codes</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Bank
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] mx-4">
              <DialogHeader>
                <DialogTitle>Add New Bank</DialogTitle>
                <DialogDescription>Add a new bank to the system with its IFSC code.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input 
                    id="bank-name" 
                    placeholder="Enter bank name" 
                    value={newBank.name}
                    onChange={(e) => setNewBank({...newBank, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ifsc-code">IFSC Code</Label>
                  <Input 
                    id="ifsc-code" 
                    placeholder="Enter IFSC code" 
                    value={newBank.ifsc}
                    onChange={(e) => setNewBank({...newBank, ifsc: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button onClick={handleAddBank} className="w-full sm:w-auto">
                  Add Bank
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px] mx-4">
              <DialogHeader>
                <DialogTitle>Edit Bank</DialogTitle>
                <DialogDescription>Update bank information.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-bank-name">Bank Name</Label>
                  <Input 
                    id="edit-bank-name" 
                    placeholder="Enter bank name" 
                    value={editingBank?.name || ""}
                    onChange={(e) => setEditingBank({...editingBank, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-ifsc-code">IFSC Code</Label>
                  <Input 
                    id="edit-ifsc-code" 
                    placeholder="Enter IFSC code" 
                    value={editingBank?.ifsc || ""}
                    onChange={(e) => setEditingBank({...editingBank, ifsc: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button onClick={handleUpdateBank} className="w-full sm:w-auto">
                  Update Bank
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Bank List</CardTitle>
          <CardDescription>{filteredBanks.length} banks found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search banks or IFSC codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-4">
            {filteredBanks.map((bank) => (
              <Card key={bank.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">{bank.name}</h3>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-1 inline-block">
                        {bank.ifsc}
                      </code>
                      <div className="mt-2">
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          {bank.status}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditBank(bank)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteBank(bank.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Bank Name</TableHead>
                  <TableHead>IFSC Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBanks.map((bank) => (
                  <TableRow key={bank.id}>
                    <TableCell className="font-medium">{bank.id}</TableCell>
                    <TableCell className="max-w-xs truncate">{bank.name}</TableCell>
                    <TableCell>
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">{bank.ifsc}</code>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {bank.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditBank(bank)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteBank(bank.id)}>
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
