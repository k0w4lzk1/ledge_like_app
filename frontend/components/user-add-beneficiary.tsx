"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { UserPlus, CheckCircle, AlertCircle, Trash2, Eye, Users } from "lucide-react"

interface Beneficiary {
  id: string
  name: string
  ifscCode: string
  accountNumber: string
  amount: string
  addedAt: string
  timestamp: number
}

export function UserAddBeneficiary() {
  const [formData, setFormData] = useState({
    name: "",
    ifscCode: "",
    accountNumber: "",
    amount: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    // Validation
    if (!formData.name || !formData.ifscCode || !formData.accountNumber || !formData.amount) {
      setMessage({ type: "error", text: "Please fill in all fields" })
      setIsSubmitting(false)
      return
    }

    if (formData.ifscCode.length !== 11) {
      setMessage({ type: "error", text: "IFSC code must be 11 characters long" })
      setIsSubmitting(false)
      return
    }

    if (Number.parseFloat(formData.amount) <= 0) {
      setMessage({ type: "error", text: "Amount must be greater than 0" })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // Add beneficiary to list
      const timestamp = Date.now()
      const newBeneficiary: Beneficiary = {
        id: timestamp.toString(),
        name: formData.name.trim(),
        ifscCode: formData.ifscCode.toUpperCase(),
        accountNumber: formData.accountNumber,
        amount: formData.amount,
        addedAt: new Date().toLocaleString(),
        timestamp,
      }

      setBeneficiaries((prev) => [newBeneficiary, ...prev]) // Add to beginning for latest first

      // Reset form
      setFormData({
        name: "",
        ifscCode: "",
        accountNumber: "",
        amount: "",
      })

      setMessage({ type: "success", text: "Beneficiary added successfully!" })
    } catch (error) {
      setMessage({ type: "error", text: "Failed to add beneficiary. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setMessage(null)
  }

  const removeBeneficiary = (id: string) => {
    setBeneficiaries((prev) => prev.filter((b) => b.id !== id))
    setMessage({ type: "success", text: "Beneficiary removed successfully!" })
  }

  // Sort beneficiaries by timestamp (latest first)
  const sortedBeneficiaries = [...beneficiaries].sort((a, b) => b.timestamp - a.timestamp)

  return (
    <div className="space-y-6 max-w-full">
      {/* Header with Total Count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add Beneficiary</h1>
          <p className="text-gray-600 mt-1">Add new beneficiaries for quick transactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full shadow-sm">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="font-semibold">Total: {beneficiaries.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Add Beneficiary Form */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5 text-blue-600" />
              <span>Add New Beneficiary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Beneficiary Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="e.g., John Doe"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-gray-500">Full name of the beneficiary</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ifscCode">
                    IFSC Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ifscCode"
                    type="text"
                    placeholder="e.g., SBIN0001234"
                    value={formData.ifscCode}
                    onChange={(e) => handleChange("ifscCode", e.target.value.toUpperCase())}
                    disabled={isSubmitting}
                    maxLength={11}
                    className="font-mono"
                  />
                  <p className="text-xs text-gray-500">11-character bank IFSC code</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">
                    Account Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="accountNumber"
                    type="text"
                    placeholder="e.g., 1234567890123456"
                    value={formData.accountNumber}
                    onChange={(e) => handleChange("accountNumber", e.target.value)}
                    disabled={isSubmitting}
                    className="font-mono"
                  />
                  <p className="text-xs text-gray-500">Beneficiary's bank account number</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">
                    Amount (₹) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="e.g., 10000"
                    value={formData.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    disabled={isSubmitting}
                    min="1"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500">Transaction amount in Indian Rupees</p>
                </div>
              </div>

              {/* Message */}
              {message && (
                <Alert variant={message.type === "error" ? "destructive" : "default"}>
                  {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding Beneficiary...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Beneficiary
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Beneficiaries List */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Beneficiaries</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {beneficiaries.length} beneficiaries
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {beneficiaries.length === 0 ? (
              <div className="text-center py-8">
                <UserPlus className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Beneficiaries Added</h3>
                <p className="text-gray-500">Add your first beneficiary using the form on the left.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {sortedBeneficiaries.map((beneficiary, index) => (
                  <div
                    key={beneficiary.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            #{index + 1}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {beneficiary.ifscCode}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-gray-900">{beneficiary.name}</div>
                          <div className="text-sm">
                            <span className="text-gray-500">Account:</span>
                            <span className="ml-2 font-mono">{beneficiary.accountNumber}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">Amount:</span>
                            <span className="ml-2 font-semibold text-green-600">
                              ₹{Number.parseFloat(beneficiary.amount).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">Added: {beneficiary.addedAt}</div>
                        </div>
                      </div>
                      <div className="flex space-x-1 ml-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          onClick={() => removeBeneficiary(beneficiary.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      {beneficiaries.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{beneficiaries.length}</div>
              <div className="text-sm text-gray-600">Total Beneficiaries</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">
                ₹{beneficiaries.reduce((sum, b) => sum + Number.parseFloat(b.amount), 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Amount</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">
                {new Set(beneficiaries.map((b) => b.ifscCode)).size}
              </div>
              <div className="text-sm text-gray-600">Unique Banks</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
