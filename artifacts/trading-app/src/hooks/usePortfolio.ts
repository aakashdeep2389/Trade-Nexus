import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/api/portfolio";

export function usePortfolio() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: () => portfolioApi.getPortfolio(),
    refetchInterval: 60_000,
  });
}

export function usePortfolioHistory() {
  return useQuery({
    queryKey: ["portfolio", "history"],
    queryFn: () => portfolioApi.getHistory(),
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["portfolio", "stats"],
    queryFn: () => portfolioApi.getDashboardStats(),
    refetchInterval: 30_000,
  });
}
