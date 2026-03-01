-- Users table (assuming you already have this from your auth setup)
CREATE TABLE users (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name        TEXT,
  email       TEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Main expenses table
CREATE TABLE expenses (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  amount      DECIMAL(10, 2) NOT NULL,
  type        TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category    TEXT NOT NULL,
  description TEXT,
  date        TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Index for fast queries per user
CREATE INDEX idx_expenses_user_id ON expenses(user_id);

-- Index for filtering by date (monthly summary)
CREATE INDEX idx_expenses_date ON expenses(date);

-- Index for filtering by type
CREATE INDEX idx_expenses_type ON expenses(type);