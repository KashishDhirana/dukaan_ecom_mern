import { createServerOnlyFn, json } from "@tanstack/react-start";
import bcrypt from "bcrypt";
import { HTTPCODE } from "@/lib/httpcode";
import { env } from "@/utils/env";
import { handleServerError } from "@/utils/server.utils";
import type { BaseUserZodType, LoginZodType, RegisterZodType } from "./types";
import { mapUserDocToUser } from "./user.mapper";
import { BaseUserModel as BaseUser, UserModel as User } from "./user.model";

const saltRounds = Number(env.HASH_SALT);

/** Creates/Register single user */
export const createUser = createServerOnlyFn(async (input: RegisterZodType) => {
	try {
		input.password = await bcrypt.hash(input.password, saltRounds);

		const doc = await User.create(input);

		return json(
			{ success: true, data: mapUserDocToUser(doc) },
			{
				status: HTTPCODE.CREATED,
			},
		);
	} catch (error) {
		return handleServerError(error, "User already exists");
	}
});

/** Method for logging in existing user */
export const loginUser = createServerOnlyFn(async (input: LoginZodType) => {
	try {
		const doc = await BaseUser.findOne({ email: input.email }).select(
			"+password",
		);

		if (!doc)
			return json(
				{ success: false, message: "User Not Found" },
				{ status: HTTPCODE.NOTFOUND },
			);

		const isPasswordValid = await bcrypt.compare(input.password, doc.password);
		if (!isPasswordValid)
			return json(
				{ success: false, message: "Invalid Credentials" },
				{ status: HTTPCODE.BADREQUEST },
			);

		return json(
			{ success: true, data: mapUserDocToUser(doc) },
			{
				status: HTTPCODE.SUCCESS,
			},
		);
	} catch (e) {
		return handleServerError(e);
	}
});

/** Method for getting user by id */
export const getUser = createServerOnlyFn(
	async (input: Pick<BaseUserZodType, "id">) => {
		try {
			const doc = await User.findById(input.id);
			if (!doc) {
				return json(
					{ success: false, message: "User not found" },
					{
						status: HTTPCODE.NOTFOUND,
					},
				);
			}
			return json(
				{ success: true, data: mapUserDocToUser(doc) },
				{
					status: HTTPCODE.SUCCESS,
				},
			);
		} catch (e) {
			return handleServerError(e);
		}
	},
);
