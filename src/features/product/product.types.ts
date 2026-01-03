import type z from "zod";
import type { ProductZodSchema } from "./product.schema";

export type ProductZodType = z.infer<typeof ProductZodSchema>;
