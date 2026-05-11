import { api } from "./client";
import type { MarketOverview, StockQuote, OrderBook } from "@/types";

export const marketApi = {
  getOverview: () => api.get<MarketOverview>("/api/market/overview"),
  getQuote: (symbol: string) => api.get<StockQuote>(`/api/market/quote/${symbol}`),
  getOrderBook: (symbol: string) => api.get<OrderBook>(`/api/market/orderbook/${symbol}`),
};
