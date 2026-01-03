import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { LoginZodSchema } from "@/features/user/user.schema.ts";
import { loginUser } from "@/features/user/user.service";
import { HTTPCODE } from "@/lib/httpcode";

export const Route = createFileRoute("/_authLayout/(auth)/login/api")({
	server: {
		// TODO: Global middleware
		// middleware: [],
		handlers: ({ createHandlers }) =>
			createHandlers({
				GET: {
					handler: () =>
						json("Test", {
							status: HTTPCODE.SUCCESS,
						}),
				},
				POST: {
					// TODO: Middleware for specific protocol
					// middleware: [],
					handler: async ({ request }) => {
						const body = await request.json();
						const parsedBodyData = LoginZodSchema.parse(body);
						return await loginUser(parsedBodyData);
					},
				},
			}),
	},
});
