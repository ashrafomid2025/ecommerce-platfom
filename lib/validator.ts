import { z } from "zod";
// validator for inserting product
export const productInsertSchema = z.object({
    name: z.string().min(3, "The Product Name Must be at least 3 Cheracters"),
    slug: z.string().min(5, "The Product Slug Must be at least 5 Cheracters"),
    category: z.string().min(5, "The Product category Must be at least 5 Cheracters"),
    Description: z.string().min(10, "The Product Description Must be at least 10 Cheracters"),
    brand: z.string().min(3, "The Product brand Must be at least 3 Cheracters"),
    images: z.array(z.string()).min(1 , "You should select at least 1 image for the product"),
    bannere: z.string(). nullable(),
    stock: z.coerce.number(),
})