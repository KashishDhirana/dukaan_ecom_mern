import { createFileRoute, useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/_authLayout/(auth)/register/")({
	component: HelloWorld,
});

function HelloWorld() {
	const { pathname } = useRouterState().location;
	return (
		<div>
			{pathname ?? "/(auth)/_layout/register/ [FALLBACK]"}
			<br />
			Register
		</div>
	);
}
