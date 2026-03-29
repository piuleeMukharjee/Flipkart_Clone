"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import CartItemRow from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, loading } = useCart();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="mb-4 text-xl font-semibold text-gray-900">My Cart</h1>
        {loading ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="h-64 animate-pulse rounded bg-white lg:col-span-2" />
            <div className="h-48 animate-pulse rounded bg-white" />
          </div>
        ) : !cart?.items?.length ? (
          <div className="rounded-sm bg-white p-12 text-center shadow-card">
            <p className="text-gray-600">Your cart is empty.</p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-sm bg-flipkart-blue px-6 py-2 font-semibold text-white"
            >
              Shop now
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-sm bg-white p-4 shadow-card lg:col-span-2 lg:p-6">
              {cart.items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <CartSummary cart={cart} />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
