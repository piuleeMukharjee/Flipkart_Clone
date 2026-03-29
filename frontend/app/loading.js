import { ProductGridSkeleton } from "@/components/ProductGrid";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      <div className="h-[52px] animate-pulse bg-flipkart-blue sm:h-16" />
      <div className="h-24 animate-pulse bg-white shadow-card" />
      <main className="mx-auto max-w-7xl px-3 py-6 sm:px-4">
        <ProductGridSkeleton />
      </main>
    </div>
  );
}
