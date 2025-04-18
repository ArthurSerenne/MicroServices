import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
  filename: './order.db',
  driver: sqlite3.Database
});

async function init() {
  const db = await dbPromise;
  await db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      products TEXT NOT NULL
    )
  `);
}
init();

export default dbPromise;