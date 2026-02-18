-- LingoVision Database Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Units table
CREATE TABLE units (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  language TEXT NOT NULL DEFAULT 'Spanish',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Cards table (matches frontend CardData interface)
CREATE TABLE cards (
  id TEXT NOT NULL,
  unit_id UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  english TEXT NOT NULL,
  spanish TEXT NOT NULL,
  image TEXT NOT NULL,
  pronunciation TEXT NOT NULL,
  sentence TEXT,
  situation_image TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (unit_id, id),
  UNIQUE (unit_id, position)
);

CREATE INDEX idx_cards_unit_id ON cards(unit_id);

-- Allow public read access (no auth needed per PRD)
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read units" ON units FOR SELECT USING (true);
CREATE POLICY "Public read cards" ON cards FOR SELECT USING (true);
