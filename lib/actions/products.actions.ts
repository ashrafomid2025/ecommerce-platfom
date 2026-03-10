"use server";

import { mkdir, unlink, writeFile } from "fs/promises";
import { PRODUCT_LIMIT } from "../constants";
import { prisma } from "../db";
import { convertToPlainObject } from "../utils";
import { ProductInsertSchema } from "../validator";
import path from "path";
import { success } from "zod";
import { revalidatePath } from "next/cache";

export async function getLatestProducts() {
  const data = await prisma.products.findMany({
    take: PRODUCT_LIMIT ? Number(PRODUCT_LIMIT) : 4,
    orderBy: { created_at: "desc" },
  });
  return convertToPlainObject(data);
}

// read single product
export async function getSingleProduct(slug: string) {
  const product = await prisma.products.findFirst({
    where: { slug: slug },
  });
  return product;
}

// Insertion Logic
export async function insertProductAction(
  prevState: unknown,
  formData: FormData,
) {
  try {
    // image insertion
    const image1 = formData.get("image1") as File;
    const image2 = formData.get("image2") as File;

    if (!image1 || !image2) {
      return { error: "Images are required" };
    }

    const uploadDir = path.join(process.cwd(), "public/images/sample-products");

    const image1Name = `${Date.now()}-${image1.name}`;
    const image2Name = `${Date.now()}-${image2.name}`;

    const image1Buffer = Buffer.from(await image1.arrayBuffer());
    const image2Buffer = Buffer.from(await image2.arrayBuffer());

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, image1Name), image1Buffer);
    await writeFile(path.join(uploadDir, image2Name), image2Buffer);

    const productImages = [
      `/images/sample-products/${image1Name}`,
      `/images/sample-products/${image2Name}`,
    ];

    // console.log(formData);

    const product = ProductInsertSchema.parse({
      name: formData.get("name"),
      slug: formData.get("slug"),
      category: formData.get("category"),
      description: formData.get("description"),
      brand: formData.get("brand"),
      images: productImages,
      price: formData.get("price"),
      stock: formData.get("stock"),
      isFeatured: formData.get("isFeatured") === "true",
    });
    console.log("product validated");

    await prisma.products.create({
      data: {
        name: product.name,
        slug: product.slug,
        category: product.category,
        description: product.description,
        brand: product.brand,
        price: product.price,
        stock: product.stock,
        images: productImages,
        isFeatured: product.isFeatured,
      },
    });
    return { success: true, message: "product added successfully" };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Could not add product" };
  }
}

// Search Functionality
export async function searchProduct(
  previousState: unknown,
  formData: FormData,
) {
  const term = formData.get("name") as string;
  const filteredProducts = await prisma.products.findMany({
    where: {
      OR: [
        { name: { contains: term, mode: "insensitive" } },
        { brand: { contains: term, mode: "insensitive" } },
      ],
    },
    orderBy: { name: "asc" },
  });
  const serializeProducts = filteredProducts.map((product) => ({
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
  }));
  return { products: convertToPlainObject(filteredProducts) };
}

// Delete products
export async function deleteProduct(prevState: unknown, formData: FormData) {
  try {
    const id = formData.get("id") as string;

    const product = await prisma.products.findUnique({
      where: { id },
    });

    for (let imgPath of product?.images as []) {
      const fullImagePath = path.join(process.cwd(), "public", imgPath);
      try {
        await unlink(fullImagePath);
      } catch (err) {
        console.log("The images have already been deleted");
      }
    }

    await prisma.products.delete({
      where: { id: id },
    });
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

// update product
export async function updateProduct(prevState: unknown, formData: FormData) {
  const id = formData.get("id") as string;
  try {
    //   ProductInsertSchema.parse({
    //     name: formData.get("name"),
    //     slug: formData.get("slug"),
    //     category: formData.get("category"),
    //     description: formData.get("description"),
    //     brand: formData.get("brand"),
    //     stock: formData.get("stock"),
    //     isFeatured: formData.get("isFeatured"),
    //     price: formData.get("price"),
    //   });

    await prisma.products.update({
      where: { id: id },
      data: {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        category: formData.get("category") as string,
        description: formData.get("description") as string,
        brand: formData.get("brand") as string,
        stock: Number(formData.get("stock")),
        isFeatured: formData.get("isFeatured") === "TRUE" ? true : false,
        price: Number(formData.get("price")),
      },
    });
    return { message: "Product Updated Successfully" };
  } catch (err) {
    return { message: "Something went wrong" };
  }
}
