import { api } from "./client";
import type { Portfolio, PortfolioHistory, DashboardStats } from "@/types";

export const portfolioApi = {
  getPortfolio: () => api.get<Portfolio>("/api/portfolio"),
  getHistory: () => api.get<PortfolioHistory[]>("/api/portfolio/history"),
  getDashboardStats: () => api.get<DashboardStats>("/api/portfolio/stats"),
};
