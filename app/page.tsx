"use client";

import dynamic from "next/dynamic";

const ProductManagerPage = dynamic(
  () => import("@/components/ProductManagerPage"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
            Loading product manager...
          </div>
        </main>
      </div>
    ),
  },
);

export default function Home() {
  return <ProductManagerPage />;
}
