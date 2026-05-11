import { useQuery } from "@tanstack/react-query";
import { marketApi } from "@/lib/api/market";

export function useMarketOverview() {
  return useQuery({
    queryKey: ["market", "overview"],
    queryFn: () => marketApi.getOverview(),
    refetchInterval: 30_000,
  });
}

export function useStockQuote(symbol: string) {
  return useQuery({
    queryKey: ["market", "quote", symbol],
    queryFn: () => marketApi.getQuote(symbol),
    refetchInterval: 5_000,
    enabled: !!symbol,
  });
}

export function useOrderBook(symbol: string) {
  return useQuery({
    queryKey: ["market", "orderbook", symbol],
    queryFn: () => marketApi.getOrderBook(symbol),
    refetchInterval: 3_000,
    enabled: !!symbol,
  });
}
