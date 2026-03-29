import { Suspense } from "react";
import ProductDetail from "@/components/ProductDetail";

export default function ProductPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl animate-pulse px-4 py-8">
          <div className="h-96 rounded bg-gray-200" />
        </div>
      }
    >
      <ProductDetail productId={params.id} />
    </Suspense>
  );
}
