"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { usePortfolioHistory } from "@/hooks/usePortfolio";
import { formatCurrency } from "@/lib/utils";
import { PageLoader } from "@/components/ui/LoadingSpinner";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-card border border-border-dark rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-text-secondary mb-1">{label}</p>
      <p className="text-text-primary font-semibold">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

export function PortfolioChart() {
  const { data: history, isLoading } = usePortfolioHistory();

  if (isLoading) return <PageLoader />;

  return (
    <div className="bg-bg-card border border-border-dark rounded-xl p-5">
      <h3 className="text-sm font-semibold text-text-primary mb-5 uppercase tracking-wider">
        Portfolio Value History
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history ?? []}>
            <defs>
              <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6c63ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6c63ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3e" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#8892a4", fontSize: 11 }}
              axisLine={{ stroke: "#2a2d3e" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#8892a4", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6c63ff"
              strokeWidth={2}
              fill="url(#portfolioGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
