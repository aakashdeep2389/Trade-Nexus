from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import trades, portfolio, market, watchlist, auth

app = FastAPI(
    title="TradeDesk API",
    description="Production-grade trading platform backend",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(trades.router)
app.include_router(portfolio.router)
app.include_router(market.router)
app.include_router(watchlist.router)


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "TradeDesk API"}


@app.get("/")
async def root():
    return {"message": "TradeDesk API v1.0.0"}
