"use client";

import { StatCard } from "@/components/ui/StatCard";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { useDashboardStats } from "@/hooks/usePortfolio";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Wallet, TrendingUp, Activity, BarChart2 } from "lucide-react";

export function StatsGrid() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) return <PageLoader />;

  if (!stats)
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-bg-card border border-border-dark rounded-xl p-5 animate-pulse h-28"
          />
        ))}
      </div>
    );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Portfolio Value"
        value={formatCurrency(stats.portfolio_value)}
        change={stats.day_pnl_percent}
        changeLabel="today"
        icon={Wallet}
      />
      <StatCard
        title="Day P&L"
        value={formatCurrency(stats.day_pnl)}
        change={stats.day_pnl_percent}
        icon={TrendingUp}
      />
      <StatCard
        title="Total P&L"
        value={formatCurrency(stats.total_pnl)}
        change={stats.total_pnl_percent > 0 ? stats.total_pnl_percent : undefined}
        icon={BarChart2}
      />
      <StatCard
        title="Active Positions"
        value={stats.active_positions}
        changeLabel={`${stats.total_trades} total trades`}
        icon={Activity}
      />
    </div>
  );
}
