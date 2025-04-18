import { create, getById } from './orders.js';
import dbPromise from './db.js';


describe('Order Service - Orders Integration Tests', () => {
  let db;

  beforeAll(async () => {
    db = await dbPromise;
  });

  beforeEach(async () => {
    await db.run('DELETE FROM orders');
  });

  afterAll(async () => {
     await db.run('DELETE FROM orders');
  });

  it('create should insert an order into db and return it with id', async () => {
    const productDetails = [
        { id: 1, name: 'Product A', price: 10 },
        { id: 2, name: 'Product B', price: 20 }
    ];

    const createdOrder = await create(productDetails);

    expect(createdOrder.id).toBeDefined();
    expect(createdOrder.products).toEqual(productDetails);

    const dbOrder = await db.get('SELECT * FROM orders WHERE id = ?', createdOrder.id);
    expect(dbOrder).toBeDefined();
    expect(dbOrder.id).toBe(createdOrder.id);
    expect(JSON.parse(dbOrder.products)).toEqual(productDetails);
  });

  it('getById should retrieve a specific order from db', async () => {
    const storedProducts = [ { id: 1, name: 'Product A', price: 10 } ];
    const productsJson = JSON.stringify(storedProducts);
    const result = await db.run('INSERT INTO orders (products) VALUES (?)', productsJson);
    const orderId = result.lastID;

    const order = await getById(orderId);

    expect(order).not.toBeNull();
    expect(order.id).toBe(orderId);
    expect(order.products).toEqual(storedProducts);
  });

  it('getById should return null if order not found', async () => {
    const nonExistentId = 999;
    const order = await getById(nonExistentId);
    expect(order).toBeNull();
  });
});