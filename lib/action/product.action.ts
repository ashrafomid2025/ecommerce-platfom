"use server";

import { writeFile } from "fs/promises";
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
  // middleware.ts=> runtime edge
  try {
    const product = productInsertSchema.parse({
      name: formData.get("name"),
      slug: formData.get("slug"),
      category: formData.get("category"),
      description: formData.get("description"),
      brand: formData.get("brand"),

      price: formData.get("price"),
      stock: formData.get("stock"),
      isFeatured: formData.get("isFeatured"),
    });

    const image1 = formData.get("image1") as File;
    const image2 = formData.get("image2") as File;

    if (!image1 || !image2) {
      return { error: "Images are required" };
    }

    const image1Name = `${Date.now()}_${image1}`;
    const image2Name = `${Date.now()}_${image2}`;
    const uploadDir = path.join(process.cwd(), "public/images/sample-product");

    const image1Buffer = Buffer.from(await image1.arrayBuffer());
    const image2Buffer = Buffer.from(await image2.arrayBuffer());

    await writeFile(path.join(uploadDir, image1Name), image1Buffer);
    await writeFile(path.join(uploadDir, image2Name), image2Buffer);
    const imagesUrl = [
      `public/images/sample-products/${image1Name}`,
      `public/images/sample-products/${image2Name}`,
    ];
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        category: product.category,
        description: product.description,
        brand: product.brand,
        banner: product.banner,
        price: product.price,
        stock: product.stock,
        images: imagesUrl,
        isFeatured: product.isFeatured,
      },
    });
    // url
  } catch (err) {
    return err;
  }
}
