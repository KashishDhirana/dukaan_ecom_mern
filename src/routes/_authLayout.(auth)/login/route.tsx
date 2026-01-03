import { createFileRoute, Outlet } from "@tanstack/react-router";
import { getFormDataFromServer } from "@/features/auth/hooks/login.form";
import { env } from "@/utils/env";

export const Route = createFileRoute("/_authLayout/(auth)/login")({
	component: RouteComponent,
	head: () => ({
		meta: [{ title: `${env.VITE_APP_TITLE} | Login` }],
	}),
	loader: async () => ({
		state: await getFormDataFromServer(),
	}),
});

function RouteComponent() {
	return <Outlet />;
}
