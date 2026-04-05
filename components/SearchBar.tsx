"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  totalCount: number;
  filteredCount: number;
}

export const SearchBar = ({
  value,
  onChange,
  totalCount,
  filteredCount,
}: SearchBarProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1 w-full">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search by name or description..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full pl-9 pr-9 py-2.5 rounded-xl
            border border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition
          "
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={14} />
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 sm:whitespace-nowrap">
        {value
          ? `${filteredCount} of ${totalCount} products`
          : `${totalCount} product${totalCount !== 1 ? "s" : ""}`}
      </p>
    </div>
  );
};
