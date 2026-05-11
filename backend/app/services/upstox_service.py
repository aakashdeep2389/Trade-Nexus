"""
Upstox Service — structured for real integration.
Replace mock data with actual Upstox API calls when credentials are available.
Upstox API docs: https://upstox.com/developer/api-documentation/
"""
import random
from typing import Dict
from ..schemas.market import StockQuote, OrderBook, OrderBookEntry, MarketIndex, MarketOverview

STOCK_DATA: Dict[str, dict] = {
    "RELIANCE": {"name": "Reliance Industries Ltd", "base_price": 2850.0},
    "TCS": {"name": "Tata Consultancy Services", "base_price": 4120.0},
    "INFY": {"name": "Infosys Ltd", "base_price": 1785.0},
    "HDFCBANK": {"name": "HDFC Bank Ltd", "base_price": 1695.0},
    "ICICIBANK": {"name": "ICICI Bank Ltd", "base_price": 1285.0},
    "SBIN": {"name": "State Bank of India", "base_price": 815.0},
    "WIPRO": {"name": "Wipro Ltd", "base_price": 540.0},
    "BHARTIARTL": {"name": "Bharti Airtel Ltd", "base_price": 1620.0},
    "TATAMOTORS": {"name": "Tata Motors Ltd", "base_price": 975.0},
    "ADANIENT": {"name": "Adani Enterprises Ltd", "base_price": 2340.0},
    "AXISBANK": {"name": "Axis Bank Ltd", "base_price": 1145.0},
    "KOTAKBANK": {"name": "Kotak Mahindra Bank", "base_price": 1890.0},
    "LT": {"name": "Larsen & Toubro Ltd", "base_price": 3650.0},
    "SUNPHARMA": {"name": "Sun Pharmaceutical", "base_price": 1820.0},
    "HINDALCO": {"name": "Hindalco Industries", "base_price": 685.0},
}


def _get_mock_price(symbol: str) -> float:
    """Generate a realistic mock price with small random variation."""
    base = STOCK_DATA.get(symbol, {}).get("base_price", 1000.0)
    variation = random.uniform(-0.02, 0.02)
    return round(base * (1 + variation), 2)


def get_quote(symbol: str) -> StockQuote:
    """Get stock quote. Replace with real Upstox API call."""
    data = STOCK_DATA.get(symbol, {"name": symbol, "base_price": 1000.0})
    price = _get_mock_price(symbol)
    change_pct = random.uniform(-3.5, 3.5)
    change = round(price * change_pct / 100, 2)
    volume = random.randint(500_000, 5_000_000)

    return StockQuote(
        symbol=symbol,
        company_name=data["name"],
        current_price=price,
        change=change,
        change_percent=round(change_pct, 2),
        volume=volume,
    )


def get_order_book(symbol: str) -> OrderBook:
    """Get order book. Replace with real Upstox API call."""
    base_price = _get_mock_price(symbol)

    asks = []
    for i in range(5):
        price = round(base_price * (1 + 0.001 * (i + 1)), 2)
        qty = random.randint(100, 5000)
        asks.append(OrderBookEntry(price=price, quantity=qty, orders=random.randint(1, 20)))

    bids = []
    for i in range(5):
        price = round(base_price * (1 - 0.001 * (i + 1)), 2)
        qty = random.randint(100, 5000)
        bids.append(OrderBookEntry(price=price, quantity=qty, orders=random.randint(1, 20)))

    spread = round(asks[0].price - bids[0].price, 2)

    return OrderBook(
        bids=bids,
        asks=asks,
        last_price=base_price,
        spread=spread,
    )


def get_market_overview() -> MarketOverview:
    """Get market overview. Replace with real Upstox / NSE API call."""
    indices = [
        MarketIndex(name="NIFTY 50", value=24850.50, change=125.30, change_percent=0.51),
        MarketIndex(name="SENSEX", value=81240.75, change=380.45, change_percent=0.47),
        MarketIndex(name="BANK NIFTY", value=52840.20, change=-180.60, change_percent=-0.34),
        MarketIndex(name="NIFTY IT", value=38920.15, change=245.80, change_percent=0.63),
    ]

    gainers_symbols = ["TATAMOTORS", "ADANIENT", "BHARTIARTL"]
    losers_symbols = ["HINDALCO", "WIPRO", "AXISBANK"]
    active_symbols = ["RELIANCE", "TCS", "HDFCBANK"]

    top_gainers = [get_quote(s) for s in gainers_symbols]
    top_losers = [get_quote(s) for s in losers_symbols]
    most_active = [get_quote(s) for s in active_symbols]

    return MarketOverview(
        indices=indices,
        top_gainers=top_gainers,
        top_losers=top_losers,
        most_active=most_active,
    )
