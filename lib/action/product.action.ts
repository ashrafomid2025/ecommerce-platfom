"use server";

import { writeFile, mkdir, unlink } from "fs/promises";
import { PRODUCT_LIMIT } from "../constants";
import { prisma } from "../db/lib";
import { convertToPlainObject } from "../utils";
import { productInsertSchema } from "../validator";
import path from "path";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// import { redirect } from "next/navigation";

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
    return { success: true, message: "product added success" };
    // return redirect("/");
  } catch (err) {
    return { success: false, message: "Product not added" };
  }
}

// search Functionality
export async function searchProduct(
  previousState: unknown,
  formData: FormData,
) {
  const term = formData.get("name") as string;
  const filteredProduct = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: term, mode: "insensitive" } },
        { brand: { contains: term, mode: "insensitive" } },
      ],
    },

    orderBy: { name: "asc" },
  });
  const serializeProducts = filteredProduct.map((product) => ({
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
  }));
  return { products: serializeProducts };
}

export async function deleteProduct(prevState: unknown, formdata: FormData) {
  try {
    const id = formdata.get("id") as string;

    const product = await prisma.product.findUnique({
      where: { id },
    });
    for (let imgPath of product?.images as string[]) {
      const fullPath = path.join(process.cwd(), "public", imgPath);
      try {
        await unlink(fullPath);
      } catch (err) {
        console.log("the image has already been deleted");
      }
    }

    await prisma.product.delete({
      where: { id: id },
    });

    return { success: true };
  } catch (err) {
    return { success: false };
  }
}

export async function updateProduct(prevState: unknown, formData: FormData) {
  const id = formData.get("id") as string;
  const image1 = formData.get("image1") as File;
  const image2 = formData.get("image2") as File;
  if (image1 && image2) {
    const urlOldImage1 = formData.get("oldimage1") as string;
    const urlOldImage2 = formData.get("oldimage2") as string;

    const fullPathForImage1 = path.join(process.cwd(), "public", urlOldImage1);
    const fullPathForImage2 = path.join(process.cwd(), "public", urlOldImage2);
    try {
      await unlink(fullPathForImage1);
      await unlink(fullPathForImage2);
    } catch (err) {
      console.log("the image has already been deleted");
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
    await prisma.product.update({
      where: { id },
      data: {
        images: imagesUrl,
      },
    });
  }
  try {
    await prisma.product.update({
      where: { id },
      data: {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        category: formData.get("category") as string,
        brand: formData.get("brand") as string,
        price: Number(formData.get("price")),
        description: formData.get("description") as string,
        stock: Number(formData.get("stock")),
        isFeatured: formData.get("isFeatured") === "TRUE" ? true : false,
      },
    });
    return {
      message: "Product Updated Successfully",
    };
  } catch (err) {
    return { message: "Something went wrong" };
  }
}
