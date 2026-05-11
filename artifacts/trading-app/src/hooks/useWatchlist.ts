import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { watchlistApi } from "@/lib/api/watchlist";

export function useWatchlist() {
  return useQuery({
    queryKey: ["watchlist"],
    queryFn: () => watchlistApi.getWatchlist(),
    refetchInterval: 5_000,
  });
}

export function useAddToWatchlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (symbol: string) => watchlistApi.addSymbol(symbol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
}

export function useRemoveFromWatchlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (symbol: string) => watchlistApi.removeSymbol(symbol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
}
