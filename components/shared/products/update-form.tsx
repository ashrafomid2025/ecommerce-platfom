"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateProduct } from "@/lib/action/product.action";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";

import React, { useActionState, useState } from "react";
import { toast } from "sonner";

function UpdateForm({ product }: { product: any }) {
  const [data, action] = useActionState(updateProduct, {
    message: "",
  });

  const [showImage1, setShowImage1] = useState(true);
  const [showImage2, setShowImage2] = useState(true);
  {
    data &&
      data.message === "Product Updated Successfully" &&
      toast.success("Product update successfully");
  }
  {
    data &&
      data.message === "Something went wrong" &&
      toast.error("Failed to updated product");
  }
  return (
    <div>
      <form action={action} className="flex flex-col gap-2">
        <div className="grid gap-1 grid-cols-2">
          <Input
            type="text"
            defaultValue={product.id}
            name="id"
            className="hidden"
          />
          <Input
            defaultValue={product.name}
            type="text"
            name="name"
            placeholder="Product Name"
          />
          <Input
            defaultValue={product.slug}
            type="text"
            name="slug"
            placeholder="Product slug"
          />
        </div>
        <div className="grid gap-1 grid-cols-2">
          <Input
            defaultValue={product.price}
            type="text"
            name="price"
            placeholder="Product Price"
          />
          <Input
            defaultValue={product.stock}
            type="number"
            name="stock"
            placeholder="Product Stock"
          />
        </div>
        <div className="grid gap-1 grid-cols-2">
          <Select defaultValue={product.category} name="category">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clothes">Clothes</SelectItem>
              <SelectItem value="cosmic items">Cosmic Items</SelectItem>
              <SelectItem value="toilet items">Toilet Items</SelectItem>
              <SelectItem value="shoes">Shoes</SelectItem>
            </SelectContent>
          </Select>
          <Select
            defaultValue={product.isFeatured ? "true" : "false"}
            name="isFeatured"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Feature"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TRUE">Featured</SelectItem>
              <SelectItem value="FALSE">Not Featured</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="w-full flex flex-col gap-2">
            <Input
              defaultValue={product.brand}
              name="brand"
              type="text"
              placeholder="Product brand"
            />
            <div className="flex  gap-2 flex-wrap">
              {!showImage1 && (
                <div>
                  <Input type="file" name="image1" accept="image/*" />
                  <Input
                    type="text"
                    name="oldimage1"
                    defaultValue={product.images[0]}
                    className="hidden"
                  />
                </div>
              )}
              {!showImage2 && (
                <div>
                  <Input
                    type="text"
                    className="hidden"
                    name="oldimage2"
                    defaultValue={product.images[1]}
                  />
                  <Input type="file" name="image2" accept="image/*" />
                </div>
              )}

              <div
                className={cn(
                  showImage1 ? "relative block" : "hidden relative",
                )}
              >
                <X
                  onClick={() => setShowImage1(!showImage1)}
                  size={10}
                  className="absolute right-0 top-0"
                />

                <Image
                  src={product.images[0]}
                  alt="image1"
                  height={80}
                  width={80}
                />
              </div>
              <div
                className={showImage2 ? "block relative" : "hidden relative"}
              >
                <X
                  onClick={() => setShowImage2(!showImage2)}
                  size={10}
                  className="absolute right-0 top-0"
                />

                <Image
                  src={product.images[1]}
                  alt="image1"
                  height={80}
                  width={80}
                />
              </div>
            </div>
          </div>
          <div>
            <Textarea
              defaultValue={product.description}
              name="description"
              className="w-full h-28 resize-none"
            />
          </div>
        </div>
        <div>
          <Button
            onClick={() => toast.info("product updated successfully")}
            className="w-full"
            type="submit"
            variant="default"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateForm;
