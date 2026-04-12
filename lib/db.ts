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
      name TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const columns = database
    .prepare("PRAGMA table_info(waitlist_entries)")
    .all() as { name: string }[];

  if (!columns.some((column) => column.name === "name")) {
    database.exec(
      "ALTER TABLE waitlist_entries ADD COLUMN name TEXT NOT NULL DEFAULT ''",
    );
  }

  return database;
}

declare global {
  var __weatherWatchDb: Database.Database | undefined;
}

export const db = global.__weatherWatchDb ?? ensureDatabase();

if (process.env.NODE_ENV !== "production") {
  global.__weatherWatchDb = db;
}
