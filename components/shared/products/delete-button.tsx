"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteProduct } from "@/lib/action/product.action";
import React, { useActionState, useState } from "react";

function DeleteButton({ id }: { id: any }) {
  const [data, action] = useActionState(deleteProduct, {
    success: false,
  });
  const [value, setValue] = useState(id);
  return (
    <form action={action}>
      <Input
        type="text"
        onChange={(e) => setValue(id)}
        name="id"
        className="hidden"
        value={id}
      />
      <Button type="submit" variant="destructive">
        Yes
      </Button>
    </form>
  );
}

export default DeleteButton;
