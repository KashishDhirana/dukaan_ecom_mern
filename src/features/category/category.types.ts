import type z from "zod";
import type { CategoryZodSchema } from "./category.schema";

export type Category = z.infer<typeof CategoryZodSchema>;
