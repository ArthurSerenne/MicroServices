import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromiseInternal = open({
  filename: './catalogue.db',
  driver: sqlite3.Database
});

async function init() {
  const db = await dbPromiseInternal;
  await db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL
    )
  `);

  const { count } = await db.get('SELECT COUNT(*) AS count FROM products');
  if (count === 0) {
    const mockProducts = [
      { name: 'IPhone 15', price: 999 },
      { name: 'Samsung Galaxy S24', price: 899 },
      { name: 'Google Pixel 8', price: 799 }
    ];
    for (const p of mockProducts) {
      await db.run(
        'INSERT INTO products (name, price) VALUES (?, ?)',
        p.name,
        p.price
      );
    }
    console.log('Seeded products table with mock data');
  }
  return db;
}

const initializedDbPromise = init();

export default initializedDbPromise;