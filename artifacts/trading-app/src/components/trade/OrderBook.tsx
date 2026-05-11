"use client";

import { useOrderBook } from "@/hooks/useMarket";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface OrderBookProps {
  symbol: string;
}

export function OrderBook({ symbol }: OrderBookProps) {
  const { data: book, isLoading } = useOrderBook(symbol);

  if (isLoading) {
    return (
      <div className="bg-bg-card border border-border-dark rounded-xl p-5 flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  const maxQty = Math.max(
    ...(book?.bids.map((b) => b.quantity) ?? [1]),
    ...(book?.asks.map((a) => a.quantity) ?? [1])
  );

  return (
    <div className="bg-bg-card border border-border-dark rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
          Order Book
        </h3>
        {book && (
          <span className="text-xs text-text-secondary">
            Spread: {formatCurrency(book.spread)}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-1 text-xs font-medium text-text-secondary mb-2 pb-2 border-b border-border-dark">
        <span>Qty</span>
        <span className="text-center">Price</span>
        <span className="text-right">Orders</span>
      </div>

      <div className="space-y-0.5 mb-3">
        {book?.asks
          .slice()
          .reverse()
          .map((ask, i) => (
            <div key={i} className="relative grid grid-cols-3 gap-1 text-xs py-0.5">
              <div
                className="absolute inset-0 bg-red-trade/10 rounded"
                style={{ width: `${(ask.quantity / maxQty) * 100}%` }}
              />
              <span className="relative text-text-primary">
                {formatNumber(ask.quantity)}
              </span>
              <span className="relative text-center text-red-trade font-medium">
                {formatCurrency(ask.price)}
              </span>
              <span className="relative text-right text-text-secondary">
                {ask.orders}
              </span>
            </div>
          ))}
      </div>

      {book && (
        <div className="py-2 text-center border-y border-border-dark mb-3">
          <span className="text-base font-bold text-text-primary">
            {formatCurrency(book.last_price)}
          </span>
        </div>
      )}

      <div className="space-y-0.5">
        {book?.bids.map((bid, i) => (
          <div key={i} className="relative grid grid-cols-3 gap-1 text-xs py-0.5">
            <div
              className="absolute inset-0 bg-green-trade/10 rounded"
              style={{ width: `${(bid.quantity / maxQty) * 100}%` }}
            />
            <span className="relative text-text-primary">
              {formatNumber(bid.quantity)}
            </span>
            <span className="relative text-center text-green-trade font-medium">
              {formatCurrency(bid.price)}
            </span>
            <span className="relative text-right text-text-secondary">
              {bid.orders}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
