"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import Navbar from "./Navbar";
import * as api from "@/lib/api";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ productId }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.getProductById(productId);
        if (!cancelled) setProduct(res.data);
      } catch (e) {
        if (!cancelled) setError(e.message || "Not found");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="aspect-square animate-pulse rounded bg-gray-200" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-1/2 animate-pulse rounded bg-gray-200" />
              <div className="h-24 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <p className="text-gray-600">{error || "Product not found"}</p>
          <Link href="/" className="mt-4 inline-block text-flipkart-blue">
            ← Back to shop
          </Link>
        </div>
      </>
    );
  }

  const inStock = product.stock > 0;

  const handleAdd = async () => {
    setBusy(true);
    try {
      await addItem(product.id, 1);
    } finally {
      setBusy(false);
    }
  };

  const handleBuy = async () => {
    setBusy(true);
    try {
      await addItem(product.id, 1);
      router.push("/cart");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-flipkart-blue">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>{product.category?.name}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
        <div className="grid gap-8 rounded-sm bg-white p-4 shadow-card lg:grid-cols-2 lg:p-8">
          <ImageCarousel images={product.images} productName={product.name} />
          <div>
            <h1 className="text-2xl font-medium text-gray-900 md:text-3xl">
              {product.name}
            </h1>
            <div className="mt-2 inline-flex items-center gap-2 rounded bg-flipkart-green/10 px-2 py-0.5 text-sm font-semibold text-flipkart-green">
              {product.rating.toFixed(1)} ★{" "}
              <span className="font-normal text-gray-600">
                {product.reviewCount.toLocaleString("en-IN")} Ratings & Reviews
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-semibold text-gray-900">
                ₹{Math.round(product.price).toLocaleString("en-IN")}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{Math.round(product.originalPrice).toLocaleString("en-IN")}
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-lg font-semibold text-flipkart-green">
                  {product.discount}% off
                </span>
              )}
            </div>
            <p className="mt-4 text-sm text-flipkart-green">Special Price</p>
            <div
              className={`mt-4 inline-flex rounded px-3 py-1 text-sm font-semibold ${
                inStock
                  ? "bg-green-50 text-flipkart-green"
                  : "bg-red-50 text-flipkart-red"
              }`}
            >
              {inStock ? `${product.stock} left in stock` : "Out of Stock"}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={!inStock || busy}
                onClick={handleAdd}
                className="min-w-[160px] rounded-sm border-2 border-flipkart-yellow bg-flipkart-yellow py-3 font-semibold text-gray-900 shadow-sm hover:bg-[#f0d318] disabled:opacity-50"
              >
                {busy ? "Please wait…" : "Add to Cart"}
              </button>
              <button
                type="button"
                disabled={!inStock || busy}
                onClick={handleBuy}
                className="min-w-[160px] rounded-sm border-2 border-flipkart-red bg-flipkart-red py-3 font-semibold text-white hover:bg-[#e04a4a] disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>
            <div className="mt-10 border-t border-gray-100 pt-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Specifications
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>
                  <span className="font-medium text-gray-900">Category</span>{" "}
                  — {product.category?.name}
                </li>
                <li>
                  <span className="font-medium text-gray-900">Description</span>{" "}
                  — {product.description}
                </li>
                <li>
                  <span className="font-medium text-gray-900">Stock</span> —{" "}
                  {product.stock} units
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
