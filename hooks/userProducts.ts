"use client";

import { useState, useCallback } from "react";
import { Product, ProductFormData, ToastMessage } from "@/types/product";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/storage";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(() => getProducts());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const showToast = useCallback(
    (message: string, type: ToastMessage["type"] = "success") => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    [],
  );

  const handleAdd = useCallback(
    (data: ProductFormData) => {
      if (!data.name.trim()) {
        showToast("Product name is required.", "error");
        return false;
      }
      if (data.price < 0) {
        showToast("Price cannot be negative.", "error");
        return false;
      }

      const newProduct: Product = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      addProduct(newProduct);
      setProducts(getProducts());
      showToast(`"${data.name}" added successfully!`);
      return true;
    },
    [showToast],
  );

  const handleUpdate = useCallback(
    (id: string, data: ProductFormData) => {
      if (!data.name.trim()) {
        showToast("Product name is required.", "error");
        return false;
      }

      const existing = products.find((p) => p.id === id);
      if (!existing) return false;

      const updated: Product = {
        ...existing,
        ...data,
        updatedAt: Date.now(),
      };

      updateProduct(updated);
      setProducts(getProducts());
      showToast(`"${data.name}" updated successfully!`);
      return true;
    },
    [products, showToast],
  );

  const handleDelete = useCallback(
    (id: string) => {
      const product = products.find((p) => p.id === id);
      if (!product) return;

      deleteProduct(id);
      setProducts(getProducts());
      showToast(`"${product.name}" deleted.`, "warning");
    },
    [products, showToast],
  );

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return {
    products: filteredProducts,
    allProducts: products,
    toasts,
    searchQuery,
    setSearchQuery,
    isLoading: false,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
};
