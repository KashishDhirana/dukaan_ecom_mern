import {
	createFileRoute,
	Outlet,
	useRouterState,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_layout/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const { pathname } = useRouterState().location;

	return (
		<div>
			<div>Route of "/(auth)/login/"!</div>
			<div>{pathname}</div>
			<Outlet />
		</div>
	);
}
