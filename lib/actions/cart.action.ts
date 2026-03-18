"use server";

import { CartItem } from "@/types/product";

export async function AddItemToCart(item: CartItem) {
  return {
    success: true,
    message: "Item added to cart",
  };
}
