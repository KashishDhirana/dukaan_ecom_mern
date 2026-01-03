import type {
	DiscriminatorModel,
	HydratedDocument,
	Model,
	Query,
	QueryWithHelpers,
} from "mongoose";
import type { z, ZodCodec } from "zod";
import type {
	AdminZodSchema,
	accountStatusEnum,
	adminPermissionsEnum,
	allPermissionsEnum,
	BaseUserZodSchema,
	CUserZodSchema,
	genderEnum,
	LoginZodSchema,
	RUserZodSchema,
	roleEnum,
	SellerZodSchema,
	sellerPermissionEnum,
	UserZodSchema,
	UUserZodSchema,
	userPermissionsEnum,
	ZodUser,
} from "./user.schema";

// Zod schema inferred Enum Types
export type RoleType = (typeof roleEnum)[number];
export type genderType = (typeof genderEnum)[number];
export type accountStatusType = (typeof accountStatusEnum)[number];
export type adminPermissionType = (typeof adminPermissionsEnum)[number];
export type sellerPermissionType = (typeof sellerPermissionEnum)[number];
export type userPermissionType = (typeof userPermissionsEnum)[number];
export type allPermissionType = (typeof allPermissionsEnum)[number];

// Zod schema inferred types
export type BaseUserZodType = z.infer<typeof BaseUserZodSchema>;
export type UserZodType = z.infer<typeof UserZodSchema>;
export type SellerZodType = z.infer<typeof SellerZodSchema>;
export type AdminZodType = z.infer<typeof AdminZodSchema>;
export type LoginZodType = z.infer<typeof LoginZodSchema>;
export type ZodUserType = z.infer<typeof ZodUser>;
export type RegisterZodType = z.infer<typeof CUserZodSchema>;
export type GetUserZodType = z.infer<typeof RUserZodSchema>;
export type SetUserZodType = z.infer<typeof UUserZodSchema>;

export interface IUserMethods {
	hasPermission(permission: allPermissionType): boolean;
	getBannedStatus(): boolean;
}

export interface IUserQueryHelpers {
	byRole(
		role: RoleType,
	): QueryWithHelpers<
		HydratedDocument<ZodUserType>[],
		HydratedDocument<ZodUserType>,
		IUserQueryHelpers
	>;
	byEmail(
		email: string,
	): QueryWithHelpers<
		HydratedDocument<ZodUserType>[],
		HydratedDocument<ZodUserType>,
		IUserQueryHelpers
	>;
	byStatus(
		status: BaseUserZodType["accountStatus"],
	): QueryWithHelpers<
		HydratedDocument<ZodUserType>[],
		HydratedDocument<ZodUserType>,
		IUserQueryHelpers
	>;
	isActive(): QueryWithHelpers<
		HydratedDocument<ZodUserType>[],
		HydratedDocument<ZodUserType>,
		IUserQueryHelpers
	>;
}

export interface IUserModel extends Model<
	ZodUserType,
	IUserQueryHelpers,
	IUserMethods
> {
	getModelByRole(
		role: RoleType,
	): DiscriminatorModel<"role", ZodUserType["role"]>;
}
