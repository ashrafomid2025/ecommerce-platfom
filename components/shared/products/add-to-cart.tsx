"use client";
import { Button } from "@/components/ui/button";
import { AddItemToCart } from "@/lib/action/cart.action";
import { CartItem } from "@/types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function AddToCart({ item }: { item: CartItem }) {
  const router = useRouter();
  const handleCart = async () => {
    const response = await AddItemToCart(item);

    if (!response.success) {
      toast.error(response.message);
      return;
    }
    toast("Item Added", {
      description: `${response.message}`,
      action: {
        label: "Go To Cart",
        onClick: () => router.push("/cart"),
      },
    });
  };
  return (
    <Button className="w-full" onClick={handleCart}>
      <Plus size={14} /> Add To Cart
    </Button>
  );
}

export default AddToCart;
