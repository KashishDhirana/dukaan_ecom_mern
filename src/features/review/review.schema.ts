import z from "zod";
import { MongooseBaseDocZodSchema } from "@/utils/zod.utils";

export const ReviewZodSchema = z.object({
  ...MongooseBaseDocZodSchema.shape,
  userId: MongooseBaseDocZodSchema.shape.id,
  title: z
    .string()
    .min(5, "Title is required")
    .max(150, "Maximum required title length is 150")
    .trim(),
  reviewMessage: z
    .string()
    .min(10, "Review message is required")
    .max(550, "Maximum allowed message length is 550")
    .trim(),
  up_votes: z.number().min(0).default(0),
  reportCount: z.number().min(0).default(0),
});
