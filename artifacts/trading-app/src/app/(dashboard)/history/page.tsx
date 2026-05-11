"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useTradeHistory } from "@/hooks/useTrades";
import { Badge } from "@/components/ui/Badge";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { formatCurrency, cn } from "@/lib/utils";
import type { Trade } from "@/types";

type SortKey = "created_at" | "symbol" | "total_value" | "quantity";
type SortDir = "asc" | "desc";
type FilterType = "ALL" | "BUY" | "SELL";

export default function HistoryPage() {
  const { data: trades, isLoading } = useTradeHistory();
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [search, setSearch] = useState("");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const filtered = (trades ?? [])
    .filter((t) => filter === "ALL" || t.trade_type === filter)
    .filter(
      (t) =>
        !search || t.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const mult = sortDir === "asc" ? 1 : -1;
      if (sortKey === "created_at")
        return mult * (new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      if (sortKey === "symbol") return mult * a.symbol.localeCompare(b.symbol);
      return mult * (a[sortKey] - b[sortKey]);
    });

  const totalBought = filtered
    .filter((t) => t.trade_type === "BUY")
    .reduce((sum, t) => sum + t.total_value, 0);
  const totalSold = filtered
    .filter((t) => t.trade_type === "SELL")
    .reduce((sum, t) => sum + t.total_value, 0);

  return (
    <DashboardLayout title="Trade History">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-bg-card border border-border-dark rounded-xl p-4">
            <div className="text-xs text-text-secondary mb-1 uppercase">Total Trades</div>
            <div className="text-xl font-bold text-text-primary">{trades?.length ?? 0}</div>
          </div>
          <div className="bg-bg-card border border-border-dark rounded-xl p-4">
            <div className="text-xs text-text-secondary mb-1 uppercase">Buy Orders</div>
            <div className="text-xl font-bold text-green-trade">
              {trades?.filter((t) => t.trade_type === "BUY").length ?? 0}
            </div>
          </div>
          <div className="bg-bg-card border border-border-dark rounded-xl p-4">
            <div className="text-xs text-text-secondary mb-1 uppercase">Sell Orders</div>
            <div className="text-xl font-bold text-red-trade">
              {trades?.filter((t) => t.trade_type === "SELL").length ?? 0}
            </div>
          </div>
          <div className="bg-bg-card border border-border-dark rounded-xl p-4">
            <div className="text-xs text-text-secondary mb-1 uppercase">Total Volume</div>
            <div className="text-xl font-bold text-text-primary">
              {formatCurrency(totalBought + totalSold)}
            </div>
          </div>
        </div>

        <div className="bg-bg-card border border-border-dark rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border-dark flex flex-wrap items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              {(["ALL", "BUY", "SELL"] as FilterType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    filter === f
                      ? "bg-accent text-white"
                      : "text-text-secondary hover:text-text-primary bg-bg-primary"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search symbol..."
              className="bg-bg-primary border border-border-dark rounded-lg px-3 py-1.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors w-44"
            />
          </div>

          {isLoading ? (
            <div className="p-6">
              <PageLoader />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-dark">
                    {[
                      { key: "symbol", label: "Symbol" },
                      { key: null, label: "Type" },
                      { key: "quantity", label: "Qty" },
                      { key: null, label: "Price" },
                      { key: "total_value", label: "Total" },
                      { key: null, label: "Status" },
                      { key: "created_at", label: "Date" },
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
                  {filtered.map((trade) => (
                    <tr
                      key={trade.id}
                      className="border-b border-border-dark hover:bg-bg-card-hover transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-accent">
                          {trade.symbol}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={trade.trade_type === "BUY" ? "green" : "red"}>
                          {trade.trade_type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        {trade.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        {formatCurrency(trade.price)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-text-primary">
                        {formatCurrency(trade.total_value)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            trade.status === "EXECUTED"
                              ? "green"
                              : trade.status === "CANCELLED"
                              ? "red"
                              : "neutral"
                          }
                        >
                          {trade.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary">
                        {new Date(trade.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-12 text-text-secondary text-sm">
                  No trades found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
