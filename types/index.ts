import { productInsertSchema } from "@/lib/validator";
import { z } from "zod";
export type productInfo = z.infer<typeof productInsertSchema> & {
    id : string;
    numReview: string
}