import type z from "zod";
import type {
	OrderItemsZodSchema,
	OrderZodSchema,
	StatusEnum,
} from "./order.schema";

export type OrderItemsZodType = z.infer<typeof OrderItemsZodSchema>;
export type OrderZodType = z.infer<typeof OrderZodSchema>;

export type StatusEnumType = (typeof StatusEnum)[number];
