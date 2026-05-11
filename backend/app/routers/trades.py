from fastapi import APIRouter, Depends
from typing import List
from ..schemas.trades import TradeResponse, PlaceOrderRequest, PlaceOrderResponse
from ..services.trade_service import get_trade_history, place_order
from ..middleware.auth import get_current_user

router = APIRouter(prefix="/api/trades", tags=["trades"])


@router.get("", response_model=List[TradeResponse])
async def list_trades(user_id: str = Depends(get_current_user)):
    return get_trade_history(user_id)


@router.post("/order", response_model=PlaceOrderResponse)
async def create_order(
    order: PlaceOrderRequest,
    user_id: str = Depends(get_current_user),
):
    return place_order(user_id, order)
