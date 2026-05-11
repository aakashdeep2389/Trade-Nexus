"use client";

import { useTradeHistory } from "@/hooks/useTrades";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export function RecentTrades() {
  const { data: trades, isLoading } = useTradeHistory();
  const recent = trades?.slice(0, 5) ?? [];

  return (
    <div className="bg-bg-card border border-border-dark rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
          Recent Trades
        </h2>
        <Link
          href="/history"
          className="text-xs text-accent hover:underline"
        >
          View all
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-bg-primary rounded animate-pulse" />
          ))}
        </div>
      ) : recent.length === 0 ? (
        <p className="text-text-secondary text-sm text-center py-8">
          No trades yet
        </p>
      ) : (
        <div className="space-y-2">
          {recent.map((trade) => (
            <div
              key={trade.id}
              className="flex items-center justify-between py-2 border-b border-border-dark last:border-0"
            >
              <div className="flex items-center gap-3">
                <Badge variant={trade.trade_type === "BUY" ? "green" : "red"}>
                  {trade.trade_type}
                </Badge>
                <div>
                  <div className="text-sm font-medium text-text-primary">
                    {trade.symbol}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {trade.quantity} shares @ {formatCurrency(trade.price)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-text-primary">
                  {formatCurrency(trade.total_value)}
                </div>
                <div className="text-xs text-text-secondary">
                  {new Date(trade.created_at).toLocaleDateString("en-IN")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
