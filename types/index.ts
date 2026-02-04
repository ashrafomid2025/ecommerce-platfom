import { productInsertSchema } from "@/lib/validator";
import { z } from "zod";
export type ProductInfo = z.infer<typeof productInsertSchema> & {
  id: string;
  rating: string;
  created_at: Date;
};
// read
