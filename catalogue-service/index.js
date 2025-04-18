import express from "express";
import { getAll, getById, create } from "./products.js";

const app = express();
app.use(express.json());

app.get("/products", (req, res) => {
  res.json(getAll());
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = getById(id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ error: "name and price are required" });
  }
  const newProduct = create({ name, price });
  res.status(201).json(newProduct);
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Catalogue service listening on port ${PORT}`));