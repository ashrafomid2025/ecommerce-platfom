"use server";

import { PRODUCT_LIMIT } from "../constants";
import { prisma } from "../db/lib";
import { convertToPlainObject } from "../utils";

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: PRODUCT_LIMIT ? Number(PRODUCT_LIMIT) : 4,
    orderBy: { created_at: "desc" },
  });
  return convertToPlainObject(data);
}
