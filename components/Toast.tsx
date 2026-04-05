"use client";

import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { ToastMessage } from "@/types/product";

interface ToastProps {
  toasts: ToastMessage[];
}

const icons = {
  success: <CheckCircle size={16} className="text-green-500" />,
  error: <XCircle size={16} className="text-red-500" />,
  warning: <AlertTriangle size={16} className="text-yellow-500" />,
};

const backgrounds = {
  success:
    "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  error: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
  warning:
    "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
};

export const Toast = ({ toasts }: ToastProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg
            text-sm font-medium text-gray-800 dark:text-gray-100
            pointer-events-auto min-w-60 max-w-[320px]
            animate-slide-in
            ${backgrounds[toast.type]}
          `}
        >
          {icons[toast.type]}
          <span className="flex-1">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
