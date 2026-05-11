from fastapi import APIRouter, Depends
from typing import List
from ..schemas.watchlist import WatchlistItem, AddWatchlistRequest
from ..services.watchlist_service import get_watchlist, add_to_watchlist, remove_from_watchlist
from ..middleware.auth import get_current_user

router = APIRouter(prefix="/api/watchlist", tags=["watchlist"])


@router.get("", response_model=List[WatchlistItem])
async def list_watchlist(user_id: str = Depends(get_current_user)):
    return get_watchlist(user_id)


@router.post("", response_model=WatchlistItem)
async def add_symbol(
    body: AddWatchlistRequest,
    user_id: str = Depends(get_current_user),
):
    return add_to_watchlist(user_id, body.symbol)


@router.delete("/{symbol}")
async def remove_symbol(
    symbol: str,
    user_id: str = Depends(get_current_user),
):
    success = remove_from_watchlist(user_id, symbol)
    return {"success": success}
