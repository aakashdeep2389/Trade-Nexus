"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { usePortfolio } from "@/hooks/usePortfolio";
import { PortfolioChart } from "@/components/charts/PortfolioChart";
import { PnlChart } from "@/components/charts/PnlChart";
import { Badge } from "@/components/ui/Badge";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { formatCurrency, formatPercent, getPnlColor, cn } from "@/lib/utils";
import { useState } from "react";

type SortKey = "symbol" | "current_value" | "pnl" | "pnl_percent";
type SortDir = "asc" | "desc";

export default function PortfolioPage() {
  const { data: portfolio, isLoading } = usePortfolio();
  const [sortKey, setSortKey] = useState<SortKey>("current_value");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sorted = [...(portfolio?.holdings ?? [])].sort((a, b) => {
    const mult = sortDir === "asc" ? 1 : -1;
    if (sortKey === "symbol") return mult * a.symbol.localeCompare(b.symbol);
    return mult * (a[sortKey] - b[sortKey]);
  });

  if (isLoading) {
    return (
      <DashboardLayout title="Portfolio">
        <PageLoader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Portfolio">
      <div className="max-w-7xl mx-auto space-y-6">
        {portfolio && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Value",
                value: formatCurrency(portfolio.total_value),
                sub: null,
              },
              {
                label: "Invested",
                value: formatCurrency(portfolio.invested_value),
                sub: null,
              },
              {
                label: "Total P&L",
                value: formatCurrency(portfolio.total_pnl),
                sub: formatPercent(portfolio.total_pnl_percent),
                positive: portfolio.total_pnl >= 0,
              },
              {
                label: "Day P&L",
                value: formatCurrency(portfolio.day_pnl),
                sub: formatPercent(portfolio.day_pnl_percent),
                positive: portfolio.day_pnl >= 0,
              },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-bg-card border border-border-dark rounded-xl p-5"
              >
                <div className="text-xs text-text-secondary mb-2 uppercase tracking-wider">
                  {card.label}
                </div>
                <div className="text-xl font-bold text-text-primary">{card.value}</div>
                {card.sub && (
                  <div
                    className={cn(
                      "text-sm font-medium mt-1",
                      card.positive ? "text-green-trade" : "text-red-trade"
                    )}
                  >
                    {card.sub}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioChart />
          {portfolio && <PnlChart holdings={portfolio.holdings} />}
        </div>

        <div className="bg-bg-card border border-border-dark rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border-dark">
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Holdings ({sorted.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-dark">
                  {[
                    { key: "symbol", label: "Symbol" },
                    { key: null, label: "Company" },
                    { key: null, label: "Qty" },
                    { key: null, label: "Avg Price" },
                    { key: null, label: "LTP" },
                    { key: "current_value", label: "Value" },
                    { key: "pnl", label: "P&L" },
                    { key: "pnl_percent", label: "P&L %" },
                  ].map((col) => (
                    <th
                      key={col.label}
                      onClick={() => col.key && handleSort(col.key as SortKey)}
                      className={cn(
                        "text-left px-4 py-3 text-xs font-medium text-text-secondary",
                        col.key && "cursor-pointer hover:text-text-primary select-none"
                      )}
                    >
                      {col.label}
                      {col.key === sortKey && (sortDir === "asc" ? " ↑" : " ↓")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((holding) => (
                  <tr
                    key={holding.symbol}
                    className="border-b border-border-dark hover:bg-bg-card-hover transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-accent">
                        {holding.symbol}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">
                      {holding.company_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-primary">
                      {holding.quantity}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-primary">
                      {formatCurrency(holding.avg_buy_price)}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-primary">
                      {formatCurrency(holding.current_price)}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-text-primary">
                      {formatCurrency(holding.current_value)}
                    </td>
                    <td className={cn("px-4 py-3 text-sm font-medium", getPnlColor(holding.pnl))}>
                      {holding.pnl >= 0 ? "+" : ""}
                      {formatCurrency(holding.pnl)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={holding.pnl_percent >= 0 ? "green" : "red"}>
                        {formatPercent(holding.pnl_percent)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {sorted.length === 0 && (
              <div className="text-center py-12 text-text-secondary text-sm">
                No holdings yet. Start trading to build your portfolio.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
