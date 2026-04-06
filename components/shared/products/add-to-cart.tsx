"use client";
import { Button } from "@/components/ui/button";
import { AddItemToCart, removeFromCart } from "@/lib/action/cart.action";
import { Cart, CartItem } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function AddToCart({ cart, item }: { cart?: Cart; item: CartItem }) {
  // check if the item is exist in the cart

  const router = useRouter();

  const handleMinus = async () => {
    const response = await removeFromCart(item.productId);
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
  if (!cart) {
    return (
      <Button className="w-full" onClick={handleCart}>
        <Plus size={14} /> Add To Cart
      </Button>
    );
  } else {
    const existItem = (cart.items as CartItem[]).find(
      (x) => x.productId == item.productId,
    );
    return existItem ? (
      <div className="flex items-center justify-center w-full gap-2">
        <Button onClick={handleCart} variant="outline">
          <Plus />
        </Button>
        <span className="text-center px-2">{existItem.qty}</span>
        <Button onClick={handleMinus} variant="outline">
          <Minus />
        </Button>
      </div>
    ) : (
      <Button className="w-full" onClick={handleCart}>
        <Plus size={14} /> Add To Cart
      </Button>
    );
  }
}

export default AddToCart;
