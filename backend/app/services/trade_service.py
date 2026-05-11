import uuid
from datetime import datetime
from typing import List
from ..schemas.trades import TradeResponse, PlaceOrderRequest, PlaceOrderResponse
from ..services.upstox_service import get_quote

MOCK_TRADES: List[dict] = [
    {
        "id": str(uuid.uuid4()),
        "user_id": "mock-user-1",
        "symbol": "RELIANCE",
        "trade_type": "BUY",
        "quantity": 10,
        "price": 2820.50,
        "total_value": 28205.0,
        "status": "EXECUTED",
        "created_at": "2024-12-10T10:30:00",
    },
    {
        "id": str(uuid.uuid4()),
        "user_id": "mock-user-1",
        "symbol": "TCS",
        "trade_type": "BUY",
        "quantity": 5,
        "price": 4050.00,
        "total_value": 20250.0,
        "status": "EXECUTED",
        "created_at": "2024-12-09T11:15:00",
    },
    {
        "id": str(uuid.uuid4()),
        "user_id": "mock-user-1",
        "symbol": "INFY",
        "trade_type": "SELL",
        "quantity": 8,
        "price": 1790.00,
        "total_value": 14320.0,
        "status": "EXECUTED",
        "created_at": "2024-12-08T14:45:00",
    },
    {
        "id": str(uuid.uuid4()),
        "user_id": "mock-user-1",
        "symbol": "HDFCBANK",
        "trade_type": "BUY",
        "quantity": 15,
        "price": 1680.00,
        "total_value": 25200.0,
        "status": "EXECUTED",
        "created_at": "2024-12-07T09:00:00",
    },
    {
        "id": str(uuid.uuid4()),
        "user_id": "mock-user-1",
        "symbol": "WIPRO",
        "trade_type": "BUY",
        "quantity": 20,
        "price": 532.00,
        "total_value": 10640.0,
        "status": "EXECUTED",
        "created_at": "2024-12-06T15:30:00",
    },
]


def get_trade_history(user_id: str) -> List[TradeResponse]:
    return [TradeResponse(**t) for t in MOCK_TRADES]


def place_order(user_id: str, order: PlaceOrderRequest) -> PlaceOrderResponse:
    quote = get_quote(order.symbol)
    execution_price = order.price if order.order_mode == "LIMIT" and order.price else quote.current_price

    trade_data = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "symbol": order.symbol.upper(),
        "trade_type": order.order_type,
        "quantity": order.quantity,
        "price": round(execution_price, 2),
        "total_value": round(execution_price * order.quantity, 2),
        "status": "EXECUTED",
        "created_at": datetime.utcnow().isoformat(),
    }

    MOCK_TRADES.insert(0, trade_data)
    trade = TradeResponse(**trade_data)

    return PlaceOrderResponse(
        success=True,
        message=f"Order {order.order_type} {order.quantity} {order.symbol} executed at {execution_price}",
        order_id=trade.id,
        trade=trade,
    )
