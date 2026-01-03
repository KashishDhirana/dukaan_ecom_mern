import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { CUserZodSchema } from "@/features/user/user.schema";
import { createUser } from "@/features/user/user.service";
import { HTTPCODE } from "@/lib/httpcode";

export const Route = createFileRoute("/_authLayout/(auth)/register/api")({
  server: {
    // TODO: Global middleware
    // middleware: [],
    handlers: ({ createHandlers }) =>
      createHandlers({
        POST: {
          // TODO: Middleware for specific protocol
          // middleware: [],
          handler: async ({ request }) => {
            try {
              const body = await request.json();
              const parsedData = CUserZodSchema.parse(body);
              return await createUser(parsedData);
            } catch (error) {
              console.log(error);
              if (error instanceof Error) {
                return json(error, {
                  status: HTTPCODE.BADREQUEST,
                });
              }
              return json(error, {
                status: HTTPCODE.BADREQUEST,
              });
            }
          },
        },
      }),
  },
});
