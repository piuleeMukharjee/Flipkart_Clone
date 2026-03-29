"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import SearchBar from "./SearchBar";

export default function Navbar({ search, category, onSearchSubmit }) {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-flipkart-blue text-white shadow-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-3 py-3 sm:px-4 md:flex-row md:items-center md:gap-6">
        <Link
          href="/"
          className="shrink-0 text-xl font-bold tracking-tight text-white hover:opacity-95"
        >
          Flipkart<span className="text-flipkart-yellow">Clone</span>
        </Link>        <div className="min-w-0 flex-1">
          <SearchBar
            initialValue={search}
            category={category}
            onSubmit={onSearchSubmit}
          />
        </div>
        <nav className="flex shrink-0 items-center justify-end gap-4 text-sm font-medium">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded px-2 py-1 hover:bg-white/10"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-flipkart-yellow px-1 text-xs font-bold text-gray-900">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
