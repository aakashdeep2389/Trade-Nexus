"use client";

import { useState } from "react";
import { usePlaceOrder } from "@/hooks/useTrades";
import { useStockQuote } from "@/hooks/useMarket";
import { formatCurrency, cn } from "@/lib/utils";
import type { PlaceOrderRequest } from "@/types";

interface OrderFormProps {
  symbol: string;
}

export function OrderForm({ symbol }: OrderFormProps) {
  const [orderType, setOrderType] = useState<"BUY" | "SELL">("BUY");
  const [orderMode, setOrderMode] = useState<"MARKET" | "LIMIT">("MARKET");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const { data: quote } = useStockQuote(symbol);
  const { mutate: placeOrder, isPending, isSuccess, isError, error } = usePlaceOrder();

  const estimatedValue =
    Number(quantity) * (orderMode === "MARKET" ? quote?.current_price ?? 0 : Number(price));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const order: PlaceOrderRequest = {
      symbol,
      order_type: orderType,
      quantity: Number(quantity),
      order_mode: orderMode,
      ...(orderMode === "LIMIT" && { price: Number(price) }),
    };
    placeOrder(order);
  }

  return (
    <div className="bg-bg-card border border-border-dark rounded-xl p-5">
      <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
        Place Order
      </h3>

      <div className="flex rounded-lg overflow-hidden border border-border-dark mb-4">
        {(["BUY", "SELL"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setOrderType(type)}
            className={cn(
              "flex-1 py-2.5 text-sm font-semibold transition-all",
              orderType === type
                ? type === "BUY"
                  ? "bg-green-trade text-white"
                  : "bg-red-trade text-white"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex rounded-lg overflow-hidden border border-border-dark mb-5">
        {(["MARKET", "LIMIT"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setOrderMode(mode)}
            className={cn(
              "flex-1 py-2 text-xs font-medium transition-all",
              orderMode === mode
                ? "bg-accent/20 text-accent"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {mode}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {quote && (
          <div className="bg-bg-primary rounded-lg p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">LTP</span>
              <span className="text-text-primary font-medium">
                {formatCurrency(quote.current_price)}
              </span>
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            className="w-full bg-bg-primary border border-border-dark rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {orderMode === "LIMIT" && (
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">
              Price
            </label>
            <input
              type="number"
              step="0.05"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full bg-bg-primary border border-border-dark rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        )}

        {estimatedValue > 0 && (
          <div className="bg-bg-primary rounded-lg p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Estimated Value</span>
              <span className="text-text-primary font-semibold">
                {formatCurrency(estimatedValue)}
              </span>
            </div>
          </div>
        )}

        {isSuccess && (
          <p className="text-green-trade text-xs bg-green-trade/10 rounded-lg px-3 py-2">
            Order placed successfully!
          </p>
        )}
        {isError && (
          <p className="text-red-trade text-xs bg-red-trade/10 rounded-lg px-3 py-2">
            {(error as Error).message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending || !quantity}
          className={cn(
            "w-full py-3 rounded-lg text-sm font-semibold transition-all",
            orderType === "BUY"
              ? "bg-green-trade hover:bg-green-trade/90 text-white disabled:opacity-50"
              : "bg-red-trade hover:bg-red-trade/90 text-white disabled:opacity-50"
          )}
        >
          {isPending ? "Placing..." : `${orderType} ${symbol}`}
        </button>
      </form>
    </div>
  );
}
