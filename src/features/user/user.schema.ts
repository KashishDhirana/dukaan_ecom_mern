import { z } from "zod";
import { MongooseBaseDocZodSchema } from "@/utils/zod.utils";
import { OrderZodSchema } from "../order/order.schema";

const passwordRegex =
	/^(?=(?:.*[a-z]){3,})(?=(?:.*[A-Z]){2,})(?=(?:.*[0-9]){2,})(?=(?:.*[!@#$%^&*()_\-+.]){1,}).{8,}$/;

export const genderEnum = ["male", "female", "others"] as const;
export const roleEnum = ["admin", "user", "seller"] as const;
export const accountStatusEnum = ["active", "inactive", "banned"] as const;

export const adminPermissionsEnum = [
	"user:manage",
	"user:delete",
	"user:view_all",
	"product:manage_all",
	"category:manage",
	"order:view_all",
	"order:refund",
	"content:manage",
	"settings:configure",
	"finance:view_commission",
	"finance:payout",
] as const;

export const userPermissionsEnum = [
	"product:view",
	"search:perform",
	"cart:manage",
	"checkout:process",
	"user:view_self",
	"user:update_self",
	"order:view_self",
	"order:cancel_self",
	"review:create",
	"review:edit_self",
] as const;

export const sellerPermissionEnum = [
	"product:create",
	"product:edit_self",
	"product:delete_self",
	"inventory:manage_self",
	"order:update_status",
	"store:configure_self",
	"analytics:view_self",
] as const;

export const allPermissionsEnum = [
	...adminPermissionsEnum,
	...userPermissionsEnum,
	...sellerPermissionEnum,
] as const;

export const BaseUserZodSchema = z.object({
	...MongooseBaseDocZodSchema.shape,
	// avatar: z.string().trim().optional(),
	avatar: z
		.file("Avatar must be a file")
		.min(1024 * 50, "Minimum required size is 50KB")
		.max(1024 * 1024 * 2, "Max allowed size is 2MB")
		.mime(
			["image/jpeg", "image/png", "image/webp"],
			"Only .jpg, .png, .webp formats are supported",
		)
		.optional(),
	name: z
		.string()
		.trim()
		.min(5, "Minimum required length is 5")
		.max(50, "Max allowed length is 50"),
	email: z.email().trim().min(3),
	password: z
		.string()
		.trim()
		.min(6, "Minimum required length is 6")
		.regex(
			passwordRegex,
			"Enter a strong password with at least 3 lowercase letters, 2 uppercase letters, 2 digits, and 1 special character.",
		),
	gender: z.enum(genderEnum, "Please select from valid options").optional(),
	role: z.enum(roleEnum, "Please select from valid options").default("user"),
	accountStatus: z.enum(accountStatusEnum).default("active"),
	address: z.string().trim().min(1, "Address can't be empty").optional(),
	refreshToken: z.jwt().trim().optional(),
});

export const UserZodSchema = BaseUserZodSchema.extend({
	role: z.literal("user"),
	orders: z.array(OrderZodSchema.shape.id),
	permissions: z
		.array(z.enum([...userPermissionsEnum]))
		.default([...userPermissionsEnum]),
});

export const SellerZodSchema = BaseUserZodSchema.extend({
	role: z.literal("seller"),
	permissions: z
		.array(z.enum([...sellerPermissionEnum]))
		.default([...sellerPermissionEnum]),
	moto: z.string().trim().min(5, "Minimum required length is 5"),
});

export const AdminZodSchema = BaseUserZodSchema.extend({
	role: z.literal("admin"),
	permissions: z
		.array(z.enum([...adminPermissionsEnum]))
		.default([...adminPermissionsEnum]),
});

export const ZodUser = z.discriminatedUnion("role", [
	UserZodSchema,
	AdminZodSchema,
	SellerZodSchema,
]);

export const LoginZodSchema = BaseUserZodSchema.pick({
	email: true,
	password: true,
});

export const PasswordZodSchema = z
	.object({
		password: BaseUserZodSchema.shape.password,
		confirmPassword: BaseUserZodSchema.shape.password,
	})
	.refine((val) => val.password === val.confirmPassword, {
		error: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const CUserZodSchema = z
	.object({
		...UserZodSchema.pick({
			name: true,
			address: true,
			password: true,
			gender: true,
			email: true,
			avatar: true,
		}).shape,
		confirmPassword: UserZodSchema.shape.password,
	})
	.refine((val) => val.password === val.confirmPassword, {
		error: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const RUserZodSchema = UserZodSchema.pick({
	address: true,
	avatar: true,
	email: true,
	name: true,
	gender: true,
});

export const UUserZodSchema = UserZodSchema.pick({
	address: true,
	avatar: true,
	email: true,
	gender: true,
	name: true,
});

export const USellerZodSchema = SellerZodSchema.pick({
	address: true,
	avatar: true,
	email: true,
	gender: true,
	moto: true,
	name: true,
});
