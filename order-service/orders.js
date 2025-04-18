let orders = [];
let nextId = 1;

export function create(products) {
  const order = { id: nextId++, products };
  orders.push(order);
  return order;
}

export function getById(id) {
  return orders.find(o => o.id === id);
}