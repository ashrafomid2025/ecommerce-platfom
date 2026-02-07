"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

function ProductImages({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="space-y-4">
      <Image
        src={images[currentIndex]}
        height={1000}
        width={1000}
        alt="product image"
        className="min-h-75 object-cover object-center"
      />
      <div className="flex gap-3">
        {images.map((image, index) => (
          <div
            onClick={() => setCurrentIndex(index)}
            key={index}
            className={cn(
              "border cursor-pointer rounded-md hover:border-orange-700",
              currentIndex === index && "border-orange-400",
            )}
          >
            <Image
              className="rounded-md"
              src={image}
              alt="product image"
              height={100}
              width={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
