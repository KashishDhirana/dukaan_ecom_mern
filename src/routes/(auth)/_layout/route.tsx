import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="grid place-items-center">
      <div className="container p-4 border-2 border-black">
        <div>LayoutComponent in /(auth)/_layout</div>
        <Outlet />
      </div>
    </section>
  );
}
