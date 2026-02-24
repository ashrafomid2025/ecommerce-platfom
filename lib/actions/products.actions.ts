"use server";

import { writeFile } from "fs/promises";
import { PRODUCT_LIMIT } from "../constants";
import { prisma } from "../db";
import { convertToPlainObject } from "../utils";
import { ProductInsertSchema } from "../validator";
import path from "path";

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
            // banner: formData.get("banner"),
            stock: formData.get("stock"),
            isFeatured: formData.get("isFeatured"),
            price: formData.get("price"),
        });
        const image1 = formData.get("image1") as File;
        const image2 = formData.get("image1") as File;

        if(!image1 || !image2){
            return {error: "Images are required"}
        }

        const uploadDir = path.join(process.cwd(),"public/images/sample-products");

        const image1Name = `${Date.now()}_${image1}`;
        const image2Name = `${Date.now()}_${image2}`;

        const image1Buffer = Buffer.from(await image1.arrayBuffer());
        const image2Buffer = Buffer.from(await image2.arrayBuffer());

        await writeFile(path.join(uploadDir,image1Name),image1Buffer);
        await writeFile(path.join(uploadDir,image2Name),image2Buffer);

        const productImages = [
            `/images/sample-products/${image1Name}`,
            `/images/sample-products/${image2Name}`
        ]

        await prisma.products.create({
            data: {
                name: product.name,
                slug: product.slug,
                category: product.category,
                description: product.description,
                brand: product.brand,
                // banner: product.banner,
                stock: product.stock,
                isFeatured: product.isFeatured,
                price: product.price,
                images: productImages
            }
        });
    }
    catch(err){
        return err;
    }
}
