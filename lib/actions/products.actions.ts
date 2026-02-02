"use server";

import { prisma } from "../db";
import { convertToPlainObject } from "../utils";

export async function getLatestProducts(){
     const data =await prisma.products.findMany({
        take: 4,
        orderBy: { created_at : "desc"}
    })
    return convertToPlainObject(data);
}