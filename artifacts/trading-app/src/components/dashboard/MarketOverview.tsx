"use client";

import { useMarketOverview } from "@/hooks/useMarket";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export function MarketOverview() {
  const { data, isLoading } = useMarketOverview();

  return (
    <div className="bg-bg-card border border-border-dark rounded-xl p-5">
      <h2 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
        Market Overview
      </h2>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-8 bg-bg-primary rounded animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {data?.indices.map((index) => (
            <div
              key={index.name}
              className="flex items-center justify-between py-2 border-b border-border-dark last:border-0"
            >
              <span className="text-sm font-medium text-text-primary">
                {index.name}
              </span>
              <div className="text-right">
                <div className="text-sm font-semibold text-text-primary">
                  {index.value.toLocaleString("en-IN")}
                </div>
                <div
                  className={cn(
                    "text-xs flex items-center gap-0.5 justify-end",
                    index.change >= 0 ? "text-green-trade" : "text-red-trade"
                  )}
                >
                  {index.change >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {formatPercent(index.change_percent)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
