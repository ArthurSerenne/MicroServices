import dbPromise from './db.js';

export async function getAll() {
  const db = await dbPromise;
  return db.all('SELECT * FROM products');
}

export async function getById(id) {
  const db = await dbPromise;
  return db.get('SELECT * FROM products WHERE id = ?', id);
}

export async function create(product) {
  const db = await dbPromise;
  const result = await db.run(
    'INSERT INTO products (name, price) VALUES (?, ?)',
    product.name,
    product.price
  );
  return { id: result.lastID, name: product.name, price: product.price };
}