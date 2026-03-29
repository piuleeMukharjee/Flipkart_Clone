"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageCarousel({ images, productName }) {
  const list = images?.length ? images : [{ imageUrl: "/placeholder.png" }];
  const [idx, setIdx] = useState(0);
  const current = list[idx];

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse lg:items-start">
      <div className="relative aspect-square w-full max-w-lg flex-1 overflow-hidden rounded-sm border border-gray-100 bg-white">
        <Image
          src={current.imageUrl}
          alt={productName}
          fill
          className="object-contain p-6"
          priority
          sizes="(max-width: 1024px) 100vw, 480px"
        />
      </div>
      {list.length > 1 && (
        <div className="flex flex-row gap-2 overflow-x-auto lg:w-20 lg:flex-col">
          {list.map((img, i) => (
            <button
              key={img.id ?? i}
              type="button"
              onClick={() => setIdx(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded border-2 bg-white md:h-20 md:w-20 ${
                i === idx ? "border-flipkart-blue" : "border-transparent"
              }`}
            >
              <Image
                src={img.imageUrl}
                alt=""
                fill
                className="object-contain p-1"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
