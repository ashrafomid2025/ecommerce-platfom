import {
  cartItemValidationSchema,
  InsertCartSchema,
  ProductInsertSchema,
} from "@/lib/validator";
import z from "zod";

export type ProductInfo = z.infer<typeof ProductInsertSchema> & {
  id: string;
  rating: string;
  created_at: Date;
};

export type ProductItem = z.infer<typeof cartItemValidationSchema>;
export type Cart = z.infer<typeof InsertCartSchema>;
