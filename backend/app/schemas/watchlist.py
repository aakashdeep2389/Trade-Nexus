from pydantic import BaseModel
from typing import Optional


class WatchlistItem(BaseModel):
    id: str
    user_id: str
    symbol: str
    company_name: str
    current_price: float
    change: float
    change_percent: float
    volume: int
    market_cap: str


class AddWatchlistRequest(BaseModel):
    symbol: str
