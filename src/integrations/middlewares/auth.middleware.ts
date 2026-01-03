import { createMiddleware } from "@tanstack/react-start";
import { BaseUserZodSchema } from "@/features/user/user.schema";
import { getUser } from "@/features/user/user.service";

export const authMiddleware = createMiddleware({
	type: "function",
})
	.inputValidator((data) => BaseUserZodSchema.pick({ id: true }).parse(data))
	.server(({ data, next }) => {
		const userExists = getUser({ id: data.id });
		if (!userExists) throw new Error("User doesn't exist please retry later");
		return next();
	});
