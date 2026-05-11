"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  useWatchlist,
  useAddToWatchlist,
  useRemoveFromWatchlist,
} from "@/hooks/useWatchlist";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";

export default function WatchlistPage() {
  const [inputSymbol, setInputSymbol] = useState("");
  const { data: items, isLoading } = useWatchlist();
  const { mutate: addSymbol, isPending: isAdding } = useAddToWatchlist();
  const { mutate: removeSymbol } = useRemoveFromWatchlist();

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!inputSymbol.trim()) return;
    addSymbol(inputSymbol.trim().toUpperCase());
    setInputSymbol("");
  }

  return (
    <DashboardLayout title="Watchlist">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-bg-card border border-border-dark rounded-xl p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
            Add Symbol
          </h3>
          <form onSubmit={handleAdd} className="flex gap-3">
            <input
              type="text"
              value={inputSymbol}
              onChange={(e) => setInputSymbol(e.target.value)}
              placeholder="Enter stock symbol (e.g. TATAMOTORS)"
              className="flex-1 bg-bg-primary border border-border-dark rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              disabled={isAdding || !inputSymbol.trim()}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              {isAdding ? "Adding..." : "Add"}
            </button>
          </form>
        </div>

        <div className="bg-bg-card border border-border-dark rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border-dark">
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Watchlist ({items?.length ?? 0})
            </h3>
          </div>

          {isLoading ? (
            <div className="p-6">
              <PageLoader />
            </div>
          ) : items?.length === 0 ? (
            <div className="py-16 text-center text-text-secondary text-sm">
              Your watchlist is empty. Add symbols to start tracking.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-dark">
                    {["Symbol", "Company", "Price", "Change", "Volume", "Market Cap", "Actions"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-3 text-xs font-medium text-text-secondary"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {items?.map((item) => (
                    <tr
                      key={item.symbol}
                      className="border-b border-border-dark hover:bg-bg-card-hover transition-colors"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/trade?symbol=${item.symbol}`}
                          className="text-sm font-bold text-accent hover:underline"
                        >
                          {item.symbol}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary">
                        {item.company_name}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-text-primary">
                        {formatCurrency(item.current_price)}
                      </td>
                      <td className="px-4 py-3">
                        <div
                          className={cn(
                            "flex items-center gap-1 text-sm font-medium",
                            item.change >= 0 ? "text-green-trade" : "text-red-trade"
                          )}
                        >
                          {item.change >= 0 ? (
                            <TrendingUp className="w-3.5 h-3.5" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5" />
                          )}
                          {formatPercent(item.change_percent)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary">
                        {item.volume.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary">
                        {item.market_cap}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/trade?symbol=${item.symbol}`}
                            className="text-xs bg-accent/10 text-accent hover:bg-accent/20 px-2.5 py-1 rounded transition-colors"
                          >
                            Trade
                          </Link>
                          <button
                            onClick={() => removeSymbol(item.symbol)}
                            className="p-1.5 text-text-secondary hover:text-red-trade hover:bg-red-trade/10 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
