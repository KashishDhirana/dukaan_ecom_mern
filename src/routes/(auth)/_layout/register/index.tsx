import {
  ClientOnly,
  createFileRoute,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_layout/register/")({
  component: HelloWorld,
});

function HelloWorld() {
  const { pathname } = useRouterState().location;
  return (
    <ClientOnly fallback={<div>Loading content</div>}>
      {pathname ?? "/(auth)/_layout/register/ [FALLBACK]"}
      <br />
      Register
    </ClientOnly>
  );
}
