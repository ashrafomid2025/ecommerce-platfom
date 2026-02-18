import { email, z } from "zod";
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
export const authValidationScema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6,'The password must be at least 6 characters'),
})
// schema for user sign up
export const signUpUserValidet = z.object({
    name: z.string().min(3, "The name should be string and at lest 3 chers"),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6,'The password must be at least 6 characters'),
    confirmPassword: z.string().min(6,'The ConfermPassword must be at least 6 characters'),
}).refine((data)=> data.password === data.confirmPassword , {
    message: "passwords not matche",
    path: ["confirmPassword"],
})