"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import type { Holding } from "@/types";

interface PnlChartProps {
  holdings: Holding[];
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  return (
    <div className="bg-bg-card border border-border-dark rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-text-secondary mb-1">{label}</p>
      <p className={val >= 0 ? "text-green-trade font-semibold" : "text-red-trade font-semibold"}>
        {formatCurrency(val)}
      </p>
    </div>
  );
}

export function PnlChart({ holdings }: PnlChartProps) {
  const data = holdings.map((h) => ({
    symbol: h.symbol,
    pnl: h.pnl,
  }));

  return (
    <div className="bg-bg-card border border-border-dark rounded-xl p-5">
      <h3 className="text-sm font-semibold text-text-primary mb-5 uppercase tracking-wider">
        P&L by Stock
      </h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3e" vertical={false} />
            <XAxis
              dataKey="symbol"
              tick={{ fill: "#8892a4", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#8892a4", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.pnl >= 0 ? "#00c896" : "#ff4757"}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
