"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface ProbabilityChartProps {
  data: { n: number; probability: number }[]
  highlightN?: number
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: { n: number; probability: number } }>
}) {
  if (!active || !payload?.length) return null
  const { n, probability } = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground">
        {n} booster{n !== 1 ? "s" : ""}
      </p>
      <p className="text-sm font-semibold text-foreground">
        {(probability * 100).toFixed(2)}% chance
      </p>
    </div>
  )
}

export function ProbabilityChart({ data, highlightN }: ProbabilityChartProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="probGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(220, 14%, 18%)"
          vertical={false}
        />
        <XAxis
          dataKey="n"
          stroke="hsl(215, 15%, 55%)"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          label={{
            value: "Boosters Opened",
            position: "insideBottom",
            offset: -2,
            style: { fill: "hsl(215, 15%, 55%)", fontSize: 11 },
          }}
        />
        <YAxis
          stroke="hsl(215, 15%, 55%)"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
          domain={[0, 1]}
          ticks={[0, 0.25, 0.5, 0.75, 1]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="probability"
          stroke="hsl(38, 92%, 55%)"
          strokeWidth={2}
          fill="url(#probGradient)"
          dot={false}
          activeDot={{
            r: 4,
            fill: "hsl(38, 92%, 55%)",
            stroke: "hsl(220, 20%, 6%)",
            strokeWidth: 2,
          }}
        />
        {highlightN && (
          <ReferenceLine
            x={highlightN}
            stroke="hsl(200, 80%, 50%)"
            strokeDasharray="4 4"
            strokeWidth={1.5}
          />
        )}
        <ReferenceLine
          y={0.5}
          stroke="hsl(215, 15%, 35%)"
          strokeDasharray="2 4"
          strokeWidth={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
