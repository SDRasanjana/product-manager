"use client";

import Image from "next/image";
import { useState } from "react";
import { Product, ProductFormData } from "@/types/product";

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (data: ProductFormData) => boolean;
  onCancel: () => void;
}

const EMPTY_FORM: ProductFormData = {
  name: "",
  price: 0,
  description: "",
  image: "",
};

const getInitialForm = (initialData?: Product | null): ProductFormData => {
  if (!initialData) return EMPTY_FORM;
  return {
    name: initialData.name,
    price: initialData.price,
    description: initialData.description,
    image: initialData.image,
  };
};

export const ProductForm = ({
  initialData,
  onSubmit,
  onCancel,
}: ProductFormProps) => {
  const initialForm = getInitialForm(initialData);
  const [form, setForm] = useState<ProductFormData>(() => initialForm);
  const [priceInput, setPriceInput] = useState(() =>
    initialData ? String(initialForm.price) : "",
  );
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormData, string>>
  >({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (data: ProductFormData, rawPrice: string = priceInput) => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};
    if (!data.name.trim()) newErrors.name = "Name is required";
    if (!rawPrice.trim()) {
      newErrors.price = "Price is required";
    } else if (data.price < 0) {
      newErrors.price = "Price must be 0 or more";
    }
    if (data.description.length > 500)
      newErrors.description = "Max 500 characters";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "image") {
      setImagePreviewError(false);
    }

    if (name === "price") {
      setPriceInput(value);
    }

    const updated = {
      ...form,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    };

    setForm(updated);

    if (touched[name]) {
      setErrors(validate(updated, name === "price" ? value : priceInput));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      Object.keys(form).map((k) => [k, true]),
    );
    setTouched(allTouched);
    const newErrors = validate(form, priceInput);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const success = onSubmit(form);
    if (success) {
      setForm(EMPTY_FORM);
      setPriceInput("");
      setTouched({});
      setErrors({});
    }
  };

  const inputClass = (field: keyof ProductFormData) => `
    w-full px-3 py-2.5 rounded-xl text-sm border transition
    bg-white dark:bg-gray-800
    text-gray-900 dark:text-gray-100
    focus:outline-none focus:ring-2 focus:ring-indigo-500
    ${
      errors[field]
        ? "border-red-400 dark:border-red-500"
        : "border-gray-200 dark:border-gray-700"
    }
  `;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. Wireless Headphones"
          className={inputClass("name")}
        />
        {errors.name && touched.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Price (USD) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            $
          </span>
          <input
            type="number"
            name="price"
            value={priceInput}
            onChange={handleChange}
            onBlur={handleBlur}
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="e.g. 49.99"
            className={`${inputClass("price")} pl-7`}
          />
        </div>
        <p className="mt-1 text-xs text-gray-400">
          Use numbers only, for example 49.99
        </p>
        {errors.price && touched.price && (
          <p className="text-xs text-red-500 mt-1">{errors.price}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={3}
          placeholder="Short product description..."
          className={`${inputClass("description")} resize-none`}
        />
        <div className="flex justify-between mt-1">
          {errors.description && touched.description ? (
            <p className="text-xs text-red-500">{errors.description}</p>
          ) : (
            <span />
          )}
          <p className="text-xs text-gray-400 ml-auto">
            {form.description.length}/500
          </p>
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Image URL
        </label>
        <input
          type="url"
          name="image"
          value={form.image}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://example.com/image.jpg"
          className={inputClass("image")}
        />
        {form.image && !imagePreviewError && (
          <div className="relative mt-2 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-32 w-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <Image
              src={form.image}
              alt="Preview"
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
              onError={() => setImagePreviewError(true)}
            />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="
            flex-1 py-2.5 px-4 rounded-xl text-sm font-medium
            border border-gray-200 dark:border-gray-700
            text-gray-700 dark:text-gray-300
            hover:bg-gray-50 dark:hover:bg-gray-800
            transition-colors
          "
        >
          Cancel
        </button>
        <button
          type="submit"
          className="
            flex-1 py-2.5 px-4 rounded-xl text-sm font-medium
            bg-indigo-600 hover:bg-indigo-700
            text-white transition-colors
          "
        >
          {initialData ? "Save Changes" : "Add Product"}
        </button>
      </div>
    </form>
  );
};
