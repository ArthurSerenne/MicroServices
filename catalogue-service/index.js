import express from 'express';
import { getAll, getById, create } from './products.js';

const app = express();
app.use(express.json());

app.get('/products', async (req, res) => {
  const products = await getAll();
  res.json(products);
});

app.get('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = await getById(id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/products', async (req, res) => {
  const { name, price } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ error: 'name and price are required' });
  }
  const newProduct = await create({ name, price });
  res.status(201).json(newProduct);
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Catalogue service listening on port ${PORT}`));