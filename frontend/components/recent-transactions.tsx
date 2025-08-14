import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Eye } from "lucide-react"

const recentTransactions = [
  {
    id: "11574GU",
    user: "SAFVAN",
    bank: "CANARA BANK",
    amount: 50000,
    type: "NEFT",
    status: "Success",
    time: "2 mins ago",
  },
  {
    id: "WD4057A",
    user: "SAFVAN",
    bank: "BANK OF BARODA",
    amount: 50000,
    type: "NEFT",
    status: "Success",
    time: "5 mins ago",
  },
  {
    id: "O6156P2",
    user: "SAFVAN",
    bank: "CANARA BANK",
    amount: 50000,
    type: "NEFT",
    status: "Success",
    time: "8 mins ago",
  },
  {
    id: "QS531VH",
    user: "SAFVAN",
    bank: "KERALA STATE CO OPERATIVE BANK",
    amount: 22500,
    type: "NEFT",
    status: "Success",
    time: "12 mins ago",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-3 sm:p-4 border rounded-lg">
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
              <AvatarFallback className="text-xs sm:text-sm">{transaction.user.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                {transaction.user}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{transaction.bank}</p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
              ₹{transaction.amount.toLocaleString()}
            </p>
            <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {transaction.type}
              </Badge>
              <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                {transaction.status}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
