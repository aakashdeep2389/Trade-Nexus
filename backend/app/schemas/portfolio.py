from pydantic import BaseModel
from typing import List


class Holding(BaseModel):
    symbol: str
    company_name: str
    quantity: int
    avg_buy_price: float
    current_price: float
    current_value: float
    pnl: float
    pnl_percent: float


class Portfolio(BaseModel):
    total_value: float
    invested_value: float
    total_pnl: float
    total_pnl_percent: float
    day_pnl: float
    day_pnl_percent: float
    holdings: List[Holding]


class PortfolioHistory(BaseModel):
    date: str
    value: float


class DashboardStats(BaseModel):
    portfolio_value: float
    day_pnl: float
    day_pnl_percent: float
    total_pnl: float
    total_pnl_percent: float
    total_trades: int
    active_positions: int
