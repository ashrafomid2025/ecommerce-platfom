"use server";

import { auth } from "@/auth";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { prisma } from "../db/lib";
import { convertToPlainObject } from "../utils";
import { cartItemValidationSchema } from "../validator";
export async function AddItemToCart(item: CartItem) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Session Cart Id Not Found");
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;
    const cart = await getMyCart();
    console.log({
      sessionCartId: sessionCartId,
      userId: userId,
      cartData: cart,
    });

    // validate the data
    const validateData = cartItemValidationSchema.parse(item);
    // total price calc
    const product = await prisma.product.findFirst({ where: {} });
    return {
      success: true,
      message: "Item added to Cart",
    };
  } catch (err) {
    return {
      success: false,
      message: "something went wrong",
    };
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Session Cart Id Not Found");
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;
  const cartData = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cartData) return undefined;
  return convertToPlainObject({
    ...cartData,
    totalPrice: cartData.totalPrice.toString(),
    taxPrice: cartData.taxPrice.toString(),
    shippingPrice: cartData.shippingPrice.toString(),
    itemsPrice: cartData.itemsPrice.toString(),
  });
}
