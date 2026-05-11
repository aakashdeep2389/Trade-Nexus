from pydantic import BaseModel
from typing import List


class MarketIndex(BaseModel):
    name: str
    value: float
    change: float
    change_percent: float


class StockQuote(BaseModel):
    symbol: str
    company_name: str
    current_price: float
    change: float
    change_percent: float
    volume: int


class MarketOverview(BaseModel):
    indices: List[MarketIndex]
    top_gainers: List[StockQuote]
    top_losers: List[StockQuote]
    most_active: List[StockQuote]


class OrderBookEntry(BaseModel):
    price: float
    quantity: int
    orders: int


class OrderBook(BaseModel):
    bids: List[OrderBookEntry]
    asks: List[OrderBookEntry]
    last_price: float
    spread: float
