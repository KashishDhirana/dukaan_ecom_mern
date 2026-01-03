import { z } from "zod";

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const MongooseBaseDocZodSchema = z.object({
	id: z.string().trim().regex(objectIdPattern, "Invalid Object Id").optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});
