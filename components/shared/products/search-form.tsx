"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchProduct } from "@/lib/action/product.action";
import Link from "next/link";
import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";

function SearchForm() {
  const [data, func] = useActionState(searchProduct, {
    success: false,
    data: [],
  });
  const { pending } = useFormStatus();
  return (
    <div className="w-full my-3 relative flex flex-col md:flex-row gap-0.5">
      <form className="flex justify-center w-full items-center" action={func}>
        <Input
          type="text"
          name="name"
          className="w-1/2"
          placeholder="What do you want"
        />
        <Button type="submit" variant="outline" disabled={pending}>
          {pending ? "Searching..." : "Search"}
        </Button>
      </form>
      <div className="absolute bg-white mx-auto rounded-md shadow-2xl top-8 left-1/2 -translate-x-1/2 z-50">
        {data && data.data.length > 0 && (
          <div className="p-4 text-4xl font-bold text-red-600">
            {data.data.map((product) => (
              <Link
                key={product.id}
                href=""
                className="link text-2xl font-bold"
              >
                {product.name}
              </Link>
            ))}
            {!data && <div>nothing to show</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchForm;
