"use server";

import { writeFile, mkdir } from "fs/promises";
import { PRODUCT_LIMIT } from "../constants";
import { prisma } from "../db/lib";
import { convertToPlainObject } from "../utils";
import { productInsertSchema } from "../validator";
import path from "path";

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: PRODUCT_LIMIT ? Number(PRODUCT_LIMIT) : 4,
    orderBy: { created_at: "desc" },
  });
  return convertToPlainObject(data);
}
// get single product by slug
export async function getSingleProduct(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}
//
export async function InsertProductAction(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const image1 = formData.get("image1") as File;
    const image2 = formData.get("image2") as File;

    if (!image1 || !image2) {
      return { error: "Images are required" };
    }

    const image1Name = `${Date.now()}-${image1.name}`;
    const image2Name = `${Date.now()}-${image2.name}`;
    const uploadDir = path.join(process.cwd(), "public/images/sample-products");

    const image1Buffer = Buffer.from(await image1.arrayBuffer());
    const image2Buffer = Buffer.from(await image2.arrayBuffer());

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, image1Name), image1Buffer);
    await writeFile(path.join(uploadDir, image2Name), image2Buffer);
    const imagesUrl = [
      `/images/sample-products/${image1Name}`,
      `/images/sample-products/${image2Name}`,
    ];
    const product = productInsertSchema.parse({
      name: formData.get("name"),
      slug: formData.get("slug"),
      category: formData.get("category"),
      description: formData.get("description"),
      brand: formData.get("brand"),
      images: imagesUrl,
      price: formData.get("price"),
      stock: formData.get("stock"),
      isFeatured: formData.get("isFeatured") === "true",
    });

    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        category: product.category,
        description: product.description,
        brand: product.brand,

        price: product.price,
        stock: product.stock,

        images: imagesUrl,
        isFeatured: product.isFeatured,
      },
    });
    // url
    console.log("poduct added");
    return { success: true, message: "product added" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "something went wrong" };
  }
}
