import dbPromise from './db.js';

export async function create(products) {
  const db = await dbPromise;
  const result = await db.run(
    'INSERT INTO orders (products) VALUES (?)',
    JSON.stringify(products)
  );
  return { id: result.lastID, products };
}

export async function getById(id) {
  const db = await dbPromise;
  const row = await db.get('SELECT * FROM orders WHERE id = ?', id);
  if (!row) return null;
  return { id: row.id, products: JSON.parse(row.products) };
}