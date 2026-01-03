import mongoose, {
	type HydratedDocument,
	type InferSchemaType,
	type Model,
	type QueryWithHelpers,
	Schema,
} from "mongoose";
import { connectMongoose } from "@/integrations/db/db";
import type {
	AdminZodType,
	allPermissionType,
	IUserMethods,
	IUserModel,
	IUserQueryHelpers,
	RoleType,
	SellerZodType,
	UserZodType,
	ZodUserType,
} from "./types";
import {
	adminPermissionsEnum,
	sellerPermissionEnum,
	userPermissionsEnum,
} from "./user.schema";

await connectMongoose();

const option = {
	timestamps: true,
	optimisticConcurrency: true,
	toJSON: {
		virtuals: true,
		getters: true,
	},
	discriminatorKey: "role",
};

const BaseUserSchema = new Schema<
	ZodUserType,
	Model<ZodUserType, IUserQueryHelpers, IUserMethods>,
	IUserMethods,
	IUserQueryHelpers
>(
	{
		accountStatus: {
			type: String,
			trim: true,
			enum: ["active", "inactive", "banned"],
			default: "active",
			index: true,
			lowercase: true,
		},
		address: {
			type: String,
			trim: true,
			maxLength: [255, "Address can't be more than 255 characters"],
		},
		avatar: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			required: true,
			maxLength: [255, "Email can't be more than 255 characters"],
			match: [
				/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-.]*)[a-z0-9_'+-]@([a-z0-9][a-z0-9-]*\.)*[a-z]{2,}$/,
				"Please enter a valid email address",
			],
			lowercase: true,
		},
		gender: {
			type: String,
			enum: ["male", "female", "others"],
			trim: true,
			lowercase: true,
		},
		role: {
			type: String,
			enum: ["admin", "user", "seller"],
			trim: true,
			default: "user",
			index: true,
			lowercase: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		password: {
			type: String,
			trim: true,
			required: true,
			select: false,
		},
		refreshToken: {
			type: String,
			trim: true,
		},
	},
	{
		...option,
		statics: {
			/** Static method to get model by role */
			getModelByRole(role: RoleType) {
				return this.discriminators?.[role] || this;
			},
		},
		query: {
			byRole(
				this: QueryWithHelpers<
					any,
					HydratedDocument<ZodUserType>,
					IUserQueryHelpers
				>,
				role,
			) {
				return this.where({ role });
			},
			byEmail(
				this: QueryWithHelpers<
					any,
					HydratedDocument<ZodUserType>,
					IUserQueryHelpers
				>,
				email,
			) {
				return this.where({ email });
			},
			byStatus(
				this: QueryWithHelpers<
					any,
					HydratedDocument<ZodUserType>,
					IUserQueryHelpers
				>,
				status,
			) {
				return this.where({ accountStatus: status });
			},
			isActive(
				this: QueryWithHelpers<
					any,
					HydratedDocument<ZodUserType>,
					IUserQueryHelpers
				>,
			) {
				return this.where({ accountStatus: "active" });
			},
		},
		methods: {
			hasPermission(permission: allPermissionType): boolean {
				return this.permissions.includes(permission);
			},
			getBannedStatus() {
				return this.accountStatus === "banned";
			},
		},
	},
);

BaseUserSchema.pre("save", function () {
	console.log("[mongoose save pre hook]: this object: ", this);
});

export type BaseUserDocType = InferSchemaType<typeof BaseUserSchema>;
/** Base model of User[s] */
export const BaseUserModel =
	(mongoose.models.BaseUser as IUserModel) ||
	mongoose.model("BaseUser", BaseUserSchema);

const UserSchema = new Schema<ZodUserType>({
	orders: {
		type: [mongoose.Types.ObjectId],
		ref: "Orders",
	},
	permissions: {
		type: [String],
		lowercase: true,
		default: [...userPermissionsEnum],
	},
});
export type UserDocType = InferSchemaType<typeof UserSchema>;
/** User model when `discriminatorKey='role'` (That is role attribute in BaseUserSchema) is equal to 'user' */
export const UserModel =
	BaseUserModel.discriminators?.user ||
	BaseUserModel.discriminator("user" satisfies RoleType, UserSchema);

const SellerSchema = new Schema<ZodUserType>({
	moto: {
		type: String,
		trim: true,
		lowercase: true,
	},
	permissions: {
		type: [String],
		lowercase: true,
		default: [...sellerPermissionEnum],
	},
});
export type SellerDocType = InferSchemaType<typeof SellerSchema>;
/** Seller model when `discriminatorKey='role'` (That is role attribute in BaseUserSchema) is equal to 'seller' */
export const SellerModel =
	BaseUserModel.discriminators?.seller ||
	BaseUserModel.discriminator("seller" satisfies RoleType, SellerSchema);

const AdminSchema = new Schema<ZodUserType>({
	permissions: {
		type: [String],
		lowercase: true,
		default: [...adminPermissionsEnum],
	},
});
export type AdminDocType = InferSchemaType<typeof AdminSchema>;
/** Admin model when `discriminatorKey='role'` (That is role attribute in BaseUserSchema) is equal to 'admin' */
export const AdminModel =
	BaseUserModel.discriminators?.admin ||
	BaseUserModel.discriminator("admin" satisfies RoleType, AdminSchema);
