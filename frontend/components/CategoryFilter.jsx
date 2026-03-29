"use client";

import Image from "next/image";
import Link from "next/link";

function buildQuery({ category, q }) {
  const sp = new URLSearchParams();
  if (q) sp.set("q", q);
  if (category) sp.set("category", String(category));
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export default function CategoryFilter({ categories, activeId, searchQuery = "" }) {
  if (!categories?.length) return null;

  const q = searchQuery || "";

  const allActive = !activeId || activeId === "";

  return (
    <div className="border-b border-gray-200/80 bg-white shadow-card">
      <div className="mx-auto max-w-7xl px-2 sm:px-4">
        <div className="category-scroll flex gap-1 overflow-x-auto py-3 pb-4 sm:gap-3 md:justify-center">
          <Link
            href={`/${buildQuery({ q })}`}
            className={`flex shrink-0 flex-col items-center gap-1.5 rounded-lg px-2 py-1 text-xs transition-colors md:text-sm ${
              allActive
                ? "font-semibold text-flipkart-blue"
                : "text-gray-600 hover:text-flipkart-blue"
            }`}
          >
            <span
              className={`flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-base font-bold text-flipkart-blue ring-2 ring-offset-2 ring-offset-white transition-shadow sm:h-16 sm:w-16 ${
                allActive ? "ring-flipkart-blue" : "ring-transparent"
              }`}
            >
              All
            </span>
            <span className="max-w-[76px] text-center leading-tight">All</span>
          </Link>
          {categories.map((c) => {
            const isOn = String(activeId) === String(c.id);
            return (
              <Link
                key={c.id}
                href={`/${buildQuery({ category: c.id, q })}`}
                className={`flex shrink-0 flex-col items-center gap-1.5 rounded-lg px-2 py-1 text-xs transition-colors md:text-sm ${
                  isOn
                    ? "font-semibold text-flipkart-blue"
                    : "text-gray-600 hover:text-flipkart-blue"
                }`}
              >
                <span
                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-50 ring-2 ring-offset-2 ring-offset-white transition-shadow sm:h-16 sm:w-16 ${
                    isOn ? "ring-flipkart-blue" : "ring-transparent"
                  }`}
                >
                  <Image
                    src={c.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </span>
                <span className="max-w-[76px] truncate text-center leading-tight">
                  {c.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );}
