"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import * as api from "@/lib/api";
import Image from "next/image";

function OrderConfirmationInner() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await api.getOrderById(orderId);
        if (!cancelled) setOrder(res.data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-sm bg-white p-8 text-center shadow-card">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-flipkart-green/15">
            <svg
              className="h-8 w-8 text-flipkart-green"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Order placed successfully
          </h1>
          {!orderId && (
            <p className="mt-4 text-gray-600">No order id in URL.</p>
          )}
          {orderId && (
            <p className="mt-2 text-gray-600">
              Order ID:{" "}
              <span className="font-mono font-bold text-flipkart-blue">
                #{orderId}
              </span>
            </p>
          )}
          {loading && <p className="mt-4 text-sm text-gray-500">Loading details…</p>}
          {error && (
            <p className="mt-4 text-sm text-red-600">{error}</p>
          )}
          {order && (
            <div className="mt-8 text-left">
              <h2 className="mb-3 text-sm font-semibold uppercase text-gray-500">
                Items ordered
              </h2>
              <ul className="space-y-3">
                {order.items.map((line) => {
                  const p = line.product;
                  const img =
                    p.images?.find((i) => i.isPrimary) || p.images?.[0];
                  return (
                    <li
                      key={line.id}
                      className="flex gap-3 border-b border-gray-100 pb-3 text-sm last:border-0"
                    >
                      {img && (
                        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded border bg-white">
                          <Image
                            src={img.imageUrl}
                            alt=""
                            fill
                            className="object-contain p-1"
                            sizes="48px"
                          />
                        </span>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{p.name}</p>
                        <p className="text-gray-600">
                          Qty: {line.quantity} × ₹
                          {Math.round(line.priceAtPurchase).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-right font-bold text-gray-900">
                Total paid: ₹
                {Math.round(order.totalAmount).toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-right text-sm text-gray-600">
                Status: {order.status}
              </p>
            </div>
          )}
          <Link
            href="/"
            className="mt-8 inline-block rounded-sm bg-flipkart-blue px-8 py-3 font-semibold text-white hover:bg-[#1f5fce]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    </>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar />
          <div className="mx-auto max-w-3xl animate-pulse px-4 py-12">
            <div className="h-64 rounded bg-white" />
          </div>
        </>
      }
    >
      <OrderConfirmationInner />
    </Suspense>
  );
}
