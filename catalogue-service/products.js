let products = [
  { id: 1, name: "iPhone 15", price: 999 },
  { id: 2, name: "Samsung Galaxy S24", price: 899 },
  { id: 3, name: "Google Pixel 8", price: 799 }
];
let nextId = 4;

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