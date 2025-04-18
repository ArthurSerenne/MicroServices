let products = [];
let nextId = 1;

export function getAll() {
  return products;
}

export function getById(id) {
  return products.find(p => p.id === id);
}

export function create(product) {
  product.id = nextId++;
  products.push(product);
  return product;
}