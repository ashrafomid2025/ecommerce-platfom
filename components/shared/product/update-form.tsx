import React, { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateProduct } from "@/lib/actions/products.actions";
import { toast } from "sonner";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

function UpdateForm({ product }: { product: any }) {
  const [data, action] = useActionState(updateProduct, {
    message: "",
  });
  const [showImage1, setShowImage1] = useState(true);
  const [showImage2, setShowImage2] = useState(true);
  {
    data &&
      data.message === "Product Updated Successfully" &&
      toast.success("Product Updated Successfully");
  }
  {
    data &&
      data.message === "Something went wrong" &&
      toast.error("Something went wrong");
  }
  return (
    <div>
      <form action={action} className="flex flex-col gap-2">
        <div className="grid gap-1 grid-cols-2">
          <Input
            type="text"
            name="id"
            className="hidden"
            defaultValue={product.id}
          />
          <Input
            type="text"
            defaultValue={product.name}
            name="name"
            placeholder="Product Name"
          />
          <Input
            type="text"
            defaultValue={product.slug}
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
          {/* isFeatured */}
          <Select
            defaultValue={product.isFeatured ? "true" : "false"}
            name="isFeatured"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Feature" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Featured</SelectItem>
              <SelectItem value="false">Not Featured</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="w-full flex flex-col gap-2">
            <Input
              type="text"
              defaultValue={product.brand}
              placeholder="Product Brand"
              name="brand"
            />
            <div className="flex flex-wrap gap-2">
              {!showImage1 && (
                <div>
                  <Input type="file" name="image1" accept="image/*" />
                  <Input
                    type="text"
                    defaultValue={product.images[0]}
                    name="oldImage1"
                    className="hidden"
                  />
                </div>
              )}
              {!showImage2 && (
                <div>
                  <Input type="file" name="image2" accept="image/*" />
                  <Input
                    type="text"
                    defaultValue={product.images[1]}
                    name="oldImage2"
                    className="hidden"
                  />
                </div>
              )}
              <div
                className={cn(
                  showImage1 ? "block relative" : "hidden relative",
                )}
              >
                <X
                  onClick={() => setShowImage1(!showImage1)}
                  className="absolute top-0 right-0 hover:text-black"
                  size={10}
                />
                <Image
                  src={product.images[0]}
                  alt="image1"
                  height={80}
                  width={80}
                />
              </div>
              <div
                className={cn(
                  showImage2 ? "block relative" : "hidden relative",
                )}
              >
                <X
                  onClick={() => setShowImage2(!showImage2)}
                  className="absolute top-0 right-0 hover:text-black"
                  size={10}
                />
                <Image
                  src={product.images[1]}
                  alt="image2"
                  height={80}
                  width={80}
                />
              </div>
            </div>
          </div>
          <div>
            <Textarea
              defaultValue={product.description}
              className="h-30 w-full resize-none"
              name="description"
              placeholder="Product Description"
            />
          </div>
        </div>
        <div>
          <Button type="submit" variant="default" className="w-full">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
export default UpdateForm;
