// src/models/product.ts
import fs from 'fs-extra';
import path from 'path';

export interface Product {
  id: number;
  name: string;
  price: number;  // Agrega el campo price
  quantity: number;
}

// Ruta del archivo donde se guardarán los productos
const productsFilePath = path.join(__dirname, 'products.json');

// Inicializar productos y el ID del siguiente producto
export let products: Product[] = [];
let nextProductId = 1;

// Función para cargar productos desde el archivo
const loadProductsFromFile = async (): Promise<Product[]> => {
  if (await fs.pathExists(productsFilePath)) {
    const data = await fs.readFile(productsFilePath, 'utf-8');
    return JSON.parse(data) as Product[];
  }
  return [];
};

// Función para guardar productos en el archivo
const saveProductsToFile = async (products: Product[]) => {
  await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
};

// Función para inicializar el almacenamiento de productos
const initializeProducts = async () => {
  products = await loadProductsFromFile();
  nextProductId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
};

// Inicializar productos al iniciar la aplicación
initializeProducts();

// Función para agregar un nuevo producto
export const addProduct = async (name: string, price: number, quantity: number): Promise<Product> => {
  const newProduct: Product = { id: nextProductId++, name, price, quantity };
  products.push(newProduct);
  await saveProductsToFile(products);  // Guardar en el archivo
  return newProduct;
};

// Función para obtener todos los productos
export const getProducts = (): Product[] => products;

// Función para obtener un producto por ID
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

// Función para actualizar un producto
export const updateProduct = async (id: number, updatedProduct: Partial<Product>): Promise<Product | undefined> => {
  const product = getProductById(id);
  if (product) {
    Object.assign(product, updatedProduct);
    await saveProductsToFile(products);  // Guardar cambios en el archivo
    return product;
  }
  return undefined;
};

// Función para eliminar un producto
export const deleteProduct = async (id: number): Promise<boolean> => {
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    await saveProductsToFile(products);  // Guardar cambios en el archivo
    return true;
  }
  return false;
};
