"use server";

import { auth } from "@/auth";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { prisma } from "../db/lib";
export async function AddItemToCart(item: CartItem) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Session Cart Id Not Found");
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;
    const cart = await prisma.cart.findFirst({
      where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
    });
    return {
      success: true,
      message: "Item added to Cart",
    };
  } catch (err) {
    console.log(err);
  }
}
