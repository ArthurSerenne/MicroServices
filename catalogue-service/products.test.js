import { getAll, getById, create } from './products.js';
import dbPromise from './db.js';


describe('Catalogue Service - Products Integration Tests', () => {
  let db;

  beforeAll(async () => {
    db = await dbPromise;
  });

  beforeEach(async () => {
    await db.run('DELETE FROM products');
  });

  afterAll(async () => {
    await db.run('DELETE FROM products');
  });

  it('getAll should retrieve all products from db', async () => {
    await db.run('INSERT INTO products (name, price) VALUES (?, ?)', 'Test Item 1', 100);
    await db.run('INSERT INTO products (name, price) VALUES (?, ?)', 'Test Item 2', 200);

    const products = await getAll();

    expect(products).toHaveLength(2);
    expect(products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Test Item 1', price: 100 }),
        expect.objectContaining({ name: 'Test Item 2', price: 200 }),
      ])
    );
  });

  it('getById should retrieve a specific product from db', async () => {
    const result = await db.run('INSERT INTO products (name, price) VALUES (?, ?)', 'Specific Item', 150);
    const productId = result.lastID;

    const product = await getById(productId);

    expect(product).not.toBeNull();
    expect(product.id).toBe(productId);
    expect(product.name).toBe('Specific Item');
    expect(product.price).toBe(150);
  });

   it('getById should return undefined if product not found', async () => {
    const nonExistentId = 999;
    const product = await getById(nonExistentId);
    expect(product).toBeUndefined();
  });

  it('create should insert a product into db and return it with id', async () => {
    const newProductData = { name: 'New Gadget', price: 50 };

    const createdProduct = await create(newProductData);

    expect(createdProduct.id).toBeDefined();
    expect(createdProduct.name).toBe(newProductData.name);
    expect(createdProduct.price).toBe(newProductData.price);

    const dbProduct = await db.get('SELECT * FROM products WHERE id = ?', createdProduct.id);
    expect(dbProduct).toEqual(createdProduct);
  });
});