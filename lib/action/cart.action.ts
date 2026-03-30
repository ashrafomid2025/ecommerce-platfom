"use server";

import { auth } from "@/auth";
import { Cart, CartItem } from "@/types";
import { cookies } from "next/headers";
import { prisma } from "../db/lib";
import { convertToPlainObject, round2 } from "../utils";
import { cartItemValidationSchema } from "../validator";

function calcPrice(items: CartItem[]) {
  const itemsPrice = round2(
    items.reduce((total, item) => total + Number(item.price) * item.qty, 0),
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(itemsPrice * 0.03);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
}

export async function AddItemToCart(item: CartItem) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Session Cart Id Not Found");
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;
    const cart = await getMyCart();

    const selectedItem = cartItemValidationSchema.parse(item);

    const product = await prisma.product.findFirst({
      where: { id: selectedItem.productId },
    });
    if (!product) throw new Error("Product not found");
    // Testing
    console.log({
      sessionCartId: sessionCartId,
      userId: userId,
      item: selectedItem,
      productSelected: product,
    });

    // validate the data
    const validateData = cartItemValidationSchema.parse(item);
    // find product in db
    return {
      success: true,
      message: "Item added to Cart",
      item: validateData,
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
    items: cartData.items as CartItem[],
    totalPrice: cartData.totalPrice.toString(),
    taxPrice: cartData.taxPrice.toString(),
    shippingPrice: cartData.shippingPrice.toString(),
    itemsPrice: cartData.itemsPrice.toString(),
  });
}
