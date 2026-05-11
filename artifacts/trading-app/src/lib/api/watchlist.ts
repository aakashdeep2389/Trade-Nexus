import { api } from "./client";
import type { WatchlistItem } from "@/types";

export const watchlistApi = {
  getWatchlist: () => api.get<WatchlistItem[]>("/api/watchlist"),
  addSymbol: (symbol: string) =>
    api.post<WatchlistItem>("/api/watchlist", { symbol }),
  removeSymbol: (symbol: string) =>
    api.delete<{ success: boolean }>(`/api/watchlist/${symbol}`),
};
