import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_layout/register")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			Route of "/(auth)/register"!
			<Outlet />
		</div>
	);
}
