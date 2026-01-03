import z from "zod";
import { MongooseBaseDocZodSchema } from "@/utils/zod.utils";
import { ProductZodSchema } from "../product/product.schema";

export const StatusEnum = [
  "pending",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export const OrderItemsZodSchema = z.object({
  product: ProductZodSchema.pick({
    id: true,
    title: true,
    sellerId: true,
    price: true,
  }),
  quantity: z.number().min(1),
  price: z.number().min(0),
});

export const OrderZodSchema = z.object({
  ...MongooseBaseDocZodSchema.shape,
  orderItems: z.array(OrderItemsZodSchema).min(1),
  totalAmount: z.number().min(0),
  userId: MongooseBaseDocZodSchema.shape.id,
  status: z.literal(StatusEnum).optional().default("pending"),
});
