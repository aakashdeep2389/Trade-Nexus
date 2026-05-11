"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TradingViewChart } from "@/components/trade/TradingViewChart";
import { OrderForm } from "@/components/trade/OrderForm";
import { OrderBook } from "@/components/trade/OrderBook";
import { useStockQuote } from "@/hooks/useMarket";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import { Search } from "lucide-react";

const POPULAR_STOCKS = ["RELIANCE", "TCS", "INFY", "HDFCBANK", "ICICIBANK", "SBIN", "WIPRO", "BHARTIARTL"];

export default function TradePage() {
  const [symbol, setSymbol] = useState("RELIANCE");
  const [searchInput, setSearchInput] = useState("");
  const { data: quote } = useStockQuote(symbol);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchInput.trim()) {
      setSymbol(searchInput.trim().toUpperCase());
      setSearchInput("");
    }
  }

  return (
    <DashboardLayout title="Trade">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="bg-bg-card border border-border-dark rounded-xl p-4">
          <div className="flex flex-wrap items-center gap-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter symbol (e.g. TATAMOTORS)"
                  className="bg-bg-primary border border-border-dark rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent w-56 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="bg-accent/20 text-accent border border-accent/20 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/30 transition-colors"
              >
                Go
              </button>
            </form>

            <div className="flex flex-wrap gap-1.5">
              {POPULAR_STOCKS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSymbol(s)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                    symbol === s
                      ? "bg-accent text-white"
                      : "bg-bg-primary text-text-secondary hover:text-text-primary hover:bg-bg-card-hover border border-border-dark"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>

            {quote && (
              <div className="ml-auto flex items-center gap-4">
                <span className="text-text-primary font-bold text-lg">
                  {formatCurrency(quote.current_price)}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    quote.change >= 0 ? "text-green-trade" : "text-red-trade"
                  )}
                >
                  {formatPercent(quote.change_percent)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 bg-bg-card border border-border-dark rounded-xl overflow-hidden h-[500px]">
            <TradingViewChart symbol={symbol} />
          </div>
          <div className="space-y-4">
            <OrderForm symbol={symbol} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1">
            <OrderBook symbol={symbol} />
          </div>
          <div className="lg:col-span-3 bg-bg-card border border-border-dark rounded-xl p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
              Stock Info
            </h3>
            {quote ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Symbol", value: quote.symbol },
                  { label: "Company", value: quote.company_name },
                  {
                    label: "LTP",
                    value: formatCurrency(quote.current_price),
                  },
                  {
                    label: "Change",
                    value: (
                      <span
                        className={quote.change >= 0 ? "text-green-trade" : "text-red-trade"}
                      >
                        {formatPercent(quote.change_percent)}
                      </span>
                    ),
                  },
                  { label: "Volume", value: quote.volume.toLocaleString("en-IN") },
                ].map((item) => (
                  <div key={item.label} className="bg-bg-primary rounded-lg p-3">
                    <div className="text-xs text-text-secondary mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-text-primary">{item.value}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-bg-primary rounded-lg animate-pulse" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
