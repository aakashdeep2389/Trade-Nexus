import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tradesApi } from "@/lib/api/trades";
import type { PlaceOrderRequest } from "@/types";

export function useTradeHistory() {
  return useQuery({
    queryKey: ["trades", "history"],
    queryFn: () => tradesApi.getHistory(),
  });
}

export function usePlaceOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order: PlaceOrderRequest) => tradesApi.placeOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trades"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });
}
