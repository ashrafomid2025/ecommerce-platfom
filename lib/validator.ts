import { z } from "zod";
import { priceConverter } from "./utils";
const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(priceConverter(Number(value))),
    "Price must be have exatly 2 decimal places",
  );

// validator for inserting product
export const productInsertSchema = z.object({
  name: z.string().min(3, "The product name must be at least 3 characters"),
  slug: z.string().min(5, "The product slug must be at least 5 characters"),
  category: z
    .string()
    .min(3, "The product category must be at least 3 characters"),
  description: z
    .string()
    .min(10, "The product description must be at least 10 characters"),
  brand: z.string().min(3, "The product brand must be at least 3 characters"),
  images: z
    .array(z.string())
    .min(1, "You should select at least 1 image for the product"),
  banner: z.string().nullable(),
  stock: z.coerce.number(),
  isFeatured: z.boolean(),
  price: currency,
});

// validation user
export const authValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "The password must be at least 6 characters"),
});
// sechema for registering users
export const signUpValidationSchema = z
  .object({
    name: z.string().min(3, "The name should be string and at least 3 chars"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "The password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "The Confirm password must be at least 6 characters"),
  })
  .refine(
    (data) => {
      data.password === data.confirmPassword;
    },
    {
      message: "Passwords not matched",
      path: ["confirmPassword"],
    },
  );
