import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="p-4 border-2 border-black">
			<div>LayoutComponent in /(auth)/_layout</div>
			<Outlet />
		</div>
	);
}
