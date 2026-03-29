"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import AddressForm from "@/components/AddressForm";
import * as api from "@/lib/api";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, loading: cartLoading, refreshCart } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAddresses = useCallback(async () => {
    setError(null);
    try {
      const res = await api.getAddresses();
      const list = res.data;
      setAddresses(list);
      const def = list.find((a) => a.isDefault);
      setSelectedId((id) => id ?? def?.id ?? list[0]?.id ?? null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const totals = useMemo(() => {
    if (!cart?.items?.length) return { sub: 0 };
    let sub = 0;
    for (const line of cart.items) {
      sub += line.product.price * line.quantity;
    }
    return { sub };
  }, [cart]);

  const handleAddAddress = async (data) => {
    setFormLoading(true);
    setError(null);
    try {
      const res = await api.addAddress(data);
      await loadAddresses();
      setSelectedId(res.data.id);
    } catch (e) {
      setError(e.message);
    } finally {
      setFormLoading(false);
    }
  };

  const confirmOrder = async () => {
    if (!selectedId) {
      setError("Select or add a delivery address");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.placeOrder(selectedId);
      await refreshCart();
      router.push(`/order-confirmation?orderId=${res.data.id}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (cartLoading || loading) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-7xl animate-pulse px-4 py-8">
          <div className="h-64 rounded bg-white" />
        </div>
      </>
    );
  }

  if (!cart?.items?.length) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-16 text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link href="/" className="mt-4 inline-block text-flipkart-blue">
            Continue shopping
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="mb-6 text-xl font-semibold">Checkout</h1>
        {error && (
          <div className="mb-4 rounded bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <section className="rounded-sm bg-white p-4 shadow-card">
              <h2 className="mb-4 font-semibold text-gray-900">
                Select delivery address
              </h2>
              <ul className="space-y-3">
                {addresses.map((a) => (
                  <li key={a.id}>
                    <label className="flex cursor-pointer gap-3 rounded border border-gray-200 p-3 hover:bg-gray-50">
                      <input
                        type="radio"
                        name="addr"
                        checked={selectedId === a.id}
                        onChange={() => setSelectedId(a.id)}
                        className="mt-1"
                      />
                      <div className="text-sm">
                        <p className="font-semibold text-gray-900">
                          {a.fullName}{" "}
                          <span className="font-normal text-gray-600">
                            {a.phone}
                          </span>
                        </p>
                        <p className="text-gray-700">
                          {a.street}, {a.city}, {a.state} — {a.pincode}
                        </p>
                        {a.isDefault && (
                          <span className="mt-1 inline-block text-xs font-medium text-flipkart-green">
                            Default
                          </span>
                        )}
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
              {!addresses.length && (
                <p className="text-sm text-gray-600">
                  No saved addresses. Add one below.
                </p>
              )}
            </section>
            <AddressForm onSubmit={handleAddAddress} loading={formLoading} />
          </div>
          <div className="space-y-4">
            <div className="rounded-sm bg-white p-4 shadow-card lg:sticky lg:top-24">
              <h2 className="mb-4 font-semibold text-gray-900">Order summary</h2>
              <ul className="max-h-64 space-y-3 overflow-y-auto">
                {cart.items.map((line) => {
                  const p = line.product;
                  const img =
                    p.images?.[0]?.imageUrl ||
                    "https://picsum.photos/seed/small/80/80";
                  return (
                    <li key={line.id} className="flex gap-3 text-sm">
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded border bg-white">
                        <Image
                          src={img}
                          alt=""
                          fill
                          className="object-contain p-1"
                          sizes="56px"
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 font-medium">{p.name}</p>
                        <p className="text-gray-600">
                          Qty {line.quantity} × ₹
                          {Math.round(p.price).toLocaleString("en-IN")}
                        </p>
                      </div>
                      <span className="shrink-0 font-semibold">
                        ₹
                        {Math.round(
                          p.price * line.quantity
                        ).toLocaleString("en-IN")}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex justify-between border-t border-dashed border-gray-200 pt-3 text-base font-bold">
                <span>Total</span>
                <span>
                  ₹{Math.round(totals.sub).toLocaleString("en-IN")}
                </span>
              </div>
              <button
                type="button"
                disabled={submitting}
                onClick={confirmOrder}
                className="mt-4 w-full rounded-sm bg-flipkart-yellow py-3 font-bold text-gray-900 hover:bg-[#f0d318] disabled:opacity-60"
              >
                {submitting ? "Placing order…" : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
