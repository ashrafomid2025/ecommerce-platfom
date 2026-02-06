"use server"
import { PRODUCT_LIMITED_DATA } from "../constants";
import { prisma } from "../db/lib"
import { converbToPlaneObject } from "../utils";

export async function getLatestProduct() {
   const data = await prisma.ecommerePlatform.findMany({
      take: PRODUCT_LIMITED_DATA? Number(PRODUCT_LIMITED_DATA): 4 ,
       orderBy:{created_at: "desc"
       }});
   return converbToPlaneObject(data);
}
export async function getSingelProduct(slug) {
   return await prisma.ecommerePlatform.findFirst({
      where: {slug : slug}
   })
}