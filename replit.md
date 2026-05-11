# TradeDesk — Professional Trading Platform

## Overview

Full-stack trading web application with Next.js 14 frontend and FastAPI backend.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: FastAPI (Python 3.11)
- **Auth + DB**: Supabase (PostgreSQL)
- **State**: TanStack React Query v5
- **Charts**: TradingView Widget (trade page) + Recharts (portfolio)
- **Market data**: Upstox API (mocked, structured for real integration)

## Project Structure

```
/
├── artifacts/trading-app/     # Next.js 14 frontend
│   └── src/
│       ├── app/               # App Router pages
│       │   ├── (auth)/        # Login & Signup
│       │   └── (dashboard)/   # Dashboard, Trade, Portfolio, Watchlist, History
│       ├── components/        # UI, charts, trade, dashboard, layout
│       ├── hooks/             # React Query hooks (useMarket, usePortfolio, useTrades, useWatchlist)
│       ├── lib/               # api/ client + supabase/ client/server
│       ├── providers/         # QueryProvider (React Query setup)
│       ├── types/             # TypeScript interfaces
│       └── middleware.ts      # Route protection (Supabase auth)
│
└── backend/                   # FastAPI backend
    └── app/
        ├── routers/           # /api/trades, /api/portfolio, /api/market, /api/watchlist
        ├── services/          # Business logic (upstox_service, trade_service, portfolio_service, watchlist_service)
        ├── schemas/           # Pydantic models
        ├── middleware/auth.py # JWT validation
        ├── config.py          # Settings (Supabase, Upstox)
        ├── database.py        # Supabase client
        └── main.py            # FastAPI app + CORS
```

## Running

### Frontend (Next.js) — port 3000
Workflow: **TradeDesk Frontend**
```
cd artifacts/trading-app && npm run dev
```

### Backend (FastAPI) — port 8000
Workflow: **TradeDesk Backend**
```
cd backend && python run.py
```

## Key Commands

- Frontend dev: `cd artifacts/trading-app && npm run dev`
- Backend dev: `cd backend && python run.py`
- Backend install: `pip install -r backend/requirements.txt`
- Frontend install: `cd artifacts/trading-app && npm install`

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Backend (.env)
```
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret
UPSTOX_API_KEY=your-upstox-key (optional)
UPSTOX_API_SECRET=your-upstox-secret (optional)
ENVIRONMENT=development
```

## Supabase Setup

1. Create a Supabase project at supabase.com
2. Run `backend/supabase_schema.sql` in the SQL editor
3. Set environment variables above

## Data Flow

```
Frontend → Next.js API rewrites (/api/*) → FastAPI (port 8000) → Supabase / Upstox
```

The Next.js `next.config.mjs` proxies all `/api/*` requests to `localhost:8000`.

## Features

- **Auth**: Supabase login/signup, protected routes via middleware
- **Dashboard**: Stats cards, recent trades, market overview (live polling)
- **Trade**: TradingView chart (dark theme), buy/sell order form, order book
- **Portfolio**: Holdings table (sortable), portfolio value chart, P&L chart
- **Watchlist**: Add/remove symbols, polling price updates
- **History**: Trade history table with filters and sorting

## Mock → Real Integration

All mock data is in `backend/app/services/`. To connect real APIs:
- **Upstox**: Replace functions in `upstox_service.py`
- **Supabase**: Replace in-memory lists in `trade_service.py`, `portfolio_service.py`, `watchlist_service.py`
