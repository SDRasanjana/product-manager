"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal";
import { ProductModal } from "@/components/ProductModel";
import { SearchBar } from "@/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Toast } from "@/components/Toast";
import { useProducts } from "@/hooks/userProducts";
import { Product, ProductFormData } from "@/types/product";

export default function ProductManagerPage() {
  const {
    products,
    allProducts,
    toasts,
    searchQuery,
    setSearchQuery,
    isLoading,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const openAddModal = () => {
    setEditProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditProduct(null);
  };

  const handleDeleteWithConfirmation = (id: string) => {
    const selected = allProducts.find((product) => product.id === id);
    if (!selected) return;
    setDeleteProduct(selected);
  };

  const closeDeleteModal = () => {
    setDeleteProduct(null);
  };

  const confirmDelete = () => {
    if (!deleteProduct) return;
    handleDelete(deleteProduct.id);
    setDeleteProduct(null);
  };

  const onFormSubmit = (data: ProductFormData) => {
    if (editProduct) {
      return handleUpdate(editProduct.id, data);
    }
    return handleAdd(data);
  };

  const emptyMessage = useMemo(() => {
    if (allProducts.length === 0) {
      return "No products yet. Add your first product to get started.";
    }
    return "No matching products found. Try a different search query.";
  }, [allProducts.length]);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-2xl border border-gray-200/80 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
                Product Manager
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Add, view, edit, and delete products. Data is stored in local
                storage.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <ThemeToggle />
              <button
                onClick={openAddModal}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 sm:w-auto"
              >
                <Plus size={16} />
                Add Product
              </button>
            </div>
          </div>

          <div className="mt-5">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              totalCount={allProducts.length}
              filteredCount={products.length}
            />
          </div>
        </header>

        {isLoading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Nothing to show
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
              {searchQuery
                ? emptyMessage
                : "No products yet. Add your first product to get started."}
            </p>
            {!searchQuery && (
              <button
                onClick={openAddModal}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 sm:w-auto"
              >
                <Plus size={16} />
                Add First Product
              </button>
            )}
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={openEditModal}
                onDelete={handleDeleteWithConfirmation}
              />
            ))}
          </section>
        )}

        <ProductModal
          isOpen={isModalOpen}
          editProduct={editProduct}
          onClose={closeModal}
          onSubmit={onFormSubmit}
        />

        <DeleteConfirmationModal
          isOpen={Boolean(deleteProduct)}
          productName={deleteProduct?.name ?? "this product"}
          onConfirm={confirmDelete}
          onClose={closeDeleteModal}
        />
      </main>

      <Toast toasts={toasts} />
    </div>
  );
}
