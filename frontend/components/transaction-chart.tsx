"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { day: "Mon", amount: 25922282 },
  { day: "Tue", amount: 18500000 },
  { day: "Wed", amount: 32100000 },
  { day: "Thu", amount: 28900000 },
  { day: "Fri", amount: 35200000 },
  { day: "Sat", amount: 22800000 },
  { day: "Sun", amount: 19600000 },
]

export function TransactionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="day" />
        <YAxis tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`} />
        <Tooltip
          formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]}
          labelFormatter={(label) => `Day: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
