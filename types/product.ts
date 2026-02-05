import { ProductInsertSchema } from "@/lib/validator"
import z from "zod"

export type ProductInfo =z.infer<typeof ProductInsertSchema> & {
    id:string,  
    rating: string,
    created_at: Date,
}