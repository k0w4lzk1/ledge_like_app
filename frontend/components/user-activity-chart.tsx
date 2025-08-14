"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { user: "SAFVAN", transactions: 400, amount: 19106200 },
  { user: "RAMEES", transactions: 17, amount: 872700 },
  { user: "KDV", transactions: 135, amount: 5155300 },
  { user: "ANWER", transactions: 14, amount: 385000 },
]

export function UserActivityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="user" />
        <YAxis tickFormatter={(value) => `${value}`} />
        <Tooltip
          formatter={(value: number, name: string) => [
            name === "transactions" ? value : `₹${value.toLocaleString()}`,
            name === "transactions" ? "Transactions" : "Amount",
          ]}
        />
        <Bar dataKey="transactions" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}
