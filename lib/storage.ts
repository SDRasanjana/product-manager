import { Product } from "@/types/product";

const STORAGE_KEY = "product_management_data";

export const getProducts = (): Product[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveProducts = (products: Product[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const addProduct = (product: Product): void => {
  const products = getProducts();
  saveProducts([...products, product]);
};

export const updateProduct = (updated: Product): void => {
  const products = getProducts();
  saveProducts(products.map((p) => (p.id === updated.id ? updated : p)));
};

export const deleteProduct = (id: string): void => {
  const products = getProducts();
  saveProducts(products.filter((p) => p.id !== id));
};
