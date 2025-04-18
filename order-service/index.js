import express from 'express';
import { create, getById } from './orders.js';

const app = express();
app.use(express.json());

const CATALOGUE_URL = process.env.CATALOGUE_URL || 'http://catalogue:8081';

app.post('/orders', async (req, res) => {
  const ids = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'An array of product IDs is required' });
  }
  try {
    const products = [];
    for (const id of ids) {
      const response = await fetch(`${CATALOGUE_URL}/products/${id}`);
      if (!response.ok) {
        return res.status(404).json({ error: `Product ${id} not found` });
      }
      products.push(await response.json());
    }
    const order = await create(products);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
});

app.get('/orders/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const order = await getById(id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log(`Order service listening on port ${PORT}`));