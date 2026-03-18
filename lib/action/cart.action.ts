"use server";

import { CartItem } from "@/types";

export async function AddItemToCart(item: CartItem) {
  return {
    success: true,
    message: "Item added to Cart",
  };
}
