import { api } from "./client";
import type { Trade, PlaceOrderRequest, PlaceOrderResponse } from "@/types";

export const tradesApi = {
  getHistory: () => api.get<Trade[]>("/api/trades"),
  placeOrder: (order: PlaceOrderRequest) =>
    api.post<PlaceOrderResponse>("/api/trades/order", order),
};
