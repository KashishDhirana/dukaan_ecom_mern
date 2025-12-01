import { createFileRoute, Outlet } from "@tanstack/react-router";
import { env } from "@/env";

export const Route = createFileRoute("/(auth)/_layout/login")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: `${env.VITE_APP_TITLE} | Login` }],
  }),
});

function RouteComponent() {
  return (
    <div>
      Route of "/(auth)/login"!
      <Outlet />
    </div>
  );
}
