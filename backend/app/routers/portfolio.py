from fastapi import APIRouter, Depends
from typing import List
from ..schemas.portfolio import Portfolio, PortfolioHistory, DashboardStats
from ..services.portfolio_service import get_portfolio, get_portfolio_history, get_dashboard_stats
from ..middleware.auth import get_current_user

router = APIRouter(prefix="/api/portfolio", tags=["portfolio"])


@router.get("", response_model=Portfolio)
async def get_portfolio_endpoint(user_id: str = Depends(get_current_user)):
    return get_portfolio(user_id)


@router.get("/history", response_model=List[PortfolioHistory])
async def get_history(user_id: str = Depends(get_current_user)):
    return get_portfolio_history(user_id)


@router.get("/stats", response_model=DashboardStats)
async def get_stats(user_id: str = Depends(get_current_user)):
    return get_dashboard_stats(user_id)
