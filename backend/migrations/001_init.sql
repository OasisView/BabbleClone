-- Create messages table and index
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  author TEXT NOT NULL,
  text TEXT NOT NULL,
  ts INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_messages_ts ON messages (ts);
COMMIT;
-- Create messages table and index
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  author TEXT NOT NULL,
  text TEXT NOT NULL,
  ts INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_messages_ts ON messages(ts);
