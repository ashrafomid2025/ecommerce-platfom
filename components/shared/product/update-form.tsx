import React, { useActionState } from "react";
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
import { Button } from "@/components/ui/button";
import { updateProduct } from "@/lib/actions/products.actions";

function UpdateForm({ product }: { product: any }) {
  const [data, action] = useActionState(updateProduct, {
    message: "",
  });
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
          </div>
          <div>
            <Textarea
              defaultValue={product.description}
              className="h-28 w-full resize-none"
              name="description"
              placeholder="Product Description"
            />
          </div>
        </div>
        <div>
          <Button variant="default" className="w-full">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
export default UpdateForm;
