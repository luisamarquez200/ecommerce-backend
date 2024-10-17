// src/models/order.ts
export interface Order {
  id: number;
  productId: number; // ID del producto relacionado
  quantity: number;   // Cantidad de producto en la orden
  totalPrice: number; // Precio total de la orden
}

const orders: Order[] = []; // Almacenamiento temporal de órdenes
let nextOrderId = 1; // Contador para asignar IDs únicos

// Función para agregar una nueva orden
export const addOrder = (productId: number, quantity: number, totalPrice: number): Order => {
  const newOrder: Order = { id: nextOrderId++, productId, quantity, totalPrice };
  orders.push(newOrder);
  return newOrder;
};

// Función para obtener todas las órdenes
export const getOrders = (): Order[] => orders;

// Función para obtener una orden por ID
export const getOrderById = (id: number): Order | undefined => {
  return orders.find(order => order.id === id);
};

// Función para actualizar una orden
export const updateOrder = (id: number, updatedOrder: Partial<Order>): Order | undefined => {
  const order = getOrderById(id);
  if (order) {
      Object.assign(order, updatedOrder);
      return order;
  }
  return undefined;
};

// Función para eliminar una orden
export const deleteOrder = (id: number): boolean => {
  const index = orders.findIndex(order => order.id === id);
  if (index !== -1) {
      orders.splice(index, 1);
      return true;
  }
  return false;
};
