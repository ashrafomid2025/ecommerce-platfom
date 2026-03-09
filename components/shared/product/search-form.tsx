"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteButton from "./delete-button";
import UpdateForm from "./update-form";

function SearchForm({
  initialValue,
  action,
}: {
  initialValue: any[];
  action: any;
}) {
  const [data, func] = useActionState(action, {
    products: initialValue,
  });
  const [value, setValue] = useState("");
  const { pending } = useFormStatus();
  return (
    <div className="w-full my-3 relative flex  justify-center flex-col gap-0.5">
      <form className="flex w-full justify-center items-center" action={func}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className="w-1/2"
          name="name"
          placeholder="What do you want"
        />
        <Button variant="outline" type="submit" disabled={pending}>
          {pending ? "Searching..." : "Search"}
        </Button>
      </form>
      <div className="p-4 overflow-x-auto">
        <Table>
          <TableHeader className="bg-black px-2">
            <TableRow className="text-center">
              <TableHead className="text-white px-2">Product Name</TableHead>
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
              <TableRow className="even:bg-gray-200" key={product.id}>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Deleting this item</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        Do you want to delete this item?
                      </DialogDescription>
                      <DialogFooter className="space-x-4">
                        <DialogClose>Cancel</DialogClose>
                        <DeleteButton id={product.id} />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Update</Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] sm:max-w-lg md:max-w-4xl lg:max-w-5xl">
                      <DialogHeader className="flex flex-col items-center gap-4">
                        <Image
                          src="/images/logo.svg"
                          alt={product.name}
                          height={100}
                          width={100}
                        />
                        <DialogTitle className="text-center">
                          Edit product details
                        </DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        {/* update form */}
                        <UpdateForm product={product} />
                      </DialogDescription>
                      <DialogFooter>
                        <DialogClose>Cancel</DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell>{data.products.length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {data.products.length === 0 && (
          <div className="text-center text-destructive text-xl">
            {`${value} not found`}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchForm;
