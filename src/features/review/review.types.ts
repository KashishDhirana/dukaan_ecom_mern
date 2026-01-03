import type z from "zod";
import type { ReviewZodSchema } from "./review.schema";

export type ReviewZodType = z.infer<typeof ReviewZodSchema>;
