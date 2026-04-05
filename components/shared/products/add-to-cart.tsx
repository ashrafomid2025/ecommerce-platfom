"use client";
import { Button } from "@/components/ui/button";
import { AddItemToCart, getMyCart } from "@/lib/action/cart.action";
import { Cart, CartItem } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function AddToCart({ cart, item }: { cart?: Cart; item: CartItem }) {
  // check if the item is exist in the cart
  const existItem = (cart?.items as CartItem[]).find(
    (x) => x.productId == item.productId,
  );

  const router = useRouter();
  const handleCart = async () => {
    const response = await AddItemToCart(item);

    if (!response.success) {
      toast.error(response.message);
      return;
    }
    toast("Cart Info", {
      description: `${response.message}`,
      action: {
        label: "Go To Cart",
        onClick: () => router.push("/cart"),
      },
    });
  };
  if (existItem) {
    return (
      <div>
        <Button variant="outline">
          <Plus />
        </Button>
        <span>{existItem.qty}</span>
        <Button variant="outline">
          <Minus />
        </Button>
      </div>
    );
  } else {
    return (
      <Button className="w-full" onClick={handleCart}>
        <Plus size={14} /> Add To Cart
      </Button>
    );
  }
}

export default AddToCart;
