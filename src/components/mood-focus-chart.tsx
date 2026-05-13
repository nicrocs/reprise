'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type MoodFocusPoint = {
  date: string
  mood: number | null
  focus: number | null
}

type Props = {
  data: MoodFocusPoint[]
}

export function MoodFocusChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
        <CartesianGrid stroke="#f3ebe3" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: '#9d724f' }}
          tickLine={false}
          axisLine={false}
          minTickGap={28}
        />
        <YAxis
          domain={[1, 5]}
          ticks={[1, 2, 3, 4, 5]}
          tick={{ fontSize: 11, fill: '#9d724f' }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          formatter={(value: number | null, name: string) => [
            value === null ? 'No rating' : value.toFixed(1),
            name === 'mood' ? 'Mood' : 'Focus',
          ]}
          contentStyle={{
            border: '1px solid #ecd7c4',
            borderRadius: '12px',
            backgroundColor: '#fffaf5',
            fontSize: 12,
          }}
          labelStyle={{ color: '#6f4d36', fontWeight: 600 }}
        />
        <Line
          type="monotone"
          dataKey="mood"
          stroke="#b85c2a"
          strokeWidth={2.5}
          dot={{ r: 2.5, fill: '#b85c2a' }}
          activeDot={{ r: 4 }}
          connectNulls={false}
        />
        <Line
          type="monotone"
          dataKey="focus"
          stroke="#5f7a65"
          strokeWidth={2.5}
          dot={{ r: 2.5, fill: '#5f7a65' }}
          activeDot={{ r: 4 }}
          connectNulls={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
