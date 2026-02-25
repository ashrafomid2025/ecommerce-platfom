"use client";

import { useActionState } from "react";
import { InsertProductAction } from "@/lib/action/product.action";

export default function ProductForm() {
  const [data, action] = useActionState(InsertProductAction, {
    success: false,
    message: "",
  });

  return (
    <form action={action} className="space-y-4">
      <input name="name" placeholder="Name" required />
      <input name="slug" placeholder="Slug" required />
      <input name="category" placeholder="Category" required />
      <input name="brand" placeholder="Brand" required />
      <textarea name="description" placeholder="Description" required />

      <input name="price" type="number" step="0.01" required />
      <input name="stock" type="number" required />

      <select name="isFeatured">
        <option value="false">Not Featured</option>
        <option value="true">Featured</option>
      </select>

      {/* Two extra images */}
      <input type="file" name="image1" accept="image/*" required />
      <input type="file" name="image2" accept="image/*" required />

      <button type="submit">create</button>
    </form>
  );
}
