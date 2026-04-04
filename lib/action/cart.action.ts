"use server";

import { auth } from "@/auth";
import { Cart, CartItem } from "@/types";
import { cookies } from "next/headers";
import { prisma } from "../db/lib";
import { convertToPlainObject, round2 } from "../utils";
import { cartItemValidationSchema, InsertCartSchema } from "../validator";
import { revalidatePath } from "next/cache";
import { Prisma } from "../generated/prisma/client";

function calcPrice(items: CartItem[]) {
  const itemsPrice = round2(
    items.reduce((total, item) => (total + Number(item.price)) * item.qty, 0),
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(itemsPrice * 0.03);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
}

export async function AddItemToCart(item: CartItem) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Session Cart Id Not Found");
    const session = await auth();
    console.log(sessionCartId);
    const userId = session?.user?.id ? (session.user.id as string) : undefined;
    const cart = await getMyCart();

    const selectedItem = cartItemValidationSchema.parse(item);

    const product = await prisma.product.findFirst({
      where: { id: selectedItem.productId },
    });
    if (!product) throw new Error("Product not found");
    if (!cart) {
      const data = {
        items: [selectedItem],
        userId: userId,
        sessionCartId: sessionCartId,
        ...calcPrice([selectedItem]),
      };
      await prisma.cart.create({
        data: data,
      });
      revalidatePath(`product/${product.slug}`);
      // find product in db
      return {
        success: true,
        message: `${selectedItem.name} added to Cart`,
      };
    } else {
      // check if the item is already in the cart
      const existItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId,
      );
      if (existItem) {
        // check the stock
        if (product.stock < existItem.qty + 1) {
          throw new Error("not enough in stock");
        }
        // increase the quantity
        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId,
        )!.qty = existItem.qty + 1;
      } else {
        // if item does not exist
        // check the stock
        if (product.stock < 1) {
          throw new Error("Not enough In stock");
        }
        // add item to items.cart
        cart.items.push(item);
      }

      // save to the db the new item
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CartItem[]),
        },
      });

      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: `${item.name} ${existItem ? "updated In" : "added to"} cart`,
      };
    }
    // validate the data
  } catch (err) {
    return {
      success: false,
      message: "Product not added to cart",
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
