import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { createClientOnlyFn } from "@tanstack/react-start";

export const Route = createFileRoute("/(auth)/_layout/register/")({
	component: HelloWorld,
});

function HelloWorld() {
	const routerState = createClientOnlyFn(() => useRouterState().location);
	const { pathname } = routerState();
	return (
		<div>
			{pathname ?? "/(auth)/_layout/register/ [FALLBACK]"}
			<br />
			Register
		</div>
	);
}
