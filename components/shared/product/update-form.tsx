import React from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function UpdateForm({
  product,
}: {
  product: {
    name: string;
    slug: string;
    category: string;
    description: string;
    brand: string;
    price: number;
    stock: number;
    isFeatured: boolean;
  };
}) {
  return (
    <div>
      <form className="flex flex-col gap-2">
        <div className="grid gap-1 grid-cols-2">
          <Input
            type="text"
            value={product.name}
            name="name"
            placeholder="Product Name"
          />
          <Input
            type="text"
            value={product.slug}
            name="slug"
            placeholder="Product slug"
          />
        </div>
        <div className="grid gap-1 grid-cols-2">
          <Input
            value={product.price}
            type="text"
            name="price"
            placeholder="Product Price"
          />
          <Input
            value={product.stock}
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
              value={product.brand}
              placeholder="Product Brand"
              name="brand"
            />
            <div className="flex justify-between gap-2 flex-wrap">
              <Input type="file" name="image1" accept="image/*" />
              <Input type="file" name="image2" accept="image/*" />
            </div>
          </div>
          <Textarea
            value={product.description}
            className="h-full w-full resize-none"
            name="description"
            placeholder="Product Description"
          />
        </div>
      </form>
    </div>
  );
}

export default UpdateForm;
