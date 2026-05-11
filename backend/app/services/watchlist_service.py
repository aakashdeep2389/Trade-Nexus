import uuid
from typing import List
from ..schemas.watchlist import WatchlistItem
from ..services.upstox_service import get_quote, STOCK_DATA

MOCK_WATCHLIST: List[dict] = [
    {"id": str(uuid.uuid4()), "symbol": "RELIANCE"},
    {"id": str(uuid.uuid4()), "symbol": "TCS"},
    {"id": str(uuid.uuid4()), "symbol": "INFY"},
    {"id": str(uuid.uuid4()), "symbol": "ICICIBANK"},
    {"id": str(uuid.uuid4()), "symbol": "ADANIENT"},
]


def get_watchlist(user_id: str) -> List[WatchlistItem]:
    items = []
    for entry in MOCK_WATCHLIST:
        quote = get_quote(entry["symbol"])
        market_cap_lookup = {
            "RELIANCE": "₹19.2L Cr", "TCS": "₹14.9L Cr", "INFY": "₹7.4L Cr",
            "HDFCBANK": "₹12.8L Cr", "ICICIBANK": "₹9.1L Cr", "SBIN": "₹7.3L Cr",
            "WIPRO": "₹2.8L Cr", "BHARTIARTL": "₹9.5L Cr", "TATAMOTORS": "₹3.6L Cr",
            "ADANIENT": "₹2.7L Cr",
        }
        items.append(
            WatchlistItem(
                id=entry["id"],
                user_id=user_id,
                symbol=quote.symbol,
                company_name=STOCK_DATA.get(entry["symbol"], {}).get("name", entry["symbol"]),
                current_price=quote.current_price,
                change=quote.change,
                change_percent=quote.change_percent,
                volume=quote.volume,
                market_cap=market_cap_lookup.get(entry["symbol"], "N/A"),
            )
        )
    return items


def add_to_watchlist(user_id: str, symbol: str) -> WatchlistItem:
    symbol = symbol.upper()
    existing = [e for e in MOCK_WATCHLIST if e["symbol"] == symbol]
    if not existing:
        new_entry = {"id": str(uuid.uuid4()), "symbol": symbol}
        MOCK_WATCHLIST.append(new_entry)

    quote = get_quote(symbol)
    return WatchlistItem(
        id=str(uuid.uuid4()),
        user_id=user_id,
        symbol=symbol,
        company_name=STOCK_DATA.get(symbol, {}).get("name", symbol),
        current_price=quote.current_price,
        change=quote.change,
        change_percent=quote.change_percent,
        volume=quote.volume,
        market_cap="N/A",
    )


def remove_from_watchlist(user_id: str, symbol: str) -> bool:
    global MOCK_WATCHLIST
    original_len = len(MOCK_WATCHLIST)
    MOCK_WATCHLIST = [e for e in MOCK_WATCHLIST if e["symbol"] != symbol.upper()]
    return len(MOCK_WATCHLIST) < original_len
