// components/ProductModal.tsx
"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Product, ProductFormData } from "@/types/product";
import { ProductForm } from "./ProductForm";

interface ProductModalProps {
  isOpen: boolean;
  editProduct: Product | null;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => boolean;
}

export const ProductModal = ({
  isOpen,
  editProduct,
  onClose,
  onSubmit,
}: ProductModalProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
        relative w-full max-w-md
        bg-white dark:bg-gray-900
        rounded-2xl shadow-2xl
        border border-gray-200 dark:border-gray-700
        p-6 z-50
        max-h-[90vh] overflow-y-auto
      "
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {editProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <ProductForm
          key={editProduct?.id ?? "new"}
          initialData={editProduct}
          onSubmit={(data) => {
            const success = onSubmit(data);
            if (success) onClose();
            return success;
          }}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};
