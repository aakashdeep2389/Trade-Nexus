from fastapi import APIRouter
from ..schemas.market import MarketOverview, StockQuote, OrderBook
from ..services.upstox_service import get_quote, get_order_book, get_market_overview

router = APIRouter(prefix="/api/market", tags=["market"])


@router.get("/overview", response_model=MarketOverview)
async def market_overview():
    return get_market_overview()


@router.get("/quote/{symbol}", response_model=StockQuote)
async def stock_quote(symbol: str):
    return get_quote(symbol.upper())


@router.get("/orderbook/{symbol}", response_model=OrderBook)
async def order_book(symbol: str):
    return get_order_book(symbol.upper())
