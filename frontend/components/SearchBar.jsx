"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function SearchBar({
  initialValue = "",
  category = "",
  onSubmit,
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue ?? "");

  useEffect(() => {
    setValue(initialValue ?? "");
  }, [initialValue]);

  const runSearch = useCallback(() => {
    const q = value.trim();
    if (onSubmit) {
      onSubmit(q, category);
      return;
    }
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (category) sp.set("category", String(category));
    router.push(`/?${sp.toString()}`);
  }, [value, category, onSubmit, router]);

  return (
    <form
      className="flex w-full max-w-2xl overflow-hidden rounded-sm bg-white shadow-inner ring-1 ring-black/5"
      onSubmit={(e) => {
        e.preventDefault();
        runSearch();
      }}
    >
      <input
        type="search"
        placeholder="Search for products, brands and more"
        className="min-w-0 flex-1 rounded-l-sm border-0 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-flipkart-blue/30 sm:px-4 sm:text-base"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search"
      />
      <button
        type="submit"
        className="shrink-0 bg-flipkart-blue px-4 py-2.5 text-white transition-colors hover:bg-[#1f5fce] sm:px-5"
      >        <span className="sr-only">Search</span>
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
}
