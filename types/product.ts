import { ProductInsertSchema } from "@/lib/validator"
import z from "zod"

export type ProductInfo =z.infer<typeof ProductInsertSchema> & {
    name:string,
    numReviews: number,
}