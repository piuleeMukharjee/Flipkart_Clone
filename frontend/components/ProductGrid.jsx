"use client";

import ProductCard from "./ProductCard";

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-sm bg-white shadow-card"
        >
          <div className="aspect-square bg-gray-200" />
          <div className="space-y-2 p-3">
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 w-2/3 rounded bg-gray-200" />
            <div className="h-6 w-1/2 rounded bg-gray-200" />
            <div className="h-10 rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductGrid({ products }) {
  if (!products?.length) {
    return (
      <div className="rounded-sm border border-gray-100 bg-white p-10 text-center text-gray-600 shadow-card sm:p-12">
        No products match your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
