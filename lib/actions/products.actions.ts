"use server";

import { PRODUCT_LIMIT } from "../constants";
import { prisma } from "../db";
import { convertToPlainObject } from "../utils";

export async function getLatestProducts(){
    const data = await prisma.products.findMany({
        take: PRODUCT_LIMIT?Number(PRODUCT_LIMIT):4,
        orderBy:{created_at: "desc"}
    })
    return convertToPlainObject(data);
}

// read single product
export async function getSingleProduct(slug:string) {
    const product = await prisma.products.findFirst({
        where:{slug: slug}
    })
    return product;
}