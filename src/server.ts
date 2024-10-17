import express from 'express';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import { authenticate } from './middleware/authMiddleware';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', authenticate, productRoutes); // Protected route
app.use('/api/orders', authenticate, orderRoutes); // Protected route

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
