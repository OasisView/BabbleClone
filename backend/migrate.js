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
