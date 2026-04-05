export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: number;
  updatedAt: number;
}

export type ProductFormData = Omit<Product, "id" | "createdAt" | "updatedAt">;

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "warning";
}
