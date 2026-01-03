import z from "zod";
import { MongooseBaseDocZodSchema } from "@/utils/zod.utils";
import { CategoryZodSchema } from "../category/category.schema";
import { ReviewZodSchema } from "../review/review.schema";

export const ProductZodSchema = z.object({
	...MongooseBaseDocZodSchema.shape,
	sellerId: MongooseBaseDocZodSchema.shape.id,
	title: z
		.string()
		.min(5, "Minimum required length is 5")
		.max(255, "Max allowed length is 255")
		.trim(),
	rating: z.number().min(0).max(5).optional(),
	price: z.number().min(0),
	description: z.string().min(10, "Minimum required length is 10").trim(),
	category: CategoryZodSchema.shape.id,
	stock: z.number().min(0).optional(),
	images: z.array(z.url("Invalid image URL")).max(5).optional(),
	variants: z.array(z.string().min(1)).optional(),
	productInfo: z.object().optional(),
	about: z.string().min(10, "Minimum required length is 10").trim().optional(),
	additionalInfo: z.object().optional(),
	review: z.array(ReviewZodSchema.shape.id).optional(),
	tags: z.array(z.string().min(1)).optional(),
});
