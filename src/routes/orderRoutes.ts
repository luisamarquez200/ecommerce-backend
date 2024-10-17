// src/routes/orderRoutes.ts
import { Router } from 'express';
import {
    createOrderController,
    getOrdersController,
    getOrderByIdController,
    updateOrderController,
    deleteOrderController
} from '../controllers/orderController';

const router = Router();

router.post('/', createOrderController); // Crear orden
router.get('/', getOrdersController); // Obtener todas las órdenes
router.get('/:id', getOrderByIdController); // Obtener orden por ID
router.put('/:id', updateOrderController); // Actualizar orden
router.delete('/:id', deleteOrderController); // Eliminar orden

export default router;
