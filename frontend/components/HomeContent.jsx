"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Navbar from "./Navbar";
import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";

export default function HomeContent({
  products,
  categories,
  q,
  category,
  loadError,
}) {
  const router = useRouter();

  const onSearchSubmit = useCallback(
    (search, cat) => {
      const sp = new URLSearchParams();
      if (search) sp.set("q", search);
      if (cat) sp.set("category", String(cat));
      router.push(`/?${sp.toString()}`);
    },
    [router]
  );

  return (
    <>
      <Navbar
        search={q}
        category={category}
        onSearchSubmit={(search) => onSearchSubmit(search, category)}
      />
      <CategoryFilter
        categories={categories}
        activeId={category}
        searchQuery={q}
      />
      <main className="mx-auto max-w-7xl px-3 pb-10 pt-4 sm:px-4 sm:py-6">
        {loadError && (
          <div className="mb-4 rounded bg-red-50 px-4 py-3 text-sm text-red-700">
            {loadError}
          </div>
        )}
        <ProductGrid products={products} />
      </main>
    </>
  );
}
