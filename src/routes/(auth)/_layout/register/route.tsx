import { createFileRoute, Outlet } from "@tanstack/react-router";
import { env } from "@/env";

export const Route = createFileRoute("/(auth)/_layout/register")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: `${env.VITE_APP_TITLE} | Register` }],
  }),
});

function RouteComponent() {
  return (
    <div>
      Route of "/(auth)/register"!
      <Outlet />
    </div>
  );
}
