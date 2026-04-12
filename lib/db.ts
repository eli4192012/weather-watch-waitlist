import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dataDirectory = path.join(process.cwd(), "data");
const databasePath = path.join(dataDirectory, "waitlist.db");

function ensureDatabase() {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  const database = new Database(databasePath);
  database.pragma("journal_mode = WAL");
  database.exec(`
    CREATE TABLE IF NOT EXISTS waitlist_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return database;
}

declare global {
  var __weatherWatchDb: Database.Database | undefined;
}

export const db = global.__weatherWatchDb ?? ensureDatabase();

if (process.env.NODE_ENV !== "production") {
  global.__weatherWatchDb = db;
}
