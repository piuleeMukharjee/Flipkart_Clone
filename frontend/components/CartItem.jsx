"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartItemRow({ item }) {
  const { updateItem, removeItem } = useCart();
  const [busy, setBusy] = useState(false);
  const p = item.product;
  const img =
    p.images?.[0]?.imageUrl ||
    p.images?.find?.((i) => i.isPrimary)?.imageUrl ||
    "https://picsum.photos/seed/empty/200/200";

  const changeQty = async (next) => {
    if (next < 1) return;
    if (next > p.stock) return;
    setBusy(true);
    try {
      await updateItem(item.id, next);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex gap-4 border-b border-gray-100 py-4 last:border-0">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded border border-gray-100 bg-white sm:h-28 sm:w-28">
        <Image src={img} alt={p.name} fill className="object-contain p-2" sizes="112px" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 font-medium text-gray-900">{p.name}</h3>
        <p className="mt-1 text-sm text-flipkart-green">In stock</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center rounded border border-gray-200 bg-white">
            <button
              type="button"
              disabled={busy || item.quantity <= 1}
              onClick={() => changeQty(item.quantity - 1)}
              className="px-3 py-1.5 text-lg font-medium hover:bg-gray-50 disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-[2rem] text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <button
              type="button"
              disabled={busy || item.quantity >= p.stock}
              onClick={() => changeQty(item.quantity + 1)}
              className="px-3 py-1.5 text-lg font-medium hover:bg-gray-50 disabled:opacity-40"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await removeItem(item.id);
              } finally {
                setBusy(false);
              }
            }}
            className="text-sm font-semibold text-flipkart-blue hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-semibold text-gray-900">
          ₹{Math.round(p.price * item.quantity).toLocaleString("en-IN")}
        </p>
        <p className="text-xs text-gray-500">
          ₹{Math.round(p.price).toLocaleString("en-IN")} × {item.quantity}
        </p>
      </div>
    </div>
  );
}
