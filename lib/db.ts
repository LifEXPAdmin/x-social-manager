/**
 * Database utilities for UINUX X Social Media Manager
 * Uses SQLite for local storage of drafts, scheduled tweets, and rate limits
 */

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = process.env.DATABASE_PATH || './data/uinux.db';

// Ensure data directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

let db: Database.Database | null = null;

/**
 * Get or create database connection
 */
export function getDb(): Database.Database {
  if (!db) {
    db = new Database(dbPath);
    initializeDb(db);
  }
  return db;
}

/**
 * Initialize database schema
 */
function initializeDb(database: Database.Database) {
  // Enable foreign keys
  database.pragma('foreign_keys = ON');

  // Scheduled tweets table
  database.exec(`
    CREATE TABLE IF NOT EXISTS scheduled_tweets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      scheduled_for TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      posted_at TEXT,
      tweet_id TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Drafts table
  database.exec(`
    CREATE TABLE IF NOT EXISTS drafts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Rate limits tracking table
  database.exec(`
    CREATE TABLE IF NOT EXISTS rate_limits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      endpoint TEXT NOT NULL UNIQUE,
      remaining INTEGER NOT NULL,
      reset_at TEXT NOT NULL,
      limit_total INTEGER NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Posted tweets cache (for dashboard display)
  database.exec(`
    CREATE TABLE IF NOT EXISTS posted_tweets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tweet_id TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL,
      likes INTEGER DEFAULT 0,
      retweets INTEGER DEFAULT 0,
      replies INTEGER DEFAULT 0,
      posted_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // AI reply suggestions table
  database.exec(`
    CREATE TABLE IF NOT EXISTS ai_replies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_tweet_id TEXT NOT NULL,
      original_content TEXT NOT NULL,
      suggested_reply TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      posted_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Settings table
  database.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
}

/**
 * Close database connection
 */
export function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}
