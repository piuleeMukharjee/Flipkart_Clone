"use client";

import Link from "next/link";
import { useMemo } from "react";

export default function CartSummary({ cart, deliveryFee = 40 }) {
  const { subtotal, savings, total } = useMemo(() => {
    if (!cart?.items?.length) {
      return { subtotal: 0, savings: 0, total: 0 };
    }
    let sub = 0;
    let orig = 0;
    for (const line of cart.items) {
      const p = line.product;
      sub += p.price * line.quantity;
      orig += p.originalPrice * line.quantity;
    }
    const savings = Math.max(0, orig - sub);
    // Delivery shown as FREE — total matches subtotal (Flipkart-style free delivery)
    const total = sub;
    return { subtotal: sub, savings, total };
  }, [cart]);

  return (
    <div className="rounded-sm bg-white shadow-card">
      <h2 className="border-b border-gray-100 px-4 py-3 text-gray-500 uppercase">
        Price details
      </h2>
      <div className="space-y-3 p-4 text-sm">
        <div className="flex justify-between">
          <span>Price ({cart?.items?.length || 0} items)</span>
          <span>₹{Math.round(subtotal).toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-flipkart-green">
          <span>Discount</span>
          <span>
            − ₹{Math.round(savings).toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Charges</span>
          <span>
            {subtotal > 0 ? (
              <>
                <span className="text-flipkart-green">FREE</span>
                <span className="ml-1 text-xs text-gray-400 line-through">
                  ₹{deliveryFee}
                </span>
              </>
            ) : (
              "₹0"
            )}
          </span>
        </div>
        <div className="flex justify-between border-t border-dashed border-gray-200 pt-3 text-base font-bold">
          <span>Total Amount</span>
          <span>₹{Math.round(total).toLocaleString("en-IN")}</span>
        </div>
        {savings > 0 && (
          <p className="text-sm font-medium text-flipkart-green">
            You will save ₹{Math.round(savings).toLocaleString("en-IN")} on this order
          </p>
        )}
      </div>
      <div className="border-t border-gray-100 p-4">
        <Link
          href="/checkout"
          className={`block w-full rounded-sm py-3 text-center font-semibold text-white ${
            subtotal > 0
              ? "bg-flipkart-yellow text-gray-900 hover:bg-[#f0d318]"
              : "cursor-not-allowed bg-gray-300 text-gray-500"
          }`}
          aria-disabled={subtotal <= 0}
          onClick={(e) => {
            if (subtotal <= 0) e.preventDefault();
          }}
        >
          Place Order
        </Link>
      </div>
    </div>
  );
}
