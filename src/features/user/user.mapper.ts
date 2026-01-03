import { createServerOnlyFn } from "@tanstack/react-start";
import type { BaseUserDocType } from "./user.model";
import type { BaseUserZodType, GetUserZodType } from "./types";

export const mapUserDocToUser = createServerOnlyFn(
	(
		doc: BaseUserDocType & BaseUserZodType,
	): GetUserZodType &
		Pick<BaseUserZodType, "id" | "createdAt" | "updatedAt"> => {
		return {
			id: doc?.id,
			email: doc?.email,
			gender: doc?.gender,
			name: doc?.name,
			address: doc?.address,
			avatar: doc?.avatar,
		};
	},
);
