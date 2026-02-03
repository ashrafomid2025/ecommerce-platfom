"use server"
import { prisma } from "../db/lib"
import { converbToPlaneObject } from "../utils";

export async function getLatestProduct() {
   const data = await prisma.ecommerePlatform.findMany({take: 4 , orderBy:{created_at: "desc"}});
   return converbToPlaneObject(data);
}