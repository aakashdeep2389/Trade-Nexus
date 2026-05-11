from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime


class PlaceOrderRequest(BaseModel):
    symbol: str
    order_type: Literal["BUY", "SELL"]
    quantity: int
    order_mode: Literal["MARKET", "LIMIT"] = "MARKET"
    price: Optional[float] = None


class TradeResponse(BaseModel):
    id: str
    user_id: str
    symbol: str
    trade_type: Literal["BUY", "SELL"]
    quantity: int
    price: float
    total_value: float
    status: Literal["PENDING", "EXECUTED", "CANCELLED"]
    created_at: str


class PlaceOrderResponse(BaseModel):
    success: bool
    message: str
    order_id: Optional[str] = None
    trade: Optional[TradeResponse] = None
