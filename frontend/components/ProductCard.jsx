"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

function StarRow({ rating }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <span className="rounded bg-flipkart-green/10 px-1.5 py-0.5 text-xs font-semibold text-flipkart-green">
        {rating.toFixed(1)} ★
      </span>
    </span>
  );
}

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [busy, setBusy] = useState(false);
  const primary =
    product.images?.find((i) => i.isPrimary) || product.images?.[0];
  const img = primary?.imageUrl || "/placeholder.png";

  const handleAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setBusy(true);
    try {
      await addItem(product.id, 1);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-sm border border-gray-100 bg-white shadow-card transition-shadow duration-200 hover:border-gray-200 hover:shadow-card-hover">
      <Link
        href={`/product/${product.id}`}
        className="flex min-h-0 flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-flipkart-blue focus-visible:ring-offset-2"
      >
        <div className="relative aspect-square bg-gradient-to-b from-gray-50 to-white">
          <Image
            src={img}
            alt={product.name}
            fill
            className="object-contain p-3 transition-transform duration-200 group-hover:scale-[1.03] sm:p-4"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {product.discount > 0 && (
            <span className="absolute left-2 top-2 rounded-sm bg-flipkart-green px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white sm:text-xs">
              {product.discount}% off
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1.5 border-t border-gray-100 p-3">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-gray-900">
            {product.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <StarRow rating={product.rating} />
            <span className="text-gray-500">
              ({product.reviewCount.toLocaleString("en-IN")})
            </span>
          </div>
          <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-1">
            <span className="text-lg font-bold text-gray-900">
              ₹{Math.round(product.price).toLocaleString("en-IN")}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{Math.round(product.originalPrice).toLocaleString("en-IN")}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-sm font-medium text-flipkart-red">
                {product.discount}% off
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="border-t border-gray-100 p-3 pt-2">
        <button
          type="button"
          onClick={handleAdd}
          disabled={busy || product.stock < 1}
          className="w-full rounded-sm border border-flipkart-blue bg-white py-2 text-sm font-semibold text-flipkart-blue shadow-sm transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {product.stock < 1 ? "Out of Stock" : busy ? "Adding…" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
