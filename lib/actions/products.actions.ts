"use server";

import { PRODUCT_LIMIT } from "../constants";
import { prisma } from "../db";
import { convertToPlainObject } from "../utils";
import { ProductInsertSchema } from "../validator";

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

// Insertion Logic
export async function insertProductAction(prevState: unknown, formData: FormData){
    try{
        const product = ProductInsertSchema.parse({
            name: formData.get("name"),
            slug: formData.get("slug"),
            category: formData.get("category"),
            description: formData.get("description"),
            brand: formData.get("brand"),
            banner: formData.get("banner"),
            stock: formData.get("stock"),
            isFeatured: formData.get("isFeatured"),
            price: formData.get("price"),
        });
        await prisma.products.create({
            data: {
                name: product.name,
                slug: product.slug,
                category: product.category,
                description: product.description,
                brand: product.brand,
                banner: product.banner,
                stock: product.stock,
                isFeatured: product.isFeatured,
                price: product.price,
            }
        });
    }
    catch(err){
        return err;
    }
}
