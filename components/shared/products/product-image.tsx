"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

function ProductImages({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="product image"
        height={1000}
        width={1000}
        className="min-h-75 object-cover object-center"
      />
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "border cursor-pointer hover:border-orange-600 ",
              current === index && "border-orange-500",
            )}
          >
            <Image src={image} alt="product image" height={100} width={100} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
