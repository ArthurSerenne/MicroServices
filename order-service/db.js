import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromiseInternal = open({
  filename: './order.db',
  driver: sqlite3.Database
});

async function init() {
  const db = await dbPromiseInternal;
  await db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      products TEXT NOT NULL
    )
  `);

  return db;
}

const initializedDbPromise = init();

export default initializedDbPromise;