"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchProduct } from "@/lib/action/product.action";
import Link from "next/link";
import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

function SearchForm({
  initialProducts,
  searchTerm,
}: {
  initialProducts: any[];
  searchTerm: any;
}) {
  const [data, func] = useActionState(searchTerm, {
    products: initialProducts,
  });
  const { pending } = useFormStatus();
  return (
    <div className="w-full my-3 relative md:flex-row gap-0.5">
      <form className="flex justify-center  items-center" action={func}>
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
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-black px-2 text-center text-white">
            <TableRow className="text-center text-white">
              <TableHead className="text-white px-2">Name</TableHead>
              <TableHead className="text-white px-2">Brand</TableHead>
              <TableHead className="text-white px-2">Price</TableHead>
              <TableHead className="text-white px-2">Image</TableHead>
              <TableHead className="text-white px-2" colSpan={2}>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.products.map((product) => (
              <TableRow className="even:bg-gray-200 " key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.price.toString()}</TableCell>
                <TableCell>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    height={100}
                    width={100}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="destructive">Delete</Button>
                </TableCell>
                <TableCell>
                  <Button variant="outline">Update</Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell>{data.products.length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default SearchForm;
