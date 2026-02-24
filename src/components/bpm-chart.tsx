'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

type BpmDataPoint = {
  date: string
  bpm: number
}

export function BpmChart({ data }: { data: BpmDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickLine={false}
          axisLine={false}
          domain={['auto', 'auto']}
        />
        <Tooltip
          contentStyle={{
            fontSize: 12,
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
          }}
        />
        <Line
          type="monotone"
          dataKey="bpm"
          stroke="#18181b"
          strokeWidth={2}
          dot={{ fill: '#18181b', r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}