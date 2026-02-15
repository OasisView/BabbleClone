#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbFile = path.join(__dirname, 'db.sqlite');
const migrationsDir = path.join(__dirname, 'migrations');

if (!fs.existsSync(migrationsDir)) {
  console.error('Migrations directory not found:', migrationsDir);
  process.exit(1);
}

const db = new Database(dbFile);
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS migrations (
  id TEXT PRIMARY KEY,
  applied_at INTEGER NOT NULL
);
`);

const files = fs.readdirSync(migrationsDir)
  .filter(f => f.endsWith('.sql'))
  .sort();

for (const file of files) {
  const id = file;
  const row = db.prepare('SELECT id FROM migrations WHERE id = ?').get(id);
  if (row) {
    console.log('Skipping', id);
    continue;
  }
  const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
  console.log('Applying', id);
  db.exec('BEGIN');
  db.exec(sql);
  db.prepare('INSERT INTO migrations (id, applied_at) VALUES (?, ?)').run(id, Date.now());
  db.exec('COMMIT');
}

console.log('Migrations complete. DB:', dbFile);
#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const Database = require('better-sqlite3')

const DB_FILE = path.join(__dirname, 'db.sqlite')
const MIGRATION_FILE = path.join(__dirname, 'migrations', '001_init.sql')

if (!fs.existsSync(MIGRATION_FILE)) {
  console.error('Migration file missing:', MIGRATION_FILE)
  process.exit(1)
}

const sql = fs.readFileSync(MIGRATION_FILE, 'utf8')

const db = new Database(DB_FILE)
try {
  db.exec('BEGIN')
  db.exec(sql)
  db.exec('COMMIT')
  console.log('Applied migrations to', DB_FILE)
} catch (e) {
  console.error('Migration failed', e)
  try { db.exec('ROLLBACK') } catch {}
  process.exit(1)
} finally {
  db.close()
}
