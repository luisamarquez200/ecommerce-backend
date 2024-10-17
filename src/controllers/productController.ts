// src/controllers/productController.ts
import { Request, Response } from 'express';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../models/product';

export const fetchProducts = async (req: Request, res: Response) => {
  const products = getProducts();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, quantity } = req.body;

  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'El precio debe ser un número no negativo' });
  }

  const newProduct = await addProduct(name, price, quantity);
  res.status(201).json(newProduct);
};

export const modifyProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedProduct = await updateProduct(id, req.body);
  
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (await deleteProduct(id)) {
    res.status(204).send(); // No content
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
};
