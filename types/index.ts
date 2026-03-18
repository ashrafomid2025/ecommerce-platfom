import {
  cartItemValidationSchema,
  InsertCartSchema,
  productInsertSchema,
} from "@/lib/validator";
import { z } from "zod";
export type ProductInfo = z.infer<typeof productInsertSchema> & {
  id: string;
  rating: string;
  created_at: Date;
};

export type CartItem = z.infer<typeof cartItemValidationSchema>;
export type Cart = z.infer<typeof InsertCartSchema>;
