import {
  ClientOnly,
  createFileRoute,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_layout/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pathname } = useRouterState().location;
  return (
    <ClientOnly fallback={<div>Loading content</div>}>
      {pathname ?? "/(auth)/_layout/login/ [FALLBACK]"}
      <br />
      Login
    </ClientOnly>
  );
}
