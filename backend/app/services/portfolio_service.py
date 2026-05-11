from typing import List
from datetime import datetime, timedelta
import random
from ..schemas.portfolio import Portfolio, Holding, PortfolioHistory, DashboardStats
from ..services.upstox_service import get_quote, STOCK_DATA

MOCK_HOLDINGS = [
    {"symbol": "RELIANCE", "quantity": 10, "avg_buy_price": 2820.50},
    {"symbol": "TCS", "quantity": 5, "avg_buy_price": 4050.00},
    {"symbol": "HDFCBANK", "quantity": 15, "avg_buy_price": 1680.00},
    {"symbol": "WIPRO", "quantity": 20, "avg_buy_price": 532.00},
    {"symbol": "SBIN", "quantity": 30, "avg_buy_price": 795.00},
]


def get_portfolio(user_id: str) -> Portfolio:
    holdings = []
    total_value = 0.0
    invested_value = 0.0

    for h in MOCK_HOLDINGS:
        quote = get_quote(h["symbol"])
        current_price = quote.current_price
        current_value = current_price * h["quantity"]
        invested = h["avg_buy_price"] * h["quantity"]
        pnl = current_value - invested
        pnl_percent = (pnl / invested) * 100 if invested else 0

        holdings.append(
            Holding(
                symbol=h["symbol"],
                company_name=STOCK_DATA.get(h["symbol"], {}).get("name", h["symbol"]),
                quantity=h["quantity"],
                avg_buy_price=h["avg_buy_price"],
                current_price=current_price,
                current_value=round(current_value, 2),
                pnl=round(pnl, 2),
                pnl_percent=round(pnl_percent, 2),
            )
        )
        total_value += current_value
        invested_value += invested

    total_pnl = total_value - invested_value
    total_pnl_percent = (total_pnl / invested_value) * 100 if invested_value else 0
    day_pnl = total_value * random.uniform(-0.015, 0.025)
    day_pnl_percent = (day_pnl / total_value) * 100 if total_value else 0

    return Portfolio(
        total_value=round(total_value, 2),
        invested_value=round(invested_value, 2),
        total_pnl=round(total_pnl, 2),
        total_pnl_percent=round(total_pnl_percent, 2),
        day_pnl=round(day_pnl, 2),
        day_pnl_percent=round(day_pnl_percent, 2),
        holdings=holdings,
    )


def get_portfolio_history(user_id: str) -> List[PortfolioHistory]:
    history = []
    base_value = 480_000.0
    today = datetime.now()

    for i in range(30, -1, -1):
        date = today - timedelta(days=i)
        change = random.uniform(-0.025, 0.03)
        base_value *= 1 + change
        history.append(
            PortfolioHistory(
                date=date.strftime("%d %b"),
                value=round(base_value, 2),
            )
        )

    return history


def get_dashboard_stats(user_id: str) -> DashboardStats:
    portfolio = get_portfolio(user_id)
    return DashboardStats(
        portfolio_value=portfolio.total_value,
        day_pnl=portfolio.day_pnl,
        day_pnl_percent=portfolio.day_pnl_percent,
        total_pnl=portfolio.total_pnl,
        total_pnl_percent=portfolio.total_pnl_percent,
        total_trades=5,
        active_positions=len(MOCK_HOLDINGS),
    )
