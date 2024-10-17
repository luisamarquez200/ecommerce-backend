// src/routes/productRoutes.ts
import { Router } from 'express';
import {
    fetchProducts,
    createProduct,
    modifyProduct,
    removeProduct
} from '../controllers/productController'; // Asegúrate de que la ruta sea correcta

const router = Router();

router.get('/', fetchProducts); // Asegúrate de que fetchProducts esté definido
router.post('/', createProduct);
router.put('/:id', modifyProduct);
router.delete('/:id', removeProduct);

export default router;
