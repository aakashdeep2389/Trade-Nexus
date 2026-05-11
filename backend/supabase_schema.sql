-- TradeDesk Supabase Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TRADES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS trades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol VARCHAR(20) NOT NULL,
  trade_type VARCHAR(4) NOT NULL CHECK (trade_type IN ('BUY', 'SELL')),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(12, 2) NOT NULL CHECK (price > 0),
  total_value DECIMAL(14, 2) NOT NULL,
  status VARCHAR(10) NOT NULL DEFAULT 'EXECUTED'
    CHECK (status IN ('PENDING', 'EXECUTED', 'CANCELLED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_trades_user_id ON trades(user_id);
CREATE INDEX idx_trades_symbol ON trades(symbol);
CREATE INDEX idx_trades_created_at ON trades(created_at DESC);

-- RLS
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trades"
  ON trades FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trades"
  ON trades FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- PORTFOLIO / HOLDINGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS holdings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol VARCHAR(20) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  avg_buy_price DECIMAL(12, 2) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, symbol)
);

CREATE INDEX idx_holdings_user_id ON holdings(user_id);

ALTER TABLE holdings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own holdings"
  ON holdings FOR ALL
  USING (auth.uid() = user_id);

-- ============================================================
-- WATCHLIST TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS watchlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol VARCHAR(20) NOT NULL,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, symbol)
);

CREATE INDEX idx_watchlist_user_id ON watchlist(user_id);

ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own watchlist"
  ON watchlist FOR ALL
  USING (auth.uid() = user_id);

-- ============================================================
-- PROFILES TABLE (extends auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(100),
  pan_number VARCHAR(10),
  phone VARCHAR(15),
  kyc_status VARCHAR(20) DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
