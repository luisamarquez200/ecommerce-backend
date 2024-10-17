// src/controllers/orderController.ts
import { Request, Response } from 'express';
import { addOrder, getOrders, getOrderById, updateOrder, deleteOrder } from '../models/order';

// Controlador para agregar una nueva orden
export const createOrderController = (req: Request, res: Response) => {
    const { productId, quantity, totalPrice } = req.body;
    const newOrder = addOrder(productId, quantity, totalPrice);
    res.status(201).json(newOrder); // Devuelve la nueva orden creada
};

// Controlador para obtener todas las órdenes
export const getOrdersController = (req: Request, res: Response) => {
    const orders = getOrders();
    res.json(orders); // Devuelve la lista de órdenes
};

// Controlador para obtener una orden por ID
export const getOrderByIdController = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const order = getOrderById(id);
    if (order) {
        res.json(order); // Devuelve la orden encontrada
    } else {
        res.status(404).json({ error: 'Order not found' }); // Orden no encontrada
    }
};

// Controlador para actualizar una orden
export const updateOrderController = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const updatedOrder = updateOrder(id, req.body);
    if (updatedOrder) {
        res.json(updatedOrder); // Devuelve la orden actualizada
    } else {
        res.status(404).json({ error: 'Order not found' }); // Orden no encontrada
    }
};

// Controlador para eliminar una orden
export const deleteOrderController = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const deleted = deleteOrder(id);
    if (deleted) {
        res.status(204).send(); // No Content
    } else {
        res.status(404).json({ error: 'Order not found' }); // Orden no encontrada
    }
};
