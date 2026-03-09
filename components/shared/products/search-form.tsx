"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchProduct } from "@/lib/action/product.action";
import Link from "next/link";
import React, { useActionState, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
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
    <div className="w-full my-3  flex flex-col gap-4">
      <form className="flex justify-center items-center" action={func}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          name="name"
          className="w-1/2 rounded-r-none"
          placeholder="What do you want"
        />
        <Button
          type="submit"
          className="rounded-l-none"
          variant="outline"
          disabled={pending}
        >
          {pending ? "Searching..." : "Search"}
        </Button>
      </form>
      <div className="overflow-x-auto w-full">
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
            {data.products.length > 0 &&
              data.products.map((product) => (
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Deleting an item</DialogTitle>
                        </DialogHeader>

                        <DialogDescription>
                          Are your Sure you want to delete this item?
                        </DialogDescription>

                        <DialogFooter className=" space-x-4">
                          <DialogClose>Cancel</DialogClose>
                          {/* delete button here */}
                          <DeleteButton id={product.id} />
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="default">Update</Button>
                      </DialogTrigger>
                      <DialogContent className=" w-[95vw] sm:max-w-lg md:max-w-4xl lg:max-w-5xl">
                        <DialogHeader>
                          <DialogTitle>Update a product</DialogTitle>
                        </DialogHeader>
                        <DialogDescription asChild>
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
            {`${value} not Found!`}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchForm;
