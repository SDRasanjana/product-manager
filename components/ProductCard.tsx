"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types/product";
import { Pencil, Trash2, ImageIcon } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard = ({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) => {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div
      className="
      group relative bg-white dark:bg-gray-800
      rounded-2xl border border-gray-200 dark:border-gray-700
      overflow-hidden shadow-sm hover:shadow-md
      transition-all duration-200 hover:-translate-y-0.5
    "
    >
      {/* Image */}
      <div className="relative h-44 bg-gray-100 dark:bg-gray-700 overflow-hidden">
        {product.image && !hasImageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={32} className="text-gray-300 dark:text-gray-600" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight line-clamp-1">
            {product.name}
          </h3>
          <span className="shrink-0 text-sm font-bold text-indigo-600 dark:text-indigo-400">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {product.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => onEdit(product)}
            className="
              flex-1 flex items-center justify-center gap-1.5
              py-1.5 px-3 rounded-lg text-xs font-medium
              bg-gray-50 dark:bg-gray-700
              text-gray-700 dark:text-gray-300
              hover:bg-indigo-50 dark:hover:bg-indigo-900/30
              hover:text-indigo-700 dark:hover:text-indigo-300
              transition-colors
            "
          >
            <Pencil size={12} />
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="
              flex-1 flex items-center justify-center gap-1.5
              py-1.5 px-3 rounded-lg text-xs font-medium
              bg-gray-50 dark:bg-gray-700
              text-gray-700 dark:text-gray-300
              hover:bg-red-50 dark:hover:bg-red-900/30
              hover:text-red-700 dark:hover:text-red-400
              transition-colors
            "
          >
            <Trash2 size={12} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
