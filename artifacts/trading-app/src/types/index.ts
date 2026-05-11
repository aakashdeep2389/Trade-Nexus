export interface User {
  id: string;
  email: string;
  full_name?: string;
}

export interface Trade {
  id: string;
  user_id: string;
  symbol: string;
  trade_type: "BUY" | "SELL";
  quantity: number;
  price: number;
  total_value: number;
  status: "PENDING" | "EXECUTED" | "CANCELLED";
  created_at: string;
}

export interface Holding {
  symbol: string;
  company_name: string;
  quantity: number;
  avg_buy_price: number;
  current_price: number;
  current_value: number;
  pnl: number;
  pnl_percent: number;
}

export interface Portfolio {
  total_value: number;
  invested_value: number;
  total_pnl: number;
  total_pnl_percent: number;
  day_pnl: number;
  day_pnl_percent: number;
  holdings: Holding[];
}

export interface WatchlistItem {
  id: string;
  user_id: string;
  symbol: string;
  company_name: string;
  current_price: number;
  change: number;
  change_percent: number;
  volume: number;
  market_cap: string;
}

export interface MarketOverview {
  indices: MarketIndex[];
  top_gainers: StockQuote[];
  top_losers: StockQuote[];
  most_active: StockQuote[];
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  change_percent: number;
}

export interface StockQuote {
  symbol: string;
  company_name: string;
  current_price: number;
  change: number;
  change_percent: number;
  volume: number;
}

export interface OrderBookEntry {
  price: number;
  quantity: number;
  orders: number;
}

export interface OrderBook {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  last_price: number;
  spread: number;
}

export interface PlaceOrderRequest {
  symbol: string;
  order_type: "BUY" | "SELL";
  quantity: number;
  price?: number;
  order_mode: "MARKET" | "LIMIT";
}

export interface PlaceOrderResponse {
  success: boolean;
  message: string;
  order_id?: string;
  trade?: Trade;
}

export interface PortfolioHistory {
  date: string;
  value: number;
}

export interface DashboardStats {
  portfolio_value: number;
  day_pnl: number;
  day_pnl_percent: number;
  total_pnl: number;
  total_trades: number;
  active_positions: number;
}
