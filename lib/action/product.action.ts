"use server";

import { PRODUCT_LIMIT } from "../constants";
import { prisma } from "../db/lib";
import { convertToPlainObject } from "../utils";
import { productInsertSchema } from "../validator";

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
    const product = productInsertSchema.parse({
      name: formData.get("name"),
      slug: formData.get("slug"),
      category: formData.get("category"),
      description: formData.get("description"),
      brand: formData.get("brand"),
      banner: formData.get("banner"),
      price: formData.get("price"),
      stock: formData.get("stock"),
      isFeatured: formData.get("isFeatured"),
    });
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
        isFeatured: product.isFeatured,
      },
    });
    // url
  } catch (err) {
    return err;
  }
}
